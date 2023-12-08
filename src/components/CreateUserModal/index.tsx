import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormGroup,
    FormLabel,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Status, UserInfo } from "../../types/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHomeSlice } from "../../store/homeSlice";
import { validationSchema } from "../../yup/schema";
import { formGroup } from "../styles/styles";
import { STRING, TOAST_MESSAGE } from "../../constants/Constants";
import Toast from "../Toast";

interface CreateModalProps {
    open: boolean;
    onClose: () => void;
    userId?: string;
}

const CreateUserModal = (props: CreateModalProps) => {
    const { open, onClose, userId } = props;
    const [openToast, setOpenToast] = useState(false);
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<Status>("success");
    const { userInfo: userList, addNewHomeUser } = useHomeSlice();

    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<UserInfo>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            ...new UserInfo(),
        },
    });

    const onCloseDialog = (event: CloseEvent, reason: string) => {
        if (reason !== STRING.BACKDROP) {
            handleClose();
        }
    };

    const handleClose = () => {
        onClose();
        reset();
    };

    const existingUser = (username: string) => {
        return userList?.findIndex((item) => item.username === username) > -1;
    };

    const onSubmit = (data: UserInfo) => {
        const isExistUser = existingUser(data.username);
        if (userId === STRING.EMPTY && isExistUser) {
            setOpenToast(true);
            setMessage(TOAST_MESSAGE.ERROR.USERNAME_EXIST);
            setStatus("error");
        } else {
            addNewHomeUser({
                ...data,
                id: userId ? userId : "",
            });
            reset(data);
            handleClose();
            setOpenToast(true);
            setMessage(
                userId
                    ? TOAST_MESSAGE.SUCCESS.UPDATE
                    : TOAST_MESSAGE.SUCCESS.CREATE
            );
            setStatus("success");
        }
    };
    useEffect(() => {
        if (userId !== STRING.EMPTY) {
            const currentUser = userList?.find((item) => item.id === userId);
            reset(currentUser);
        } else {
            reset(new UserInfo());
        }
    }, [open, userId, userList]);

    return (
        <>
            <Dialog
                open={open}
                onClose={onCloseDialog}
                fullWidth
                maxWidth="sm"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle align="center">
                        {userId ? "Edit User" : "Create new User"}
                    </DialogTitle>
                    <DialogContent>
                        <Box>
                            <FormGroup sx={formGroup}>
                                <FormLabel required>Username</FormLabel>
                                <Controller
                                    name="username"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            id="username"
                                            variant="outlined"
                                            placeholder="Username..."
                                            fullWidth
                                            error={
                                                errors.username ? true : false
                                            }
                                            helperText={
                                                errors.username?.message
                                            }
                                            disabled={userId ? true : false}
                                        />
                                    )}
                                />
                            </FormGroup>
                            <FormGroup sx={formGroup}>
                                <FormLabel required>Email</FormLabel>
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            id="email"
                                            variant="outlined"
                                            placeholder="Email..."
                                            fullWidth
                                            error={errors.email ? true : false}
                                            helperText={errors.email?.message}
                                        />
                                    )}
                                />
                            </FormGroup>
                            <FormGroup sx={formGroup}>
                                <FormLabel required>Phone number</FormLabel>
                                <Controller
                                    name="phoneNumber"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            id="phoneNumber"
                                            variant="outlined"
                                            type="number"
                                            placeholder="Phone..."
                                            fullWidth
                                            error={
                                                errors.phoneNumber
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors.phoneNumber?.message
                                            }
                                        />
                                    )}
                                />
                            </FormGroup>
                            <FormGroup sx={formGroup}>
                                <FormLabel>Username</FormLabel>
                                <Controller
                                    name="address"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            id="address"
                                            variant="outlined"
                                            placeholder="Address..."
                                            fullWidth
                                        />
                                    )}
                                />
                            </FormGroup>
                        </Box>
                        <DialogActions>
                            <Button type="submit" variant="contained">
                                {userId ? "Save" : "Submit"}
                            </Button>
                            {!userId && (
                                <Button
                                    onClick={() => reset(new UserInfo())}
                                    variant="contained"
                                >
                                    Reset
                                </Button>
                            )}
                            <Button onClick={handleClose} variant="outlined">
                                Close
                            </Button>
                        </DialogActions>
                    </DialogContent>
                </form>
            </Dialog>
            <Toast
                open={openToast}
                message={message}
                onClose={() => setOpenToast(false)}
                status={status}
                vertical="top"
                horizontal="center"
            />
        </>
    );
};

export default CreateUserModal;
