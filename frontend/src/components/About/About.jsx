import React from "react";
import "./about.css";
import { Button, Typography, Avatar } from "@mui/material";
import LinkedIn from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://linkedin.com/vinod-jarare";
  };
  return (
    <div className="aboutSection">
      <div className="bgDiv"></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src=""
              alt="Founder"
            />
            <Typography>Vinod Jarare</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit LinkedIn
            </Button>
            <span>This is a sample wesbite</span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a href="#00" target="blank">
              <LinkedIn className="linkedinsvgIcon" />
            </a>

            <a href="#00" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
