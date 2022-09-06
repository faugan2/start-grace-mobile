import {View,Text,TouchableOpacity,ActivityIndicator,FlatList} from "react-native";
import moment from "moment";
import {useState,useEffect,useRef} from "react";
import {useDispatch,useSelector} from "react-redux";
import {setDate,selectDate} from "../slices";

const Filter=()=>{
	const today=moment()
	const debut=moment().subtract(10, 'days');
	const cd=useSelector(selectDate);
	const [data,set_data]=useState(null);
	const ref=useRef(null);
	const [today_index,set_today_index]=useState(0);
	const [date,set_date]=useState(null);
	
	const dispatch=useDispatch();
	
	useEffect(()=>{
		const d=[];
		let index=0;
		for(var i=10,j=0; i>=0; i--,j++){
			const date=moment().subtract(i,"days");
			if(i==0){
				index=j;
			}
			d.push({index:i,date});
		}
		set_data(d);
		set_today_index(index);
	},[])
	
	useEffect(()=>{
		if(today_index==0) return;
		console.log("today index is",today_index);
		ref.current?.scrollToIndex({index:today_index-3})
	},[data,today_index])
	
	useEffect(()=>{
		set_date(cd);
	},[cd])
	
	const select_date=(date)=>{
		dispatch(setDate(moment(date).format("ll")));
	}
	
	return(
		<View className="items-center justify-center  mr-2 ml-2">
			{data==null && <ActivityIndicator />}
				{(data!=null) && <FlatList 
				ref={ref}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				onScrollToIndexFailed={info => {
					
					const wait = new Promise(resolve => setTimeout(resolve, 700));
					wait.then(() => {
					  ref.current?.scrollToIndex({ index: 0, animated: true });
					});
				  }}
				data={data}
				keyExtractor={(item)=>item.index}
				horizontal={true}
				renderItem={({item})=>{
					const item_date=item?.date.format("ll");
					return(
						<TouchableOpacity className={`p-1 m-1 border border-gray-400 ${date!=null && date==item_date ? 'bg-blue-200' : ''} `} onPress={select_date.bind(this,item?.date)}>
							<Text className="text-xs">{item_date}</Text>
						</TouchableOpacity>
					)
				}}
				/> }

				{date==null && <Text className="font-semibold">Toute date confondue</Text>}
				{date!=null && <Text className="font-semibold">{date}</Text>}
		</View>
	);
}

export default Filter;