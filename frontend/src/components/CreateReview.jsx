import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Rating,
  TextField,
  Avatar,
  Divider,
} from "@mui/material";
import { useNavigate } from 'react-router-dom'

export default function CreateReview({ reviews, userData }) {

  let navigate = useNavigate();
  const [userReview, setUserReview] = useState({isReview:false,review:{}})

  const checkUserAlreadyReviewed = () => {
  
    reviews?.forEach((review) => {
      if (review?.user._id === userData?._id) 
      {
        setUserReview({isReview:true, review:review});
      }
    });
  };

  useEffect(() => {
    checkUserAlreadyReviewed();
  }, []);

  const Login = () => {
    return (
      <Box
        sx={{
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          height:'100%',
          flexDirection:"column"
        }}
      >
        <Typography mb={1}
          sx={{
            fontFamily:'rubik',
            fontWeight:'600',
            fontSize:'1.2rem',
            color:'text.primary'
          }}
        >Login to Review</Typography>
        <Button variant="outlined" onClick={() => {navigate('/login')}}>Login</Button>
      </Box>
    );
  };

  return (
    reviews && (
      <>
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          key={"create-review"}
          sx={{
            border: "2px #dee2e6 solid",
            borderRadius: "12px",
            padding: "12px",
            width: "100%",
            margin: "6px",
          }}
        >
          {
            !userData?
            <Login/>
            :
            <div>
              <Box
                mb={1}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar sx={{ width: 32, height: 32 }}>w</Avatar>
                  <Typography
                    ml={1}
                    sx={{
                      fontFamily: "rubik",
                      fontWeight: "400",
                      color: "text.primary",
                      fontSize: "1.2rem",
                    }}
                  >
                    {userData.name}
                  </Typography>
                </Box>
                <Box>
                  <Rating name="product-rating" value={Number(userReview.review.rating)||0} />
                </Box>
              </Box>

              <Divider />
              <Box mb={2}>
                <Typography
                  mt={1}
                  sx={{
                    fontFamily: "karla",
                    fontWeight: "500",
                    color: "text.secondary",
                  }}
                >
                  {userReview?.review.comment || "enter your comment"}
                </Typography>
              </Box>
              
              <Button variant="contained">{userReview?.isReview?"Edit review":"Create review"}</Button>
            </div>
          }
        </Grid>
      </>
    )
  );
}
