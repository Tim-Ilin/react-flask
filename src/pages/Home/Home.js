import React from 'react'
import './Home.scss'
import Navbar from "../../components/Navbar";
import LeftCard from "../../components/LeftCard";
import DropZone from "../../components/DropZone";
import {ReactComponent as TopShapeMain} from './top-shape.svg';

export default function Home() {
  return (
    <main>
      <TopShapeMain/>
      <div className="container">
        <Navbar/>
        <div className="card">
          <LeftCard/>
          <DropZone/>
        </div>
      </div>
    </main>
  )
}