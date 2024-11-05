import {Autocomplete, Stack, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {useState} from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import toast from "react-hot-toast";
import {getResult} from "@/app/actions/actions";
import Button from "@mui/material/Button";

const options = [
    {label: 'சொற் கூறுகள் (Parts of Speech)', value: 'pos'},
    {label: 'உருபன் பகுப்பாய்வு (Morph Analysis)', value: 'mas'},
    {label: 'தொடர் பகுப்பாய்வு (Syntactic Analysis)', value: 'sas'},
    {label: 'Tree Bank View', value: 'tv'}
]

export default function TextArea({setAllData, setData, setSelectedValues}) {
    const [text, setText] = useState('');
    const [textLength, setTextLength] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    async function handleSelectChange(event, value) {
        const result = [];
        value.map(data => {
            result.push(data.value);
        })
        setSelectedValues(result);
    }

    function handleClear() {
        setSelectedValues([]);
        setText('');
        setAllData(null);
    }

    function handleTextChange(e) {
        const inputText = e.target.value;
        setText(inputText);
        const textLength = inputText.length;
        setTextLength(textLength);
    }

    async function handleAnnotate(e) {
        e.preventDefault();
        if (text.trim() === '') {
            setIsLoading(false);
            toast.error('Please enter a valid tamil sentence');
            return
        }
        setAllData(null)
        setData(null)
        setIsLoading(true)
        const formData = new FormData();
        formData.append('text', text);
        try {
            const resp = await getResult(formData);
            setAllData(resp);
            setData(resp[0])
        } catch (e) {
            toast.error('Error in parsing the text');
        }
        setIsLoading(false);
    }

    return (
        <Box component={'form'} onSubmit={handleAnnotate} sx={{mt: 2}}>
            <TextField variant={'outlined'}
                       onChange={handleTextChange}
                       value={text} name={'text'}
                       fullWidth minRows={1} maxRows={5} multiline
                       inputProps={{
                           maxLength: 1000,
                       }}
                       placeholder={`தமிழ்த் தொடரை இங்கு பதிவிடவும் (Please enter tamil sentence here)`}
                       required
                       helperText={`${textLength}/1000`}
            />
            <Stack spacing={2} direction="row" sx={{mt: 2}}>
                <Autocomplete
                    multiple
                    filterSelectedOptions
                    sx={{width: "82.5%"}}
                    disablePortal
                    size="small"
                    id="options"
                    name="options"
                    onChange={handleSelectChange}
                    defaultValue={[options[2]]}
                    options={options}
                    renderInput={(params) => <TextField {...params} label="Options"/>}
                />
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleClear}
                >
                    Clear
                </Button>
                <LoadingButton
                    loading={isLoading}
                    type="submit"
                    variant="contained"
                >
                    பகுப்பாய்க (parse)
                </LoadingButton>
            </Stack>
        </Box>
    );
}
