import React, { useState, useEffect } from "react";
import AddSale from '../components/AddSale';
import UpdateSale from '../components/UpdateSale';
import DeleteSale from "../components/DeleteSale"; 
import axios from 'axios'
//import AuthContext from "../AuthContext";

const endpoint = 'http://localhost:8000/api'

function Sales() {
  const [selectedSaleId, setSelectedSaleId] = useState(null); 
  const [sales, setSales ] = useState ([]);
  const [updateSale, setUpdateSale] = useState([]);
  const [showSalesModal, setShowSalesModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [ filteredSales, setFilteredSales ] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  //const [showAddModal, setShowAddModal] = useState(false); 
  //const [showSaleModal, setShowSaleModal] = useState(false);
  // const [updatePage, setUpdatePage] = useState(true);
 
    useEffect ( () => {
      getAllSales()
    }, [])  

    const getAllSales = async () => {
      try {
        const response = await axios.get(`${endpoint}/sales`);
        setSales(response.data);
        setFilteredSales(response.data); // Initialize filtered products with all sales
      } catch (error) {
        console.error("Error fetching sales:", error);
      }
    };



    // Modal de confirmación para eliminar un ítem
  const showDeleteConfirmation = (id) => {
    setShowDeleteModal(true);
    setSelectedSaleId(id); // Set the selected product ID
  };

  const setItemToDelete = (id) => {
    setSelectedSaleId(id);
  };

    // Modal for Sale ADD
    const addSaleModalSetting = () => {
      setShowSalesModal(prevState => !prevState);
    };
  
    // Modal for Product UPDATE
    const updateProductModalSetting = (saleId) => {
      setSelectedSaleId(saleId);
      // Lógica para mostrar el modal aquí
    };

/*     // Función para cerrar el modal de actualización
const closeUpdateModal = () => {
  setShowUpdateModal(false);
  setSelectedSaleId(null); // Restablecer el estado de selectedSaleId a null
}; */

   // Handle Search Term
const handleSearchTerm = (e) => {
  const term = e.target.value.toLowerCase(); // Convertir el término de búsqueda a minúsculas
  setSearchTerm(term); // Establecer el término de búsqueda en el estado

  // Filtrar ventas basados en el término de búsqueda
  const filteredSales = sales.filter(sale =>
    sale.product.toLowerCase().includes(term) || // Filtrar por nombre de producto
    sale.design.toLowerCase().includes(term) || // Filtrar por nombre de diseño
    sale.client.toLowerCase().includes(term) || // Filtrar por nombre de cliente
    sale.saleschannel.toLowerCase().includes(term) || // Filtrar por canal de venta
    sale.methodpay.toLowerCase().includes(term) || // Filtrar por método de pago
    sale.description.toLowerCase().includes(term) // Filtrar por descripción
  );

  // Actualizar la lista de ventas filtradas o mostrar todas las ventas si el término de búsqueda está vacío
  setFilteredSales(term ? filteredSales : sales);
};


  return (
    <div className="col-span-12 lg:col-span-10  flex justify-center">
      <div className=" flex flex-col gap-5 w-11/12">
      <div className="bg-white rounded p-3">
          <span className="font-bold px-4">Control de Ventas</span>
          <div className=" flex flex-col md:flex-row justify-center items-center">
            <div className="flex flex-col p-10  w-full  md:w-3/12  ">
              <span className="font-semibold text-blue-600 text-base">
                Top 10 Últimos 30 días
              </span>
              <span className="font-semibold text-gray-600 text-2xl">
               #1 Remeras
              </span>
              <span className="font-semibold text-gray-600 text-xl">
               #2 Gorras
              </span>
              <span className="font-semibold text-gray-600 text-lg">
               #3 Almohadones
              </span>
              <span className="font-semibold text-gray-600 text-base">
               #4 Parches
              </span>
              <span className="font-semibold text-gray-600 text-xs">
               #5 Otro, #6 Otro, #7 Otro, <br/>
               #8 Otro, #9 Otro, #10 Otro.
              </span>
              
              <span className="font-thin text-gray-400 text-xs">
                Productos más vendidos del Mes
              </span>
            </div>
            <div className="flex flex-col gap-3 p-10   w-full  md:w-3/12 sm:border-y-2  md:border-x-2 md:border-y-0">
              <span className="font-semibold text-green-600 text-base">
                Stock Total
              </span>
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                   {/* {totalStockUp}  */}
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Suma de stock
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                     {/* ${totalPriceUp}  */}
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Valor Total
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 p-10  w-full  md:w-3/12  border-y-2  md:border-x-2 md:border-y-0">
              <span className="font-semibold text-yellow-600 text-base">
                Stock Bajo
              </span>
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="font-semibold text-yellow-600 text-base">
                   {/* {countProductsLowStock}  */}
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Stock Bajo
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-red-600 text-base">
                   {/* {countProductsNoStock}  */}
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Sin Stock
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 p-10  w-full  md:w-3/12  border-y-2  md:border-x-2 md:border-y-0">
              <span className="font-semibold text-red-600 text-base">
                Sin Definir
              </span>
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    0
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Ordenado
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    0
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Sin Stock
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showSalesModal && (
          <AddSale
          addSaleModalSetting={addSaleModalSetting}
          handlePageUpdate={getAllSales}
          />
        )}
        {showUpdateModal && (
           <UpdateSale
           saleId={selectedSaleId}
           updateProductData={updateSale}
           updateModalSetting={updateProductModalSetting}
           handlePageUpdate={getAllSales}
           //design={filteredSales.find(sale => sale.id === selectedSaleId)?.design}
          /> 
          )}

        {showDeleteModal && (
          <DeleteSale 
            saleId={selectedSaleId}
            showDeleteModal={showDeleteModal}
            setShowDeleteModal={setShowDeleteModal}
            endpoint={endpoint}
            setSales={setSales}
            sales={sales}
            setFilteredSales={setFilteredSales}
            filteredSales={filteredSales}
            showDeleteConfirmation={showDeleteConfirmation}
            setItemToDelete={setItemToDelete}
          />
        )}
       
        {/* Table  */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center ">
              <span className="font-bold">Ventas</span>
              <div className="flex justify-center items-center px-2 border-2 rounded-md ">
                <img
                  alt="search-icon"
                  className="w-5 h-5"
                  src={require("../assets/search-icon.png")}
                />
                <input
                  className="border-none outline-none focus:border-none text-xs"
                  type="text"
                  placeholder="buscar venta"
                  value={searchTerm}
                  onChange={handleSearchTerm}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
                onClick={addSaleModalSetting}
              >
                {/* <Link to="/inventory/add-product">Add Product</Link> */}
                Agregar Venta
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
                  Cliente
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Canal de Venta
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Método de Pago
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Und
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Precio
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Total $
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
            {filteredSales.map((sale) => ( 
             
                  <tr key={sale.id}>
                    
                    <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                    {sale.product}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {sale.design}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {sale.client}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {sale.saleschannel}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {sale.methodpay}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {sale.stock}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    ${sale.price}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    ${sale.price * sale.stock}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {sale.date}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {sale.description}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      <span
                        className="text-green-700 cursor-pointer"
                        onClick={() => {
                          setSelectedSaleId(sale.id);
                          setShowUpdateModal(true);
                          setUpdateSale();
                        }}
                      >
                        Editar{" "}
                      </span>
                      <span
                        className="text-red-600 px-2 cursor-pointer"
                        onClick={() => showDeleteConfirmation(sale.id)}
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

export default Sales;
