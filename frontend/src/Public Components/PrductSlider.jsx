import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductContext } from "./ContextProvider.jsx";
import { useEffect, useState, useContext } from "react";
import Loader from "./Loader.jsx";
import "./PrductSlider.css";

function PrductSlider() {
  const { sliderImage, alt, isLoading } = useContext(ProductContext);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (sliderImage.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImage.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [sliderImage.length]);

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + sliderImage.length) % sliderImage.length
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImage.length);
  };
  return (
    <>
      {isLoading === true && <Loader />}
      {isLoading === false && sliderImage && sliderImage.length > 0 && (
        <div className="carousel-container">
          <div className="image-container">
            <img
              src={sliderImage[currentIndex]}
              alt={`${alt}`}
              className="carousel-image"
            />
          </div>
          <button onClick={goToPrevious} className="nav-button prev">
            <ChevronLeft />
          </button>
          <button onClick={goToNext} className="nav-button next">
            <ChevronRight />
          </button>
          <div className="buy-now-container">
            <button className="buy-now-button">Buy Now</button>
          </div>
        </div>
      )}
    </>
  );
}

export default PrductSlider;
