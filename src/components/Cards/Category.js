import React from 'react';
// import { Button, Card } from "@mui/material";
// import { Link } from "react-router-dom";
import '../../css/Cards/Category.css';

function Category(props) {
    return (
        <>
        <div className='yellow-box'>
        <div className="box-card">
            <div className="img-logo">
                {/* <h1> L.O.G.O</h1>  */}
                {/* comment it to use image logo */}
                <img src={props.icon} alt="L.O.G.O" className="logo-icon-img" />
            </div>
        <div className="card-body">
        {/* <h5 className="card-title">Card title</h5> */}
        <h5 className="category-name">{props.name}</h5>

        {/* <p className="para-text">Design & Development <br /> <br /></p> */}
        <p className="para-text2">{props.number}<br /> </p>
        
        </div>
        </div>
        {/* <div className="Category">
            <div className="box"></div>
            </div> */}
            </div>
        </>
    )
}

export default Category;
