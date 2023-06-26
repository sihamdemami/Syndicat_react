import React from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import img1 from '../data/image 1.jpg';
import img2 from '../data/image 2.jpg';
import img3 from '../data/image 3.jpg';
import img4 from '../data/image 4.jpg';
import img5 from '../data/image 5.jpg';
import img6 from '../data/image 6.jpg';
import img7 from '../data/image 7.jpg';
import img8 from '../data/image 8.jpg';

const CopropertyView = () => {
  return (
    <div className="flex justify-center mt-2 w-300 h-200">
      <Carousel
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={500} // Interval between slides in milliseconds
        width="300px"
        height="200px"
      >
        <div>
          <img src={img1} alt="Image 1" className="w-64 h-50 object-cover" />
        </div> 
        <div>
          <img src={img2} alt="Image 2" className="w-64 h-50 object-cover" />
        </div>
        <div>
          <img src={img3} alt="Image 3" className="w-64 h-50 object-cover" />
        </div>
        <div>
          <img src={img4} alt="Image 4" className="w-64 h-50 object-cover" />
        </div>
        <div>
          <img src={img5} alt="Image 5" className="w-64 h-50 object-cover" />
        </div>
        <div>
          <img src={img6} alt="Image 6" className="w-64 h-50 object-cover" />
        </div>
        <div>
          <img src={img7} alt="Image 7" className="w-64 h-50 object-cover" />
        </div>
        <div>
          <img src={img8} alt="Image 8" className="w-64 h-50 object-cover" />
        </div>
      </Carousel>
    </div>
  );
};

export default CopropertyView;