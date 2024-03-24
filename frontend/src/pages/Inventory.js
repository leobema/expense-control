import React, { useState, useContext, useEffect } from "react";
import AddProduct from "../components/AddProduct";
import UpdateProduct from "../components/UpdateProduct"; 
import AuthContext from "../AuthContext"; 
//import { Link } from "react-router-dom";
import axios from 'axios'

const endpoint = 'http://localhost:8000/api'

function Inventory() {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [ products, setProducts ] = useState ([]);
  const [updateProduct, setUpdateProduct] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [ filteredProducts, setFilteredProducts ] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
 


  const authContext = useContext(AuthContext);
  console.log('====================================');
  console.log(authContext);
  console.log('====================================');

  useEffect ( () => {
    getAllProducts()
  }, [])  

  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${endpoint}/products`);
      setProducts(response.data);
      setFilteredProducts(response.data); // Initialize filtered products with all products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
 
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${endpoint}/product/${id}`);
      setProducts(products.filter(product => product.id !== id));
      setFilteredProducts(filteredProducts.filter(product => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Modal for Product ADD
  const addProductModalSetting = () => {
    setShowProductModal(prevState => !prevState);
  };

  // Modal for Product UPDATE
  const updateProductModalSetting = (productId) => {
    setSelectedProductId(productId);
    // Lógica para mostrar el modal aquí
  };

  const handlePageUpdate = () => {
    getAllProducts();
  };

// Handle Search Term
const handleSearchTerm = (e) => {
  const term = e.target.value.toLowerCase(); // Convertir el término de búsqueda a minúsculas
  setSearchTerm(term); // Establecer el término de búsqueda en el estado

  // Filtrar productos basados en el término de búsqueda
  const filteredProducts = products.filter(product =>
    product.product.toLowerCase().includes(term)
  );

  // Actualizar la lista de productos filtrados
  setFilteredProducts(filteredProducts);
};

   // Calcula la suma total del stock de todos los productos
  const totalStockUp = products.reduce((accumulator, stockup) => accumulator + stockup.stock, 0);

  // Calcula la suma total del precios de todos los productos
  //const totalPriceUp = products.reduce((accumulator, priceup) => accumulator + priceup.price, 0);

   // Filtra los productos que tienen un stock entre 1 y 3
  const productsLowStock = products.filter(product => product.stock >= 1 && product.stock <= 3);

  // Cuenta el número de productos que cumplen con la condición anterior
  const countProductsLowStock = productsLowStock.length;

  // Filtra los productos que tienen un stock entre 1 y 3
  const productsNoStock = products.filter(product => product.stock === 0);

  // Cuenta el número de productos que cumplen con la condición anterior
  const countProductsNoStock = productsNoStock.length;  

  // Calcula la suma total del valor de todos los productos
const totalValue = filteredProducts.reduce((accumulator, product) => {
  return accumulator + (product.price * product.stock);
}, 0);



  return (
    <div className="col-span-12 lg:col-span-10  flex justify-center">
      <div className=" flex flex-col gap-5 w-11/12">
        <div className="bg-white rounded p-3">
          <span className="font-bold px-4">Inventario General</span>
          <div className=" flex flex-col md:flex-row justify-center items-center">
            <div className="flex flex-col p-10  w-full  md:w-3/12  ">
              <span className="font-semibold text-blue-600 text-base">
                Total de Productos
              </span>
              <span className="font-semibold text-gray-600 text-base">
                {products.length}
              </span>
              <span className="font-thin text-gray-400 text-xs">
                Suma de todos los productos
              </span>
            </div>
            <div className="flex flex-col gap-3 p-10   w-full  md:w-3/12 sm:border-y-2  md:border-x-2 md:border-y-0">
              <span className="font-semibold text-green-600 text-base">
                Stock Total
              </span>
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                   {totalStockUp} 
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Stock
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                     ${totalValue} 
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Valor
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
                   {countProductsLowStock} 
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Stock Bajo
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-red-600 text-base">
                   {countProductsNoStock} 
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

        {showProductModal && (
          <AddProduct
            addProductModalSetting={addProductModalSetting}
            handlePageUpdate={handlePageUpdate}
          />
        )}
        {showUpdateModal && (
           <UpdateProduct
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
              <span className="font-bold">Productos</span>
              <div className="flex justify-center items-center px-2 border-2 rounded-md ">
                <img
                  alt="search-icon"
                  className="w-5 h-5"
                  src={require("../assets/search-icon.png")}
                />
                <input
                  className="border-none outline-none focus:border-none text-xs"
                  type="text"
                  placeholder="buscar producto"
                  value={searchTerm}
                  onChange={handleSearchTerm}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
                onClick={addProductModalSetting}
              >
                {/*<Link to="/addProduct">Add Product</Link>*/}
                Agregar Producto
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
                  Stock
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Precio
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                 Valor/total
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Observación
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Disponible?
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Acción
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
            {filteredProducts.map((product) => (         
                  <tr key={product.id}> 
                    <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                     {product.product}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {product.designs.length > 0 ? product.designs[0].design : 'No Design'}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {product.stock}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    ${product.price}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    ${product.price * product.stock}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {product.description}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {product.stock > 0 && product.stock <= 3
                      ? "Stock Bajo 🔰"
                      : product.stock > 3
                      ? "Stock ✅"
                      : 'Sin Stock ❗'}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      <button
                        className="text-green-700 cursor-pointer"
                        
                        onClick={() => {
                          setSelectedProductId(product.id);
                          setShowUpdateModal(true);
                          setUpdateProduct(product); 
                        }}
                      >
                        Editar{" "}
                      </button>
                      <span
                        className="text-red-600 px-2 cursor-pointer"
                        onClick={() => deleteProduct(product.id)}
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

export default Inventory;
