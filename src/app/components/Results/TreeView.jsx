import Box from "@mui/material/Box";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Typography from "@mui/material/Typography";

export default function TreeView({treeViewData}) {
    return (
        <Box sx={{width: '100%', p: 1}}>
            <Typography variant="h4" gutterBottom fontWeight="bold" sx={{mt: 2, mb: 2, textAlign: 'center'}}>
                Tree Bank View
            </Typography>

            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>FORM</TableCell>
                            <TableCell>LEMMA</TableCell>
                            <TableCell>UPOSTAG</TableCell>
                            <TableCell>XPOSTAG</TableCell>
                            <TableCell>FEATS</TableCell>
                            <TableCell>HEAD</TableCell>
                            <TableCell>DEPREL</TableCell>
                            <TableCell>DEPS</TableCell>
                            <TableCell>MISC</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {treeViewData.map((data) => (
                            <TableRow key={data}>
                                {data.trim().split("\t").map((dataValue) => (
                                    <TableCell key={dataValue}>
                                        {dataValue}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>

    );
}
