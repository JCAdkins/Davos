import { Footer } from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";

const DavosFooter = () => {
  return (
    <Footer container className="bottom-0 bg-app_main opacity-90 rounded-none">
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <p>Powered by</p>
            <Footer.Brand
              className="text-black"
              href="https://flowbite.com"
              src="https://flowbite.com/docs/images/logo.svg"
              alt="Flowbite Logo"
              name="Flowbite"
            />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title className="text-black" title="Davos" />
              <Footer.LinkGroup className="text-black" col>
                <Footer.Link href="#">Careers</Footer.Link>
                <Footer.Link href="#">Conntact Us</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title className="text-black" title="Follow us" />
              <Footer.LinkGroup className="text-black" col>
                <Footer.Link href="#">Twitter</Footer.Link>
                <Footer.Link href="#">Facebook</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title className="text-black" title="Legal" />
              <Footer.LinkGroup className="text-black" col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            className="text-black"
            href="#"
            by="Davos in the Desert™"
            year={2023}
          />
          <div className="mt-4 flex text-black space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon className="text-black" href="#" icon={BsFacebook} />
            <Footer.Icon className="text-black" href="#" icon={BsInstagram} />
            <Footer.Icon className="text-black" href="#" icon={BsTwitter} />
            <Footer.Icon className="text-black" href="#" icon={BsGithub} />
            <Footer.Icon className="text-black" href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default DavosFooter;
