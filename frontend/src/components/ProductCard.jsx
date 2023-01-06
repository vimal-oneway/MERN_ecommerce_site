import React from 'react'
import { Card, CardActionArea, Button,Typography,CardActions, Grid, Divider } from '@mui/material'
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Axios from '../config/axios'
import { useNavigate } from 'react-router-dom';

export default function ProductCard({userData,products}) {
  const navigate = useNavigate()
  return (
    <Grid  container spacing={2}>
      {
        products?.map((product,index)=>{
          return( 
            <Grid item xs={12} sm={6} md={6} key={index}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea onClick={()=>{navigate(`/products/${product._id}`)}}>
                  <CardMedia
                    component="img"
                    width="140"
                    image={`http://localhost:8080${product.images[0].image}`}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product?.name.length >=20 ?`${product?.name.slice(0,18)}...` : product?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary"  height="50">
                    {product?.description.length >= 75 ?`${product?.description?.slice(0, 75)}...` : product?.description} 
                    </Typography>
                    <div className='mb-3'></div>
                    <Divider/>
                    <div className='mb-3'></div>
                    <Typography variant="body3" color="text.primary"   height="50">
                        Price: &#8377;{" "}{product.price} 
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary" variant='outlined' onClick={(e)=>{Axios.addToCart(userData._id, product._id);}}>
                    cart
                  </Button>
                  <Button size="small" variant='contained' color="primary">
                    buy now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )
        })
      }
    </Grid>
  )
}
