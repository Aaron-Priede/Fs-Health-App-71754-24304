import {createSlice} from '@reduxjs/toolkit';


const initialState = {};
const slice = createSlice({
    name: 'slice',
    initialState,
    reducers: {
        addCredentials:(state,action)=>{
            state.email = action.payload.email;
            state.password = action.payload.password;
        },
        addId:(state,action)=>{
            state.id = action.payload.id;
        },
    },
});
export const {addCredentials,addId} = slice.actions;
export default slice.reducer;