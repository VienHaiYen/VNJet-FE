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
function ManageAirport() {
  const airports = [
    { id: 1, name: "Tân Sơn Nhất", location: "TP HCM" },
    { id: 2, name: "Nội Bài", location: "Hà Nội" },
    { id: 2, name: "Côn Đảo", location: "	Bà Rịa – Vũng Tàu	" },
    { id: 2, name: "Cà Mau", location: "Phú Cát" },
  ];
  const [basicModal, setBasicModal] = React.useState(false);
  const [basicModal1, setBasicModal1] = React.useState(false);
  const [currentID, setCurrentID] = React.useState("");
  const [currentStation, setCurrentStation] = React.useState({
    name: "",
    location: "",
  });
  const handleDelete = (id) => {
    // alert("xóa airport " + id);
    setCurrentID(id);
    setBasicModal1(!basicModal);
  };
  const handleEdit = (id) => {
    setCurrentID(id);
    setCurrentStation({
      name: "",
      location: "",
    });
    setCurrentID(id);
    setBasicModal(!basicModal);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentStation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const submitChange = () => {
    alert("Changed");
  };

  const submitDelete = () => {
    alert("Deleted");
  };
  return (
    <>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
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
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mr-3">
                <label htmlFor="location">Vị trí</label>
                <input
                  className=" form-control"
                  id="location"
                  value={currentStation.location}
                  name="location"
                  onChange={handleChange}
                />
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setBasicModal(false)}
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

      <MDBModal show={basicModal1} setShow={setBasicModal1} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Xóa sân bay</MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody>Bạn có chắc chắn muốn xóa không ?</MDBModalBody>
            <MDBModalFooter>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setBasicModal1(false)}
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
      <h1>Danh sách sân bay</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên sân bay</th>
            <th scope="col">Vị trí</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {airports.map((airport, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{airport.name}</td>
              <td>{airport.location}</td>
              <td>
                <button
                  className="btn btn-primary m-2"
                  onClick={() => handleEdit(airport.id)}
                >
                  Chỉnh sửa
                </button>
                <button
                  className="btn btn-danger m-2"
                  onClick={() => handleDelete(airport.id)}
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
