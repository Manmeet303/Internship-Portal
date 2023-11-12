import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../actions/userAction";
import Loader from "../../../components/Loader";
const Register = ({ history }) => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setcPassword] = useState("");
    const [dob, setDOB] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
        const data = {
            fname,
            lname,
            email,
            mobile,
            password,
            dob,
            gender,
            address,
            city,
            state,
            country,
        };
        dispatch(register(data));
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
                    <input
                        type="text"
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                        placeholder="First Name*"
                        required
                    />
                    <br />
                    <input
                        type="text"
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                        placeholder="Last Name*"
                        required
                    />
                    <br />
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="" disabled>
                            Gender
                        </option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="O">Other</option>
                    </select>
                    <br />
                    <input
                        className="date"
                        type="date"
                        value={dob}
                        onChange={(e) => setDOB(e.target.value)}
                        required
                    />
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
                    <input
                        type="number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="Mobile*"
                        required
                    />
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
                    <input type="submit" value="Register" />
                </div>
            </form>
        );
};

export default Register;
