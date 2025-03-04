import { Route, Routes } from "react-router";

import Login from "./login/page";
import Register from "./register/page";
import Layout from "./layout/layout";
import PageNotFound from "../components/page-not-found";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Layout />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
