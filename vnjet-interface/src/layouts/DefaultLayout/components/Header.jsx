import { Link, useNavigate } from "react-router-dom";
import { useGlobal } from "../../../context/context";
import { useLocation } from "react-router-dom";
function Header({ nav }) {
  const navigate = useNavigate();
  const { authenticate } = useGlobal();
  const user = authenticate.selectUser();
  let location = useLocation();
  // console.log(77777, location.pathname);
  return (
    <>
      <nav
        className="navbar navbar-expand-lg position-fixed"
        style={{
          left: "0",
          right: "0",
          top: "0",
          backgroundColor: "#FFD200",
          color: "#0000",
        }}
      >
        <div
          className="container-fluid  d-flex"
          style={{ fontSize: "1.2rem", fontWeight: "500" }}
        >
          <span
            className="navbar-brand"
            href="#"
            style={{
              fontFamily: "Montserrat Alternates",
              fontSize: "2.2rem",
            }}
          >
            VNJet
          </span>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            {nav.map((item, index) => {
              var isActive = location.pathname === item.to;
              var className = isActive ? "active" : "";
              console.log();
              return (
                <div className="navbar-nav" key={index}>
                  <Link
                    to={item.to}
                    className={`nav-link text-dark font-italic ${className}`}
                  >
                    {item.label}
                  </Link>
                </div>
              );
            })}
          </div>
          {Object.keys(user).length !== 0 && (
            <div className="d-flex align-items-center">
              <div className="rounded-circle" style={{ overflow: "hidden" }}>
                <img
                  height="50px"
                  src="https://cdn.landesa.org/wp-content/uploads/default-user-image.png"
                  alt=""
                />
              </div>
              <h3 className="p-2 text-dark" style={{ fontSize: "20px" }}>
                {user.fullname}
              </h3>
              <button
                onClick={async (e) => {
                  await authenticate.handleLogout();
                  navigate("/");
                }}
                className="btn btn-danger"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Header;
