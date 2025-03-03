import { Route, Routes, useLocation } from "react-router";
import Login from "./login/page";
import Register from "./register/page";
import Layout from "./layout/layout";

const App = () => {
  const location = useLocation();
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Layout />} />
    </Routes>
  );
};

export default App;
