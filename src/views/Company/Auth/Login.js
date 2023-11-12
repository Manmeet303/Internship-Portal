import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// Actions
import { loginCompany } from "../../../actions/companyAction";
import { clearErrors } from "../../../actions/userAction";
// user defined compoments
import Loader from "../../../components/Loader";
// Importing hard coded strings.
import { Name } from "../../../config/Strings";
import { toastStyle } from "../../../config/toastify";

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {
    if (isAuthenticated) {
      history.push("/Company/Dashboard");
    }
    if (error) {
      toast.error(error, toastStyle);
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, history, error]);

//   handlers
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(loginCompany(email, password));
  };

  if (loading) return <Loader />;
  else
    return (
      <form className="LoginPage" onSubmit={submitHandler}>
        <div className="Card" style={{ width: 400 }}>
          <div className="Header">
            <i className="fab fa-user" style={{ fontSize: "40px" }}></i>
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
          <Link to="/Login">
            login as User? <u>User Login</u>
          </Link>
        </div>
      </form>
    );
};

export default Login;
