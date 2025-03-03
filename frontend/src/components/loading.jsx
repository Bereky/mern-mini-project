import { ScaleLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-light-gray bg-opacity-40 absolute left-0 right-0 top-0 bottom-0 z-10 rounded-b-lg backdrop-blur-sm">
      <div className="w-full h-full flex items-center justify-center">
        <ScaleLoader size={15} color="black" style={{ zIndex: "100" }} />
      </div>
    </div>
  );
};

export default Loading;
