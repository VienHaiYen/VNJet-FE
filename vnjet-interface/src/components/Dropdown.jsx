function Dropdown({ value, name, options, onChange }) {
  // console.log("option:", options);
  return (
    <select
      required
      id={name}
      className="form-control mr-3"
      onChange={onChange}
      value={value}
      name={name}
    >
      <option value="" defaultValue></option>
      {options &&
        options.map((item, index) => (
          <option value={item._id} key={index}>
            {item.name}
          </option>
        ))}
    </select>
  );
}

export default Dropdown;
