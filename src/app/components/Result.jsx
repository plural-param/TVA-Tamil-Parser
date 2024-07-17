import Box from "@mui/material/Box";
import PosAnnotation from "@/app/components/Results/PosAnnotation";
import Morph from "@/app/components/Results/Morph";
import Divider from "@mui/material/Divider";
import UD from "@/app/components/Results/UD";
import TreeView from "@/app/components/Results/TreeView";
import FeedBack from "@/app/components/FeedBack";

export default function Result({data, selectedValues}) {
    return (
        <Box>
            {data && <>
                <FeedBack data={data}/>
            </>}
            {(data && data.feature && selectedValues.includes('sas')) && <>
                <UD ud_graph={data.feature}/>
                <Divider sx={{mt: 2}}/>
            </>}
            {(data && data.pos && selectedValues.includes('pos')) &&
                <>
                    <PosAnnotation posData={data.pos}/>
                    <Divider sx={{mt: 2}}/>
                </>
            }
            {(data && data.morph && selectedValues.includes('mas')) &&
                <>
                    <Morph morphData={data.morph}/>
                    <Divider sx={{mt: 2}}/>
                </>
            }
            {(data && data.treeView && selectedValues.includes('tv')) &&
                <>
                    <TreeView treeViewData={data.treeView}/>
                    <Divider sx={{mt: 2}}/>
                </>
            }
        </Box>
    );
}
