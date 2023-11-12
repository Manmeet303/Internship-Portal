import { useState } from "react";
import { Box, TextField, Button, Modal } from "@mui/material";
import { style } from "./Style";
const AddCertificates = ({ addCertificate }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [name, setName] = useState("");
    const [credential, setCredential] = useState("");
    const [issuedBy, setIssuedBy] = useState("");
    const [issueDate, setIssueDate] = useState("");
    const [description, setDescription] = useState("");

    const certificate = { name, credential, issuedBy, issueDate, description };

    const submitHandler = () => {
        handleClose();
        addCertificate(certificate);
        console.log("clicked");
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
                <Box sx={style} className="AddCertificates">
                    <center>
                        <h2>Add Certifications</h2>
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
                            label="Credential-ID"
                            type="text"
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                            margin="dense"
                            fullWidth
                            size="small"
                            required
                        />
                        <TextField
                            id="outlined-name"
                            label="Issued By"
                            type="text"
                            value={issuedBy}
                            onChange={(e) => setIssuedBy(e.target.value)}
                            margin="dense"
                            fullWidth
                            size="small"
                            required
                        />
                        <TextField
                            id="outlined-name"
                            type="Date"
                            value={issueDate}
                            onChange={(e) => setIssueDate(e.target.value)}
                            margin="dense"
                            fullWidth
                            size="small"
                            required
                        />
                        <br />
                        <TextField
                            id="outlined-name"
                            label="Add Description"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            margin="dense"
                            fullWidth
                            multiline={true}
                            rows={5}
                            placeholder="Add Description"
                            size="small"
                            required
                        />
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

export default AddCertificates;
