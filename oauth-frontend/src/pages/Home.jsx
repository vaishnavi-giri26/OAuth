import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={styles.container}>
    <div style={styles.card}>
      {/* <h1 style={styles.heading}>Welcome to OAuth App</h1> */}
      <h1 style={styles.heading}> Welcome to OAuth</h1> 
  
      <p style={styles.text}>
  A full-stack authentication app that allows users to
  securely sign in using Google OAuth. Built with React,
  Node.js, Express, and MongoDB.
</p>
  
      <div style={styles.buttonContainer}>
        <Link to="/login" style={styles.primaryBtn}>
          Get Started
        </Link>

      </div>
    </div>
  </div>
  );
}
const styles = {

  container:{
    height:"100vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    background:"linear-gradient(135deg,#dbeafe,#bfdbfe)",
    fontFamily:"Poppins, sans-serif"
  },
  
  card:{
    background:"#ffffff",
    padding:"60px",
    borderRadius:"20px",
    textAlign:"center",
    maxWidth:"650px",
    boxShadow:"0 15px 40px rgba(0,0,0,0.15)",
    transition:"0.3s"
  },
  heading:{
    fontSize:"40px",
    fontWeight:"700",
    background:"linear-gradient(90deg,#111,#555)",
    WebkitBackgroundClip:"text",
    color:"transparent",
    marginBottom:"20px"
  },
  
  text:{
    fontSize:"18px",
    lineHeight:"1.7",
    color:"#555",
    maxWidth:"550px",
    margin:"0 auto 30px"
  },
  
  buttonContainer:{
    display:"flex",
    justifyContent:"center",
    gap:"20px",
    marginTop:"10px"
  },
  
  primaryBtn:{
    background:"#2563eb",
    color:"white",
    padding:"14px 30px",
    borderRadius:"10px",
    textDecoration:"none",
    fontWeight:"600",
    fontSize:"16px",
    transition:"0.2s"
  },
  
  secondaryBtn:{
    background:"#e5e7eb",
    color:"#333",
    padding:"14px 30px",
    borderRadius:"10px",
    textDecoration:"none",
    fontWeight:"500",
    fontSize:"16px"
  }
  
  };
