import { useState } from "react";
import { Box, TextField, Button, Modal } from "@mui/material";
import { style } from "../../../components/Models/Style";

const AddCompanyAccomplishments = ({ addAccomplishments }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [accomplishment, setAccomplishment] = useState("");
    const data = { accomplishment };
    const submitHandler = () => {
        handleClose();
        addAccomplishments(data);
    };

    return (
        <div>
            <Button onClick={handleOpen}>
                <i
                    className="fa fa-plus add-item white-plus"
                    style={{ fontSize: 30 }}
                ></i>
            </Button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style} className="AddAccomplishments">
                    <center>
                        <h2>Add Accomplishment</h2>
                    </center>
                    <div>
                        <TextField
                            id="outlined-name"
                            label="Accomplishment"
                            type="text"
                            value={accomplishment}
                            onChange={(e) => setAccomplishment(e.target.value)}
                            margin="dense"
                            fullWidth
                            size="small"
                            required
                        />
                        <br />
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ marginTop: 1 }}
                            onClick={submitHandler}
                        >
                            Add
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default AddCompanyAccomplishments;
