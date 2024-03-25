import React, { useState, useContext, useEffect } from "react";
import AddProduct from "../components/AddProduct";
import UpdateProduct from "../components/UpdateProduct"; 
import AuthContext from "../AuthContext"; 
//import { Link } from "react-router-dom";
import axios from 'axios'
import DeleteProduct from "../components/DeleteProduct";

const endpoint = 'http://localhost:8000/api'

function Inventory() {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [ products, setProducts ] = useState ([]);
  const [updateProduct, setUpdateProduct] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [ filteredProducts, setFilteredProducts ] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

 


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

  // Modal de confirmación para eliminar un ítem
  const showDeleteConfirmation = (id) => {
    setShowDeleteModal(true);
    setSelectedProductId(id); // Set the selected product ID
  };

  const setItemToDelete = (id) => {
    setSelectedProductId(id);
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

// Función para calcular la suma total del valor de stock
const calcularValorTotalStock = () => {
  let total = 0;

  // Iterar sobre cada producto y sumar el valor de su stock
  products.forEach(product => {
    if (product.designs.length > 0) {
      total += product.designs[0].stock * product.designs[0].price;
    }
  });

  return total;
};

// Función para calcular la suma total de unidades de stock
const calcularUnidadesTotalesStock = () => {
  let totalUnidades = 0;

  // Iterar sobre cada producto y sumar la cantidad de stock de cada diseño
  products.forEach(product => {
    if (product.designs.length > 0) {
      totalUnidades += product.designs.reduce((acc, curr) => acc + curr.stock, 0);
    }
  });

  return totalUnidades;
};

// Función para calcular la cantidad de unidades de stock con diferentes estados
const contarUnidadesPorEstado = (estado) => {
  let count = 0;

  // Iterar sobre cada producto y sumar la cantidad de stock con el estado dado
  products.forEach(product => {
    if (product.designs.length > 0) {
      count += product.designs.filter(design => {
        if (estado === "Stock Bajo") {
          return design.stock > 0 && design.stock <= 3;
        } else if (estado === "Sin Stock") {
          return design.stock === 0;
        }
        return false;
      }).length;
    }
  });

  return count;
};


  return (
    <div className="col-span-12 lg:col-span-10  flex justify-center">
      <div className=" flex flex-col gap-5 w-11/12">
        <div className="bg-white rounded p-3">
          <span className="font-bold px-4">Inventario General</span>
          <div className=" flex flex-col md:flex-row justify-center items-center">
            <div className="flex flex-col p-10  w-full  md:w-3/12  ">
              <span className="font-semibold text-blue-600 text-base">
                Productos
              </span>
              <span className="font-semibold text-gray-600 text-base">
                {products.length}
              </span>
              <span className="font-thin text-gray-400 text-xs">
                Todos los productos
              </span>
            </div>
            <div className="flex flex-col gap-3 p-10   w-full  md:w-3/12 sm:border-y-2  md:border-x-2 md:border-y-0">
              <span className="font-semibold text-green-600 text-base">
                Stock Total
              </span>
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                   {calcularUnidadesTotalesStock()} 
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Stock
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                     ${calcularValorTotalStock()}  
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
                  {contarUnidadesPorEstado("Stock Bajo")} 
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Stock Bajo
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-red-600 text-base">
                  {contarUnidadesPorEstado("Sin Stock")}
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

        {showDeleteModal && (
          <DeleteProduct 
            productId={selectedProductId}
            showDeleteModal={showDeleteModal}
            setShowDeleteModal={setShowDeleteModal}
            endpoint={endpoint}
            setProducts={setProducts}
            products={products}
            setFilteredProducts={setFilteredProducts}
            filteredProducts={filteredProducts}
            showDeleteConfirmation={showDeleteConfirmation}
            setItemToDelete={setItemToDelete}
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
                    {product.designs.length > 0 ? product.designs[0].stock : 'No Stock'}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    ${product.designs.length > 0 ? product.designs[0].price : 'No Price'}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    ${product.designs[0].stock * product.designs[0].price}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {product.designs.length > 0 ? product.designs[0].description : 'No Description'}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {product.designs[0].stock > 0 && product.designs[0].stock <= 3
                      ? "Stock Bajo 🔰"
                      : product.designs[0].stock > 3
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
                        onClick={() => showDeleteConfirmation(product.id)}
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
