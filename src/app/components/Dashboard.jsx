'use client';

import TextArea from "@/app/components/TextArea";
import Result from "@/app/components/Result";
import {useState} from "react";
import {Autocomplete, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";

export default function Dashboard() {
    const [allData, setAllData] = useState(null);
    const [data, setData] = useState(null);
    const [selectedValues, setSelectedValues] = useState(['sas']);

    async function handleSelectChange(event, value) {
        setData(value)
    }

    return (
        <>
            <Typography variant="subtitle1" gutterBottom sx={{mt: 2}}>
                தொடரியல் பகுப்பாய்வி சொற்றொடர்களின் உள்ளமைப்பை ஆராயும் ஒரு தானியங்கி. இது சிக்கலான தொடர் அமைப்புகளை
                சிறிய சொற்கூறுகளாகப் பிரித்தாய்ந்து, அதன் உள்ளமைப்பு மற்றும் சொற்களுக்கு இடையேயான தொடர்பை
                வெளிப்படுத்துகிறது.
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                A parser is an automated tool that provides the internal structure of sentences. It decomposes complex
                structures into their constituent parts and represents relations between words.
            </Typography>

            <TextArea setAllData={setAllData} setData={setData} selectedValues={selectedValues}
                      setSelectedValues={setSelectedValues}/>
            {
                allData && <>
                    <Autocomplete
                        fullWidth
                        disablePortal
                        size="small"
                        value={data}
                        id="sentences"
                        name="sentences"
                        getOptionLabel={allData => allData.text}
                        options={allData}
                        onChange={handleSelectChange}
                        renderInput={(params) => <TextField {...params} label="Sentences"/>}
                        sx={{mt: 2}}
                    />
                    {data && <Result key={data} data={data} selectedValues={selectedValues}/>}
                </>
            }
        </>
    );
}
