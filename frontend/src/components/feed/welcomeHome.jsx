import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import '../../styles/styles.css';

const WelcomeHome = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentSlide < 3) {
        setCurrentSlide(currentSlide + 1);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const handleSlideSelect = (selectedIndex) => {
    setCurrentSlide(selectedIndex);
  };

  const handleLogin = () => {
    navigate('/signin');
  };

  return (
    <div className="carousel-container">
      <Carousel
        activeIndex={currentSlide}
        onSelect={handleSlideSelect}
        interval={null}
      >
        <Carousel.Item>
          <div className="image-container h-screen">
            <img src="./first-page.png" alt="Slide 1" className="carousel-image object-cover h-full w-full" />
            {currentSlide === 0 && (
                  <>
                  <div className='start-text'>
                  <h1>Recycle, we want to make the world a better place</h1>
                  </div>
                 </>
            )}
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="image-container h-screen">
            <img src="/second-page.png" alt="Slide 2" className="carousel-image object-cover h-full w-full" />
            {currentSlide === 1 && (
                  <>
                  <div className='start-text'>
                  <h1>Reduce, reuse and renew your products and earn points</h1>
                  </div>
                 </>
            )}
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="image-container h-screen">
            <img src="/third-page.png" alt="Slide 3" className="carousel-image object-cover h-full w-full" />
            {currentSlide === 2 && (
             <>
              <div className='start-text'>
              <h1>Turn your points to grow new trees and other great deals.</h1>
              </div>
             </>
            )}
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="image-container h-screen">
            <img src="/forth-page.png" alt="Slide 4" className="carousel-image object-cover h-full w-full" />
            {currentSlide === 3 && (
              <div className='text-btn'>
                <div>
                <h1 className="welcome-text">Welcome to PlantaMera</h1>
                </div>
                <div className='btn-div'> 
                  <Button variant="primary" className="btn btn-success login-button" onClick={handleLogin}>
                  Get started
                  </Button>
                </div>
              </div>
              )}
          </div>
        </Carousel.Item>
      </Carousel>
      {currentSlide !== 3 && (
        <div className="carousel-indicators">
          <ol className="carousel-indicator-list">
            {}
          </ol>
        </div>
      )}
    </div>
  );
};

export default WelcomeHome;
