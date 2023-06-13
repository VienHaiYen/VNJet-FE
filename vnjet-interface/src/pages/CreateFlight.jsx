function CreateFlight() {
  return (
    <>
      <form className="w-75" style={{ margin: "0 auto" }}>
        <div className="form--row">
          <div className="form-row-item">
            <label htmlFor="name"> Nơi đi</label>
            <input
              required
              id="name"
              type="text"
              className="form-control"
              //   onChange={handleChange}
              //   value={info.name}
              name="name"
            />
          </div>
          <div className="form-row-item">
            <label htmlFor="name"> Nơi đến </label>
            <input
              required
              id="name"
              type="text"
              className="form-control"
              //   onChange={handleChange}
              //   value={info.name}
              name="name"
            />
          </div>
        </div>
        <div className="form--row">
          <div className="form-row-item">
            <label htmlFor="birthday"> Sân bay đi: </label>
            <input
              required
              id="birthday"
              type="date"
              className="form-control"
              //   onChange={handleChange}
              //   value={info.birthday}
              name="birthday"
            />
          </div>
          <div className="form-row-item">
            <label htmlFor="gender"> Sân bay đến </label>
            <select
              required
              id="gender"
              className="form-control"
              //   onChange={handleChange}
              //   value={info.gender}
              name="gender"
            >
              <option
                value=""
                defaultValue
                style={{ display: "none" }}
              ></option>
              <option value="0">1:00</option>
              <option value="1">2:00</option>
            </select>
          </div>
        </div>
        <div className="form--row">
          <div className="form-row-item">
            <label htmlFor="name"> Nơi đi</label>
            <input
              required
              id="name"
              type="text"
              className="form-control"
              //   onChange={handleChange}
              //   value={info.name}
              name="name"
            />
          </div>
          <div className="form-row-item">
            <label htmlFor="name"> Nơi đến </label>
            <input
              required
              id="name"
              type="text"
              className="form-control"
              //   onChange={handleChange}
              //   value={info.name}
              name="name"
            />
          </div>
        </div>
        <div className="form--row">
          <div className="form-row-item">
            <label htmlFor="email"> Số lượng hạng vé hạng nhất </label>
            <input
              required
              id="email"
              type="email"
              className="form-control"
              //   onChange={handleChange}
              //   value={info.mail}
              name="mail"
            />
          </div>
          <div className="form-row-item">
            <label htmlFor="email"> Số lượng hạng vé hạng thương gia </label>
            <input
              required
              id="email"
              type="email"
              className="form-control"
              //   onChange={handleChange}
              //   value={info.mail}
              name="mail"
            />
          </div>
        </div>
        <div className="form--row">
          <div className="form-row-item">
            <label htmlFor="email"> Số lượng hạng vé hạng đặc biệt: </label>
            <input
              required
              id="email"
              type="email"
              className="form-control"
              //   onChange={handleChange}
              //   value={info.mail}
              name="mail"
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-warning"
          // onClick={handleInput}
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default CreateFlight;
