import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerCompany } from "../../../actions/companyAction";
import TagInput from "../../../components/TagInput";
import Loader from "../../../components/Loader";
const Register = ({ history }) => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setcPassword] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [type, setType] = useState("");
    const [about, setAbout] = useState("");
    const [projects, setProjects] = useState([]);
    const [achievements, setAchievements] = useState([]);

    const submitHandler = async (e) => {
        e.preventDefault();
        const data = {
            name,
            email,
            password,
            address,
            city,
            state,
            country,
            about,
            type,
            projects,
            achievements,
        };
        dispatch(registerCompany(data));
        history.push("/");
    };

    if (loading) return <Loader />;
    else
        return (
            <form className="RegisterPage" onSubmit={submitHandler}>
                <div className="Card" style={{ width: 500 }}>
                    <div className="Header">
                        <p>About you</p>
                    </div>
                    <br />
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Company Name*"
                        required
                    />
                    <br />
                    <input
                        type="text"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        placeholder="About*"
                        required
                    />
                    <br />
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="" disabled>
                            Type
                        </option>
                        <option value="IT">IT</option>
                        <option value="FINTECH">Financial</option>
                        <option value="EDU">Educational</option>
                        <option value="PB">Product Based</option>
                        <option value="SB">Service Based</option>
                    </select>
                    <br />
                </div>
                <div className="Card" style={{ width: 500 }}>
                    <div className="Header">
                        <p>Address</p>
                    </div>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Street*"
                        required
                    />
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City*"
                        autoCapitalize
                        required
                    />
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="State*"
                        autoCapitalize
                        required
                    />
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="Country*"
                        autoCapitalize
                        required
                    />
                </div>
                <div className="Card" style={{ width: 500 }}>
                    <div className="Header">
                        <p>Contact</p>
                    </div>
                    <br />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email*"
                        required
                    />
                    <br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password*"
                        required
                    />
                    <input
                        type="password"
                        value={cpassword}
                        onChange={(e) => setcPassword(e.target.value)}
                        placeholder="Confirm Password*"
                        required
                    />
                </div>
                <div className="Card" style={{ width: 500 }}>
                    <div className="Header">
                        <p>Projects {"&"} Achievements</p>
                    </div>
                    <br />
                    <TagInput
                        tags={projects}
                        setState={setProjects}
                        placeholder="Projects"
                    />
                    <TagInput
                        tags={achievements}
                        setState={setAchievements}
                        placeholder="Achievements"
                    />
                    <input type="submit" value="Register" />
                </div>
            </form>
        );
};

export default Register;
