import Box from "@mui/material/Box";

export default function GraphResult({data}) {
    return (
        <Box>
            {data.map((res, index) =>
                <iframe
                    key={res}
                    width="100%"
                    height="800"
                    title="UD Graph"
                    srcDoc={res}
                    frameBorder="0"
                />
            )}
        </Box>
    );
}
