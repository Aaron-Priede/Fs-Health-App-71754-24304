import { configureStore } from "@reduxjs/toolkit";
import sliceReducer from "./slice.js"
const store=configureStore({
    reducer:{
   slice: sliceReducer
}
})

export default store;