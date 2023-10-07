// <!-- component -->
//<-- Create By Joker Banny -->

// place under <h3> if needed
{
  /* <div className="relative">
          <img
            className="w-full rounded-xl"
            src={podcast.img}
            alt={podcast.alt}
          />
          <p className="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg"></p>
        </div> */
}

const PostCard = (props) => {
  const list = props.podcasts.map((podcast, index) => {
    return (
      <div
        key={index}
        className="max-w-sm bg-white px-6 pt-6 rounded-xl shadow-lg transform hover:scale-105 transition duration-500"
      >
        <h3 className="mb-3 text-xl font-bold text-amber-600">
          {podcast.title}
        </h3>
        <h1 className="mt-4 text-gray-800 text-base">{podcast.description}</h1>
        <div className="my-4">
          <div className="flex space-x-1 items-center">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-amber-600 mb-0.5"
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
            <p>{podcast.times}</p>
          </div>
          <div className="flex space-x-1 items-center">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-amber-600 mb-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </span>
            <p>{podcast.speaker}</p>
          </div>
          <button className=" text-lg w-full text-white bg-amber-600 py-2 rounded-xl shadow-lg">
            Listen To Podcast
          </button>
        </div>
      </div>
    );
  });

  return (
    <div className="min-h-screen flex justify-center items-center py-0">
      <div className="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-4 md:space-y-0">
        {list}
      </div>
    </div>
  );
};

export default PostCard;
