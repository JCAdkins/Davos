import { forwardRef } from "react";

const Video3Component = forwardRef((props, ref) => {
  return (
    <video
      className={`${props.style} home-video h-[100vh] w-screen object-cover transition-opacity duration-300 visible opacity-100`}
      ref={ref}
      src="https://static.videezy.com/system/resources/previews/000/013/067/original/Rock_Formations_20_-_4K_res.mp4"
      autoPlay
      playsInline
      muted
      onEnded={props.onEnded}
    />
  );
});

export default Video3Component;
