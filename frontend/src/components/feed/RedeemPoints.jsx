import React, { useState } from 'react'
import { redeemPoints } from '../../api/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../styles/styles.css"

const RedeemPoints = ({ points, setPoints }) => {
    
    const handleClick = async () => {
        try {
          const pointsToRedeem = 200; // points to redeem
          const newPoints = await redeemPoints(pointsToRedeem);
          setPoints(newPoints); // update the points in the parent component
          
          toast.info(`CERTIFIKAT

          Detta certifikat intygar att [ANVÄNDARNAMN] har planterat ett träd i [PLATS], vilket utgör en god gärning för att bevara och återställa naturen.
          
          Genom att engagera sig i miljövänliga aktiviteter och minska koldioxidutsläppen visar [ANVÄNDARNAMN] en stark vilja att ta hand om planeten och främja en hållbar framtid.
          
          Vi är tacksamma för [ANVÄNDARNAMN]s insatser och erkänner deras betydelsefulla bidrag till miljön. Genom att delta i denna goda handling har [ANVÄNDARNAMN] blivit en miljöhjälte och en inspirationskälla för andra.
          
          Tack för ditt engagemang och bidrag till att göra världen grönare och bättre!
          
          PlantCycle Teamet`, {
            position: "top-center",
            autoClose: 10000,
            theme: "colored",
          });
        } catch (error) {
          toast.success("Failed to redeem points!", {
            position: "top-center",
            theme: "colored",
          });
          console.error(error);
        }
      };

    return (
        <div>
            <button className='btn btn-success plant-tree-button' onClick={handleClick}>Plant a tree</button>
            {/* <ToastContainer /> */}
            <ToastContainer
              bodyClassName="toastBody"
            />
        </div>
    );
};

export default RedeemPoints

