function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

const ProfileDisplay = ({ user }) => {
  return (
    <>
      <div class="p-16 bg-gray-300">
        <div class="p-8 bg-white shadow mt-24">
          {" "}
          <div class="grid grid-cols-1 md:grid-cols-3">
            {" "}
            <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
              {" "}
              <div>
                {" "}
                <p class="font-bold text-gray-700 text-xl">22</p>{" "}
                <p class="text-gray-400">Friends</p>{" "}
              </div>{" "}
              <div>
                {" "}
                <p class="font-bold text-gray-700 text-xl">89</p>{" "}
                <p class="text-gray-400">Comments</p>{" "}
              </div>{" "}
            </div>{" "}
            <div class="relative">
              {" "}
              <div class="w-48 h-48 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center">
                <img
                  className="rounded-full w-48 h-48"
                  src={user.profile.image}
                  alt={user.name}
                />
              </div>{" "}
            </div>{" "}
            <div class="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
              <button class="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                {" "}
                Connect
              </button>{" "}
              <button class="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                {" "}
                Message
              </button>{" "}
            </div>{" "}
          </div>{" "}
          <div class="mt-20 text-center border-b pb-12">
            {" "}
            <h1 class="text-4xl font-medium text-gray-700">
              {user.name.firstName + " " + user.name.lastName},{" "}
              <span class="font-light text-gray-500">
                {getAge(user.profile.dob)}
              </span>
            </h1>{" "}
            <p class="font-light text-gray-600 mt-3">
              {user.profile.location.city + ", " + user.profile.location.state}
            </p>{" "}
            <p class="mt-8 text-gray-500">
              {user.profile.occupation +
                " - " +
                user.profile.experience +
                " years - " +
                user.profile.organization}
            </p>{" "}
            <p class="mt-2 text-gray-500">{user.profile.education.school}</p>{" "}
          </div>{" "}
          <div class="mt-12 flex flex-col">
            {" "}
            <p class="justify-start text-gray-600 text-center font-light lg:px-16 whitespace-pre-line">
              {user.profile.about}
            </p>{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDisplay;
