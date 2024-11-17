import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductContext } from "./ContextProvider.jsx";
import { useEffect, useState, useContext } from "react";
import "./PrductSlider.css";

function PrductSlider() {
  const { sliderImage, alt } = useContext(ProductContext);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (sliderImage.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImage.length);
      }, 5000);

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
    </>
  );
}

export default PrductSlider;
