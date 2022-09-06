import {View,Text,TouchableOpacity} from "react-native";
import {Icon} from "react-native-elements";
import stc from "string-to-color";
import {auth} from "../firebase_file";
import currencyFormatter from "currency-formatter";
import {useSelector} from "react-redux";
import {selectCurrentData} from "../slices";
import {useState,useEffect} from "react";


let decode = require('html-entities-decoder')


const Footer=()=>{
	const cd=useSelector(selectCurrentData);
	const [total,set_total]=useState(0)
	
	useEffect(()=>{
		if(cd==null) return;
		let t=0;
		cd?.map((item)=>{
			const token=item.token;
			const unite=decode(item.unite);
			let qte=0;
			if(unite=="m2"){
				qte=item.total_m2;
			}else if(unite=="Carton"){
				qte=item.total_cartons;
			}else if(unite=="Pièce"){
				qte=item.total_pieces;
			}
			qte=Math.abs(parseFloat(qte));
			const prix=parseFloat(item.prix);
			const v=qte*prix;
			if(token==1){
				//entree
			}else if(token==2){
				//Vente 
				
			}else if(token==3){
				//bris
			}else if(token==4){
				//transfert
			}else{
				t+=v;
			}
		})
		set_total(t);
	},[cd])
	return(
		<View className="bg-blue-50 absolute bottom-0 w-full">
			<View className="items-center m-2">
				<Text className="text-2xl font-semibold">{currencyFormatter.format(total,{code:"xof",decimal:".",precision:0})} F CFA</Text>
			</View>
			<View className="flex-row items-center bg-blue-100">
				<TouchableOpacity className="flex-1 items-center p-1">
					<Icon name="apps-outline" type="ionicon" />
					<Text className="text-xs font-semibold">Stock</Text>
				</TouchableOpacity>
				
				<TouchableOpacity className="flex-1 items-center">
					<Icon name="logo-usd" type="ionicon" />
					<Text className="text-xs">Ventes</Text>
				</TouchableOpacity>
				
				<TouchableOpacity className="flex-1 items-center">
					<Icon name="arrow-redo-outline" type="ionicon" />
					<Text className="text-xs">Dépenses</Text>
				</TouchableOpacity>
				
				<TouchableOpacity className="flex-1 items-center">
					<Icon name="trending-down-outline" type="ionicon" />
					<Text className="text-xs">Retrait</Text>
				</TouchableOpacity>
			</View>
			
		</View>
	)
}

export default Footer;