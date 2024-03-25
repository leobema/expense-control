import React, { useState, useEffect } from "react";
import AddPriceMp from "../components/AddPriceMp";
import UpdatePriceMp from "../components/UpdatePriceMp";
import { Dialog, Transition } from "@headlessui/react";
import axios from 'axios'


const endpoint = 'http://localhost:8000/api'

function PricesItemsMp() {
    const [prices, setPrices] = useState([]);
    const [updatePrice, setUpdatePrice] = useState([]);
    const [selectedPriceId, setSelectedPriceId] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPrices, setFilteredPrices] = useState([]);
    const [showItemModal, setShowItemModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);


  useEffect ( () => {
    getAllPrices()
  }, [])  

  const getAllPrices = async () => {
    try {
      const response = await axios.get(`${endpoint}/prices`);
      setPrices(response.data);
      setFilteredPrices(response.data); // Assuming initially filtered prices are same as all prices
    } catch (error) {
      console.error("Error fetching prices:", error);
    }
  };

  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value);
    filterPrices(event.target.value);
  };

  const filterPrices = (term) => {
    const filtered = prices.filter(price =>
      price.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredPrices(filtered);
  };
    // Modal for Product UPDATE
    const updatePriceModalSetting = (productId) => {
        setSelectedPriceId(productId);
        // Lógica para mostrar el modal aquí
      };
    

  // Modal for Item ADD
  const addItemModalSetting = () => {
    setShowItemModal(prevState => !prevState);
  };

  const handlePageUpdate = () => {
    getAllPrices();
  };

  const deletePrice = async (id) => {
    try {
        await axios.delete(`${endpoint}/prices/${id}`);
        setShowDeleteModal(false);
        setSelectedPriceId(id);
        handlePageUpdate();
    } catch (error) {
        console.error("Error deleting price:", error);
    }
  };


  return (
    <div className="col-span-12 lg:col-span-10  flex justify-center">
      <div className=" flex flex-col gap-5 w-11/12">

         {showItemModal && (
          <AddPriceMp
            addItemModalSetting={addItemModalSetting}
            handlePageUpdate={handlePageUpdate}
          />
        )}
         {showUpdateModal && (
           <UpdatePriceMp
            priceId={selectedPriceId}
            updatePricetData={updatePrice}
            updateModalSetting={updatePriceModalSetting}
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
                                onClick={() => deletePrice(selectedPriceId)}
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
              <span className="font-bold">Items</span>
              <div className="flex justify-center items-center px-2 border-2 rounded-md ">
                <img
                  alt="search-icon"
                  className="w-5 h-5"
                  src={require("../assets/search-icon.png")}
                />
                <input
                  className="border-none outline-none focus:border-none text-xs"
                  type="text"
                  placeholder="buscar item"
                  value={searchTerm}
                  onChange={handleSearchTerm}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
                onClick={addItemModalSetting}
              >
                Agregar Item
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
                  Última Actualización
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Acción
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
            {filteredPrices.map((price) => (         
                  <tr key={price.id}> 
                    <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                     {price.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {price.price}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    N/a
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      <button
                        className="text-green-700 cursor-pointer"
                        
                         onClick={() => {
                          setSelectedPriceId(price.id);
                          setShowUpdateModal(true);
                          setUpdatePrice(price); 
                        }} 
                      >
                        Editar{" "}
                      </button>
                      <span
                        className="text-red-600 px-2 cursor-pointer"
                        onClick={() => {
                          setShowDeleteModal(true)
                          setSelectedPriceId(price.id)
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

export default PricesItemsMp;
