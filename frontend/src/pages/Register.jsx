import React,{useState} from 'react'
import { OutlinedInput,Chip,Grid,Divider, Button,FormControlLabel,Checkbox, Box,TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form'

import Axios from "../config/axios"


export  const Register = ({ShowMessage}) => {
    const { register, handleSubmit } = useForm();

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const handleOnSubmit = async (data) => {
        data = {...data,avatar:"himabos/bjfsaf"}
        const res = await Axios.registerUser(data)
        res.message && ShowMessage({message: res.message, success:res.success, isOpen:true})
        if(res.token){
            navigate('/ ');
            window.location.reload()
        } 
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  return (
    <div className='mt login-con'>
            <Box component="form" onSubmit={handleSubmit(handleOnSubmit)} noValidate  className='form-con'>
                <FormControl  fullWidth variant="outlined">
                    <TextField id="outlined-basic" label="Username" type={"text"} variant="outlined" {...register("name")} 
                    />
                </FormControl>
                <div className='mb'></div>
                <FormControl  fullWidth variant="outlined">
                    <TextField id="outlined-basic" label="Email" type={"email"} variant="outlined" {...register("email")} 
                    />
                </FormControl>
                <div className='mb'></div>
                <FormControl  fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label="Password"
                        name='password'
                        {...register("password")}
                    />
                </FormControl>
                <div className='mb-3'></div>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Accpet terms & conditions" name='rememberMe'  />
                <div className='mb-3'></div>
                <Button variant="contained" type='submit'onClick={handleSubmit(handleOnSubmit)} >register</Button>
                <div className='mt'>
                <Divider> <Chip label="OR" /></Divider>
                </div>
                <Button variant="contained" onClick={()=>{navigate("/login")}} > login</Button>
            </Box>
        </div>
  )
}
