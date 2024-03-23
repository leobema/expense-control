import React, { useState, useContext } from "react";
import AddPurchaseDetails from "../components/AddPurchaseDetails";
import UpdatePurchase from "../components/UpdatePurchase";
import AuthContext from "../AuthContext";

function PurchaseDetails() {
  const [showPurchaseModal, setPurchaseModal] = useState(false);
  const [updatePage, setUpdatePage] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatePurchase, setUpdatePurchase] = useState([]);

  const authContext = useContext(AuthContext);


  // Modal for Sale Add
  const addPurchaseModalSetting = () => {
    setPurchaseModal(!showPurchaseModal);
  };

  // Modal for Product UPDATE
  const updatePurchaseModalSetting = (selectedPurchaseData) => {
    console.log("Clicked: edit");
    setUpdatePurchase(selectedPurchaseData);
    setShowUpdateModal(!showUpdateModal);
  };


  // Delete item
  const deleteItem = (id) => {
    console.log("Product ID: ", id);
    console.log(`http://localhost:4000/api/purchase/delete/${id}`);
    fetch(`http://localhost:4000/api/purchase/delete/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUpdatePage(!updatePage);
      });
  };

  

  // Handle Page Update  
  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center">
      <div className=" flex flex-col gap-5 w-11/12">
        {showPurchaseModal && (
          <AddPurchaseDetails
            addPurchaseModalSetting={addPurchaseModalSetting}
            handlePageUpdate={handlePageUpdate}
            authContext = {authContext}
          />
        )},
         {showUpdateModal && (
          <UpdatePurchase
            updatePurchaseData={updatePurchase}
            updateModalSetting={updatePurchaseModalSetting}
            handlePageUpdate={handlePageUpdate}
          />
        )}

        {/* Table  */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center ">
              <span className="font-bold">Detalles de Compras</span>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
                onClick={addPurchaseModalSetting}
              >
                Agregar Compra
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Producto
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Diseño
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Und Compradas
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Costo/und
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Total Costo $
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Fecha
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Observación
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Acción
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                    text
                    </td>
                     <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                     text
                     
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    text
                    </td> 
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    text
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    text
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    text
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    text
                    </td> 
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      <span
                        className="text-green-700 cursor-pointer"
                        onClick={() => updatePurchaseModalSetting()}
                        
                      >
                        Editar{" "}
                      </span>
                      <span
                        className="text-red-600 px-2 cursor-pointer"
                        onClick={() => deleteItem()}
                      >
                        Borrar
                      </span>
                    </td>
                  </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PurchaseDetails;
