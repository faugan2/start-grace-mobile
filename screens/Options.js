import {View,Text,TouchableOpacity} from "react-native";
import moment from "moment";

const Options=()=>{
	const date=moment().format("ll");
	return(
		<View className="items-center justify-center m-2">
			<Text>Options</Text>
		</View>
	);
}

export default Options;