import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {Modal} from "@mui/base";
import {useState} from "react";
import {Stack, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import {sendEmail} from "@/app/actions/actions";
import toast from "react-hot-toast";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    p: 4,
};

export default function FeedBack({data}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    async function handleSubmit(formData) {
        let treebank = "";
        data.treeView.forEach(function (str) {
            let words = str.split("\t");
            words = words.map((word) => {
                return "<td style=\"border: 1px solid #dddddd; text-align: left; padding: 8px;\">" + word + "</td>";
            })

            const tr = words.join("\n");
            const row = "<tr>" + tr + "</tr>";
            treebank += row;
        });
        formData.append("sentence", data.text)
        formData.append("treebank", treebank)
        const result = await sendEmail(formData);
        result === "mail_sent" ? toast.success("Feedback sent.") : toast.error("Failed to sent, please try again later.")
    }

    return (
        <Box>
            <Typography variant="subtitle1" gutterBottom sx={{mt: 2, mb: 2}}>
                Please send a feedback <Button size="small" onClick={handleOpen}>Feedback</Button>
            </Typography>


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} boxShadow={24}>
                    <Stack spacing={3} component="form" action={handleSubmit}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Feedback
                            </Typography>
                            <IconButton aria-label="delete" size="small" color="error" onClick={handleClose}>
                                <CloseIcon fontSize="inherit"/>
                            </IconButton>
                        </Stack>


                        <TextField
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            variant="outlined"
                            size="small"
                        />
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            variant="outlined"
                            size="small"
                        />
                        <TextField variant={'outlined'} name={'feedback_text'}
                                   placeholder={"Write a feedback here..."}
                                   fullWidth minRows={3} maxRows={5} multiline
                                   inputProps={{
                                       maxLength: 1000,
                                   }}
                                   required
                        />
                        <Button size="small" type="submit" variant="contained" color="primary">Send</Button>
                    </Stack>
                </Box>
            </Modal>

        </Box>
    )
}
