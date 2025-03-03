import { useDispatch } from "react-redux";
import { logout } from "../redux/features/user/userSlice";

const Header = (props) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-white text-black md:p-6 p-4 flex justify-between items-center border-b border-zinc-200 shadow">
      <div className="flex items-center">
        <h2 className="text-lg font-bold">Ticket System</h2>
      </div>

      <div className="flex items-center justify-end gap-4">
        <div className="flex items-center space-x-4">
          <span className="font-medium">{props.name}</span>
        </div>
        <button
          className="h-8 flex justify-center items-center gap-2 rounded-md bg-indigo-600 px-3 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleLogout}
        >
          <i className="fa fa-right-from-bracket"></i>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
