import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

interface ConfirmProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    content: string;
}

const ConfirmPopup = (props: ConfirmProps) => {
    const { open, onClose, onConfirm, title, content } = props;
    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{content}</DialogContent>
            <DialogActions>
                <Button onClick={onConfirm} color="primary" variant="contained">
                    Confirm
                </Button>
                <Button onClick={onClose} color="primary" variant="outlined">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default ConfirmPopup;