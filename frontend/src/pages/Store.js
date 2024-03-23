import React, { useState } from "react";
import AddStore from "../components/AddStore";
//import AuthContext from "../AuthContext";

function Store() {
  const [showModal, setShowModal] = useState(false);

  const modalSetting = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="col-span-12 lg:col-span-10 lg:mt-2 mt-2 flex justify-center">
      <div className=" flex flex-col col-span-2 gap-5 w-11/12">
        <div className="flex flex-auto p-6 justify-around rounded-lg border bg-white border-gray-200 ">
          <span className="font-bold">Puntos de Ventas</span>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
            onClick={modalSetting}
          >
            Agregar Punto de Venta
          </button>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {showModal && <AddStore />}
            <div
              className="bg-white w-50 h-fit flex flex-col gap-4 p-4 "
            >
              <div>
                <img
                  alt="store"
                  className="h-60 w-full object-cover"
                  src=""
                />
              </div>
              <div className="flex flex-col gap-3 justify-between items-start">
                <span className="font-bold">text</span>
                <div className="flex">
                  <img
                    alt="location-icon"
                    className="h-6 w-6"
                    src={require("../assets/location-icon.png")}
                  />
                  <span>text</span>
                </div>
              </div>
            </div>
      </div>
      </div>
    </div>
  );
}

export default Store;
