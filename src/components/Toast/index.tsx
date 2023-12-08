import { Alert, Snackbar } from "@mui/material"
import { Horizontal, Status, Vertical } from "../../entities/types";

interface ToastProps {
    open: boolean,
    message: string,
    status: Status,
    onClose: () => void,
    vertical: Vertical,
    horizontal: Horizontal
}

const Toast = (props: ToastProps) => {
    const {open, message, status,  onClose, vertical, horizontal} = props;
    return (
        <Snackbar 
            open={open} 
            autoHideDuration={3000} 
            onClose={onClose} 
            anchorOrigin={{
                vertical: vertical,
                horizontal: horizontal
            }}>
            <Alert onClose={onClose} severity={status} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default Toast;