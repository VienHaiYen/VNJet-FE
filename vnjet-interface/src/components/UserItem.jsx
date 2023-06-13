function UserItem() {
  return (
    <div className="d-flex justify-content-between align-middle border p-3 m-1 rounded">
      <div>
        <h4>Vien Hai Yen</h4>
        <h5>2002</h5>
      </div>
      <p>User</p>
      <div className="d-flex flex-column justify-content-between">
        <button
          type="button"
          className="btn btn-success"
          //   onClick={chooseItem}
        >
          Thêm thông tin
        </button>
        <button
          type="button"
          className="btn btn-danger mt-1"
          //   onClick={cancle}
        >
          Chỉnh sửa
        </button>
      </div>
    </div>
  );
}

export default UserItem;
