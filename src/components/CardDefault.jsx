/* eslint-disable react/prop-types */
const CardDefault = (props) => {
  const divClassName = `${props.display} p-6 bg-white border border-gray-200 m-auto rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 bg-opacity-90 " +
    ${props.ml}`;
  return (
    <div className={divClassName}>
      <h5
        className={`mb-2 text-${props.text} font-bold tracking-tight text-gray-900 dark:text-white`}
      >
        {props.header}
      </h5>
      <div
        className={`flex flex-col divide-y divide-gray-400 font-${props.desctext} text-gray-700 dark:text-gray-400`}
      >
        {props.children}
      </div>
    </div>
  );
};

export default CardDefault;
