import { useState } from "react";
import { Box, TextField, Button, Modal } from "@mui/material";
import { style } from "./Style";
const AddSkill = ({ addSkills }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [skill, setSkill] = useState("");
    const submitHandler = () => {
        handleClose();
        addSkills(skill);
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
                <Box sx={style} className="AddSkill">
                    <center>
                        <h2>Add Skills</h2>
                    </center>
                    <form method="POST" action="#">
                        <TextField
                            id="outlined-name"
                            label="Add your skill"
                            type="text"
                            value={skill}
                            onChange={(e) => setSkill(e.target.value)}
                            margin="dense"
                            fullWidth
                            multiline={true}
                            // rows={5}
                            placeholder="Add your skill"
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

export default AddSkill;
