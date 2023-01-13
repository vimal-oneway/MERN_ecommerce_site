import React from "react";
import demoImg from "../assets/img/vimal.jpg";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider, Grid } from "@mui/material";

export default function ProjectCard({ projectData }) {
  return (
    <Grid container spacing={2} >
      {projectData?.map((project, index) => {
        return (
          <Grid item md={4} key={index}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: "250px" }}
                image={demoImg}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" 
                sx={{
                  fontFamily:'rubik',
                  fontWeight:'400'
                }} >
                  {project.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{
                  height:'70px',
                  fontFamily:'karla',
                  fontWeight:'500',
                }}>
                  {project.desc}
                </Typography>
              </CardContent>
              <Divider/>
              <CardActions>
                <Button size="small" sx={{
                  fontFamily:'karla'
                }} variant="outlined">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
