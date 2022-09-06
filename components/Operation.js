import {View,Text,TouchableOpacity} from "react-native";
import {Icon} from "react-native-elements";
import stc from "string-to-color";
import {auth} from "../firebase_file";
import currencyFormatter from "currency-formatter";
import {useSelector} from "react-redux";
import {selectStock,selectFormats,selectUsers,selectPointsVentes,selectTransferts} from "../slices";
import moment from "moment";
import 'moment/locale/fr'
import {get_nom_pv} from "./functions";

let decode = require('html-entities-decoder')

const Operation=({line})=>{
	const p=useSelector(selectStock);
	const f=useSelector(selectFormats);
	const u=useSelector(selectUsers);
	const pv=useSelector(selectPointsVentes);
	const t=useSelector(selectTransferts);
	
	const token_id=line?.token_id;
	
	const {nom,format}=p?.filter((item)=>{
		return item.token_id==line?.produit;
	})[0];
	
	const nom_format=f?.filter((item)=>{
		return item.token_id==format;
	})[0].nom
	
	var type="";
	let du="";
	let a="";
	
	let sortie=false;
	var token=line?.token;
	if(token==1){
		type="Entrée";
		sortie=false;
	}else if(token==2){
		type="Sorite";
		sortie=true;
	}else if(token==3){
		type="Bris";
		sortie=true;
	}else if(token==4){
		type="Transfert";
		
		const tr=t?.filter((item)=>{
			return item?.token_id==token_id;
		})
		if(tr.length>0){
			du=tr[0].du;
			a=tr[0].a;
		}
		
	}else{
		type="Vente";
		sortie=false;
	}
	
	const token_user=line?.user;
	const user_info=u?.filter((item)=>{
		return item.token_id==token_user;
	})[0]
	
	const username=decode(user_info.nom)
	const token_pv=user_info.point_vente;
	let str_pv="";
	if(token_pv=="-"){
		str_pv="Direction Générale";
	}else{
		str_pv=pv?.filter((item)=>{
			return item.token_id==token_pv;
		})[0].adresse;
	}
	
	const total_cartons=line?.total_cartons;
	const total_m2=line?.total_m2;
	const total_pieces=line?.total_pieces;
	
	const unite=decode(line?.unite);
	let qte=parseFloat(line?.qte);
	if(unite=="m2"){
		qte=parseFloat(total_m2)
	}else if(unite=="Carton"){
		qte=parseFloat(total_cartons);
	}else if(unite=="Pièce"){
		qte=parseFloat(total_pieces);
	}
	//qte=Math.abs(qte);
	const pu=parseFloat(line?.prix);
	const value=Math.abs(qte*pu);
	
	let str_du="";
	let str_a="";
	if(du!=""){
		str_du=decode(get_nom_pv(du,pv));
	}
	
	if(a!=""){
		str_a=decode(get_nom_pv(a,pv));
	}
	
	if(token==4){
		if(qte<0){
			sortie=true;
		}else{
			sortie=false;
		}
	}
	
	return(
		<View className="m-4 flex-row">
			<TouchableOpacity className="w-8 h-8 rounded-full items-center justify-center mr-2"
			style={{backgroundColor:stc(type)}}
			>
				<Text className="text-white">{type[0]}</Text>
			</TouchableOpacity>
			<View className="flex-1">
				<Text className="text-sm font-semibold">{decode(nom)} / {decode(nom_format)}</Text>
				<Text className="text-xs text-gray-400" numberOfLines={1} ellipSizeMode="tail">{str_pv}</Text>
				<Text className="text-xs text-gray-400">{username.toUpperCase()}</Text>
				{(token==4 && qte<0) && <Text className="text-xs text-gray-400" numberOfLines={1} ellipSizeMode="tail">Transfert envoyé a : {str_a}</Text>}
				{(token==4 && qte>0) && <Text className="text-xs text-gray-400" numberOfLines={1} ellipSizeMode="tail">Transfert reçu de : {str_du}</Text>}
				<Text className="text-xs text-gray-400">{moment(line?.date).local("fr").format("llll")}</Text>
			</View>
			
			<View className="items-center ml-2">
				<Text className="text-xs text-gray-400">{Math.abs(qte)} {decode(unite)}</Text>
				<Text className={`text-xs ${sortie==true ? 'text-red-400' : 'text-green-700'} `}>{currencyFormatter.format(value,{code:"xof",decimal:".",precision:0})} Fr</Text>
			</View>
			
		</View>
	)
}

export default Operation;