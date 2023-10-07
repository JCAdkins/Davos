import DefaultCarousel from "../components/DefaultCarousel.jsx";

const HomePage = () => {
  return (
    <div className="flex flex-col justify-center">
      <div className="">
        <DefaultCarousel className="rounded-none" />
      </div>
      <div className="items-center content-center">
        <div className="absolute mt-8 mx-16  font-serif border-solid text-5xl">
          The <em className="text-black">premier</em> forum for elite business,
          thought & government leaders to collaborate and build the future.
        </div>
      </div>
    </div>
  );
};

export default HomePage;
