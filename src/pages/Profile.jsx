import ProfileCard from "../components/ProfileCard";
import ProfileDisplay from "../components/ProfileDisplay";
import CardDefault from "../components/CardDefault";

const Profile = ({ user }) => {
  return (
    <CardDefault>
      <ProfileDisplay user={user} />
    </CardDefault>
  );
};

export default Profile;
