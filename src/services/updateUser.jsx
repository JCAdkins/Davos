const updateUser = async (id, newData) => {
  const url = "https://updateuser-jxeq62gl4a-uc.a.run.app";
  const test_url = "http://127.0.0.1:5001/davos-57f96/us-central1/updateUser";

  fetch(url, {
    method: "POST",
    body: JSON.stringify({ data: { updatedData: { ...newData }, id: id } }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
};

export default updateUser;
