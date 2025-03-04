import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/user/userService";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { data: response, isLoading, isSuccess, isError, error }] =
    useLoginMutation();

  const onSubmit = (data) => {
    login(data);
  };

  useEffect(() => {
    if (isSuccess) {
      const payload = {
        token: response.data.token,
      };

      dispatch(setToken(payload));
      navigate("/");
    }
  }, [response, isLoading, isSuccess, isError, error]);
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in
        </h2>
      </div>

      {isError && error?.data?.message && (
        <div className="mt-10 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
          {error.data.message}
        </div>
      )}

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email Address
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm ${
                  errors?.email ? "outline-red-500" : ""
                }`}
              />
              {errors?.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                  maxLength: {
                    value: 50,
                    message: "Password must be 50 characters or less",
                  },
                })}
                className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm ${
                  errors.password ? "outline-red-500" : ""
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              disabled={isLoading}
              type="submit"
              className="h-8 flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 disabled:bg-indigo-400 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isLoading ? <MoonLoader size={10} color="white" /> : "Login"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Dont have account?{" "}
          <a
            href="/register"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Create Account
          </a>
        </p>
      </div>
    </div>
  );
};
