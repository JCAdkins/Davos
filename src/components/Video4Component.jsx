import { forwardRef } from "react";

const Video4Component = forwardRef(({ style, onEnded }, ref) => {
  return (
    <video
      className={`${style} home-video h-[100vh] w-screen object-cover transition-opacity duration-300 visible opacity-100`}
      ref={ref}
      src="https://firebasestorage.googleapis.com/v0/b/davos-57f96.appspot.com/o/videos%2FCACTUS_FIELD.mp4?alt=media&token=1a62e034-2782-4b50-a50a-d085dbd7fe18"
      //src="https://static.videezy.com/system/resources/previews/000/005/418/original/desert1.mp4"
      autoPlay
      playsInline
      muted
      onEnded={onEnded}
    />
  );
});

export default Video4Component;
