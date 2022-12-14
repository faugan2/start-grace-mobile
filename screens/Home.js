import React,{useEffect,useState} from "react";
import {Text,TouchableOpacity,View,FlatList,RefreshControl} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import {auth} from "../firebase_file";
import {Icon} from "react-native-elements";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Filter from "../components/Filter";

import {useSelector,useDispatch} from "react-redux";
import {setMouvements,selectMouvements,setDate,setPointsVentes,setTransferts,setDepenses,setFormats,setFiltre,setStock,setRetraits,
selectUsers,
selectClients,
setUsers,
setClients,
setCurrentData,
setVentesOptions,
selectDate,
} from "../slices";
import Operation from "../components/Operation";

import moment from "moment";


const Home=({navigation})=>{
	
		const dispatch=useDispatch();
		const m=useSelector(selectMouvements);
		const date=useSelector(selectDate);
		
		const [refreshing, set_refreshing] = useState(false);
		const [data,set_data]=useState([]);

		const load_data = async () => {
			set_refreshing(true);
			/*mouvements:null,
			pointsVentes:null,
			retraits:null,
			depenses:null,
			formats:null,
			stock:null,
			transferts:null,
			users,
			clients
			*/
			dispatch(setDate(null))
			await request("mouvements",setMouvements);
			await request("users",setUsers);
			await request("clients",setClients);
			await request("transfert",setTransferts);
			await request("stock",setStock);
			await request("formats",setFormats);
			await request("depenses",setDepenses);
			await request("retrait",setRetraits);
			await request("points_vente",setPointsVentes);
			await request("ventes_options",setVentesOptions);
			
			
			
			set_refreshing(false)
			
			
			
		};
		
		const request=async (table,dispatcher)=>{
			const url="https://assitchape.com/api/star_grace/fetch.php";
			try{
				const req=await fetch(url+"?table="+table);
				const res=await req.json();
				dispatch(dispatcher(res));
				console.log(table,"200");
			}catch(err){
				console.log(table,"404",err);
			}
		}
		
		useEffect(()=>{
			load_data();
		},[])
		
		useEffect(()=>{
			if(m==null) return;
			if(date!=null){
				const res=m?.filter((item)=>{
					const d=moment(item?.date).format("ll");
					return d==date;
				})
				set_data(res)
			}else{
				set_data(m);
			}
			
			
		},[m,date])
		
		useEffect(()=>{
			dispatch(setCurrentData(data))
		},[data])
		
	return (
		<SafeAreaView className="flex-1">
			<Header />
			<Filter />
			{(data!=null && data?.length==0) && <Text className="text-center mt-4">Aucune op??ration nest trouv??e.</Text>}
			{(data!=null  )&&<FlatList 
			data={data}
			keyExtractor={(item)=>item.id}
			renderItem={({item})=>{
				return <Operation line={item} />
			}}
			
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={load_data} />}

			/>}
			
			<Footer />
		</SafeAreaView>
	)
}
export default Home;