import { createSlice, current } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


export const favoriteList = createSlice({
    name: 'favoriteMovie',
    initialState: {
        list: localStorage.getItem("favoritesList") ? JSON.parse(localStorage.getItem("favoritesList")) : [],
              searchResults:[],
              inputSearch: ''},
    reducers: {
        list: (state, action) => {            
            state.list = [action.payload, ...state.list]
        },
        removeFav: (state, action) => {
           state.list = current(state.list).filter((i)=>i.obj.cardProp.id !== action.payload)
        }, 
        searchResults:(state, action) => {
            state.searchResults = action.payload;
        },
        inputSearch:(state, action) => {
            state.inputSearch = action.payload;
        }
    }
})

export const LocalStorage = () => {
    const dispatch = useDispatch();
    const favorites = useSelector(state=> state.listFavorite.list);
    useEffect(()=>{
        localStorage.setItem("favoriteList", JSON.stringify(favorites));
    }, [favorites, dispatch])
}

export const {list, searchResults, inputSearch, removeFav} = favoriteList.actions;

export default favoriteList.reducer;

