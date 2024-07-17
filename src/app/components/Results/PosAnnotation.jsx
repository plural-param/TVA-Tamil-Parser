import {Chip, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import Badge from '@mui/material/Badge';
import Box from "@mui/material/Box";

export default function PosAnnotation({posData}) {
    return (
        <Box sx={{width: '100%', p: 1}}>
            <Typography variant="h4" gutterBottom fontWeight="bold" sx={{mt: 2, mb: 4, textAlign: 'center'}}>Parts of
                Speech</Typography>

            {posData && <>
                <Grid container spacing={4} direction="row" justifyContent="flex-start" alignItems="baseline">
                    {posData.map((data, index) =>
                        <Grid item xs={'auto'} key={`${data.token_text} - ${data.upos} - ${index}`}>
                            <Badge badgeContent={data.upos} color="primary">
                                <Chip label={data.token_text}/>
                            </Badge>
                        </Grid>
                    )}
                </Grid>
            </>}
        </Box>
    );
}
