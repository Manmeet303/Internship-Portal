import { Link } from "react-router-dom";
import { Name } from "../config/Strings";
const Footer = () => {
    return (
        <div className="Footer">
            <div className="FooterContainer">
                <div className="box" id="box-left">
                    <div className="logo">
                        <h2>{Name}</h2>

                        <div className="navlist">
                            <Link to="/">
                                <i className="fab fa-twitter"></i>
                            </Link>
                            <Link to="/">
                                <i className="fab fa-facebook"></i>
                            </Link>
                            <Link to="/">
                                <i className="fab fa-google-plus"></i>
                            </Link>
                            <Link to="/">
                                <i className="fab fa-linkedin"></i>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="box" id="box-right">
                    <p>
                        <b>
                            {" "}
                            A. D. Patel Institute of Technology, Karamsad, Anand
                        </b>
                        <br />
                        This site is developed by the students of ADIT 3rd Year
                    </p>
                </div>
            </div>
            <center>
                <p className="Copyright">All Rights Reserved @ ADIT 2021</p>
            </center>
        </div>
    );
};

export default Footer;
