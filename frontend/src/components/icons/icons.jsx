import React from 'react';

const Icons = ({ iconName }) => {
  return (
    <div>
      {iconName === 'Home' && <img src={'/Home.svg'} alt="Home" style={{ width: '80px', height: '80px' }} />}
      {iconName === 'leaderboard' && <img src={'/leaderboard.svg'} alt="leaderboard" style={{ width: '80px', height: '80px' }} />}
      {iconName === 'Map' && <img src={'/Map.svg'} alt="Map" style={{ width: '80px', height: '80px' }} />}
      {iconName === 'Profile' && <img src={'/Profile.svg'} alt="Profile" style={{ width: '80px', height: '80px' }} />}
      {iconName === 'Scan' && <img src={'/Scan.svg'} style={{ width: '250px', height: '250px', position: 'relative', top: '-30px', transform: 'scale(150%)' }} />}
    </div>
  );
};


export default Icons;
