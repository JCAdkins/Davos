import { Card } from "flowbite-react";
import ProfileDisplay from "../components/ProfileDisplay";

const Profile = () => {
  return (
    <div className="bg-app_bg flex-col">
      <Card className="-m-6">
        <ProfileDisplay />
      </Card>
    </div>
  );
};

export default Profile;
