 
import { useState } from  'react'
// import { Redirect } from 'react-router'
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Category from "../components/Cards/Category";
import Experience from "../components/Cards/Experience";
import Featuredjob from './Featuredjob';
import Loader from "../components/Loader";
import Typical from "react-typical";
import ContactUs from "./ContactUs";
import "../css/Home.css";
import CountUp from 'react-countup';
import { getInternship } from "../actions/internshipAction";
import { getJob } from "../actions/jobAction";
import { getPlacement } from "../actions/placementAction";
// icons as an images for category cards

import icon1 from "../views/Images/icon1.png"
import icon2 from "../views/Images/icon2.png"
import icon3 from "../views/Images/icon3.png"
import icon4 from "../views/Images/icon4.png"
import icon5 from "../views/Images/icon5.png"
import icon6 from "../views/Images/icon6.png"

const Home = ({ history }) => {
    const dispatch = useDispatch();
    const { loading, isAuthenticated, user } = useSelector(
        (state) => state.auth
    );
    
    const [positionType, setPositionType] = useState("Internships");
    const [locations, setLocation] = useState("");
    const [time, setTime] = useState("Part-Time");

    const submitHandler = (e) => {
        e.preventDefault();
        const data = { locations, time };
        console.log(positionType, locations, time)
        switch(positionType){
            case "Internships":
                dispatch(getInternship(data));
                history.push(`/User/FilteredInternships`);
                break;
            case "Jobs":
                dispatch(getJob(data));
                history.push(`/User/FilteredJobs`);
                break;
            case "Placement":
                dispatch(getPlacement(data));
                history.push(`/User/FilteredPlacements`);
                break;
            default:
                break;
        }
    }

    if (loading) return <Loader />;
    else
        return (
            <>
                <div className="Home">
                    {isAuthenticated ? (
                        <h1 className="welcome">Hello {user.fname}</h1>
                    ) : (
                        <h1 className="welcome">Welcome Guest</h1>
                    )}

                   

                    
                    <div className="image">
                            <h1 className="web-heading">ROAD TO CAREER OPPORTUNITY</h1> 
                            <div className="flex-image">
                            <div>
                            <p className="paragraph"> Want To Be a -</p>

                            <Typical
                                className="auto-text"
                                loop={Infinity}
                                steps={[

                                    '"Web Developer" ',
                                    2000,
                                    '"Full-Stack Developer" ',
                                    2000,
                                    '"MERN Stack Developer" ',
                                    2000,
                                    '"React/React Native Developer" ',
                                    2000,
                                ]}
                            />
                            
                            <form action="" className="search-form" onSubmit={submitHandler}>
                               
                                <select className="keyword" id="keyword" onChange={(e) => setPositionType(e.target.value)}>
                                    <option value="Internships">Internships</option>
                                    <option value="Jobs"> Jobs</option>
                                    <option value="Placement">Placement</option>
                                </select>
                                <select className="Location" id="Location" onChange={(e) => setLocation(e.target.value)}>
                                    <option value="">AnyWhere</option>
                                    <option value="Ahmedabad">Ahmedabad</option>
                                    <option value="Mumbai">Mumbai</option>
                                    <option value="Nasik">Nasik</option>
                                    <option value="Pune">Pune</option>
                                    <option value="Punjab">Punjab</option>
                                    <option value="Surat">Surat</option>
                                    <option value="Nadiad">Nadiad</option>
                                </select>

                                <select className="time" id="time" onChange={(e) => setTime(e.target.value)}>
                                    <option value="Part-Time" selected>Part-Time</option>
                                    <option value="Full-Time">Full-Time</option>
                                    <option value="FreeLancer">
                                        FreeLancer
                                    </option>
                                </select>
                               
                                <input
                                       className="search-button"
                                       type="submit"
                                       value="Search Job"
                                   />
                               </form>


                               </div>  
                               <div className="img-container"></div>  


                                    </div>
                                    <form action="" className="search-form2" onSubmit={submitHandler}>
                               
                               <select className="keyword" id="keyword" onChange={(e) => setPositionType(e.target.value)}>
                                       <option value="Internships">Internships</option>
                                       <option value="Jobs">Jobs</option>
                                       <option value="Placement">Placement</option>
                                   </select>
                                   <select className="Location" id="Location" onChange={(e) => setLocation(e.target.value)}>
                                       <option value="">AnyWhere</option>
                                       <option value="Ahmedabad">Ahmedabad</option>
                                       <option value="Mumbai">Mumbai</option>
                                       <option value="Nasik">Nasik</option>
                                       <option value="Pune">Pune</option>
                                       <option value="Punjab">Punjab</option>
                                       <option value="Surat">Surat</option>
                                       <option value="Nadiad">Nadiad</option>
                                   </select>
   
                                   <select className="time" id="time" onChange={(e) => setTime(e.target.value)}>
                                       <option value="Part-Time">Part-Time</option>
                                       <option value="Full-Time">Full-Time</option>
                                       <option value="FreeLancer">
                                           FreeLancer
                                       </option>
                                   </select>
                                  
                                   <input
                                       className="search-button"
                                       type="submit"
                                       value="Search Job"
                                   />
                                  </form>
                                    </div>

                   
                    <div id="background-img-slide">
                        <section className="career-statics">

                        <h1 className="heading1">Career Statics</h1>
                            <div className="flex-statistics">
                            
                            <div className="candidates"> 
                            <CountUp start={0} end={20000} delay={0}>
                            {({ countUpRef }) => (
                                <div>
                                <span ref={countUpRef} />
                                </div>
                            )}
                            </CountUp>
                            <h1 className="detail1">Candidates</h1>

                        </div>                   

                        <div className="candidates"> 
                            <CountUp start={0} end={60000} delay={0}>
                            {({ countUpRef }) => (
                                <div>
                                <span ref={countUpRef} />
                                </div>
                            )}
                            </CountUp>
                            <h1 className="detail2">Internships</h1>

                        </div>                   

                        <div className="candidates"> 
                            <CountUp start={0} end={90000} delay={0}>
                            {({ countUpRef }) => (
                                <div>
                                <span ref={countUpRef} />
                                </div>
                            )}
                            </CountUp>
                            <h1 className="detail3">Jobs Posted</h1>

                        </div>  

                         <div className="candidates"> 
                            <CountUp start={0} end={900} delay={0}>
                            {({ countUpRef }) => (
                                <div>
                                <span ref={countUpRef} />
                                </div>
                            )}
                            </CountUp>
                            <h1 className="detail4">Companies</h1>
                        </div>      

                             </div>

                   
                        </section>
                    </div>

                    <section className="categories">
                        <h1 className="category-label"> Browse Top Categories</h1>

                        <div className="browse-category1">
                            <Link to="/#" className="category1">
                                <Category icon={icon1} name="(UI/UX Designer)" number="(99)"/>
                            </Link>
                            <Link className="category2">
                                <Category icon={icon2} name="(Web Development)" number="(20)"/>
                            </Link>
                            <Link className="category3">
                                <Category icon={icon3} name="(.NET Developer)" number="(50)" />
                            </Link>
                            <Link className="category4">
                                <Category icon={icon5} name="(Android Developer)" number="(40)"/>
                            </Link>

                            {/* Extra scrolling categories*/}
                            <Link className="category4">
                                <Category icon={icon4} name="(Data Analytics)" number="(9)"/>
                            </Link>
                            <Link className="category4">
                                <Category icon={icon6} name="(Database Administrator)" number="(25)"/>
                            </Link>
                            <Link className="category4">
                                <Category icon={icon1} name="(FULL-STACK Developer)" number="(15)"/>
                            </Link>
                            <Link className="category4">
                                <Category icon={icon2} name="(Cloud Engineer)" number="(5)"/>
                            </Link>
                        </div>
                        <br />
                        <div className="browse-category2">
                            <Link className="category1">
                                <Category icon={icon6} name="(Game Developer)" number="(10)"/>
                            </Link>
                            <Link className="category2">
                                <Category icon={icon5} name="(Software Developer)" number="(50)"/>
                            </Link>
                            <Link className="category3">
                                <Category icon={icon4} name="(Network Manager)" number="(25)"/>
                            </Link>
                            <Link className="category4">
                                <Category icon={icon3} name="(PHP Developer)" number="(45)" />
                            </Link>
                            
                            {/* Extra categories */}
                            <Link to="/#" className="category1">
                                <Category icon={icon1} name="(UI/UX Designer)" number="(99)"/>
                            </Link>
                            <Link className="category2">
                                <Category icon={icon2} name="(Web Development)" number="(20)"/>
                            </Link>
                            <Link className="category3">
                                <Category icon={icon3} name="(.NET Developer)" number="(50)" />
                            </Link>
                            <Link className="category4">
                                <Category icon={icon5} name="(Android Developer)" number="(40)"/>
                            </Link>
                        </div>
                    </section>

                     {/* Featured Job List Section  */}
                     <Featuredjob />



                    <section className="Apply-process">
                        <p className="apply-para"> Apply Process </p>
                        <h1 className="apply-label"> How it Works</h1>

                        <div className="Apply-process-category">
                            <Link className="category1">
                                <Category icon={icon1} name="1. Search For Jobs"/>
                            </Link>
                            <Link className="category2">
                                <Category icon={icon2} name="2. Apply For Jobs"/>
                            </Link>
                            <Link className="category3">
                                <Category icon={icon3} name="3. Get Jobs"/>
                            </Link>
                        </div>
                    </section>

                    <section className="candidate-works">
                        <h1 className="our-candidate-heading"> Our Candidates Work in Company</h1>
                        <p className="candidate-para">
                            {" "}
                            Many candidates get there Dream Jobs in Following
                            Company
                        </p>
                        <div className="logo-images">
                            <div className="logo1"></div>
                            <div className="logo2"></div>
                            <div className="logo3"></div>
                            <div className="logo4"></div>
                        </div>
                    </section>
                    {/* <div id="experience-img-slide"></div> */}

                    {/* <section className="experience">
                        <h1 className="label1"> What Our Clients Say?</h1>
                        <div className="underlines">
                        <div className="underline1"></div>
                        <div className="underline2"></div>
                        </div>
                        <div className="user1">
                            <div className="user-image1"> </div>
                            <p className="italic-text">
                                {" "}
                               
                                    "
                                    <b>
                                        {" "}
                                        Thanks for a Golden opportunity and I
                                        achieved my Dream Job. Its a very easy
                                        process using this amazing website.{" "}
                                        
                                         
                                        <br />
                                        Thanks for a Golden opportunity and I
                                        achieved my Dream Job. Its a very easy
                                        process using this amazing website. "
                                {" "}
                                </b>
                                    <br />
                                <div className="rating">
                                    <i className="fa fa-star clicked"></i>
                                    <i className="fa fa-star clicked"></i>
                                    <i className="fa fa-star clicked"></i>
                                    <i className="fa fa-star clicked"></i>
                                    <i className="fa fa-star "></i>
                                </div>
                            </p>
                        </div>
                    </section> */}

                    <section className="user-experience">
                    <h1 className='client-review'>Our Client Reviews</h1> 
                    <p className='client-review-para'> (What are clients have to say :- )</p>
                    <div className="flex-experience-card">
                          <div className='experience1'>
                            <Experience user="~ user1"/>
                          </div>
                             <div className='experience1'>
                            <Experience user="~ user2"/>
                          </div>
                          <div className='experience1'>
                            <Experience user="~ user3" />
                          </div>
                          <div className='experience1'>
                            <Experience user="~ user4"/>
                          </div>
                          <div className='experience1'>
                            <Experience user="~ user5"/>
                          </div>
                          <div className='experience1'>
                            <Experience user="~ user6"/>
                          </div>
                          <div className='experience1'>
                            <Experience user="~ user7"/>
                          </div>
                          <div className='experience1'>
                            <Experience user="~ user8"/>
                          </div>
                            </div>
                    </section>
                   
                    <section className="contactus-section">
                        <ContactUs />
                    </section>
               
           </div>
            </>
        );
};

export default Home;