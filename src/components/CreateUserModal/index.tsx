import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import * as Yup from 'yup';
import './CreateUserModal.css';
import { useForm } from 'react-hook-form';
import { UserInfo } from '../../types/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { addNewUser, userInfoSelector } from '../../store/homeSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.default',
    color: 'text.primary',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
interface Props {
    isOpen: boolean,
    onClose: () => void,
    userId?: string,
    children: React.ReactNode
}

const CreateUserModal: React.FC<Props> = (props: Props) => {

    const [open, setOpen] = useState(false);
    const [initialData, setInitialData] = useState<UserInfo>()
    const dispatch = useAppDispatch();
    const userList = useAppSelector(userInfoSelector);
    React.useEffect(() => {
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
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required')
            .min(4, 'Username must be at least 4 characters'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        phoneNumber: Yup.string()
            .required('Phone number is required')
            .length(10, 'Phone number is invalid, must be 10 number'),
        address: Yup.string()
    })

    const {
        register,
        handleSubmit,
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
      <div className='mb-3'>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{...style,  width: 600}}>
            <Typography id="modal-modal-title" variant="h6" component="h2" className='mb-4 text-center'>
                {props.userId ? 'Edit User' : 'Create new User'}
            </Typography>
                <Typography component={'span'} mt={2} id="modal-modal-description">
                    <div className='register-form'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label>Username</label>
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
                            </div>
                            <div className="form-group">
                                <label>Email</label>
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
                            </div>
                            <div className="form-group">
                                <label>Phone number</label>
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
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <TextField 
                                    id="address"
                                    variant="outlined"
                                    placeholder='Address...'
                                    fullWidth
                                    {...register('address')}
                                    defaultValue={initialData?.address}
                                />
                            </div>
                            <div className="float-right">
                                <Button type='submit' variant="contained" className='mr-2'>
                                {props.userId ? 'Save' : 'Submit'}
                                </Button>
                                {!props.userId && 
                                <Button onClick={() => reset()} variant="contained" color='warning' className='mr-2'>
                                    Reset
                                </Button>}
                                <Button onClick={() => handleClose()} variant="outlined">
                                    Close
                                </Button>
                            </div>
                        </form>
                    </div>
                </Typography>
            </Box>
        </Modal>
      </div>
   )
}

export default CreateUserModal;
