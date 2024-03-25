import React, { useState, useEffect } from "react";
import AddPurchaseDetails from "../components/AddPurchaseDetails";
//import UpdatePurchase from "../components/UpdatePurchase";
//import AuthContext from "../AuthContext";
import axios from "axios";

const endpoint = 'http://localhost:8000/api/'

function PurchaseDetails() {
  const [purchases, setPurchases] = useState(false);
  const [filteredPurchases, setFilteredPurchases] = useState([]);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
 


  useEffect ( () => { 
    getAllPurchases()
  }, [])  

  const getAllPurchases = async () => {
    try {
      const response = await axios.get(`${endpoint}purchases`);
      setPurchases(response.data);
      setFilteredPurchases(response.data); // Initialize filtered products with all sales
    } catch (error) {
      console.error("Error fetching sales:", error);
    }
  };
  
  // Modal for Purchase Add
  const addPurchaseModalSetting = () => {
  setShowPurchaseModal(prevState => !prevState);
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
        {/*  {showUpdateModal && (
          <UpdatePurchase
            updatePurchaseData={updatePurchase}
            updateModalSetting={updatePurchaseModalSetting}
            handlePageUpdate={handlePageUpdate}
          />
        )}  */}

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
                       // onClick={() => updatePurchaseModalSetting()}
                        
                      >
                        Editar{" "}
                      </span>
                      <span
                        className="text-red-600 px-2 cursor-pointer"
                        //onClick={() => deleteItem()}
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
