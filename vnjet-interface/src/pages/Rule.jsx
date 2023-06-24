function Rule() {
  return (
    <>
      <h3>Rule page</h3>
      <form>
        <div className="form--row d-flex">
          <div className="form-row-item col-6 m-2">
            <label htmlFor="">Số lượng sân bay cao nhất</label>
            <input
              required
              id="time"
              type="number"
              className="form-control"
              // onChange={handleChange}
              // value={currentFlight.time}
              name="time"
            />
          </div>
          <div className="form-row-item col-6 m-2">
            <label htmlFor="">Thời gian bay tối thiểu</label>
            <input
              required
              id="time"
              type="number"
              className="form-control"
              // onChange={handleChange}
              // value={currentFlight.time}
              name="time"
            />
          </div>
        </div>
        <div className="form--row d-flex">
          <div className="form-row-item col-6 m-2">
            <label htmlFor="">Thời gian dừng tối đa</label>
            <input
              required
              id="time"
              type="number"
              className="form-control"
              // onChange={handleChange}
              // value={currentFlight.time}
              name="time"
            />
          </div>
          <div className="form-row-item col-6 m-2">
            <label htmlFor="">Thời gian dừng tối thiểu</label>
            <input
              required
              id="time"
              type="number"
              className="form-control"
              // onChange={handleChange}
              // value={currentFlight.time}
              name="time"
            />
          </div>
        </div>
        <div className="form--row d-flex">
          <div className="form-row-item col-6 m-2">
            <label htmlFor="">Số trạm dừng tối đa</label>
            <input
              required
              id="time"
              type="number"
              className="form-control"
              // onChange={handleChange}
              // value={currentFlight.time}
              name="time"
            />
          </div>
        </div>
        <div className="form--row d-flex">
          <div className="form-row-item col-6 m-2">
            <label htmlFor="">Các hạng vé hiện tại</label>
            <input
              required
              id="time"
              type="number"
              className="form-control"
              // onChange={handleChange}
              // value={currentFlight.time}
              name="time"
            />
          </div>
          <div className="form-row-item col-6 m-2">
            <label htmlFor="">Thêm hạng vé</label>
            <input
              required
              id="text"
              type="number"
              className="form-control"
              // onChange={handleChange}
              // value={currentFlight.time}
              placeholder="nhập tên hạng vé mới"
              name="time"
            />
          </div>
        </div>
        <div className="form--row d-flex">
          <div className="form-row-item col-6 m-2">
            <label htmlFor="">Thời gian chậm nhất khi đặt vé</label>
            <input
              required
              id="time"
              type="number"
              className="form-control"
              // onChange={handleChange}
              // value={currentFlight.time}
              name="time"
            />
          </div>
          <div className="form-row-item col-6 m-2">
            <label htmlFor="">Thời gian chậm nhất khi hủy vé</label>
            <input
              required
              id="text"
              type="number"
              className="form-control"
              // onChange={handleChange}
              // value={currentFlight.time}
              placeholder="nhập tên hạng vé mới"
              name="time"
            />
          </div>
        </div>
      </form>
    </>
  );
}

export default Rule;
