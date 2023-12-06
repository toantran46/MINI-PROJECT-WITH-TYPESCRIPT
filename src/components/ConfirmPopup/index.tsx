import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

interface Props {
    isOpen: boolean,
    onClose: () => void,
    confirmStatus: () => void,
    username: string
}

const ConfirmPopup = (props: Props) => {
    
    const [open, setOpen] = useState(false);
    useEffect(() => {
        setOpen(props.isOpen)
    }, [props.isOpen])


    const handleClose = () => {
        setOpen(false);
        props.onClose();
    };

    const handleYes = () => {
        props.confirmStatus();
    }
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                   <Typography variant="h6" alignItems={"center"}><WarningAmberRoundedIcon/>Warning</Typography> 
                </DialogTitle>
                <DialogContent>
                    <DialogContentText p={3} display={'flex'}>
                        Are you sure you want to delete User<Typography fontWeight={'bold'} ml={1} mr={1}>'{props.username}'</Typography>?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" autoFocus onClick={handleYes}>
                        Yes
                    </Button>
                    <Button variant="outlined" color="warning" onClick={handleClose} autoFocus>
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )

}
export default ConfirmPopup;