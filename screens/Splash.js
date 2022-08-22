import {Text,Image} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from "moment";

import logo from "../images/logo.png";

const Splash=()=>{
	const date=moment().format("ll");
	return(
		<SafeAreaView className="flex-1 items-center justify-center">
		<Image source={logo} style={{width:200,height:200,resizeMode:"contain"}}/>
		<Text>Patientez...</Text>
		</SafeAreaView>
	)
}
export default Splash;