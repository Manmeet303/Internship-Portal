import { useState } from "react";
import { Box, TextField, Button, Modal } from "@mui/material";
import { style } from "./Style";
const AddExperience = ({ addExperience }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [role, setRole] = useState("");
    const [company, setCompany] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [description, setDescription] = useState("");

    const experience = { role, company, fromDate, toDate, description };

    const submitHandler = () => {
        handleClose();
        addExperience(experience);
    };

    return (
        <div>
            <Button onClick={handleOpen}>
                <i
                    class="fa fa-plus add-item white-plus"
                    style={{ fontSize: 30 }}
                ></i>
            </Button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style} className="AddExperience">
                    <center>
                        <h2>Add Experience</h2>
                    </center>
                    <form method="POST" action="#">
                        <TextField
                            id="outlined-name"
                            label="Role"
                            type="text"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            margin="dense"
                            fullWidth
                            size="small"
                            required
                        />
                        <TextField
                            id="outlined-name"
                            label="Company"
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            margin="dense"
                            fullWidth
                            size="small"
                            required
                        />
                        <TextField
                            id="outlined-name"
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            margin="dense"
                            fullWidth
                            size="small"
                            required
                        />
                        <TextField
                            id="outlined-name"
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            margin="dense"
                            fullWidth
                            size="small"
                            required
                        />
                        <TextField
                            id="outlined-name"
                            label="Description"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            margin="dense"
                            fullWidth
                            multiline={true}
                            rows={5}
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
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default AddExperience;
