import { BrowserRouter, Route, Link } from "react-router-dom";
function Header() {
  const navItems = [
    { to: "/home", label: "Home" },
    { to: "/my-flight", label: "Chuyến bay của tôi" },
    { to: "/create-flight", label: "Tạo chuyến bay" },
    { to: "/manage-seller", label: "Quản lí người bán" },
  ];
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
        <div className="container-fluid  d-flex" style={{ fontSize: "1.2rem" }}>
          <a
            className="navbar-brand"
            href="#"
            style={{
              fontFamily: "Montserrat Alternates",
              fontSize: "2.2rem",
            }}
          >
            VNJet
          </a>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            {navItems.map((item, index) => (
              <div className="navbar-nav" key={index}>
                <Link to={item.to} className="nav-link text-dark font-italic">
                  {item.label}
                </Link>
              </div>
            ))}
          </div>
          <div className="rounded-circle" style={{ overflow: "hidden" }}>
            <img
              height="50px"
              src="https://cdn.landesa.org/wp-content/uploads/default-user-image.png"
              alt=""
            />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
