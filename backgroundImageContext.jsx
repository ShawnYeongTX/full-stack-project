import React, { createContext, useContext, useEffect, useState } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import {storage} from './src/firebase.js' // Adjust the import based on your project structure

const BackgroundImageContext = createContext();

export const BackgroundImageProvider = ({ children }) => {
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        const storageRef = ref(storage, 'carPics/Aston Martin Vantage-5.jpg'); // Adjust the path as needed
        const url = await getDownloadURL(storageRef);
        setBackgroundImage(url);
      } catch (error) {
        console.error('Error fetching background image:', error);
      }
    };

    fetchBackgroundImage();
  }, []);

  return (
    <BackgroundImageContext.Provider value={backgroundImage}>
      {children}
    </BackgroundImageContext.Provider>
  );
};

export const useBackgroundImage = () => {
  return useContext(BackgroundImageContext);
};