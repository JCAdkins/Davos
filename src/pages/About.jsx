import { useRef } from "react";
import { ListGroup } from "flowbite-react";
import "../customcss/CustomCardCss.css";

const About = () => {
  const historyRef = useRef(null);
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const HEADER_OFFSET = 82;

  var historyTO, missionTO, valuesTO;

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop - HEADER_OFFSET,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-app_bg font-dmserif text-lg">
      <div className="flex flex-col sm:flex-row sm:grid sm:grid-cols-5">
        <div className="about-sidebar-container flex sm:col-span-1 bg-app_accent-900 bg-opacity-80 justify-center w-full h-fit sm:h-full text-black p-4">
          <div className="sm:sticky sm:top-28 sm:h-[20%] w-full justify-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0)]">
            <ListGroup>
              <ListGroup.Item
                onBlur={() => {
                  if (historyTO) clearTimeout(historyTO);
                  historyRef.current.children[0].children[0].children[0].style.backgroundColor =
                    "transparent";
                }}
                onClick={() => {
                  historyRef.current.children[0].children[0].children[0].style.backgroundColor =
                    "yellow";
                  historyTO = setTimeout(
                    () =>
                      (historyRef.current.children[0].children[0].children[0].style.backgroundColor =
                        "transparent"),
                    1000
                  );
                  scrollToSection(historyRef);
                }}
              >
                History
              </ListGroup.Item>
              <ListGroup.Item
                onBlur={() => {
                  if (missionTO) clearTimeout(missionTO);
                  missionRef.current.children[0].children[0].children[0].style.backgroundColor =
                    "transparent";
                }}
                onClick={() => {
                  missionRef.current.children[0].children[0].children[0].style.backgroundColor =
                    "yellow";
                  missionTO = setTimeout(
                    () =>
                      (missionRef.current.children[0].children[0].children[0].style.backgroundColor =
                        "transparent"),
                    1000
                  );
                  scrollToSection(missionRef);
                }}
              >
                Mission
              </ListGroup.Item>
              <ListGroup.Item
                onBlur={() => {
                  if (valuesTO) clearTimeout(valuesTO);
                  valuesRef.current.children[0].children[0].children[0].style.backgroundColor =
                    "transparent";
                }}
                onClick={() => {
                  valuesRef.current.children[0].children[0].children[0].style.backgroundColor =
                    "yellow";
                  valuesTO = setTimeout(
                    () =>
                      (valuesRef.current.children[0].children[0].children[0].style.backgroundColor =
                        "transparent"),
                    1000
                  );
                  scrollToSection(valuesRef);
                }}
              >
                Values
              </ListGroup.Item>
            </ListGroup>
          </div>
        </div>
        <div className="flex flex-col sm:col-span-4 items-center text-black gap-2">
          <div ref={historyRef} className="flex w-full justify-center p-6">
            {/* <div className="flex flex-col items-center bg-white rounded-lg max-w-[65ch] text-center shadow-md drop-shadow-[0_1.2px_1.2px_rgba(255,255,255)] divide-y divide-gray-400 p-2"> */}
            <div className="flex flex-col w-full items-center text-center p-2">
              <h1 className="font-bold w-full bg-gradient-to-r from-white/0 via-white/100 to-white/0 active:from-white/100 active:via-white/0 active:to-white/100 hover:drop-shadow-[0_3px_3px_rgba(0,0,0)]  drop-shadow-[0_1.2px_1.2px_rgba(70,70,70)] text-3xl p-2">
                <span>History</span>
              </h1>
              <div className="mt-2 pt-2 px-8 max-w-[76ch] antialiased border-x-8 border-double border-app_accent-900">
                <p className="drop-shadow-[0_1px_1px_rgba(50,50,50)] text-justify p-2 sm:py-4 sm:px-12">
                  Eu volutpat odio facilisis mauris sit amet massa vitae tortor.
                  Pulvinar pellentesque habitant morbi tristique senectus.
                  Mollis nunc sed id semper risus. Arcu dui vivamus arcu felis.
                  Pretium viverra suspendisse potenti nullam ac. Ut sem viverra
                  aliquet eget sit amet tellus. Scelerisque purus semper eget
                  duis at tellus at urna condimentum. Et leo duis ut diam. Dui
                  vivamus arcu felis bibendum ut tristique et egestas quis. Nisi
                  vitae suscipit tellus mauris. Gravida rutrum quisque non
                  tellus. Blandit massa enim nec dui nunc mattis. Tortor
                  consequat id porta nibh venenatis cras sed. Neque laoreet
                  suspendisse interdum consectetur libero id faucibus. Leo a
                  diam sollicitudin tempor id eu nisl. Vitae ultricies leo
                  integer malesuada nunc. At augue eget arcu dictum varius duis.
                  Quis enim lobortis scelerisque fermentum dui faucibus in
                  ornare.
                </p>
              </div>
            </div>
          </div>
          <div ref={missionRef} className="flex w-full justify-center p-6">
            {/* <div className="flex flex-col items-center bg-white rounded-lg max-w-[65ch] shadow-md drop-shadow-[0_1.2px_1.2px_rgba(255,255,255)] text-center divide-y divide-gray-400 p-2"> */}
            <div className="flex flex-col w-full items-center text-center p-2">
              <h1 className="font-bold w-full bg-gradient-to-r from-white/0 via-white/100 to-white/0 active:from-white/100 active:via-white/0 active:to-white/100 hover:drop-shadow-[0_3px_3px_rgba(0,0,0)]  drop-shadow-[0_1.2px_1.2px_rgba(70,70,70)] text-3xl p-2">
                <span>Mission</span>
              </h1>
              <div className="mt-2 pt-2 px-8 max-w-[84ch] antialiased border-x-8 border-double border-app_accent-900">
                <p className="drop-shadow-[0_1px_1px_rgba(50,50,50)] text-justify p-2 sm:py-4 sm:px-12">
                  Davos in the Desert is anti-globalist movement dedicated to
                  providing forums whereby business leaders, thought leaders and
                  government servants share their ideas for safeguarding freedom
                  and liberty. We are aware of the threats that unaccountable
                  apparatchiks at globalist bodies such as the World Health
                  Organization pose to humanity. We are aware that these
                  trigger-happy functionaries want the power to impose mandatory
                  vaccinations, vaccine passports and quarantines as well as the
                  power to forbid prescriptions of heretofore regulatorily
                  approved and effective medicines. Left unchecked the WHO will
                  have the power to deem anything-so-called Climate Change,
                  inequity, racism-a “health emergency.” The WHO wants the right
                  to shut us down even if the perceived risk is to animals or to
                  plants. We love our country and believe it is worth
                  protecting. We cherish our God-given and constitutionally
                  protected rights. We believe in freedom of religion and
                  freedom of expression. We hold traditional and commonsense
                  values dear. We believe in restrained fiscal policy. We
                  support innovators and entrepreneurs. We respect our military
                  and first responders. We believe in strong borders and clean
                  elections. Davos in the Desert is anti-globalist movement
                  dedicated to providing forums whereby business leaders,
                  thought leaders and government servants share their ideas for
                  safeguarding freedom and liberty. We are aware of the threats
                  that unaccountable apparatchiks at globalist bodies such as
                  the World Health Organization pose to humanity. We are aware
                  that these trigger-happy functionaries want the power to
                  impose mandatory vaccinations, vaccine passports and
                  quarantines as well as the power to forbid prescriptions of
                  heretofore regulatorily approved and effective medicines. Left
                  unchecked the WHO will have the power to deem
                  anything-so-called Climate Change, inequity, racism-a “health
                  emergency.” The WHO wants the right to shut us down even if
                  the perceived risk is to animals or to plants. We love our
                  country and believe it is worth protecting. We cherish our
                  God-given and constitutionally protected rights. We believe in
                  freedom of religion and freedom of expression. We hold
                  traditional and commonsense values dear. We believe in
                  restrained fiscal policy. We support innovators and
                  entrepreneurs. We respect our military and first responders.
                  We believe in strong borders and clean elections.
                </p>
              </div>
            </div>
          </div>
          <div ref={valuesRef} className="flex w-full justify-center p-6">
            {/* <div className="flex flex-col items-center rounded-lg max-w-[65ch] shadow-md drop-shadow-[0_1.2px_1.2px_rgba(255,255,255)] text-center divide-y divide-gray-400 p-2"> */}
            <div className="flex flex-col w-full items-center text-center">
              <h1 className="font-bold w-full active:from-white/100 active:via-white/0 active:to-white/100 bg-gradient-to-r from-white/0 via-white/100 to-white/0 hover:drop-shadow-[0_3px_3px_rgba(0,0,0)]  drop-shadow-[0_1.2px_1.2px_rgba(70,70,70)] text-3xl p-2">
                <span>Values</span>
              </h1>
              <div className="mt-2 pt-2 px-8 max-w-[84ch] antialiased border-x-8 border-double border-app_accent-900">
                <p className="drop-shadow-[0_1px_1px_rgba(50,50,50)] text-justify p-2 sm:py-4 sm:px-12">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="about-sidebar-container flex col-span-1 bg-app_accent-900 bg-opacity-80 justify-center w-full h-full text-black p-4">
          <div className="sticky top-28 h-[20%] w-full justify-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0)]"></div>
        </div> */}
      </div>
    </div>
  );
};

export default About;
