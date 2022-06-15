import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {inputSearch} from '../store/reducers';

export const Header = () => {
  const dispatch = useDispatch();
  return (
    <header>
          <ul className="nav-link">
            <li className="link">
              <Link to="/" onClick={()=>{dispatch(inputSearch(''))}}>Dashboard</Link>
            </li>

            <li className="link">
              <Link to="/favorite" onClick={()=>{dispatch(inputSearch(''))}}>Favorite</Link>
            </li>
          </ul>
    </header>
  );
};