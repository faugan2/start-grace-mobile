const get_nom_pv=(token_id,list)=>{
	const res=list?.filter((item)=>{
		return item?.token_id==token_id;
	})
	
	if(res?.length>0){
		return res[0].adresse;
	}else{
		return "";
	}
}


export {get_nom_pv};