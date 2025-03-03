import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ScaleLoader } from "react-spinners";
import HomePage from "../home/page";
import { useGetAccountMutation } from "../../redux/features/user/userService";
import { setData } from "../../redux/features/user/userSlice";

const Layout = () => {
  const dispatch = useDispatch();

  const { isLoggedIn, token, account } = useSelector((state) => state.user);
  const [getAccount, { data: response, isLoading, isSuccess, isError, error }] =
    useGetAccountMutation();

  useEffect(() => {
    if (token) {
      getAccount({ token });
    } else {
      window.open(`/login`, "_self");
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setData(response.data));
    }

    if (isError) {
      console.log(error);
    }
  }, [response, isLoading, isSuccess, isError, error]);

  return (
    <>
      {token && account.userId && (
        <div className="w-full h-full min-h-screen bg-light-gray flex flex-row overflow-x-auto justify-between text-zinc-800 relative">
          <div className="w-full h-full flex md:flex-row">
            {!account.userId ? <LayoutSkeleton /> : <HomePage />}
          </div>
        </div>
      )}
    </>
  );
};

const LayoutSkeleton = () => {
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 z-50">
      <div className="w-full h-full flex items-center justify-center bg-light-gray bg-opacity-40 absolute left-0 right-0 top-0 bottom-0 z-10 rounded-b-lg backdrop-blur-sm">
        <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
          <ScaleLoader size={15} color="black" style={{ zIndex: "100" }} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
