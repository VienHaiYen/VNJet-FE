import { GET, POST, DELETE, PUT } from "../modules";
import { UTIL } from "../utils";
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
import Spinner from "../components/Spinner";
function ManageAirport() {
  const [showEdit, setShowEdit] = React.useState(false);
  const [showDelete, setShowDelete] = React.useState(false);
  const [showAddAirport, setShowAddAirport] = React.useState(false);
  const [currentID, setCurrentID] = React.useState("");
  const [airports, setAirports] = React.useState([]);
  const [currentStation, setCurrentStation] = React.useState({
    name: "",
    location: "",
  });
  React.useEffect(() => {
    GET.getAirports(setAirports);
  }, []);

  const submitAddAirport = async () => {
    setShowAddAirport(false);
    await POST.postAirport(currentStation.name);
    await setCurrentStation({
      name: "",
      location: "",
    });
    await GET.getAirports(setAirports);
  };

  const handleDelete = (id) => {
    setCurrentID(id);
    setShowDelete(true);
  };
  const handleEdit = (id) => {
    setCurrentID(id);
    setCurrentStation({
      name: UTIL.convertToAirportName(airports, id),
      location: "",
    });
    setShowEdit(true);
  };
  const handleAddAirport = () => {
    setShowAddAirport(true);
    setCurrentID("");
    setCurrentStation({
      name: "",
      location: "",
    });
  };

  const submitChange = async () => {
    await PUT.editAirport(currentID, currentStation.name);
    await GET.getAirports(setAirports);
    await setShowEdit(false);
  };

  const submitDelete = async () => {
    await DELETE.deleteAirport(currentID);
    await GET.getAirports(setAirports);
    setShowDelete(false);
  };
  return (
    <>
      <MDBModal show={showEdit} setShow={setShowEdit} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Thay đổi sân bay</MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="form-group mr-3">
                <label htmlFor="name">Tên</label>
                <input
                  className=" form-control"
                  id="name"
                  value={currentStation.name}
                  name="name"
                  onChange={(e) => UTIL.handleOnChange(e, setCurrentStation)}
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      submitChange();
                    }
                  }}
                />
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowEdit(false)}
              >
                Đóng
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={submitChange}
              >
                Đồng ý
              </button>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      <MDBModal show={showDelete} setShow={setShowDelete} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Xóa sân bay</MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody>
              Bạn có chắc chắn muốn xóa sân bay
              {" " + UTIL.convertToAirportName(airports, currentID)} không ?
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
                onClick={submitDelete}
              >
                Đồng ý
              </button>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      <MDBModal show={showAddAirport} setShow={setShowAddAirport} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Thêm sân bay</MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="form-group mr-3">
                <label htmlFor="name">Tên</label>
                <input
                  className=" form-control"
                  id="name"
                  value={currentStation.name}
                  name="name"
                  onChange={(e) => UTIL.handleOnChange(e, setCurrentStation)}
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      submitAddAirport();
                    }
                  }}
                />
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowAddAirport(false)}
              >
                Đóng
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={submitAddAirport}
              >
                Đồng ý
              </button>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      <h1>Danh sách sân bay</h1>
      <button className="btn btn-danger m-2" onClick={handleAddAirport}>
        Thêm
      </button>
      <br />
      {airports.length < 1 && <Spinner />}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên sân bay</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {airports.map((airport, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{airport.name}</td>
              <td>
                <button
                  className="btn btn-primary m-2"
                  onClick={() => handleEdit(airport._id)}
                >
                  Chỉnh sửa
                </button>
                <button
                  className="btn btn-danger m-2"
                  onClick={() => handleDelete(airport._id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ManageAirport;
