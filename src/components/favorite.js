import { useEffect } from "react";
import { useSelector } from "react-redux"
import { Card } from "./card";
import { InputSearch } from "./inputSearch";

const SearchFavorite = () => {
    const favoriteList = useSelector(state => state.listFavorite.list)
    const query = useSelector(state => state.listFavorite.inputSearch)
    return(
        <div className="cardGroup">
            {favoriteList.length > 0 &&(
                favoriteList.map((i) => {
                    if((i.obj.cardProp.original_title.toLowerCase().indexOf(query.toLowerCase()) > -1) === true) {
                      return  <Card key={i.obj.cardProp.id} cardProp={i.obj.cardProp}/>
                    }
                    return false;
                })
                
            )}
            
        </div>
    )
    
}



export const Favorite = () => {
    const favoriteList = useSelector(state => state.listFavorite.list)
    const query = useSelector(state => state.listFavorite.inputSearch)  

    useEffect(()=>{
        localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
    }, [favoriteList])
    return(
        <>
            <InputSearch />
            {query.length > 0 &&(
                <SearchFavorite />
            )}
            {query.length === 0 && (
                <div className="cardGroup">
                {favoriteList.map((i)=>{
                return  <Card key={i.obj.cardProp.id} cardProp={i.obj.cardProp}/>
                })}
            </div>
            )}
            

        </>
    )
}
