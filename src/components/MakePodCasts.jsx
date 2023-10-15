import { useState, useEffect } from "react";
import { Accordion, Spinner } from "flowbite-react";
import SnapCenterCard from "./SnapCenterCard";

function MakePodCasts(tag, playPodCast) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:3000/podcasts")
      .then((response) => response.json())
      .then((data) => {
        setList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("An error occurred: ${err}");
      });
  }, []);

  const handlePlayPodcast = (audio) => {
    playPodCast(audio);
  };

  return (
    <Accordion.Content className="py-2">
      {loading && <Spinner aria-label="Default status example" />}
      {!loading && (
        <div className="snap-x">
          <ul className="mt-10 pb-2 w-full flex overflow-x-auto gap-4 snap-x">
            {list
              .filter((podcast) => podcast.tag === tag)
              .map((podcast, index) => {
                return (
                  <SnapCenterCard
                    display="first:pl-6 last:pr-6"
                    key={index}
                    tag={podcast.tag}
                    podcast={podcast}
                    handleClick={handlePlayPodcast}
                  ></SnapCenterCard>
                );
              })}
          </ul>
        </div>
      )}
    </Accordion.Content>
  );
}

export default MakePodCasts;
