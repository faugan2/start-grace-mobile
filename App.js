import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View  } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';
import { SafeAreaProvider,SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store } from './store'
import { Provider } from 'react-redux'

import Splash from "./screens/Splash";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Options from "./screens/Options";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
	<Provider store={store}>
	<TailwindProvider>
		<SafeAreaProvider>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="splash" component={Splash} options={{headerShown:false}}/>
					<Stack.Screen name="login" component={Login} options={{headerShown:false}}/>
					<Stack.Screen name="home" component={Home} options={{headerShown:false}}/>
					<Stack.Screen name="options" component={Options} options={{}}/>
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	</TailwindProvider>
	</Provider>
  );
}

