import OverlayCard from "./OverlayCard";
import Xicon from "./Xicon";

const CarouselCard = (props) => {
  const displayEvents = props.events.map((event) => {
    return (
      <OverlayCard
        className="w-fit mx-0.5"
        date={event.date}
        title={event.title}
        description={event.description}
        link={event.link}
        buttonText="CLOSE"
        buttonVisible={false}
        overflow="overflow-y-auto overflow-x-hidden scrolling-touch scrollbar max-h-36"
      />
    );
  });

  return (
    <div className="-mt-52 container px-4 flex-grow w-full mx-auto px-0">
      <div className="mx-auto bg-[#ffc3a0] w-full md:w-4/5 px-4">
        <div className="container">
          <button
            className="absolute border-solid border-2 rounded-md mr-1 border-gray-950"
            type="button"
            onClick={props.onButtonClick}
          >
            <Xicon />
          </button>
          <div
            id="scrollContainer"
            className="flex flex-no-wrap overflow-x-scroll scrolling-touch items-start mb-8"
          >
            {[displayEvents]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselCard;
