import { Accordion } from "flowbite-react";
import MakePodCasts from "./MakePodCasts";

const VerticalAccordion = (props) => {
  const playAudio = (audio) => {
    props.playAudio(audio);
  };

  const thoughtPodCasts = MakePodCasts("thought_leaders", playAudio, false);
  const businessPodCasts = MakePodCasts("business_leaders", playAudio, false);
  const governmentPodcasts = MakePodCasts(
    "government_leaders",
    playAudio,
    false
  );

  return (
    <Accordion collapseAll>
      <Accordion.Panel>
        <Accordion.Title>Thought Leaders</Accordion.Title>
        {thoughtPodCasts}
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title>Buusiness Leaders</Accordion.Title>
        {businessPodCasts}
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title>Government Leaders</Accordion.Title>
        {governmentPodcasts}
      </Accordion.Panel>
    </Accordion>
  );
};

export default VerticalAccordion;
