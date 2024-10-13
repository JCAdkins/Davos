import { forwardRef } from "react";

const Video1Component = forwardRef(({ style, onEnded }, ref) => {
  return (
    <video
      className={`${style} home-video h-[100vh] w-screen object-cover transition-opacity duration-300 visible opacity-100`}
      ref={ref}
      src="https://firebasestorage.googleapis.com/v0/b/davos-57f96.appspot.com/o/videos%2FDESERT_VIDEO.mp4?alt=media&token=bd722780-7a61-45c1-b329-a0faee0191b6"
      //src="https://static.videezy.com/system/resources/previews/000/005/426/original/mount2.mp4"
      autoPlay
      playsInline
      muted
      onEnded={onEnded}
    />
  );
});

export default Video1Component;
