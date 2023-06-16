import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { scanReceipt } from '../../api/auth';
import axios from 'axios';

const API_URL = 'https://localhost:8000/api';

const Camera = ({ updatePoints, toggleCameraActive, isCameraActive }) => {

  const webcamRef = useRef(null);
  const [pantKronor, setPantKronor] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleApiResponse = (response) => {
    if (response.status === 200) {
      console.log(response.data);
      updatePoints(response.data);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const getToken = () => localStorage.getItem('token');

  const handleSubmit = async (pointsToAdd) => {
    const token = getToken();
  
    try {
      const response = await axios.post(
        `${API_URL}/addPoints`,
        { pointsToAdd },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      handleApiResponse(response);
      updatePoints(); // update here
    } catch (error) {
      handleError(error);
    }
  };
  

  const handleFileChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const captureAndUploadImage = async (filename) => {
    const imageSrc = webcamRef.current.getScreenshot();
    const imageFile = dataURLtoFile(imageSrc, filename);
    const uploadedImageUrl = await uploadImage(imageFile);
    sendImageToApi(uploadedImageUrl);
  };

  const sendImageToApi = async (uploadedImageUrl) => {
    const token = getToken();

    try {
      const amount = await scanReceipt(uploadedImageUrl, token);
      if (amount != null) {
        setPantKronor((oldValue) => oldValue + amount);
        handleSubmit(amount); // calling handleSubmit with the new amount
      }
    } catch (error) {
      handleError(error);
    }
  };

  const uploadImage = async (image) => {
    try {
      const imagesRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imagesRef, image);
      const imageUrl = await getDownloadURL(imagesRef);
      return imageUrl;
    } catch (error) {
      console.error('Error uploading image: ', error);
      throw error;
    }
  };

  const dataURLtoFile = (dataurl, filename) => {
    if (!dataurl) {
      throw new Error('Invalid dataurl: null or undefined');
    }

    const arr = dataurl.split(',');
    if (arr.length < 2) {
      throw new Error('Invalid dataurl format');
    }

    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    const n = bstr.length;
    const u8arr = new Uint8Array(n);

    for (let i = 0; i < n; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const capture = () => {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const filename = `photo_${timestamp}.jpg`;
    captureAndUploadImage(filename);
  };

  const uploadSelectedImage = async () => {
    if (selectedImage) {
      const uploadedImageUrl = await uploadImage(selectedImage);
      sendImageToApi(uploadedImageUrl);
    }
  };

  const handleCameraToggle = () => {
    toggleCameraActive(); // Uppdatera kameraaktivtillståndet i förälderkomponenten
  };

  return (
    <div className={`camera-container ${isCameraActive ? '' : 'hidden'}`}>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      <div className="button-group">
        <button className="btn btn-success" onClick={capture}>
          Take photo
        </button>
        <button className="btn btn-success" onClick={uploadSelectedImage}>
          Upload photo
        </button>
        <button className="btn btn-success" onClick={handleCameraToggle}>
          Close Camera
        </button>
      </div>
      <div className="file-upload">
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>
    </div>
  );  
};

export default Camera;
