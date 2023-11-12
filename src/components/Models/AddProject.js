import { useState } from "react";
import { Box, TextField, Button, Modal } from "@mui/material";
import { style } from "./Style";
const AddProject = ({ addProject }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const project = { name, description };

    const submitHandler = () => {
        handleClose();
        addProject(project);
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
                <Box sx={style} className="AddProject">
                    <center>
                        <h2>Add Project</h2>
                    </center>
                    <form method="POST" action="#">
                        <TextField
                            id="outlined-name"
                            label="Name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                            size="small"
                            multiline={true}
                            rows={5}
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

export default AddProject;
