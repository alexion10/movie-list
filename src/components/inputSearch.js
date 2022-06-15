import React from "react";
import debounce from 'lodash.debounce';
import { useDispatch } from "react-redux";
import { inputSearch } from "../store/reducers";


export  const InputSearch = () => {
    const dispatch = useDispatch();
    const onChange = (e) => dispatch(inputSearch(e.target.value));            
      
    const debounceSearch = debounce(onChange, 500);   
    return(
        <div className="containerSearch">
                <input
                id="search"
                className="inputSearch"
                type="text"
                placeholder="Search for a movie"
                onChange={debounceSearch}
                />
        </div>
    )
}