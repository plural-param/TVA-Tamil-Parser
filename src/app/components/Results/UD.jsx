import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";

export default function UD({ud_graph}) {
    const [frameHeight, setFrameHeight] = useState('100px');

    useEffect(() => {
        const iframe = document.getElementById('GraphFrame');
        const resizeIframe = () => {
            const newHeight = (iframe.contentWindow.document.body.scrollHeight + 60) + 'px';
            setFrameHeight(newHeight);
        };

        iframe.onload = resizeIframe;
        window.addEventListener('resize', resizeIframe);

        return () => {
            window.removeEventListener('resize', resizeIframe);
        };
    }, []);


    return (
        <Box>
            <Typography variant="h4" gutterBottom fontWeight="bold" sx={{mt: 2, mb: 2, textAlign: 'center'}}>
                Syntactic Analysis
            </Typography>
            <iframe
                id="GraphFrame"
                scrolling="no"
                title="UD Graph"
                srcDoc={ud_graph.replace(/\n/g, '')}
                frameBorder="0"
                style={{width: '100%', height: frameHeight, border: 'none'}}
            />
        </Box>
    )
}
