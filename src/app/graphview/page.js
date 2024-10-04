'use client';

import Box from "@mui/material/Box";
import TextAreaUpload from "@/app/components/GraphView/TextAreaUpload";
import GraphResult from "@/app/components/GraphView/GraphResult";
import {useState} from "react";

export default function GraphView() {
    const [graphData, setGraphData] = useState(null);

    return (
        <Box sx={{mt: "6.5rem"}}>
            <TextAreaUpload setGraphData={setGraphData}/>
            {graphData !== null &&
                <GraphResult data={graphData}/>
            }
        </Box>
    )
}
