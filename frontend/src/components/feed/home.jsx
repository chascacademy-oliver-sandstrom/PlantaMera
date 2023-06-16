import React, { useState, useEffect } from "react";
import '../../styles/styles.css';
import greenbackground from "../../../public/greenbackground.svg"
import Camera from '../camera/camera';
import RedeemPoints from "./RedeemPoints";
import { getPoints, getCO2Saved } from "../../api/auth";
import Map from '../map/map'; 
import Tree from '../tree/tree';
import Profile from '../profiles/profile.jsx';
import Leaderboard from '../leaderboard/leaderboard';
import Icons from "../icons/icons";


const Home = () => {
  const [activeButton, setActiveButton] = useState("Home");
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isCameraInterfaceActive, setIsCameraInterfaceActive] = useState(false);
  const [points, setPoints] = useState(0);
  const [CO2, setCO2] = useState(0);

  const fetchPointsAndCO2 = async () => {
    try {
      const data = await getPoints();
      setPoints(data.points);
      // Fetch total CO2 saved
      const co2Data = await getCO2Saved();
      setCO2(co2Data.totalCO2Saved);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchPointsAndCO2();
  }, []);
  
  const handleButtonClick = (buttonName) => {
    if (buttonName === "Kamera" || buttonName === "Leaderboard" || buttonName === "Profile") {
      setIsCameraInterfaceActive(true);
    } else {
      setIsCameraInterfaceActive(false);
    }
  
    setIsCameraActive(buttonName === "Kamera");
    setActiveButton(buttonName);
  };
  

  return (
    <div className="background-image-container">
      <div className="container">
      {activeButton !== "Leaderboard" && activeButton !== "Profile" && (
  <div className="points">
    <h1>You currently have {points} points.</h1>
    {activeButton !== "Kamera" && points >= 200 && (
      <button className="btn btn-success mt-2 redeem-button" onClick={() => handleButtonClick("Redeem Points")}>Redeem Points</button>
    )}
  </div>
)}

            {activeButton !== "Leaderboard" && activeButton !== "Profile" && activeButton !== "Kamera" && activeButton !== "GPS" && (
           <Tree isCameraActive={isCameraActive} />
      )}


        <nav className="navbar fixed-bottom navbar-expand-lg navbar-light bg-light ">
          <div className="container-fluid justify-content-center">
            <div className="row w-100 ">
              
              <button
                type="button"
                className={`btn btn-sm btn-default col border-light ${
                  activeButton === "Home" ? "active" : ""
                }`}
                onClick={() => handleButtonClick("Home")}
              >
                <Icons iconName="Home" />
              </button>
              
              <button
                type="button"
                className={`btn btn-sm btn-default col border-light ${
                  activeButton === "GPS" ? "active" : ""
                }`}
                onClick={() => handleButtonClick("GPS")}
              >
                <Icons iconName="Map" />
              </button>
              
              <button
                type="button"
                className={`btn btn-sm btn-default col border-light ${
                  activeButton === "Kamera" ? "active" : ""
                }`}
                onClick={() => handleButtonClick("Kamera")}
              >
                <Icons iconName="Scan" />
              </button>
              
              <button
                type="button"
                className={`btn btn-sm btn-default col border-light ${
                  activeButton === "Leaderboard" ? "active" : ""
                }`}
                onClick={() => handleButtonClick("Leaderboard")}
              >
                <Icons iconName="leaderboard" />
              </button>

              <button
                type="button"
                className={`btn btn-sm btn-default col border-light ${
                  activeButton === "Profile" ? "active" : ""
                }`}
                onClick={() => handleButtonClick("Profile")}
              >
                <Icons iconName="Profile" />
              </button>
            </div>
          </div>
        </nav>
        {activeButton === "Home"}
        {activeButton === "GPS" && <Map />}
        {activeButton === "Kamera" && (
          <Camera
            updatePoints={fetchPointsAndCO2}
            toggleCameraActive={handleButtonClick}
            isCameraActive={isCameraActive}
          />
        )}
        {activeButton === "Redeem Points" && (
          <RedeemPoints points={points} setPoints={setPoints} />
        )}
        {activeButton === "Profile" && <Profile />}
        {activeButton === "Leaderboard" && <Leaderboard />}

      </div>
    </div>
  );
};

export default Home;