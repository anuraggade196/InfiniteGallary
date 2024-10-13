import React from 'react';
import './ImageComp.css';
import { useGlobalContext } from '../contexts/ImagesContext.txs';

// Define types for the props
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

interface ImageCompProps {
  data: ImageData;
  onClick: () => void;
}

interface GlobalContextType {
  language: string;
}

const ImageComp: React.FC<ImageCompProps> = ({ data, onClick }) => {
  const { language } = useGlobalContext() as GlobalContextType;

  return (
    <div className="imagecomp-container" onClick={onClick}>
      <div className="image-wrap">
        <img className="image-image" src={data.urls.regular} alt="" />
      </div>
      <div className="caption">
        <div className="caption-wrap">
          <div className="caption-data">
            <a
              className="owner-link"
              target="_blank"
              href={data.user.links.html}
              rel="noreferrer"
            >
              <p className="image-owner">{data.user.name}</p>
            </a>
            <p className="image-data">
              <span className="location">
                {language === 'en' ? 'Location: ' : 'Localización: '}
                <small>{data.user.location || 'Unknown'}</small>
              </span>
              <span className="likes">
                {language === 'en' ? 'Likes: ' : 'Gustos: '}
                <small>{data.likes}</small>
              </span>
            </p>
          </div>
          <img className="image-pic-owner" src={data.user.profile_image.medium} alt="" />
        </div>
      </div>
    </div>
  );
};

export default ImageComp;
