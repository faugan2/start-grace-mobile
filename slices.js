import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  date:null,
  mouvements:null,
  pointsVentes:null,
  retraits:null,
  depenses:null,
  formats:null,
  stock:null,
  transferts:null,
  filtre:null,
  users:null,
  clients:null,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
	setMouvements:(state,action)=>{
		state.mouvements=action.payload;
	},
	
	setDate:(state,action)=>{
		state.date=action.payload;
	},
	
	setPointsVentes:(state,action)=>{
		state.pointsVentes=action.payload;
	},
	
	setRetraits:(state,action)=>{
		state.retraits=action.payload;
	},
	
	setDepenses:(state,action)=>{
		state.depenses=action.payload;
	},
	
	setFormats:(state,action)=>{
		state.formats=action.payload;
	},
	
	setStock:(state,action)=>{
		state.stock=action.payload;
	},
	
	setTransferts:(state,action)=>{
		state.transferts=action.payload;
	},
	
	setFiltre:(state,action)=>{
		state.filtre=action.payload;
	},
	setUsers:(state,action)=>{
		state.users=action.payload;
	},
	setClients:(state,action)=>{
		state.clients=action.payload;
	}
	
	
  },
})

export const { setMouvements,setDate,setPointsVentes,setTransferts,setDepenses,setFormats,setFiltre,setStock,setRetraits,
setUsers,
setClients,
 } = counterSlice.actions

export const selectMouvements = (state) => state.counter.mouvements
export const selectDate = (state) => state.counter.date
export const selectPointsVentes = (state) => state.counter.pointsVentes
export const selectTransferts = (state) => state.counter.transferts
export const selectDepenses = (state) => state.counter.depenses
export const selectFormats = (state) => state.counter.formats
export const selectFiltre = (state) => state.counter.filtre
export const selectStock = (state) => state.counter.stock
export const selectRetraits = (state) => state.counter.retraits
export const selectUsers = (state) => state.counter.users
export const selectClients = (state) => state.counter.clients

export default counterSlice.reducer