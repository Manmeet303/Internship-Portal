import React from 'react';
// import { Button, Card } from "@mui/material";
// import { Link } from "react-router-dom";
import '../../css/Cards/Experience.css';
import { Button } from '@mui/material';
import user1 from "../../views/Images/pf1.jpg";

function Experience(props) {
    return (
        <>
        <div className="yellow-card">
        <div className="experience-card">
           <div className="user-img">
           <img src={user1} alt="user1"></img>
           </div>
        <div className="card-body">
        <div className="rating">
        <div className="rating-stars">
            <i className="fa fa-star clicked"></i>
            <i className="fa fa-star clicked"></i>
            <i className="fa fa-star clicked"></i>
            <i className="fa fa-star clicked"></i>
            <i className="fa fa-star "></i>
            </div>
            <p className='users'> {props.user}</p>
        </div>
        <p className="para-text">Thanks for a Golden opportunity and I achieved my Dream
         Job. Its a very easy process using this amazing website.Thanks for a Golden opportunity and I achieved my Dream
         Job. Its a very easy process using this amazing website.Thanks for a Golden opportunity and I achieved my Dream
         Job. Its a very easy process using this amazing website.<br /> <br />
         <Button>Read more</Button>
         </p>
                    
        </div>
        </div>
        {/* <div className="Category">
            <div className="box"></div>
            </div> */}

            </div>
        </>
    )
}

export default Experience;
