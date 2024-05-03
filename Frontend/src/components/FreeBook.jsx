import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import list from "../../public/list.json";
import Cards from "./Cards";

function FreeBook() {
  const filterData = list.filter((data) => data.category === "Free");

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 dark:bg-slate-900 dark:text-white">
        <h2 className="font-bold text-xl pd-2">Free Offered Courses</h2>
        <br />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, et
          totam. Tempora amet atque expedita, quae corrupti totam sed pariatur
          corporis at veniam est voluptas animi!
        </p>
      </div>
      <div>
              <Slider {...settings}>
                  {filterData.map((item) => (
                      <Cards item={item} key={item.id} />
                  ))}
        
      </Slider>
      </div>
    </>
  );
}

export default FreeBook;
