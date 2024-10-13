import { forwardRef } from "react";

const Video2Component = forwardRef(({ style, onEnded }, ref) => {
  return (
    <video
      className={`${style} home-video h-[100vh] w-screen object-cover transition-opacity duration-300 visible opacity-100`}
      ref={ref}
      src="https://firebasestorage.googleapis.com/v0/b/davos-57f96.appspot.com/o/videos%2FMOUTAIN_AERIAL.mp4?alt=media&token=19411e14-2a1a-4d3d-ad87-0a662acd0fdb"
      //src="https://static.videezy.com/system/resources/previews/000/005/427/original/mountains.mp4"
      playsInline
      muted
      autoPlay
      onEnded={onEnded}
    />
  );
});

export default Video2Component;
