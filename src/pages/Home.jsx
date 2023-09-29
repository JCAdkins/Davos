import CardDefault from "../components/CardDefault";
import { SideBar } from "../components/SideBar";

const HomePage = () => {
  const HEADER_OFFSET = 82;
  const list = [];

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop - HEADER_OFFSET,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex items-start">
      <SideBar
        side="left"
        list={list}
        header="Upcoming Events"
        scrollToSection={scrollToSection}
      ></SideBar>
      <CardDefault>
        <h1 className="font-black text-5xl">Davos In The Desert</h1>
        <p className="text-3xl">
          The premier forum for the World&apos;s elite business leaders, thought
          leaders and government officials to meet collaborate and build the
          future.
        </p>
      </CardDefault>
      <SideBar
        side="right"
        list={list}
        header="Recent Podcasts"
        scrollToSection={scrollToSection}
      ></SideBar>
    </div>
  );
};

export default HomePage;
