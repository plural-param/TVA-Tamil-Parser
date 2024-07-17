'use client';

import {styled} from '@mui/system';
import {Grid, Stack, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import SubmitButton from "@/app/components/SubmitButton";
import Button from '@mui/material/Button';
import {UploadOutlined} from "@mui/icons-material";
import {ProcessConllu, processConlluText} from "@/app/actions/GraphActions";
import {useState} from "react";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function TextAreaUpload({setGraphData}) {
    const [text, setText] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    async function handleFileUpload(e) {
        setIsUploading(true);
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('conlluFile', file);
        await ProcessConllu(formData).then((response) => {
            setGraphData(response)
            setIsUploading(false)
        })
    }

    async function handleTextInput(formData) {
        const response = await processConlluText(formData);
        setGraphData(response)
    }

    return (
        <Box component={'form'} action={handleTextInput} sx={{mt: 8}}>
            <TextField variant={'outlined'}
                       onChange={event => setText(event.target.value)}
                       value={text} name={'text'}
                       fullWidth minRows={10} maxRows={10} multiline
                       placeholder={`தமிழ்த் தொடரை இங்கு பதிவிடவும் (Please enter tamil sentence here)...`}
                       required
            />
            <Stack spacing={2} direction="row" sx={{mt: 2}}>
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Button component="label" variant="contained" color={isUploading ? "inherit" : "primary"}
                            startIcon={<UploadOutlined/>}>
                        {isUploading ? "Uploading..." : "Upload file"}
                        <VisuallyHiddenInput
                            type="file"
                            onChange={handleFileUpload}
                            accept={".conllu"}/>
                    </Button>
                    <SubmitButton/>
                </Grid>
            </Stack>
        </Box>
    );
}
