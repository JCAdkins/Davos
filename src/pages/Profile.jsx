import { Card } from "flowbite-react";
import ProfileDisplay from "../components/ProfileDisplay";

const Profile = ({ user }) => {
  return (
    <Card className="bg-black">
      <ProfileDisplay user={user} />
    </Card>
  );
};

export default Profile;
