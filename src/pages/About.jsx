import CardDefault from "../components/CardDefault";
import { SideBar } from "../components/SideBar";
import { useRef } from "react";
import DavosFooter from "../navigation/DavosFooter";

const About = () => {
  const history = useRef(null);
  const mission = useRef(null);
  const values = useRef(null);
  const HEADER_OFFSET = 82;

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop - HEADER_OFFSET,
      behavior: "smooth",
    });
  };

  const list = [
    {
      title: "History",
      link: history,
    },
    {
      title: "Mission",
      link: mission,
    },
    {
      title: "Values",
      link: values,
    },
  ];

  return (
    <div className="flex flex-row bg-black justify-evenly">
      <SideBar
        list={list}
        side="left"
        header="About"
        scrollToSection={scrollToSection}
      ></SideBar>
      <CardDefault
        display="block w-4/6"
        className="bg-opacity-50"
        header="About"
        ml="ml-52"
        text="2xl"
      >
        <div className="py-2"></div>
        <div ref={history} className="py-2">
          <h1 className="font-bold">History</h1>
          <p>
            Eu volutpat odio facilisis mauris sit amet massa vitae tortor.
            Pulvinar pellentesque habitant morbi tristique senectus. Mollis nunc
            sed id semper risus. Arcu dui vivamus arcu felis. Pretium viverra
            suspendisse potenti nullam ac. Ut sem viverra aliquet eget sit amet
            tellus. Scelerisque purus semper eget duis at tellus at urna
            condimentum. Et leo duis ut diam. Dui vivamus arcu felis bibendum ut
            tristique et egestas quis. Nisi vitae suscipit tellus mauris.
            Gravida rutrum quisque non tellus. Blandit massa enim nec dui nunc
            mattis. Tortor consequat id porta nibh venenatis cras sed. Neque
            laoreet suspendisse interdum consectetur libero id faucibus. Leo a
            diam sollicitudin tempor id eu nisl. Vitae ultricies leo integer
            malesuada nunc. At augue eget arcu dictum varius duis. Quis enim
            lobortis scelerisque fermentum dui faucibus in ornare.
          </p>
        </div>
        <div ref={mission} className="py-2">
          <h1 className="font-bold">Mission</h1>
          <p>
            Davos in the Desert is anti-globalist movement dedicated to
            providing forums whereby business leaders, thought leaders and
            government servants share their ideas for safeguarding freedom and
            liberty. We are aware of the threats that unaccountable apparatchiks
            at globalist bodies such as the World Health Organization pose to
            humanity. We are aware that these trigger-happy functionaries want
            the power to impose mandatory vaccinations, vaccine passports and
            quarantines as well as the power to forbid prescriptions of
            heretofore regulatorily approved and effective medicines. Left
            unchecked the WHO will have the power to deem anything-so-called
            Climate Change, inequity, racism-a “health emergency.” The WHO wants
            the right to shut us down even if the perceived risk is to animals
            or to plants. We love our country and believe it is worth
            protecting. We cherish our God-given and constitutionally protected
            rights. We believe in freedom of religion and freedom of expression.
            We hold traditional and commonsense values dear. We believe in
            restrained fiscal policy. We support innovators and entrepreneurs.
            We respect our military and first responders. We believe in strong
            borders and clean elections. Davos in the Desert is anti-globalist
            movement dedicated to providing forums whereby business leaders,
            thought leaders and government servants share their ideas for
            safeguarding freedom and liberty. We are aware of the threats that
            unaccountable apparatchiks at globalist bodies such as the World
            Health Organization pose to humanity. We are aware that these
            trigger-happy functionaries want the power to impose mandatory
            vaccinations, vaccine passports and quarantines as well as the power
            to forbid prescriptions of heretofore regulatorily approved and
            effective medicines. Left unchecked the WHO will have the power to
            deem anything-so-called Climate Change, inequity, racism-a “health
            emergency.” The WHO wants the right to shut us down even if the
            perceived risk is to animals or to plants. We love our country and
            believe it is worth protecting. We cherish our God-given and
            constitutionally protected rights. We believe in freedom of religion
            and freedom of expression. We hold traditional and commonsense
            values dear. We believe in restrained fiscal policy. We support
            innovators and entrepreneurs. We respect our military and first
            responders. We believe in strong borders and clean elections.
          </p>
        </div>
        <div ref={values} className="py-2">
          <h1 className="font-bold">Values</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </CardDefault>
    </div>
  );
};

export default About;
