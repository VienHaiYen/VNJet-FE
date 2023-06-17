import UserItem from "../components/UserItem";

function ManageUsers() {
  const handleDelete = (id) => {
    alert(id);
  };
  const users = [
    {
      id: 1,
      name: "John",
      birthday: "1/1/2000",
      gender: "male",
      email: "456@gmail.com",
      phone: 456789123,
      address: "456 Nguyễn Lương Bằng D4",
    },
    {
      id: 2,
      name: "Marry",
      birthday: "1/1/2000",
      gender: "female",
      email: "477@gmail.com",
      phone: 456789123,
      address: "456 Nguyễn Lương Bằng D4",
    },
  ];
  return (
    <div className="d-flex">
      {users.map((user, index) => (
        <UserItem user={user} handleDelete={handleDelete} key={index} />
      ))}
    </div>
  );
}

export default ManageUsers;
