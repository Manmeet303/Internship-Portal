import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/companyInfo.css";
const CompanyInfo = () => {
  //get id of click company
  const id = useParams();
  // get data by id
  const [companyData, setCompanyData] = useState({});

  const getCompany = async (data) => {
    try {
      console.log("getcompany: ", data); //{companyId:"61a4a6bcdb02ab5767879a72"}
      const res = await axios.get(
        `http://localhost:8501/Company/Company?companyId=${data.companyId}`,
        data,
        {
          withCredentials: true,
        }
      );
      console.log("Company data", res.data.data);
      setCompanyData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => getCompany({ companyId: id.id }), [id]);

  return (
    <div className="company-info-div">
      <div classsName="info-div">
        <div className="heading">
          <h1>{companyData?.name}</h1>
        </div>
        <hr />
        <div className="details">
          <div className="about">
            <h4>Description </h4>
            <span>{companyData?.about}</span>
          </div>
          <div className="contact">
            <h4>Contact </h4>
            <span>{companyData?.email}</span>
          </div>
          {companyData?.projects && companyData?.projects?.length !== 0 ? (
            <div className="projects">
              <h4>Projects </h4>
              <div className="project-info">
                {companyData?.projects.map((project) => (
                  <div className="tag">
                    <span>{project?.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ):(
            <h4>Company Soon Update Their Projects...</h4>
          ) }
          {companyData?.achievements && companyData?.achievements?.length !== 0 ? (
            <div className="achievements">
              <h4>Achievements </h4>
              <div className="achievement-info">
                {companyData?.achievements.map((achievement) => (
                  <div className="tag">
                    <span>{achievement?.accomplishment}</span>
                  </div>
                ))}
              </div>
            </div>
          ):(
            <h4>Company Soon Update Their Projects...</h4>
          ) }
        </div>
      </div>
    </div>
  );
};
export default CompanyInfo;
