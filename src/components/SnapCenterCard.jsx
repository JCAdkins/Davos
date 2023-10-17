const SnapCenterCard = (props) => {
  const formatDate = (date) => {
    return [
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
      date.getFullYear(),
    ].join("/");
  };

  const padTo2Digits = (num) => {
    return num.toString().padStart(2, "0");
  };

  const handleClick = () => {
    props.handleClick(props.podcast);
  };

  return (
    <li key={props.index} className="snap-center first:pl-6 last:pr-6">
      <div className="relative scale-90 hover:scale-95 flex-shrink-1 duration-100 overflow-hidden rounded-3xl">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-red-300 to-yellow-200 object-cover object-bottom"></div>
        <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-gray-800"></div>
        <div className="relative h-62 w-96 p-6 flex flex-col justify-between items-center">
          <img
            className="rounded-lg shadow-lg  h-32 aspect-auto"
            srcSet={props.podcast.speaker.img}
            alt="Picture of Speaker"
          ></img>
          <h1 className="mt-4 text-center flex-1 text-black text-lg font-bold">
            {props.podcast.title}
          </h1>
          <div className="mt-4">
            <div className="flex space-x-1 items-center">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-orange-300 mb-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
              <p className="text-white">{props.podcast.duration}</p>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 text-orange-300 mb-0.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                </svg>
              </span>
              <p className="text-white">
                {formatDate(new Date(props.podcast.date))}
              </p>
            </div>
            <div className="flex space-x-1 items-center">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 text-orange-300 mb-0.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46"
                  />
                </svg>
              </span>
              <p className="text-white">{props.podcast.speaker.name}</p>
            </div>
            <button
              className="hover:bg-orange-400 focus:ring focus:ring-orange-300 shadow-md active:bg-orange-500 text-lg w-full mt-4 text-black bg-orange-300 py-1 px-2 rounded-xl shadow-lg"
              onClick={handleClick}
            >
              Listen To Podcast
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default SnapCenterCard;
