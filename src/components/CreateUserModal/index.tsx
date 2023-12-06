import { Box, Button, FormGroup, Modal, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import './CreateUserModal.css';
import { Controller, Form, useForm } from 'react-hook-form';
import { UserInfo } from '../../types/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHomeSlice } from '../../store/homeSlice';
import { validationSchema } from '../../yup/schema';
import { formGroup, formLabel, userModalStyle } from '../styles/styles';
import { STRING } from '../../constants/Constants';

interface Props {
    isOpen: boolean,
    onClose: () => void,
    userId?: string
}

const CreateUserModal = (props: Props) => {

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
    const [open, setOpen] = useState(false);
    const {userInfo: userList, addNewHomeUser} = useHomeSlice();
    
    const handleClose = () => {
        setOpen(false);
        props.onClose();
        reset();
    };

    const onSubmit = (data: UserInfo) => {
        addNewHomeUser(
            {
                ...data, 
                id: props.userId ? props.userId : ''
            })
        reset(data);
        handleClose();
    }
    useEffect(() => {
        if (props.userId !== STRING.EMPTY) {
            const currentUser = userList?.find(item => item.id === props.userId);
            reset(currentUser);
        } else {
            reset(new UserInfo());
        }
        setOpen(props.isOpen);
    }, [props.isOpen, props.userId, reset, userList])

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={userModalStyle}>
                <Typography 
                    id="modal-modal-title" 
                    variant="h6" 
                    component="h2"
                    textAlign='center'
                    mb={3}>
                    {props.userId ? 'Edit User' : 'Create new User'}
                </Typography>
                <Typography component={'span'} mt={2} id="modal-modal-description">
                    <Box>
                        <Form onSubmit={(data) => onSubmit(data.data)} control={control}>
                            <FormGroup sx={formGroup}>
                                <Typography sx={formLabel}>Username</Typography>
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
                                            disabled={errors.username ? false : true}
                                        />
                                    }
                                />
                            </FormGroup>
                            <FormGroup sx={formGroup}>
                                <Typography sx={formLabel}>Email</Typography>
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
                                <Typography sx={formLabel}>Phone number</Typography>
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
                                    {props.userId ? 'Save' : 'Submit'}
                                </Button>
                                    {!props.userId && 
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
    )
}

export default CreateUserModal;

