import React, { useState } from "react";
import AddSale from '../components/AddSale'
import UpdateSale from '../components/UpdateSale'
//import AuthContext from "../AuthContext";


function Sales() {
  //const [showSaleModal, setShowSaleModal] = useState(false);
  const [showSalesModal, setShowSalesModal] = useState(false);
 // const [updatePage, setUpdatePage] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
 


 // const authContext = useContext(AuthContext);


    // Modal for Sale ADD
    const addSaleModalSetting = () => {
      setShowSalesModal(prevState => !prevState);
    };
  
    // Modal for Product UPDATE
    const updateProductModalSetting = (productId) => {
      setSelectedSalesId(productId);
      // Lógica para mostrar el modal aquí
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
            addProductModalSetting={addProductModalSetting}
            handlePageUpdate={handlePageUpdate}
          />
        )}
        {showUpdateModal && (
           <UpdateSale
            productId={selectedProductId}
            updateProductData={updateProduct}
            updateModalSetting={updateProductModalSetting}
            handlePageUpdate={handlePageUpdate}
          /> 
          )}
       
        {/* Table  */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center ">
              <span className="font-bold">Ventas</span>
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
                  Tipo de Venta
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Und Vendidas
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Precio/und
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
                    text
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      <span
                        className="text-green-700 cursor-pointer"
                      >
                        Editar{" "}
                      </span>
                      <span
                        className="text-red-600 px-2 cursor-pointer"
                        // onClick={() => deleteItem()}
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

export default Sales;
