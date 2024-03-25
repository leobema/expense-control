import React, { useState, useEffect } from "react";
import AddPriceMp from "../components/AddPriceMp";
import UpdatePriceMp from "../components/UpdatePriceMp";
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

  const showDeleteConfirmation = (id) => {
    // Implement your logic for delete confirmation here
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
                        onClick={() => showDeleteConfirmation(price.id)}
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
