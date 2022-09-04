import React, {useEffect,useState} from "react";
import {Text,TextInput,View,TouchableOpacity} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import {auth} from "../firebase_file";

const Login=()=>{
	const [login,set_login]=useState("admin");
	const [password,set_password]=useState("admin2000@");
	const [loading,set_loading]=useState(false);
	const [alerte,set_alerte]=useState("");
	
	const fn_login=async ()=>{
		set_alerte("");
		if(login==""){
			set_alerte("Vous devez saisir l'identifiant");
			return;
		}
		if(password==""){
			set_alerte("Vous devez saisir le mot de passe");
			return;
		}
		if(login!="admin" && password!="admin2000@"){
			set_alerte("Les identifiants sont incorrectes");
			return;
		}
		
		set_loading(true);
		try{
			await auth.signInWithEmailAndPassword("stargrace@gmail.com","admin2000@");
			set_loading(false);
		}catch(err){
			set_loading(false);
			set_alerte("Une erreur est survenue, reprenez svp");
		}
		
		
	}
	
	return(
		<SafeAreaView className="flex-1 pt-16 items-center">
			<Text className="text-center text-xl font-semibold mb-2">Identifiez-vous</Text>
			<View>
				<TextInput className="bg-gray-300 mb-4 p-2 w-60" placeholder="Identifiant" 
				value={login}
				onChangeText={(text)=>{
					set_login(text)
					set_alerte("");
					}}
				/>
			</View>
			<View>
				<TextInput className="bg-gray-300 mb-4 p-2 w-60"  placeholder="Mot de passe" 
				value={password}
				onChangeText={(text)=>{set_password(text)
				set_alerte("");
				}}
				secureTextEntry={true}/>
			</View>
			<View>
				<TouchableOpacity className="border p-3 w-40 items-center rounded-sm border-gray-400" 
				onPress={fn_login}
				disabled={loading}
				activeOpacity={0.6}>
					<Text>Se connecter</Text>
				</TouchableOpacity>
			</View>
			
			{alerte!="" && <View className="mt-4">
				<Text className="text-red-400 font-semibold">{alerte}</Text>
			</View>}
			
			{loading==true && <View className="mt-4">
				<Text className="text-gray-400 font-semibold">Patientez...</Text>
			</View>}
			
			<View className="absolute bottom-1 w-full items-center">
				<Text className="text-lg font-semibold">STAR GRACE</Text>
			</View>
		</SafeAreaView>
	)
}
export default Login;