function UserItem({ user, handleDelete }) {
  return (
    <div className="d-flex justify-content-between align-middle border p-3 m-1 rounded col-6">
      <div>
        <h4>{user.name}</h4>
        <h6>{user.birthday}</h6>
        <h6>{user.email}</h6>
      </div>
      <div className="d-flex flex-column justify-content-between">
        {/* <button
          type="button"
          className="btn btn-success"
          //   onClick={chooseItem}
        >
          Xem thông tin
        </button> */}
        <button
          type="button"
          className="btn btn-danger mt-1"
          onClick={() => handleDelete(user.id)}
        >
          Xóa tài khoản
        </button>
      </div>
    </div>
  );
}

export default UserItem;
