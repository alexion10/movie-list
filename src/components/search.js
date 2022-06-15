import React, { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { searchResults } from "../store/reducers";
import { Card } from "./card";

export const Search = () => {
    const dispatch = useDispatch();
    const searchList = useSelector(state => state.listFavorite.searchResults)
    const query = useSelector(state => state.listFavorite.inputSearch)  

    

      useEffect(()=>{
        const resultsFromSearch = async () => {        
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=c001e16be812bdd5024d622a010ff39a&language=en-US&page=1&include_adult=false&query=${query}`)
              .then((res) => res.json())
              .then((data) => {
                if (!data.errors) {
                    console.log(data.results);
                    dispatch(searchResults(data.results));
                } else {
                    dispatch(searchResults([]))
                }
              });
          }
          resultsFromSearch()
      },[query, dispatch])

    return(
        <div className="searchBar">
            <div className="cardGroup">
                {searchList.length > 0 && (
                <>
                {searchList.map((movie) => (
                    <Card key={movie.id} cardProp={movie}>
                    </Card>
                ))}
                </>
                )}

                {searchList.length === 0 && (
                    <p>No results found!</p>
                )}
          </div>
        </div>
    )
}