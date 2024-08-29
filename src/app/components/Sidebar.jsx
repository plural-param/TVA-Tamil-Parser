'use client';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {useState} from "react";
import {Chip, Collapse, Grid, Paper, Stack} from "@mui/material";
import {ExpandLess, ExpandMore, Dashboard, LibraryBooks, GraphicEq, Checklist} from "@mui/icons-material";

// Icons
import Image from "next/image";
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";

const drawerWidth = 233;
const drawerPaperWidth = 450;

export default function Sidebar({children}) {
    const router = useRouter();
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [drawerShowType, setDrawerShowType] = useState(null);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const [openSP, setOpenSP] = useState(true)
    const handleSPClick = () => {
        setOpenSP(!openSP);
    };

    const [openDrawer1, setOpenDrawer1] = useState(false)
    const handleDrawer1Click = (type) => {
        setOpenDrawer1(!openDrawer1)
        setDrawerShowType(drawerShowType ? null : type)
    }

    const drawer = (
        <Box sx={{mt: "3.5rem"}}>
            <Divider/>
            <List>
                <ListItemButton onClick={() => router.push('/tamilparser')} selected={pathname === '/'}>
                    <ListItemIcon>
                        <Dashboard/>
                    </ListItemIcon>
                    <ListItemText primary="Parser"/>
                </ListItemButton>
                {/*<ListItemButton onClick={() => router.push('tamilparser/graphview')} selected={pathname === '/graphview'}>*/}
                <ListItemButton button component="a" href="/tamilparser/graphview">
                    <ListItemIcon>
                        <GraphicEq/>
                    </ListItemIcon>
                    <ListItemText primary="GraphView"/>
                </ListItemButton>
                <ListItemButton onClick={handleSPClick}>
                    <ListItemIcon>
                        <LibraryBooks/>
                    </ListItemIcon>
                    <ListItemText primary="Guidelines"/>
                    {openSP ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>
                <Collapse in={openSP} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{pl: 0}} onClick={() => handleDrawer1Click("POS")}
                                        selected={drawerShowType === "POS"}>
                            <ListItemIcon sx={{pl: 2}}>
                                <SubdirectoryArrowRightIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Parts of Speech"/>
                        </ListItemButton>

                        <ListItemButton sx={{pl: 0}} onClick={() => handleDrawer1Click("MAS")}
                                        selected={drawerShowType === "MAS"}>
                            <ListItemIcon sx={{pl: 2}}>
                                <SubdirectoryArrowRightIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Morph Analysis"/>
                        </ListItemButton>

                        <ListItemButton sx={{pl: 0}} onClick={() => handleDrawer1Click("SAS")}
                                        selected={drawerShowType === "SAS"}>
                            <ListItemIcon sx={{pl: 2}}>
                                <SubdirectoryArrowRightIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Syntactic Analysis"/>
                        </ListItemButton>
                    </List>
                </Collapse>
            </List>
        </Box>
    );

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                style={{background: 'white', color: 'black'}}
                sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}
            >
                <Toolbar>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}
                           sx={{
                               width: '100%',
                               mt: 3, mb: 1
                           }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{mr: 2, display: {sm: 'none'}}}
                        >
                            <MenuIcon/>
                        </IconButton>

                        <Box/>

                        <Stack alignItems={"center"} justifyContent={"center"} direction="row" spacing={2}>
                            <Image src={'/tamilparser/static/kanithamizh.png'} alt={'Kani Thamizh'} width={150} height={150}/>
                            <Image src={'/tamilparser/static/kalaignar.png'} alt={'Kalaignar'} width={100} height={80}/>
                            <Stack alignItems={"center"} justifyContent={"center"}>
                                <>
                                    <Typography variant="h4" noWrap component="div"
                                                sx={{fontWeight: 'bolder'}} gutterBottom>
                                        கலைஞர் பகுப்பி
                                    </Typography>
                                    <Typography variant="h6" noWrap component="div" sx={{fontWeight: 'bolder'}}
                                                gutterBottom>
                                        தமிழ்த் தொடரியல் பகுப்பாய்வி
                                    </Typography>
                                    <Typography variant="body2" noWrap component="div"
                                                sx={{fontWeight: "bold"}}>
                                        Tamil Syntactic Parser <Chip label="Beta Version"/>
                                    </Typography>
                                    <Typography variant="subtitle2" noWrap component="div">
                                        (It runs by Artificial Intelligence)
                                    </Typography>
                                </>
                            </Stack>

                        </Stack>
                        <Image src={'/tamilparser/static/LOGO.png'} alt={'LOGO'} width={150} height={100}/>
                    </Stack>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}, display: {xs: 'none', sm: 'block'}}}
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: {xs: 'block', sm: 'none'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: {xs: 'none', sm: 'block'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth, mt: `calc(130px)`}
                    }}
                    open
                >
                    {drawer}
                </Drawer>
                <Collapse
                    orientation="horizontal" in={openDrawer1}
                    sx={{mt: `calc(185px)`, ml: `${drawerWidth}px`, flexShrink: 0}}>
                    <Paper sx={{width: drawerPaperWidth}}>
                        <iframe src={`/TamilParserAssetStaticPrefix/guidelines/${
                            drawerShowType === "POS" ? "pos_guidelines.pdf" :
                                drawerShowType === "MAS" ? "morph_guidelines.pdf" :
                                    drawerShowType === "SAS" && "treebank_guidelines.pdf"
                        }#toolbar=0&navpanes=0&scrollbar=0`} width={"100%"}
                                height={"750px"}/>
                    </Paper>
                </Collapse>
            </Box>

            <Box
                component="main"
                sx={{
                    flexGrow: 1, p: 3,
                    width: {sm: `calc(100% - ${drawerWidth}px)`},
                    ml: {sm: `${openDrawer1 ? drawerPaperWidth : 0}px`},
                    transition: 'margin-left 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms'
                }}
            >
                <Toolbar/>
                {children}
                <Paper sx={{
                    position: 'fixed', bottom: 0, left: 0, right: 0,
                    width: {sm: `calc(100% - ${drawerWidth}px)`},
                    ml: {sm: `${drawerWidth}px`}, zIndex: 1100
                }} elevation={3}>
                    <Grid container direction="row" justifyContent="space-around" alignItems="center">
                        <Typography fontSize={'14px'}>Funded By <Link href={'https://www.tamilvu.org/'}
                                                                      target={'_blank'}>Tamil Virtual
                            Academy(TVA)</Link></Typography>
                        <Typography fontSize={'14px'}>Principle Investigator <Link
                            href={'https://parameshkrishnaa.github.io/'}
                            target={'_blank'}>Parameswari Krishnamurthy</Link></Typography>
                        <Typography fontSize={'14px'}>Under the Project <b>A Syntactic Parser for Tamil(2023 - 2024)</b></Typography>
                    </Grid>
                </Paper>
            </Box>
        </Box>
    );
}