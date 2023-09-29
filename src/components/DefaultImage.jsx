/* eslint-disable react/prop-types */
export const DefaultImage = (props) => {
  return (
    <img
      className="object-scale-down h-14 min-w-[50%] object-center"
      src={props.src}
      alt={props.alt}
    />
  );
};
