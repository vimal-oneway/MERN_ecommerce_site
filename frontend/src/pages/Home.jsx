import React from "react";
import {
  Button,
  Container,
  Grid,
  Typography,
  Step,
  Stepper,
  StepLabel,
  Box,
} from "@mui/material";
import codeTyping from "../assets/svg/code_typing2.svg";
import avatar from "../assets/svg/male_avatar.svg";
import TeamCard from '../components/TeamCart'
const steps = [
  "lets talk about our project",
  "Bringing your ideas to life with Arduino",
  "product at your door step",
];

export const Home = () => {
  return (
    <div>
      <section className="main-con">
        <div className="home-bg"></div>
        <Container>
          <div className="home-con">
            <section className="image">
              <img
                src={codeTyping}
                alt="ardunio_img"
                loading="lazy"
                width={"100%"}
              />
            </section>
            <section className="home-info">
              <Typography
                variant="h3"
                component={"h3"}
                sx={{
                  mr: 2,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".2rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                LET'S CODE
              </Typography>
              <Typography component={"p"} sx={{ fontweight: 500 }}>
                Empower your imagination with our team
              </Typography>
              <div className="quotes-con">
                <Typography sx={{ fontFamily: "roboto", fontweight: 500 }}>
                  {" "}
                  &ldquo;The best brains of the nation may be found on the last
                  benches of the classroom.&rdquo;
                </Typography>
                <Typography sx={{ fontweight: 500 }} textAlign={"right"}>
                  -By Dr.A.P.J. Abdul Kalam{" "}
                </Typography>
              </div>
              <div className="mb-3"></div>
              <Button variant="contained" color="info">
                let's talk
              </Button>
            </section>
          </div>
        </Container>
      </section>
      {/* our team */}
      <Container>
        <Typography
          variant="h3"
          component={"h3"}
          sx={{
            mr: 2,
            fontFamily: "roboto",
            fontWeight: 700,
            letterSpacing: ".2rem",
            color: "inherit",
            textDecoration: "none",
            textAlign: "center",
          }}
        >
          OUR TEAM
        </Typography>
        <TeamCard/>
      </Container>
    </div>
  );
};
