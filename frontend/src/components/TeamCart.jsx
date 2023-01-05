import React from 'react'
import {
    Button,
    Container,
    Grid,
    Typography,
  } from "@mui/material";
import avatar from "../assets/svg/male_avatar.svg";

function TeamCart() {
  return (
    <div className="team-card-con">
    <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 12, md: 12 }}
          >
            <Grid item xs={4} sm={6} md={4} key={1}>
              <Container>
                <div className="team-card">
                  <section className="team-card-img">
                    <img src={avatar} alt="avatar" width={"100%"} />
                  </section>
                  <section className="team-card-info">
                    <Typography
                      variant="h5"
                      component={"h4"}
                      sx={{
                        mr: 2,
                        fontFamily: "monospace",
                        fontWeight: 700,
                        letterSpacing: ".1rem",
                        color: "inherit",
                        textDecoration: "none",
                        textAlign: "center",
                      }}
                    >
                      VIMAL RAJ
                    </Typography>

                    <Typography
                      sx={{
                        fontWeight: 500,
                        fontFamily: "monospace",
                        letterSpacing: ".1rem",
                        color: "inherit",
                        textDecoration: "none",
                      }}
                    >
                      Web dev
                    </Typography>

                    <Typography
                      sx={{
                        fontWeight: 500,
                        letterSpacing: ".1rem",
                        color: "inherit",
                        textDecoration: "none",
                      }}
                    >
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Repellendus sint sunt, blanditiis perferendis incidunt at!
                      Aliquid cupiditate soluta earum assumenda provident, esse
                      beatae atque eos, ex voluptas dolorum quae qui!
                    </Typography>
                    <div className="mb"></div>
                    <Button variant="contained">connect</Button>
                  </section>
                </div>
              </Container>
            </Grid>
            <Grid item xs={4} sm={6} md={4} key={2}>
              <Container>
                <div className="team-card">
                  <section className="team-card-img">
                    <img src={avatar} alt="avatar" width={"100%"} />
                  </section>
                  <section className="team-card-info">
                    <Typography
                      variant="h5"
                      component={"h4"}
                      sx={{
                        mr: 2,
                        fontFamily: "monospace",
                        fontWeight: 700,
                        letterSpacing: ".1rem",
                        color: "inherit",
                        textDecoration: "none",
                        textAlign: "center",
                      }}
                    >
                      VIMAL
                    </Typography>

                    <Typography
                      sx={{
                        fontWeight: 500,
                        fontFamily: "monospace",
                        letterSpacing: ".1rem",
                        color: "inherit",
                        textDecoration: "none",
                      }}
                    >
                      UI/UX
                    </Typography>

                    <Typography
                      sx={{
                        fontWeight: 500,
                        letterSpacing: ".1rem",
                        color: "inherit",
                        textDecoration: "none",
                      }}
                    >
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Repellendus sint sunt, blanditiis perferendis incidunt at!
                      Aliquid cupiditate soluta earum assumenda provident, esse
                      beatae atque eos, ex voluptas dolorum quae qui!
                    </Typography>
                    <div className="mb"></div>
                    <Button variant="contained">connect</Button>
                  </section>
                </div>
              </Container>
            </Grid>
            <Grid item xs={4} sm={6} md={4} key={3}>
              <Container>
                <div className="team-card">
                  <section className="team-card-img">
                    <img src={avatar} alt="avatar" width={"100%"} />
                  </section>
                  <section className="team-card-info">
                    <Typography
                      variant="h5"
                      component={"h4"}
                      sx={{
                        mr: 2,
                        fontFamily: "monospace",
                        fontWeight: 700,
                        letterSpacing: ".1rem",
                        color: "inherit",
                        textDecoration: "none",
                        textAlign: "center",
                      }}
                    >
                      DEVIL
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 500,
                        fontFamily: "monospace",
                        letterSpacing: ".1rem",
                        color: "inherit",
                        textDecoration: "none",
                      }}
                    >
                     Content writer
                    </Typography>

                    <Typography
                      sx={{
                        fontWeight: 500,
                        letterSpacing: ".1rem",
                        color: "inherit",
                        textDecoration: "none",
                      }}
                    >
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Repellendus sint sunt, blanditiis perferendis incidunt at!
                      Aliquid cupiditate soluta earum assumenda provident, esse
                      beatae atque eos, ex voluptas dolorum quae qui!
                    </Typography>
                    <div className="mb"></div>
                    <Button variant="contained">connect</Button>
                  </section>
                </div>
              </Container>
            </Grid>
          </Grid>
        </div>
  )
}

export default TeamCart