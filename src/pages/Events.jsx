import CardDefault from "../components/CardDefault";
import DefaultCalendar from "../components/DefaultCalendar";
import OverlayCard from "../components/OverlayCard";

import { useState } from "react";

const Events = () => {
  const [showOverlay, setShowOverlay] = useState(true);

  const closeOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  return (
    <div className="flex flex-auto ">
      <CardDefault className="bg-opacity-50" header="Events">
        {showOverlay && (
          <OverlayCard
            title="title"
            description="descriptionss"
            link="link"
            onButtonClick={closeOverlay}
          />
        )}
      </CardDefault>

      <CardDefault>
        <DefaultCalendar />
      </CardDefault>
    </div>
  );
};

export default Events;
