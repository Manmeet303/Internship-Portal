import Grid from "../components/Grid";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { companyList } from "../actions/userAction";
import { Redirect } from "react-router";
import { CompanyCard } from "./Company/CompanyCard.js";
const Company = () => {
    const dispatch = useDispatch();
    const { company } = useSelector((state) => state.company);
    const { user } = useSelector((state) => state.auth);
    // console.log("Company:", company);
    // console.log("Interships:", internships);
    // console.log("User:",user)
    useEffect(() => {
        if (company === undefined) dispatch(companyList());
    }, [dispatch, company, companyList]);

    //getting user info
    //const { user } = useSelector((state) => state.auth);
    //validating user
    return (
        <Grid heading="Company">
            {/* Show list of companies here and not the internships provided by the compaines */}
            {company !== undefined &&
                company.map((c) => {
                    return <CompanyCard key={c._id} companyData={c} />;
                })}{" "}
        </Grid>
    );
};

export default Company;
