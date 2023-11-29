import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import * as Yup from 'yup';
import './CreateUserModal.css';
import { useForm } from 'react-hook-form';
import { UserInfo } from '../../types/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { addNewUser } from '../../store/homeSlice';
import { useAppDispatch } from '../../store/store';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

const CreateUserModal: React.FC = () => {

    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const handleOpen = () => {
        setOpen(true);
        reset();
    }
    const handleClose = () => setOpen(false);
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
        resolver: yupResolver(validationSchema)
    });
    const onSubmit = (data: UserInfo) => {
        dispatch(addNewUser(data))
        reset();
        setOpen(false);
    }
    
   return (
      <div className='mb-3'>
        <Button variant="contained" onClick={handleOpen}>Create a User</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{...style,  width: 600}}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Create new User
            </Typography>
                <Typography mt={2} id="modal-modal-description">
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
                                />
                            </div>
                            <div className="float-right">
                                <Button type='submit' variant="contained" className='mr-2'>
                                    Submit
                                </Button>
                                <Button onClick={() => reset()} variant="contained" color='warning' className='mr-2'>
                                    Reset
                                </Button>
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
