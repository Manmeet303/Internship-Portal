import React from 'react'
import CountUp from 'react-countup';
import '../css/Featuredjob.css'
import { Button } from '@material-ui/core';
import JobAdvertisement from '../../src/components/Cards/JobAdvertisement';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import img1 from '../../src/views/Images/amazon.png'
import img2 from '../../src/views/Images/wipro.png'
import img3 from '../../src/views/Images/tcs.jpg'
import img4 from '../../src/views/Images/microsoft.jpg'


function Featuredjob() {
  return (
    <section className="job-listed">
                        <p className="job-para"> RECENT JOB</p>
                        
                        <h1 className="job-label">  <CountUp start={0} end={60000} delay={0}>
                            {({ countUpRef }) => (
                                <div>
                                <span ref={countUpRef} />
                                </div>
                            )}
                            </CountUp> + <p>Featured Interships </p></h1>

                            <div className='adds'>
                                <JobAdvertisement logo={img1} time="Freelancer" name="FullStack developer" city="Anand" country="India" package="20 LPA - 30 LPA" />
                                <JobAdvertisement logo={img2} time="Full-Time" name="Product Designer" city="Mumbai" country="India" package="7.5 LPA - 10 LPA" />
                                <JobAdvertisement logo={img3} time="Part-time" name="Creative Director" city="Pune" country="India" package="8 LPA - 10 LPA" />
                                <JobAdvertisement logo={img4} time="Freelancer" name=".NET developer" city="Hyderabad" country="India" package="25 LPA - 30 LPA" />
                            </div>

                            <Button className='showmore'>Show More <KeyboardArrowDownIcon className="arrow" /> </Button>


                    </section>
  )
}

export default Featuredjob