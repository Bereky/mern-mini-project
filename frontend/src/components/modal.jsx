import React, { useEffect, useRef, useState } from "react";

const Modal = (props) => {
  const modalRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    setIsVisible(true);

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        {
          !props.isLoading && props.close();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [props]);

  return (
    <div
      onClick={(e) => {}}
      className="fixed w-full h-full max-h-screen min-w-screen backdrop-blur-sm backdrop-brightness-50 z-50 py-10 left-0 top-0 md:bottom-10 md:px-16 p-3 flex justify-center items-center"
    >
      <div
        ref={modalRef}
        className={`${
          props.className
        } h-auto max-h-full flex flex-col bg-white rounded-xl md:p-5 p-3 gap-4 overflow-y-none transition-all duration-500 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-1/3 opacity-"
        }`}
      >
        <div className="w-full h-auto flex flex-row items-center">
          <div className="w-full h-auto flex flex-col justify-start items-start">
            <h1 className="md:text-lg font-medium text-zinc-800">
              {props.label}
            </h1>
          </div>
        </div>
        <div className="w-full h-full flex justify-start items-center flex-col text-zinc-800 overflow-y-auto">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
