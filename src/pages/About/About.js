import React from 'react';
import './Aboute.scss'
import {ReactComponent as TopShapeMain} from "../Home/top-shape.svg";
import Navbar from "../../components/Navbar/Navbar";

export const About = () => {
  return (
    <main>
      <TopShapeMain/>
      <div className="container">
        <Navbar/>
        <div className="about__text">
          <h2>My name is Timofey and I made it just for example</h2>
        </div>
      </div>
    </main>
  );
};

export default About