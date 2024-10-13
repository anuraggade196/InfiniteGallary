import React, { useState, useEffect, useRef } from 'react';
import Heading from "../components/Heading";
import Loader from "../components/Loader";
import Images from "../components/Images";
import { useGlobalContext } from "../contexts/ImagesContext";
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import './Explore.css';

/*******Put your access key in the .env file and call it here ********/
const accessKey = process.env.REACT_APP_ACCESS_KEY;

function Explore() {
  const rootURL = 'https://api.unsplash.com';
  const mount = useRef(false);
  const [newImages, setNewImages] = useState<boolean>(false);
  const { images, setImages, query } = useGlobalContext();

  const fetchImages = async (per_page: number = 30) => {
    let url;

    try {
      if (query) {
        setNewImages(true);
        url = `${rootURL}/search/photos?client_id=${accessKey}&query=${query}&per_page=${per_page}`;
        const res = await axios.get(url);
        setImages((prevImages) => [...prevImages, ...res.data.results]);
      } else {
        url = `${rootURL}/photos?client_id=${accessKey}&per_page=${per_page}`;
        const res = await axios.get(url);
        if (mount.current === true) {
          setImages([]);
          mount.current = false;
          window.scrollTo(0, 0);
        }
        setImages((prevImages) => [...prevImages, ...res.data]);
        setNewImages(false);
      }
    } catch (e) {
      console.log('Error happened:', e);
      setNewImages(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchImages();
    }, 1500);
  }, []);

  useEffect(() => {
    if (!mount.current && newImages !== false && query !== '') {
      mount.current = true;
      setImages([]);
    }
  }, [newImages, query]);

  return (
    <div className='explore-container'>
      <Heading />
      <InfiniteScroll
        dataLength={images.length}
        next={fetchImages}
        hasMore={true}
        loader={<Loader />}
      >
        <Images />
      </InfiniteScroll>
    </div>
  );
}

export default Explore;
