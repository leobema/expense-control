import React, { useState, useEffect } from "react";
import AddPurchaseDetails from "../components/AddPurchaseDetails";
import UpdatePurchase from "../components/UpdatePurchase";
import { Dialog, Transition } from "@headlessui/react";
//import AuthContext from "../AuthContext";
import axios from "axios";

const endpoint = 'http://localhost:8000/api/'

function PurchaseDetails() {

  const [filteredPurchases, setFilteredPurchases] = useState([]);
  const [updatePurchase, setUpdatePurchase] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedPurchaseId, setSelectedPurchaseId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

 


  useEffect ( () => { 
    getAllPurchases()
  }, [])  

  const getAllPurchases = async () => {
    try {
      const response = await axios.get(`${endpoint}purchases`);
      setFilteredPurchases(response.data); // Initialize filtered products with all sales
    } catch (error) {
      console.error("Error fetching sales:", error);
    }
  };

  const handlePageUpdate = () => {
    getAllPurchases();
  };
  
  // Modal for Purchase Add
  const addPurchaseModalSetting = () => {
  setShowPurchaseModal(prevState => !prevState);
};

  // Modal for Purchase UPDATE
  const updatePurchaseModalSetting = (purchaseId) => {
    setSelectedPurchaseId(purchaseId);
    // Lógica para mostrar el modal aquí
  };

const deletePurchase = async (id) => {
  try {
      await axios.delete(`${endpoint}purchases/${id}`);
      setShowDeleteModal(false);
      setSelectedPurchaseId(id);
      handlePageUpdate();
  } catch (error) {
      console.error("Error deleting price:", error);
  }
};


  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center">
      <div className=" flex flex-col gap-5 w-11/12">
         {showPurchaseModal && (
          <AddPurchaseDetails
            addPurchaseModalSetting={addPurchaseModalSetting}
            handlePageUpdate={getAllPurchases}
          />
        )}
          {showUpdateModal && (
          <UpdatePurchase
            purchaseId={selectedPurchaseId}
            updatePurchaseData={updatePurchase}
            updateModalSetting={updatePurchaseModalSetting}
            handlePageUpdate={handlePageUpdate}
          />
        )}  

        {/* Modal de confirmación para eliminar */} 
        {showDeleteModal && (
                    <Transition.Root show={true}>
                    <Dialog
                        as="div"
                        className="fixed inset-0 overflow-y-auto flex items-center justify-center"
                        onClose={() => setShowDeleteModal(false)}
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                        <Transition.Child
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4"
                        enterTo="opacity-100 translate-y-0"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-4"
                        >
                        <div className="relative top-20 mx-auto w-full max-w-lg">
                            <div className="bg-white rounded-lg shadow-xl p-6">
                            <div className="text-center">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                Confirmar eliminación
                                </Dialog.Title>
                                <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                    ¿Estás seguro de que deseas eliminar este item? Esta acción no se puede deshacer.
                                </p>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-center">
                                <button
                                type="button"
                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mr-3"
                                onClick={() => deletePurchase(selectedPurchaseId)}
                                >
                                Eliminar
                                </button>
                                <button
                                type="button"
                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={() => setShowDeleteModal(false)}
                                >
                                Cancelar
                                </button>
                            </div>
                            </div>
                        </div>
                        </Transition.Child>
                    </Dialog>
                </Transition.Root>
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
                  Item
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Precio
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Cant
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  $ Total
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
                  {filteredPurchases.map((purchase) => ( 
                  <tr key={purchase.id}>
                    <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                    {purchase.name}
                    </td>
                     <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                     {purchase.price} 
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {purchase.stock}
                    </td> 
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    ${purchase.stock * purchase.price}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {purchase.date}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {purchase.description}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      <span
                        className="text-green-700 cursor-pointer"
                        onClick={() => {
                          setSelectedPurchaseId(purchase.id);
                          setShowUpdateModal(true);
                          setUpdatePurchase(purchase); 
                        }} 
                      >
                        Editar{" "}
                      </span>
                      <span
                        className="text-red-600 px-2 cursor-pointer"
                        onClick={() => {
                          setShowDeleteModal(true)
                          setSelectedPurchaseId(purchase.id)
                        }}
                      >
                        Borrar
                      </span>
                    </td>
                  </tr>
            ))}
            </tbody> 
          </table>
        </div>
      </div>
    </div>
  );
}

export default PurchaseDetails;
