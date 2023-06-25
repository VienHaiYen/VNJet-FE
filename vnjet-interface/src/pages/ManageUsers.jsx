import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import Pagination from "react-bootstrap/Pagination";
import React from "react";
import axiosClient from "../components/api/axios/axiosClient";
import UserItem from "../components/UserItem";

function ManageUsers() {
  const [users, setUsers] = React.useState([]);
  const [showDelete, setShowDelete] = React.useState(false);
  const [currentID, setCurrentID] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [pageNum, setPageNum] = React.useState([]);
  const [flightMetaData, setFlightMetaData] = React.useState(1);

  const handleDelete = (id) => {
    setShowDelete(true);
    setCurrentID(id);
    console.log("crr", currentID);
  };
  const getUsers = async (id) => {
    let data = await fetchUsers(id);
    await setUsers(data);
    await console.log(44, data);
  };
  const fetchUsers = async (id) => {
    const data = await axiosClient.get(`/user?page=${id}`).then((res) => {
      setFlightMetaData(res.metadata);
      return res.results;
    });
    return data;
  };

  const deleteUser = async (id) => {
    let data = await axiosClient.post("/user/delete", {
      _id: id,
    });
    return data;
  };

  const submitDelete = async (id) => {
    let data = await deleteUser(id);
    await console.log("àter delte", data);
    await getUsers(page);
    setShowDelete(false);
  };
  React.useEffect(() => {
    getUsers(1);
  }, []);
  React.useEffect(() => {
    // console.log("753585562");
    getUsers(page);
    console.log("page", page);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [page]);
  React.useEffect(() => {
    // console.log(7554556566565, flightMetaData.totalPages);
    // if (flightMetaData.totalPages > 0) {
    setPageNum([]);
    for (let number = 1; number <= flightMetaData.totalPages; number++) {
      setPageNum((...prev) => [
        ...prev,
        <Pagination.Item
          key={number}
          // active={number === page}
          onClick={() => {
            setPage(number);
            // alert(number);
          }}
        >
          {number}
        </Pagination.Item>,
      ]);
    }
    // }
    // setPageNum(items);
    console.log(33, pageNum);
  }, [flightMetaData]);
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
      {users.length < 1 && (
        <>
          <div className="spinner-border text-primary " role="status"></div>
          <span className="sr-only">Loading...</span>
        </>
      )}
      <div className="d-flex flex-column flex-wrap align-items-center">
        {users &&
          users.length > 0 &&
          users.map((user, index) => (
            <UserItem user={user} handleDelete={handleDelete} key={index} />
          ))}
        {pageNum.length > 0 && <Pagination>{pageNum}</Pagination>}
      </div>
    </>
  );
}

export default ManageUsers;
