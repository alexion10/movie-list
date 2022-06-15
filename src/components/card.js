import { useDispatch, useSelector } from "react-redux";
import { list, removeFav } from "../store/reducers";

export const  Card = (obj) => {
    const dispatch = useDispatch();
    const favoriteList = useSelector(state => state.listFavorite.list)
    const image = obj.cardProp.backdrop_path;
    const title = obj.cardProp.title !== undefined ? obj.cardProp.title : obj.cardProp.name;
    const vote = obj.cardProp.vote_average;
    const id = obj.cardProp.id;
    const imageUrl = (image === null) ? 'Placeholder.png':`https://image.tmdb.org/t/p/w500/${image}`; 
    let addedMovie = favoriteList.find((o) => o.obj.cardProp.id === obj.cardProp.id);
    let favoritDisabled = addedMovie ? true : false;
    return(
        <div className="card" style={{backgroundImage: `url(${imageUrl})`}}>
            <div className="cardDetails">
            <p className="cardTitle">{title}</p>
            <p className="cardVote">{vote}</p>
            </div>
            <div className="cardParentButton">
            {!favoritDisabled && (
                <button 
                className="cardButton" 
                disabled={favoritDisabled} 
                onClick={()=>{dispatch(list({obj}))}}
                >Add to Favorite
                </button>      
            )}
            {
                favoritDisabled &&(
                <button
                className="cardButtonRemove"  
                onClick={()=>{dispatch(removeFav(id, favoritDisabled = false))}}
                >Remove from Fav!
                </button>
                )
            }
            </div>
        </div>
    )
}   