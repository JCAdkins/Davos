/* eslint-disable react/prop-types */

/* Expecting props to have list, side, header and scrollToSection() */
import {
  Card,
  Typography,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { MinusSmallIcon } from "@heroicons/react/24/solid";

export function SideBar(props) {
  const scrollToSection = props.scrollToSection;

  const sections = [...props.list].map((elem, ind) => {
    return (
      <ListItem key={ind} onClick={() => scrollToSection(elem.link)}>
        <ListItemPrefix>
          <MinusSmallIcon className="h-5 w-5" />
        </ListItemPrefix>
        {elem.title}
      </ListItem>
    );
  });

  return (
    <Card
      className={`fixed ${props.side}-0 w-1/5 h-fit p-2 shadow-xl shadow-blue-gray-900/5 bg-opacity-90`}
    >
      <div className="mb-2 p-4 bg-stone">
        <Typography variant="h5" color="blue-gray">
          {props.header}
        </Typography>
      </div>
      {[sections]}
    </Card>
  );
}
