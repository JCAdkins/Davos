import { createContext } from "react";

const PodcastProvider = createContext({ podcast: {}, setPodcast: () => {} });

export default PodcastProvider;
