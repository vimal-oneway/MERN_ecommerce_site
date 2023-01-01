import React from 'react'
import { Card, CardMedia, 
    CardContent, CardActionArea, 
    Button,Typography,
    CardActions, Grid, ButtonGroup, Divider } from '@mui/material'
import {DelCart} from "./DelCart"
import Axios from "../config/axios"

export const CartCard = ({products,cart, userData}) => {


  return (
    <Grid  container spacing={2}>
      {
        products?
        products.map((product,index)=>{
          return( 
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        width="140"
                        image={`http://localhost:9000/${product.productImg}`}
                        alt={product.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary"  height="50">
                        {`${product.description?.slice(0,129)}...`} 
                        </Typography>
                        <div className='mb-3'></div>
                        <Divider/>
                        <div className='mb-3'></div>
                        <Typography variant="body2" color="text.primary"  height="50">
                        Price: &#8377;{" "}{product.price*cart[index].quantity} 
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <DelCart userId={userData.userId} productId={product.id}/>
                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                        <Button onClick={async()=>{cart[index].quantity >=1 && await Axios.setCartQuantity(false,userData.userId,product.id); console.log(index);}} >-</Button>
                        <Button>{cart[index].quantity}</Button>
                        <Button onClick={async()=>{await Axios.setCartQuantity(true,userData.userId,product.id); console.log(index);}}>+</Button>
                    </ButtonGroup>
                    <div className='mr-3'></div>
                    <Button  variant='contained' color="primary">
                        buy now
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
