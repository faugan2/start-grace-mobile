import {View,Text,TouchableOpacity} from "react-native";
import {Icon} from "react-native-elements";
import stc from "string-to-color";
import {auth} from "../firebase_file";
import currencyFormatter from "currency-formatter";

const Footer=()=>{
	return(
		<View className="bg-blue-50">
			<View className="items-center m-2">
				<Text className="text-2xl font-semibold">{currencyFormatter.format(125000,{code:"xof",decimal:".",precision:0})} F CFA</Text>
			</View>
			<View className="flex-row items-center bg-blue-100">
				<TouchableOpacity className="flex-1 items-center p-1">
					<Icon name="apps-outline" type="ionicon" />
					<Text className="text-xs font-semibold">Tout</Text>
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