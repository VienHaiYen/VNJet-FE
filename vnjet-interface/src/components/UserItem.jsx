function UserItem({ user, handleDelete }) {
  return (
    <div className="d-flex justify-content-between align-middle border p-3 m-1 rounded col-10">
      <div>
        <h4>{user.fullname}</h4>
        <h6>{user.phone}</h6>
        <h6>{user.email}</h6>
        <h6>{user.identificationCode}</h6>
        <h6>{user.role}</h6>
      </div>
      <div className="d-flex flex-column justify-content-between">
        <button
          type="button"
          className="btn btn-danger mt-1"
          onClick={() => handleDelete(user._id)}
        >
          Xóa tài khoản
        </button>
      </div>
    </div>
  );
}

export default UserItem;
