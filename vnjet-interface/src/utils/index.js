const convertToAirportName = (airports, id) => {
  let data = airports.filter((airport) => airport._id == id);
  return data.length > 0 ? data[0].name : "";
};

const getDateTimeFormat = (_date) => {
  var date = new Date(_date);
  var dd = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
  var mm = date.getMonth() > 9 ? date.getMonth() : "0" + (date.getMonth() + 1);
  var yyyy = date.getFullYear();
  return dd + "/" + mm + "/" + yyyy;
};
const getTimeFormat = (_date) => {
  var date = new Date(_date);
  var hour = date.getHours() > 9 ? date.getHours() : "0" + date.getHours();
  var minus =
    date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
  return hour + ":" + minus;
};

const handleOnChange = (e, setState) => {
  const { name, value } = e.target;
  setState((prevState) => ({
    ...prevState,
    [name]: value,
  }));
  console.log(name, value, setState);
};
const UTIL = {
  convertToAirportName,
  getDateTimeFormat,
  getTimeFormat,
  handleOnChange,
};
export { UTIL };
