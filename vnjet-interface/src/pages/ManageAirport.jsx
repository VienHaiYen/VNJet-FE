import axiosClient from "../components/api/axios/axiosClient";

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
  const [basicModal, setBasicModal] = React.useState(false);
  const [basicModal1, setBasicModal1] = React.useState(false);
  const [basicModal2, setBasicModal2] = React.useState(false);
  const [currentID, setCurrentID] = React.useState("");
  const [airports, setAirports] = React.useState([]);
  const [currentStation, setCurrentStation] = React.useState({
    name: "",
    location: "",
  });
  React.useEffect(() => {
    getAirports();
  }, []);
  const fetchAllAirport = async () => {
    const data = await axiosClient.get("/airport/");
    return data;
  };
  const postAirport = async () => {
    const data = await axiosClient.post("/airport/", {
      name: currentStation.name,
    });
    return data;
  };
  const deleteAirport = async () => {
    const data = await axiosClient.delete(`/airport/${currentID}`);
    return data;
  };

  const editAirport = async () => {
    const data = await axiosClient.put(`/airport/${currentID}`, {
      name: currentStation.name,
    });
    return data;
  };

  const convertToAirportName = (id) => {
    let data = airports.filter((airport) => airport._id == id);
    return data.length > 0 ? data[0].name : "";
  };
  const getAirports = async () => {
    let data = await fetchAllAirport();
    await setAirports(data);
    await console.log(airports);
  };
  const handleDelete = (id) => {
    // alert("xóa airport " + id);
    setCurrentID(id);
    setBasicModal1(!basicModal1);
  };
  const handleEdit = (id) => {
    setCurrentID(id);
    setCurrentStation({
      name: convertToAirportName(id),
      location: "",
    });
    setBasicModal(!basicModal);
  };
  const handleAddAirport = () => {
    setBasicModal2(true);
    setCurrentID("");
    setCurrentStation({
      name: "",
      location: "",
    });
  };
  const submitAddAirport = async () => {
    setBasicModal2(false);
    await postAirport();
    await setCurrentStation({
      name: "",
      location: "",
    });
    await getAirports();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentStation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitChange = async () => {
    await editAirport();
    await getAirports();
    await setBasicModal(false);
  };
  const submitDelete = async () => {
    await deleteAirport();
    await getAirports();
    setBasicModal1(false);
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
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      submitChange();
                    }
                  }}
                />
              </div>
              {/* <div className="form-group mr-3">
                <label htmlFor="location">Vị trí</label>
                <input
                  className=" form-control"
                  id="location"
                  value={currentStation.location}
                  name="location"
                  onChange={handleChange}
                />
              </div> */}
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
            <MDBModalBody>
              Bạn có chắc chắn muốn xóa sân bay
              {" " + convertToAirportName(currentID)} không ?
            </MDBModalBody>
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

      <MDBModal show={basicModal2} setShow={setBasicModal2} tabIndex="-1">
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
                  onChange={handleChange}
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
                onClick={() => setBasicModal2(false)}
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
      {airports.length < 1 && (
        <div className="spinner-border text-primary " role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
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
