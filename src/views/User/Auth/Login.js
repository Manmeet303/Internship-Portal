import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login, clearErrors } from "../../../actions/userAction";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import { toastStyle } from "../../../config/toastify";
// Importing the Hard coded strings.
import { Name } from "../../../config/Strings";
const Login = ({ history }) => {
    const dispatch = useDispatch();
    const { isAuthenticated, loading, error } = useSelector(
        (state) => state.auth
    );
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (isAuthenticated) {
            history.push("/");
        }
        if (error) {
            toast.error(error, toastStyle);
            dispatch(clearErrors());
        }
    }, [dispatch, error, isAuthenticated, history]);

    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    if (loading) return <Loader />;
    else
        return (
            <form className="LoginPage" onSubmit={submitHandler}>
                <div className="Card" style={{ width: 400 }}>
                    <div className="Header">
                        <i
                            className="fab fa-user"
                            style={{ fontSize: "40px" }}
                        ></i>
                        <p>Welcome to {Name}</p>
                    </div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="contact-info"
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="contact-info"
                        required
                    />
                    <input type="submit" value="Login" />
                    <br />
                    <Link to="/Auth/Company/Login">
                        Login as Company? <u>Company Login</u>
                    </Link>
                    <br />
                    <Link to="/Register">
                        New Here? <u>Register Now</u>
                    </Link>

                    <br />
                    <Link to="/Register">
                        Forgot Password? <u>Reset Password</u>
                    </Link>
                </div>
            </form>
        );
};

export default Login;
