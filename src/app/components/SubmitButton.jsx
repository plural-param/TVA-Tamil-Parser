import {useFormStatus} from "react-dom";
import LoadingButton from '@mui/lab/LoadingButton';

export default function SubmitButton() {
    const {pending} = useFormStatus();
    return (
        <LoadingButton
            loading={pending}
            type="submit"
            variant="contained"
        >
            Parse
        </LoadingButton>
    )
}