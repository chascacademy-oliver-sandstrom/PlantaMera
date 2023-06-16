import axios from 'axios';

const API_URL = 'https://localhost:8000/api';

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    console.log("Status Code:", response.status);
    const { token } = response.data;
    console.log(response.data);

    // Save token to localStorage
    localStorage.setItem('token', token);

    // Update totalCO2Saved in localStorage
    await getCO2Saved();

    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    console.log("Status Code:", response.status);
    const { token } = response.data;
    console.log(response.data);
    console.log(response);

    // Save token to localStorage
    localStorage.setItem('token', token);

    // Update totalCO2Saved in localStorage
    await getCO2Saved();

    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.get(
      `${API_URL}/allUsers`, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};


export const addPoints = async (points) => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.post(
      `${API_URL}/addPoints`,
      { points },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );


    // Update points in localStorage
    localStorage.setItem('points', response.data.points);

    //update total co2 saved in localstorage
    localStorage.setItem('totalCO2Saved', response.data.totalCO2Saved);

    return response.data;
  } catch (error) {
    // handle error
    throw error;
  }
};

export const redeemPoints = async (pointsToRedeem) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${API_URL}/redeemPoints`,
      { pointsToRedeem },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );


    // Update points in localStorage
    localStorage.setItem('points', response.data.points);

    return response.data.points;
  } catch (error) {
    throw error;
  }
};

export const getPoints = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/points`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });


    // Update points in localStorage
    localStorage.setItem('points', response.data.points);

    return response.data;
  } catch (error) {
    // handle error
    throw error;
  }
};

export const getCO2Saved = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/totalCO2Saved`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });


    // Update totalCO2Saved in localStorage
    localStorage.setItem('totalCO2Saved', response.data.totalCO2Saved);

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};


export const getUserData = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/userData`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log("Status Code:", response.status);
    console.log(response.data);

    // Process the user data as needed
    const { userName, email } = response.data;
    console.log("Username:", userName);
    console.log("Email:", email);

    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};



function handleAxiosError(error) {
  if (error.response) {
    // Log the status code for failed requests
    console.log("Status Code:", error.response.status);
  } else {
    // Log a message if there's no response (e.g., network error)
    console.log("Error:", error.message);
  }
}

export const scanReceipt = async (imageUri, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/analyzeReceipt`,
      { uri: imageUri },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log("Status Code:", response.status);

    const description = response.data.data[0]?.description;
    console.log("Description:", description);

    const amountRegex = /(\d+\.\d{2})/; // Regex för att matcha decimaltal med två decimaler
    const match = description.match(amountRegex);
    const amount = match ? parseFloat(match[0]) : null;
    console.log("Belopp:", amount);

    return amount; // return the amount here instead of response.data;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
};
