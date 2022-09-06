import {View,Text,TouchableOpacity,TextInput} from "react-native";
import {Icon} from "react-native-elements";
import stc from "string-to-color";
import {auth} from "../firebase_file";
import {useNavigation} from "@react-navigation/native";

const Header=()=>{
	const navigation=useNavigation();
	return(
		<View className="bg-blue-100 mr-2 ml-2 rounded-full p-2 flex-row justify-between items-center">
			<TouchableOpacity className="ml-1 w-10" onPress={()=>{
				navigation.navigate("options");
			}}>
				<Icon name="menu-outline" type="ionicon" />
			</TouchableOpacity>
			
			<TouchableOpacity className="flex-1 p-1 mr-1 ml-1">
				<TextInput placeholder="Rechercher dans les opérations" className=""/>
			</TouchableOpacity>
			
			<TouchableOpacity className="w-8 h-8 rounded-full items-center justify-center mr-1" 
			style={{backgroundColor:stc(auth?.currentUser?.email)}}
			onPress={()=>{
				auth?.signOut();
			}}
			>
				<Text className="text-white">{auth?.currentUser?.email[0].toLowerCase()}</Text>
			</TouchableOpacity>
		</View>
	)
}

export default Header;