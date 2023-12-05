import { Box, Button, FormGroup, Modal, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import './CreateUserModal.css';
import { Form, useForm } from 'react-hook-form';
import { UserInfo } from '../../types/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { addNewUser, userInfoSelector } from '../../store/homeSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { validationSchema } from '../../yup/schema';
import { formGroup, formLabel, userModalStyle } from '../styles/styles';
interface Props {
    isOpen: boolean,
    onClose: () => void,
    userId?: string,
    children: React.ReactNode
}

const CreateUserModal = (props: Props) => {

    const [open, setOpen] = useState(false);
    const [initialData, setInitialData] = useState<UserInfo>()
    const dispatch = useAppDispatch();
    const userList = useAppSelector(userInfoSelector);
    useEffect(() => {
        if (props.userId) {
            setInitialData(userList.find(item => item.id === props.userId))
        } else {
            setInitialData({
                username: '',
                email: '',
                phoneNumber: '',
                address: ''
            })
        }
        setOpen(props.isOpen);
    }, [props.isOpen])
    
    const handleClose = () => {
        setOpen(false);
        props.onClose();
        reset();
    };

    const {
        register,
        control,
        reset,
        formState: {errors}
    } = useForm<UserInfo>({
        resolver: yupResolver(validationSchema),
        defaultValues: {...initialData}
    });
    const onSubmit = (data: UserInfo) => {
        dispatch(addNewUser(
            {
                ...data, 
                id: props.userId ? props.userId : ''
            }))
        reset();
        handleClose();
    } 

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
                                <TextField 
                                    id="username"
                                    variant="outlined"
                                    placeholder='Username...'
                                    {...register('username')}
                                    fullWidth
                                    error={errors.username ? true : false}
                                    helperText={errors.username?.message}
                                    defaultValue={initialData?.username}
                                />
                            </FormGroup>
                            <FormGroup sx={formGroup}>
                                <Typography sx={formLabel}>Email</Typography>
                                <TextField 
                                    id="email"
                                    variant="outlined"
                                    placeholder='Email...'
                                    {...register('email')}
                                    fullWidth
                                    error={errors.email ? true : false}
                                    helperText={errors.email?.message}
                                    defaultValue={initialData?.email}
                                />
                            </FormGroup>
                            <FormGroup sx={formGroup}>
                                <Typography sx={formLabel}>Phone number</Typography>
                                <TextField
                                    id="phoneNumber"
                                    variant="outlined"
                                    type='number'
                                    placeholder='Phone...'
                                    {...register('phoneNumber')}
                                    fullWidth
                                    error={errors.phoneNumber ? true : false}
                                    helperText={errors.phoneNumber?.message}
                                    defaultValue={initialData?.phoneNumber}
                                />
                            </FormGroup>
                            <FormGroup sx={formGroup}>
                                <Typography sx={formLabel}>Address</Typography>
                                <TextField 
                                    id="address"
                                    variant="outlined"
                                    placeholder='Address...'
                                    fullWidth
                                    {...register('address')}
                                    defaultValue={initialData?.address}
                                />
                            </FormGroup>
                            <Box component='div' sx={{float: 'right'}}>
                                <Button type='submit' variant="contained" sx={{marginRight: 2}}>
                                    {props.userId ? 'Save' : 'Submit'}
                                </Button>
                                    {!props.userId && 
                                <Button onClick={() => reset()} variant="contained" color='warning' sx={{marginRight: 2}}>
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
