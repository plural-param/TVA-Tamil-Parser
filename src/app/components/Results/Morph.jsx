import Box from "@mui/material/Box";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Typography from "@mui/material/Typography";

export default function Morph({morphData}) {
    return (
        <Box sx={{width: '100%', p: 1}}>
            <Typography variant="h4" gutterBottom fontWeight="bold" sx={{mt: 2, mb: 2, textAlign: 'center'}}>Morph
                Analysis</Typography>

            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Word</TableCell>
                            <TableCell>POS</TableCell>
                            <TableCell>Lemma</TableCell>
                            <TableCell>Morph</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {morphData.map((data) => (
                            <>
                                <TableRow key={data.token_text}>
                                    <TableCell component="th" scope="row">
                                        {data.token_text}
                                    </TableCell>
                                    <TableCell>
                                        {data.upos}
                                    </TableCell>
                                    <TableCell>
                                        {data.lemma}
                                    </TableCell>
                                    <TableCell>
                                        {data.feats}
                                    </TableCell>
                                </TableRow>
                            </>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>

    );
}
