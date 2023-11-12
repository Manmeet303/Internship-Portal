import "./companyCard.css";
import { useHistory } from "react-router-dom";
export const CompanyCard = ({ companyData }) => {
  const history = useHistory();
  const clickhandler = () => {
    history.push(`/Company/Info/${companyData._id}`);
  };
  // console.log(companyData);
  return (
    <>
      <div className="company-card">
        <div className="title">
          <h3>{companyData.name}</h3>
          <span className="tag">{companyData.type}</span>
        </div>
        <hr />
        <div className="details">
          {companyData.address && (
            <div className="address">
              <h5>Address:</h5>
              <span>{`${companyData.address}, ${companyData.city}, ${companyData.state}, ${companyData.country}`}</span>
            </div>
          )}
          {companyData.about && (
            <div className="about">
              <p>{`${companyData.about}`}</p>
            </div>
          )}
        </div>
        <div className="view-btn">
          <button onClick={clickhandler}>View</button>
        </div>
      </div>
    </>
  );
};
