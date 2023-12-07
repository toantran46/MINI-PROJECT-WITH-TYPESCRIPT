import { Box, Button, FormGroup, Modal, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, Form, useForm } from 'react-hook-form';
import { Status, UserInfo } from '../../types/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHomeSlice } from '../../store/homeSlice';
import { validationSchema } from '../../yup/schema';
import { formGroup, formLabel, userModalStyle } from '../styles/styles';
import { STRING, TOAST_MESSAGE } from '../../constants/Constants';
import Toast from '../Toast';

interface CreateModalProps {
    open: boolean,
    onClose: () => void,
    userId?: string
}

const CreateUserModal = (props: CreateModalProps) => {
    
    const {open, onClose, userId} = props;
    const [openToast, setOpenToast] = useState(false);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<Status>('success');
    const {userInfo: userList, addNewHomeUser} = useHomeSlice();

    const {
        control,
        reset,
        formState: {errors}
    } = useForm<UserInfo>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            ...new UserInfo()
        }
    });
    
    const handleClose = () => {
        onClose();
        reset();
    };

    const existingUser = (username: string) => {
        return userList?.findIndex(item => item.username === username) > -1;
    }

    const onSubmit = (data: UserInfo) => {
        const isExistUser = existingUser(data.username);
        if (userId === STRING.EMPTY && isExistUser) {
            setOpenToast(true);
            setMessage(TOAST_MESSAGE.ERROR.USERNAME_EXIST);
            setStatus('error');
        } else {
            addNewHomeUser({
                ...data, 
                id: userId ? userId : ''
            })
            reset(data);
            handleClose();
            setOpenToast(true);
            setMessage(userId ? TOAST_MESSAGE.SUCCESS.UPDATE : TOAST_MESSAGE.SUCCESS.CREATE);
            setStatus('success');
        }
    }
    useEffect(() => {
        if (userId !== STRING.EMPTY) {
            const currentUser = userList?.find(item => item.id === userId);
            reset(currentUser);
        } else {
            reset(new UserInfo());
        }
    }, [open, userId, userList])

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={userModalStyle}>
                    <Typography 
                        id="modal-modal-title" 
                        variant="h6" 
                        component="h2"
                        textAlign='center'
                        mb={3}>
                        {userId ? 'Edit User' : 'Create new User'}
                    </Typography>
                    <Typography component={'span'} mt={2} id="modal-modal-description">
                        <Box>
                            <Form onSubmit={(data) => onSubmit(data.data)} control={control}>
                                <FormGroup sx={formGroup}>
                                    <Typography sx={formLabel}>Username<Typography color={"red"} component={"span"}>*</Typography></Typography>
                                    <Controller
                                        name='username'
                                        control={control}
                                        render={({field}) =>
                                            <TextField 
                                                {...field}
                                                id="username"
                                                variant="outlined"
                                                placeholder='Username...'
                                                fullWidth
                                                error={errors.username ? true : false}
                                                helperText={errors.username?.message}
                                                disabled={userId ? true : false}
                                            />
                                        }
                                    />
                                </FormGroup>
                                <FormGroup sx={formGroup}>
                                    <Typography sx={formLabel}>Email<Typography color={"red"} component={"span"}>*</Typography></Typography>
                                    <Controller
                                        name='email'
                                        control={control}
                                        render={({field}) =>
                                            <TextField 
                                                {...field}  
                                                id="email"
                                                variant="outlined"
                                                placeholder='Email...'
                                                fullWidth
                                                error={errors.email ? true : false}
                                                helperText={errors.email?.message}
                                            />
                                        }
                                    />
                                </FormGroup>
                                <FormGroup sx={formGroup}>
                                    <Typography sx={formLabel}>Phone number<Typography color={"red"} component={"span"}>*</Typography></Typography>
                                    <Controller
                                        name='phoneNumber'
                                        control={control}
                                        render={({field}) =>
                                            <TextField
                                                {...field}
                                                id="phoneNumber"
                                                variant="outlined"
                                                type='number'
                                                placeholder='Phone...'
                                                fullWidth
                                                error={errors.phoneNumber ? true : false}
                                                helperText={errors.phoneNumber?.message}
                                            />
                                        }
                                    />
                                    
                                </FormGroup>
                                <FormGroup sx={formGroup}>
                                    <Typography sx={formLabel}>Address</Typography>
                                    <Controller
                                        name='address'
                                        control={control}
                                        render={({field}) =>
                                            <TextField 
                                                {...field}
                                                id="address"
                                                variant="outlined"
                                                placeholder='Address...'
                                                fullWidth
                                            />
                                        }
                                    />
                                </FormGroup>
                                <Box component='div' sx={{float: 'right'}}>
                                    <Button type='submit' variant="contained" sx={{marginRight: 2}}>
                                        {userId ? 'Save' : 'Submit'}
                                    </Button>
                                        {!userId && 
                                    <Button onClick={() => reset()} variant="contained" sx={{marginRight: 2}}>
                                        Reset
                                    </Button>}
                                    <Button onClick={handleClose} variant="outlined">
                                        Close
                                    </Button>
                                </Box>
                            </Form>
                        </Box>
                    </Typography>
                </Box>
            </Modal>
            <Toast
                open={openToast}
                message={message}
                onClose={() => setOpenToast(false)}
                status={status}
                vertical='top'
                horizontal='center'
            />
        </>
    )
}

export default CreateUserModal;

