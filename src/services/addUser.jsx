const addUser = async (user, id) => {
  const url = "http://127.0.0.1:5001/davos-57f96/us-central1/addUser";

  fetch(url, {
    method: "POST",
    body: JSON.stringify({ data: { user: { ...user }, uId: id } }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
};

export default addUser;
