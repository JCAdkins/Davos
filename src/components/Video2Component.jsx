import { forwardRef } from "react";

const Video2Component = forwardRef((props, ref) => {
  return (
    <video
      className={`${props.style} home-video h-[100vh] w-screen object-cover transition-opacity duration-300 visible opacity-100`}
      ref={ref}
      src="https://static.videezy.com/system/resources/previews/000/005/427/original/mountains.mp4"
      playsInline
      muted
      autoPlay
      onEnded={props.onEnded}
    />
  );
});

export default Video2Component;
