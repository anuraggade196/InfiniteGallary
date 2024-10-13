import React, { useState, MouseEvent } from 'react';
import ImageComp from './ImageComp';
import { useGlobalContext } from '../contexts/ImagesContext.txs';
import './Images.css';

// Define the type for the image object
interface ImageData {
  urls: {
    regular: string;
  };
  user: {
    name: string;
    location?: string;
    links: {
      html: string;
    };
    profile_image: {
      medium: string;
    };
  };
  likes: number;
}

interface GlobalContextType {
  images: ImageData[];
}

const Images: React.FC = () => {
  const { images } = useGlobalContext() as GlobalContextType;
  const [imageToDisplay, setImageToDisplay] = useState<string>('');
  const [lightBox, setLightBox] = useState<boolean>(false);

  const DisplayImage = (image: string) => {
    setImageToDisplay(image);
    setLightBox(true);
  };

  const hideLightBox = () => {
    setLightBox(false);
  };

  const showNext = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const obj = images.find(x => x.urls.regular === imageToDisplay);
    const currentIndex = obj ? images.indexOf(obj) : -1;
    if (currentIndex >= images.length - 1) {
      setLightBox(false);
    } else {
      const nextImage = images[currentIndex + 1];
      setImageToDisplay(nextImage.urls.regular);
    }
  };

  const showPrev = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const currentIndex = images.findIndex(obj => obj.urls.regular === imageToDisplay);
    if (currentIndex <= 0) {
      setLightBox(false);
    } else {
      const prevImage = images[currentIndex - 1];
      setImageToDisplay(prevImage.urls.regular);
    }
  };

  return (
    <div className='images-container'>
      {images.map((el, index) => (
        <ImageComp data={el} key
