import React from 'react'
import { 
    Card, 
    CardMedia, 
    CardContent, 
    CardActionArea, 
    Button,
    Typography,
    CardActions, 
    Grid, 
    ButtonGroup, 
    Divider, 
    Box, 
    Rating} from '@mui/material';
import {DelCart} from "./DelCart";
import {useDispatch} from 'react-redux'
import {setQuantity} from '../actions/cartActions'
import Axios from "../config/axios"

export const CartCard = ({cart}) => {
  const dispatch = useDispatch()
  return (
    <Grid  container spacing={2}>
      {
        cart?.cart?
        cart.cart.map((cart,index)=>{
          return( 
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        width="140"
                        image={`http://localhost:8080${cart.product.images[0].image}`}
                        alt={`${cart.product.name}_img`}
                    />
                    <CardContent>
                        <Typography variant="h5" component="div" mb={1}
                            sx={{
                              height:'60px',
                              fontFamily:'rubik',
                              fontWeight:'600',
                              color:'text.primary'
                            }}
                        >
                        {cart.product.name}
                        </Typography>
                        <Divider/>
                        <Typography variant="body2" color="text.secondary" mt={1 } mb={2}
                          sx={{
                            fontFamily:'karla',
                            fontWeight:'500',
                            color:'text.secondary',
                            height:'75px'
                          }}
                        >
                        {cart.product.name.length<120?`${cart.product.description}`:`${cart.product.description?.slice(0,129)}...`} 
                        </Typography>
                        <Divider/>
                        <Box mt={1}
                          sx={{
                            display:'flex',
                            justifyContent:'space-between',
                            padding:'0 12px',
                            alignItems:'center'
                          }}
                        >
                          <Typography variant="body2" color="text.primary" >
                          Price: &#8377;{" "}{cart.product.price} 
                          </Typography>
                          <Rating name='product-rating' precision={.5} value={Number(cart.product.ratings)} readOnly/>
                        </Box>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <DelCart productId={cart.product._id}/>
                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                        <Button onClick={async()=>{cart.quantity >1 && await setQuantity(dispatch, cart.quantity-1, cart.product._id); console.log(index);}} >-</Button>
                        <Button>{cart.quantity}</Button>
                        <Button onClick={async()=>{await setQuantity(dispatch, cart.quantity+1, cart.product._id); console.log(index);}}>+</Button>
                    </ButtonGroup>
                    <div className='mr-3'></div>
                    <Button  variant='contained' color="primary">
                        buy
                    </Button>
                </CardActions>
              </Card>
            </Grid>
          ) 
        })
        :
        <p>waiting..</p>
      }
    </Grid>
  )
}
