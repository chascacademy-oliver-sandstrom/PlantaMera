import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../../api/auth';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data); // set data directly to users
      } catch (error) {
        console.error(error);
      }
    }

    fetchUsers();
  }, []);

  return (
    <>
    <div className="leaderboard">
    <h1>Leaderboard</h1>
    <table className="table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Points</th>
          <th>CO2 Saved</th>
        </tr>
      </thead>
      <tbody>
  {users
    .sort((a, b) => b.totalCO2Saved - a.totalCO2Saved) 
    .map((user) => (
      <tr key={user._id}>
        <td>{user.userName}</td>
        <td>{Math.round(user.totalCO2Saved / 80)}</td>
        <td>{user.totalCO2Saved / 1000 + " kilogram"}</td>
      </tr>
    ))}
</tbody>
        </table>
      </div>
    </>
  );
}

export default Leaderboard;
