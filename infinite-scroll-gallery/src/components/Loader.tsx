import React from 'react';
import './Loader.css';

const Loader: React.FC = () => {
    return (
        <div className='loader-container'>
            <section className='loader-section'>
                <span className="loader-icon"> </span>
            </section>
        </div>
    );
};

export default Loader;
