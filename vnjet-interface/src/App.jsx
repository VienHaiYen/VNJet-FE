import "./App.css";
import { Authenticate } from "./pages";
import { NormalLayout } from "./layouts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";
function App() {
  // const [profile, setProfile] = React.useState('')

  const submit = () => {
    console.log("alllas");
  };

  // React.useEffect(() => {
  //   setProfile(localStorage.getItem('token') || '')
  // }, [])

  return (
    <Router>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Layout = route.Layout || NormalLayout;
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
        {/* {profile.length === 0 && <Route /login />} */}
      </Routes>
    </Router>
  );
}

export default App;
