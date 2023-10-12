import ProfileCard from "../components/ProfileCard";

const Profile = ({ user }) => {
  return (
    <div className="flex flex-row text-black">
      <ProfileCard user={user} />
    </div>
  );
};

export default Profile;
