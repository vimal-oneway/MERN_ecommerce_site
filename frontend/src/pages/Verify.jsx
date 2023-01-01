import React,{useState} from 'react'
import { Button, Box,TextField } from '@mui/material'
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form'

import Axios from "../config/axios"

export const Verify = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const handleOnSubmit = (data) => {
        Axios.setVerify(data.otp,data.email)
        navigate("/ ")
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    return (
        <div className='mt login-con'>
            <Box component="form" onSubmit={handleSubmit(handleOnSubmit)} noValidate  className='form-con'>
                <FormControl  fullWidth variant="outlined">
                    <TextField id="outlined-basic" label="Email" helperText={""} type={"email"} variant="outlined" {...register("email",{ 
                            required: true,  
                            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
                        })} 
                    />
                        {errors.email && <p>Please check the email</p>}
                </FormControl>
                <div className='mb'></div>
                <FormControl  fullWidth variant="outlined">
                    <TextField id="outlined-basic" label="OTP" helperText={""} type={"number"} variant="outlined" {...register("otp",{ 
                            required: true,  
                            minLength:6
                        })} 
                    />
                        {errors.otp && <p>Please enter otp</p>}
                </FormControl>
                <div className='mb'></div>
                <Button variant="contained" type='submit'onClick={handleSubmit(handleOnSubmit)} >Verify</Button>
            </Box>
        </div>
    )
}
