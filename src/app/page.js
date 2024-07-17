import Box from "@mui/material/Box";
import Dashboard from "@/app/components/Dashboard";

export default function Home() {
    return (
        <Box sx={{
            mt: "5.5rem", overflowX: "hidden",
            overflowY: "scroll",
            '&::-webkit-scrollbar': {
                display: "none",
            },
            height: "75vh"
        }}>
            <Dashboard/>
        </Box>
    )
}
