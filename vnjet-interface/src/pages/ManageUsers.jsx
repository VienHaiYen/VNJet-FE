import UserItem from "../components/UserItem";

function ManageUsers() {
  const users = [
    {
      name: "John",
      birthday: "1/1/2000",
      gender: "male",
      email: "456@gmail.com",
      phone: 456789123,
      address: "456 Nguyễn Lương Bằng D4",
    },
    {
      name: "Marry",
      birthday: "1/1/2000",
      gender: "female",
      email: "477@gmail.com",
      phone: 456789123,
      address: "456 Nguyễn Lương Bằng D4",
    },
  ];
  return (
    <>
      {users.map((user, index) => (
        <UserItem user={user} key={index} />
      ))}
    </>
  );
}

export default ManageUsers;
