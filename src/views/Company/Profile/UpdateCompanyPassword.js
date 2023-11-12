import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, TextField, CardContent, Button } from "@mui/material";
import Loader from "../../../components/Loader";
import { updateCompanyPassword } from "../../../actions/companyAction";
import { useHistory } from "react-router-dom";

const UpdateCompanyPassword = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isUpdated, loading } = useSelector((state) => state.user);

  const history = useHistory();
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [rnewPassword, setRnewPassword] = useState("");

  const data = { oldPassword, newPassword };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (newPassword !== rnewPassword) {
      alert("Passwords do not match");
    }
    dispatch(updateCompanyPassword(data));
  };
  useEffect(() => {
    if (isUpdated) {
      console.log("Password updated");
      history.push("/Company/Profile");
    }
    dispatch({ type: "UPDATE_PROFILE_RESET" });
  }, [dispatch, history, isUpdated]);

  if (loading) return <Loader />;
  else
    return (
      <div className="UpdatePassword" style={{ marginTop: 20 }}>
        <Card
          variant="outlined"
          sx={{
            maxWidth: 345,
            margin: "auto",
            paddingLeft: 3,
            paddingRight: 3,
            paddingBottom: 3,
          }}
        >
          <CardContent>
            <h1>Update Password</h1>
          </CardContent>
          <form method="POST" onSubmit={submitHandler}>
            <TextField
              id="outlined"
              label="Old Password"
              name="oldpassword"
              type="password"
              value={oldPassword}
              onChange={(e) => setoldPassword(e.target.value)}
              margin="dense"
              fullWidth
              size="small"
              required
            />
            <br />
            <TextField
              id="outlined"
              label="New Password"
              name="newpassword"
              type="password"
              value={newPassword}
              onChange={(e) => setnewPassword(e.target.value)}
              margin="dense"
              fullWidth
              size="small"
              required
            />
            <br />
            <TextField
              id="outlined-name"
              label="Re-type new password"
              name="rnewpassword"
              type="password"
              value={rnewPassword}
              onChange={(e) => setRnewPassword(e.target.value)}
              margin="dense"
              fullWidth
              size="small"
              required
            />
            <br />
            <Button
              variant="contained"
              color="error"
              type="submit"
              fullWidth
              sx={{ marginTop: 1 }}
            >
              Update Password
            </Button>
          </form>
        </Card>
      </div>
    );
};

export default UpdateCompanyPassword;
