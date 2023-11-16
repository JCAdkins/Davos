import { forwardRef } from "react";

const Video3Component = forwardRef((props, ref) => {
  return (
    <video
      className={`${props.style} home-video h-[100vh] w-screen object-cover transition-opacity duration-300 visible opacity-100`}
      ref={ref}
      src="https://firebasestorage.googleapis.com/v0/b/davos-57f96.appspot.com/o/videos%2FDESERT_CANYON.mp4?alt=media&token=eab7b4a1-180e-436f-83e9-9bd55dd92ad5"
      //src="https://static.videezy.com/system/resources/previews/000/013/067/original/Rock_Formations_20_-_4K_res.mp4"
      autoPlay
      playsInline
      muted
      onEnded={props.onEnded}
    />
  );
});

export default Video3Component;
