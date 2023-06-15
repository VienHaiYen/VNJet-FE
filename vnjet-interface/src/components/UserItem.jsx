function UserItem() {
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
    <div className="d-flex justify-content-between align-middle border p-3 m-1 rounded">
      <div>
        <h4>Vien Hai Yen</h4>
        <h5>2002</h5>
      </div>
      <div className="d-flex flex-column justify-content-between">
        <button
          type="button"
          className="btn btn-success"
          //   onClick={chooseItem}
        >
          Xem thông tin
        </button>
        <button
          type="button"
          className="btn btn-danger mt-1"
          //   onClick={cancle}
        >
          Xóa
        </button>
      </div>
    </div>
  );
}

export default UserItem;
