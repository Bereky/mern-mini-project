import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../../redux/features/user/userSlice";

import Loading from "../../components/loading";

const AuthSuccess = () => {
  const { token } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const authToken = searchParams.get("token") || "";

  useEffect(() => {
    if (!authToken) {
      window.open(`/login`, "_self");
    }

    if (authToken) {
      dispatch(setToken(authToken));
    }

    if (token && authToken) {
      navigate("/");
    }
  }, [authToken, token]);

  return (
    <div className="w-full h-full min-h-screen bg-light-gray relative">
      <Loading />
    </div>
  );
};

export default AuthSuccess;
