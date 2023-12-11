import { Carousel } from "flowbite-react";
import "../customcss/CustomCardCss.css";

const DefaultCarousel = () => {
  return (
    <div className="carousel-container h-screen w-screen rounded-none">
      <Carousel
        className="carousel rounded-none"
        indicators={false}
        leftControl=" "
        rightControl=" "
      >
        <img
          className="carousel-image rounded-none"
          alt=""
          src="https://dsk4t6ov5vq8n.cloudfront.net/uploads/PBS-Articles/2022/The-Green-Planet/Episode-4-photos/Sized-photos/The_Green_Planet_04_010.jpg"
        />
        <img
          className="carousel-image rounded-none"
          alt="..."
          src="https://images.squarespace-cdn.com/content/v1/5e9f634cf9f8c97306173ee3/1655751101586-IDSZYILJ5S7EM07V97B0/desert-sunrays-2000-wm-IMG_4502.jpg?format=2500w"
        />
        <img
          className="carousel-image"
          alt="..."
          src="https://www.sciencefriday.com/wp-content/uploads/2023/06/sonoran-desert-unsplash.jpg"
        />
        <img
          className="carousel-image"
          alt="..."
          src="https://www.wildnatureimages.com/images/xl/161202-003-Saguaro-Cactus-Sunset.webp"
        />
        <img
          className="carousel-image"
          alt="..."
          src="https://www.azcentral.com/gcdn/-mm-/7e482a443740f52337eba28dff4794963c9ca5ad/c=0-307-2996-2000/local/-/media/2015/04/13/Phoenix/Phoenix/635645298949068052-phxdc5-6jz3jknt7qdu3p1okel-original.jpg?width=1320&height=746&fit=crop&format=pjpg&auto=webp"
        />
      </Carousel>
    </div>
  );
};

export default DefaultCarousel;
