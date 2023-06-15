import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

function DetailFlight({ route, navigate }) {
  // const { id } = route.params;
  const location = useLocation();
  // alert(location.state.id);

  return (
    <>
      {/* <h3>Chi tiết chuyến bay</h3> */}
      <h2>
        Mã số chuyến bay
        <span style={{ color: "red" }}>{" " + location.state.id}</span>
      </h2>
      <div className="row justify-content-start">
        <div className="col-6">One of two columns</div>
        <div className="col-6">One of two columns</div>
      </div>
    </>
  );
}

export default DetailFlight;
