import { useState } from "react";
import { Box, TextField, Button, Modal } from "@mui/material";
import { style } from "./Style";

const AddSkill = ({ addLanguage }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [language, setLanguage] = useState("");
    const submitHandler = () => {
        handleClose();
        addLanguage(language);
    };
    return (
        <div>
            <Button onClick={handleOpen}>
                <i
                    class="fa fa-plus add-item black"
                    style={{ fontSize: 30 }}
                ></i>
            </Button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style} className="AddLanguage">
                    <center>
                        <h2>Add Language</h2>
                    </center>
                    <form method="POST" action="#" onSubmit={submitHandler}>
                        <TextField
                            id="outlined-name"
                            label="Language"
                            type="text"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            margin="dense"
                            fullWidth
                            multiline={true}
                            // rows={5}
                            // placeholder="Enter Comma Seperated Values"
                            size="small"
                            required
                        />
                        <br />
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            type="button"
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
