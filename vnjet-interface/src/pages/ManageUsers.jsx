import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import React from "react";
import axiosClient from "../components/api/axios/axiosClient";
import UserItem from "../components/UserItem";

function ManageUsers() {
  const [users, setUsers] = React.useState([]);
  const [showDelete, setShowDelete] = React.useState(false);
  const [currentID, setCurrentID] = React.useState(false);

  const handleDelete = (id) => {
    setShowDelete(true);
    setCurrentID(id);
    console.log("crr", currentID);
  };
  const gerUsers = async (id) => {
    let data = await fetchUsers(id);
    await setUsers(data);
    await console.log(44, data);
  };
  const fetchUsers = async () => {
    const data = await axiosClient({
      method: "GET",
      url: "/",
    });
    return data.results;
  };
  // const deleteUser = async (id) => {
  //   const data = await axiosClient.delete("/", {
  //     _id: id,
  //   });
  //   return data;
  // };
  // const deleteUser = async (id) => {
  //   const data = await axiosClient({
  //     method:"DELETE",
  //     url:'/',
  //     body:{
  //       _id:
  //     }
  //   });
  //   return data;
  // };
  const deleteUser = async (id) => {
    let data = await axiosClient.delete("/", {
      body: {
        _id: id,
      },
    });
    return data;
  };

  const submitDelete = async (id) => {
    let data = await deleteUser(id);
    await console.log(data);
    await gerUsers();
    setShowDelete(false);
  };
  React.useEffect(() => {
    gerUsers();
  }, []);
  return (
    <>
      <MDBModal show={showDelete} setShow={setShowDelete} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Xóa chuyến bay</MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody>
              Bạn có chắc chắn muốn xóa người {currentID} dùng không ?
            </MDBModalBody>
            <MDBModalFooter>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowDelete(false)}
              >
                Đóng
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => submitDelete(currentID)}
              >
                Đồng ý
              </button>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      <div className="d-flex flex-wrap">
        {users &&
          users.length > 0 &&
          users.map((user, index) => (
            <UserItem user={user} handleDelete={handleDelete} key={index} />
          ))}
      </div>
    </>
  );
}

export default ManageUsers;
