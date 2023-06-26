import React from "react";
import Header from "./components/Header";
import { useGlobal } from "../../context/context";
function DefaultLayout({ children }) {
  const { authenticate } = useGlobal();
  const user = authenticate.selectUser();
  const [nav, setNav] = React.useState([]);
  React.useEffect(() => {
    if (user.role === "customer") {
      setNav([
        { to: "/home", label: "Home" },
        { to: "/my-flight", label: "Chuyến bay của tôi" },
        { to: "/rule", label: "Quy định" },
      ]);
    } else if (user.role == "admin") {
      setNav([
        { to: "/home", label: "Home" },
        { to: "/create-flight", label: "Tạo chuyến bay" }, //admin
        { to: "/manage-users", label: "Quản lí tài khoản" }, //admin
        { to: "/manage-airport", label: "Quản lí sân bay" },
        { to: "/report", label: "Báo cáo" },
        { to: "/monthly-report", label: "Báo cáo tháng" },
        { to: "/rule", label: "Quy định" },
      ]);
    }
  }, []);
  return (
    <div className="p-5 mt-5">
      <Header nav={nav} />
      {React.cloneElement(children)}
    </div>
  );
}

export default DefaultLayout;
