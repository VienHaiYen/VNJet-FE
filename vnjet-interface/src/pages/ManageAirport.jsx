function ManageAirport() {
  const airports = [
    { id: 1, name: "Tân Sơn Nhất", location: "TP HCM" },
    { id: 2, name: "Nội Bài", location: "Hà Nội" },
    { id: 2, name: "Côn Đảo", location: "	Bà Rịa – Vũng Tàu	" },
    { id: 2, name: "Cà Mau", location: "Phú Cát" },
  ];
  const handleDelete = (id) => {
    alert("xóa airport " + id);
  };
  const handleEdit = (id) => {
    alert("edit airport " + id);
  };
  return (
    <>
      <h1>Danh sách sân bay</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên sân bay</th>
            <th scope="col">Vị trí</th>
            {/* <th scope="col">Handle</th> */}
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
              </td>
              <td>
                <button
                  className="btn btn-primary m-2"
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
