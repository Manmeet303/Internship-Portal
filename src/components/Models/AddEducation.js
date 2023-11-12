import { useState } from "react";
import { Box, TextField, Button, Modal } from "@mui/material";
import { style } from "./Style";
const AddEducation = ({ addEducations }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [domain, setDomain] = useState("");
    const [institute, setInstitute] = useState("");
    const [fromYear, setFromYear] = useState("");
    const [toYear, setToYear] = useState("");
    const [description, setDescription] = useState("");

    const education = { domain, institute, fromYear, toYear, description };

    const submitHandler = () => {
        handleClose();
        addEducations(education);
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
                <Box sx={style} className="AddEducation">
                    <center>
                        <h2>Add Education</h2>
                    </center>
                    <form method="POST" action="#">
                        <TextField
                            id="outlined-name"
                            label="Domain"
                            type="text"
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                            margin="dense"
                            fullWidth
                            size="small"
                            required
                        />
                        <br />
                        <TextField
                            id="outlined-name"
                            label="Institute"
                            type="text"
                            value={institute}
                            onChange={(e) => setInstitute(e.target.value)}
                            margin="dense"
                            fullWidth
                            size="small"
                            required
                        />
                        <br />

                        <TextField
                            id="outlined-name"
                            label="Start Year"
                            type="number"
                            value={fromYear}
                            onChange={(e) => setFromYear(e.target.value)}
                            margin="dense"
                            fullWidth
                            size="small"
                            required
                        />
                        <TextField
                            id="outlined-name"
                            label="End Year"
                            type="number"
                            value={toYear}
                            onChange={(e) => setToYear(e.target.value)}
                            margin="dense"
                            fullWidth
                            size="small"
                            required
                        />
                        <br />
                        <TextField
                            id="outlined-name"
                            label="Description"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            multiline={true}
                            rows={5}
                            margin="dense"
                            fullWidth
                            size="normal"
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

export default AddEducation;
