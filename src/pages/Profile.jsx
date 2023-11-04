import { Card } from "flowbite-react";
import ProfileDisplay from "../components/ProfileDisplay";
import DavosFooter from "../navigation/DavosFooter";

const Profile = () => {
  return (
    <div className="flex-col">
      <Card className="-m-6">
        <ProfileDisplay />
      </Card>
    </div>
  );
};

export default Profile;
