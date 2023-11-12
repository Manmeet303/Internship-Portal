import { Link } from "react-router-dom";
import "../css/ContactUs.css";
import { Button } from "@mui/material";

const ContactUs = () => {
    return (
       <>

            <section className="contactus">
           <div className="contactus-box">
                    <table className="contactus-table">
                    <tbody>
                        <tr>
                            <td>
                                <div className="contactinfo">
                                    <p className="contactinfo-title">ADIT Intern</p>
                                    <p className="contactinfo-title">A.D.I.T new V.V.N Anand </p>

                                    <p className="contactinfo-email">ADIT@adit.ac.in</p>
                                    <p className="contactinfo-number">+91 1234-567-890</p>

                                    <div className="social-media">
                            <p className="contactinfo-miniheading">Connect with us :</p>
                            <div className="social-icons">
                                <Link to="/ContactUs">
                                    <i className="fab fa-facebook-f icons"></i>
                                </Link>
                                <Link to="/ContactUs">
                                    <i className="fab fa-twitter icons"></i>
                                </Link>
                                <Link to="/ContactUs">
                                    <i className="fab fa-instagram icons"></i>
                                </Link>
                                <Link to="/ContactUs">
                                    <i className="fab fa-linkedin-in icons"></i>
                                </Link>
                              </div>
                        </div>
                                </div>
                            </td>
                            <td className="contact-form1">
                               
                        <form className="form">
                        <h2 className="contactheading">ContactUs</h2>
                            
                            <div className="inputcontainer">
                                <h4 className="heading">username</h4>
                                <input
                                    type="text"
                                    name="name"
                                    className="input"
                                />
                                
                            </div>
                            <div className="inputcontainer">
                                <h4 className="heading">Email</h4>
                                <input
                                    type="email"
                                    name="email"
                                    className="input"
                                />
                            </div>
                            <div className="inputcontainer">
                                <h4 className="heading">phonenumber</h4>
                                <input
                                    type="tel"
                                    name="phone"
                                    className="input"
                                />
                            </div>
                            <div className="inputcontainer">
                                <h4 className="heading">Message</h4>
                                <textarea
                                    name="message"
                                    className="input-message"
                                ></textarea>
                            </div>
                            <Button
                                className="button1"
                            >
                                {" "}
                                Send
                            </Button>
                        </form>
                            </td>
                        </tr>
                        </tbody>
                    </table>
           </div>
           </section>
       </>
    );
};

export default ContactUs;
