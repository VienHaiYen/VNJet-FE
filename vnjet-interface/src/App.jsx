import "./App.css";
// import { Authenticate } from "./pages";
import { NormalLayout } from "./layouts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";
import DefaultLayout from "./layouts/DefaultLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
function App() {
  // const [profile, setProfile] = React.useState('')

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
        {privateRoutes.map((route, index) => {
          const Layout = route.Layout || DefaultLayout;
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
      </Routes>
    </Router>
  );
}

export default App;
