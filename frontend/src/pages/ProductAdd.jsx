import React,{useState} from 'react'
import { Grid,Select,MenuItem, Typography,Button,FormControlLabel,Checkbox, Box,TextField } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form'
import { TextareaAutosize } from '@mui/material';


import Axios from "../config/axios"


export  const ProductAdd = ({userData}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const [category, setCategory] = useState("")

    const handleOnSubmit = (data) => {
        console.log(data);
        // console.log(data.name)
        const formData = new FormData()
        formData.append("image",data.image[0])
        formData.append("name",data.name)
        formData.append("seller",data.seller)
        formData.append("price",data.price)
        formData.append("stock",data.stock)
        formData.append("description",data.description)
        formData.append("category",data.category)
        // console.log(formData.get(e));
        Axios.productRegister(formData)
        // navigate("/register/verify")
    }

    const handleOnSelect = (e) =>{console.log(e.target); setCategory(e.target.value)}
    return (
        <div className='mt login-con'>
                <Box component="form" onSubmit={handleSubmit(handleOnSubmit)} noValidate  className='form-con'>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControl  fullWidth variant="outlined">
                                    <TextField id="outlined-basic" label="Product name" helperText={""} type={"text"} variant="outlined" {...register("name",{ 
                                            required: true,  
                                        })} 
                                    />
                                    {errors.username && <p>Please fill Product name</p>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControl  fullWidth variant="outlined">
                                    <TextField id="outlined-basic" label="Seller name" helperText={""} type={"text"} variant="outlined" {...register("seller",{ 
                                            required: true,  
                                        })} 
                                    />
                                    {errors.username && <p>Please fill Product name</p>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}  md={4}>
                            <FormControl  fullWidth variant="outlined">
                                <TextField id="outlined-basic" label="Price" helperText={""} type={"number"} variant="outlined" {...register("price",{ 
                                        required: true,  
                                    })} 
                                />
                                    {errors.email && <p>Please check the Price</p>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}  md={4}>
                            <FormControl  fullWidth variant="outlined">
                                <TextField id="outlined-basic" label="Stock" helperText={""} type={"number"} variant="outlined" {...register("stock",{ 
                                            required: true,  
                                        })} 
                                />
                                {errors.stock && <p>Please check the stock</p>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12}  md={12}>
                            <FormControl  fullWidth variant="outlined">
                                <Typography>Description</Typography>
                                <TextareaAutosize  
                                    aria-label="Description textarea"
                                    placeholder="type here"
                                    style={{ width: "100%" }}
                                    minRows={8}
                                    {...register("description",{ 
                                        required: true,  
                                    })} 
                                />
                                {errors.description && <p>Please fill description</p>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControl sx={{  minWidth: "100%" }}>
                                <InputLabel id="CategorySelect">Category</InputLabel>
                                <Select
                                labelId="CategorySelect"
                                id="category"
                                value={category}
                                label="Category"
                                {...register('category',{required:true})}
                                onChange={handleOnSelect}

                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={"Robotics"}>Robotics</MenuItem>
                                    <MenuItem value={"Electronics"}>Electronics</MenuItem>
                                    <MenuItem value={"Moblie phones"}>Moblie phones</MenuItem>
                                    <MenuItem value={"Laptops"}>Laptops</MenuItem>
                                    <MenuItem value={"Accessories"}>Accessories</MenuItem>
                                    <MenuItem value={"Headphones"}>Headphones</MenuItem>
                                    <MenuItem value={"Food"}>Food</MenuItem>
                                    <MenuItem value={"Books"}>Books</MenuItem>
                                    <MenuItem value={"Clothes/Shoes"}>Clothes/Shoes</MenuItem>
                                    <MenuItem value={"Beauty/Health"}>Beauty/Health</MenuItem>
                                    <MenuItem value={"Sports"}>Sports</MenuItem>
                                    <MenuItem value={"Outdoor"}>Outdoor</MenuItem>
                                    <MenuItem value={"Home"}>Home</MenuItem>
                                </Select>
                                <FormHelperText>{errors.category && "Please select the category"}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={8}>
                            <FormControl  fullWidth variant="outlined">
                            <input  id="fileupload" name="myfile" type="file" {...register("image",{ 
                                        required: true,  
                                    })} 
                            />
                                {errors.image && <p>Please select the image</p>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={8}>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="accept terms&conditiions" name='conditions'  />
                        </Grid>
                    </Grid>
                    <div className='mb'></div>
                    <Button variant="contained" type='submit'onClick={handleSubmit(handleOnSubmit)} >register</Button>
                </Box>
            </div>
    )
}
