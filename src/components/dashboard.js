import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import InfiniteScroll from 'react-infinite-scroller';
import { Card } from './card';
import { Search } from "./search";
import { InputSearch } from "./inputSearch";


export function SetOfCards (){
    const [apiResults, setApiResults] = useState([]);
    const [moreResults, setMoreResults] = useState(true);
    const [page, setPage] = useState(1);

    const fetchMoreData = async () => {
        try{
            const url = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=c001e16be812bdd5024d622a010ff39a&language=en-US&page=${page}`)
            const data = await url.json();
            console.log(data);
            return data;
        }catch(err){
            console.error(err)
            return err;
        }
    }

    const scrollResults = async () => {
            const results = await fetchMoreData();
            setApiResults([...apiResults, ...results.results])
            if(results.results.length === 0 || page > 20){
                setMoreResults(false);
            }
            setPage(page + 1)    
    }
    

    useEffect(()=> {
        const apiRes = async () => {
                const url  = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=c001e16be812bdd5024d622a010ff39a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`);//https://api.themoviedb.org/3/trending/movie/week?api_key=c001e16be812bdd5024d622a010ff39a
                const results = await url.json();
                setApiResults(results.results);
            }
        apiRes().catch(console.error);
    }, [])

    return (
            <InfiniteScroll
            className="cardGroup"
            loadMore={scrollResults}
            hasMore={moreResults}
            loader={<div className="loader" key={1}>Loading ...</div>}
            >
            {apiResults.length > 0 ?       
                    apiResults.map(i => <Card key={i.id} cardProp={i}/>):<p>There are no results to</p>}
            </InfiniteScroll>
    )
}


export const Dashboard = () => {
    const favorites = useSelector(state=> state.listFavorite.list);
    const query = useSelector(state => state.listFavorite.inputSearch)  
    useEffect(()=>{
        localStorage.setItem("favoriteList", JSON.stringify(favorites));
    }, [favorites])
    
    return(
        <div>
            <InputSearch />
            {query.length > 0 && <Search />}
            {query.length <= 0 && <SetOfCards />}
        </div>
    )
}
