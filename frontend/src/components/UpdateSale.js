import React, { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
//import AuthContext from "../AuthContext";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const endpoint = 'http://localhost:8000/api/sales/'
const endpoint2 = 'http://localhost:8000/api'

const UpdateSale = ({saleId}) => {

  const [products, setProducts] = useState([]); // Estado para almacenar los productos disponibles
  const [product, setProduct] = useState('');
  const [availableDesigns, setAvailableDesigns] = useState([]);
  //const [designState, setDesign] = useState(design);
  const [design, setDesign] = useState('');
  //const [designState, setDesignState] = useState('');
  const [client, setClient] = useState('');
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [saleschannel, setSalesChannel] = useState('');
  const [methodpay, setMethodPay] = useState('');
  const [selectedDesignStock, setSelectedDesignStock] = useState(0);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const update = async (e) => {
    e.preventDefault()
    await axios.put(`${endpoint}${saleId}`, {
      product: product, 
      design: design, 
      client: client,
      stock: stock,
      price: price,
      saleschannel: saleschannel,
      methodpay: methodpay,
      date: date,
      description: description,
    })
    // Cerrar el modal y recargar la página
    setOpen(false);
    window.location.reload();
    navigate('/sales') 
  }

  useEffect( () =>{ 

    const getSaleById = async () => {
      try {
        const response = await axios.get(`${endpoint}${saleId}`);
        const { product, design, client, stock, date, price, saleschannel, methodpay, description } = response.data;
        setProduct(product);
        setDesign(design);
        setClient(client);
        setStock(stock);
        setPrice(price);
        setDate(date);
        setSalesChannel(saleschannel);
        setMethodPay(methodpay);
        setDescription(description);
        
      const selectedProducts = products.filter(product => product.product === product);
      if (selectedProducts.length > 0) {
        const allDesigns = selectedProducts.reduce((accumulator, currentProduct) => {
          accumulator.push(...currentProduct.designs);
          return accumulator;
        }, []);
        setAvailableDesigns(allDesigns);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  if (saleId) {
    setOpen(true); // Abre el modal al cargar los datos de la venta
    getSaleById();
  }
}, [saleId, products]); // Agregar products a las dependencias del efecto

    // Función para obtener la lista de productos disponibles al cargar la página
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${endpoint2}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    useEffect( () =>{
    fetchProducts();
  }, []);

  const cancelButtonRef = useRef(null);

const handleProductChange = (e) => {
  const selectedProductName = e.target.value;
  setProduct(selectedProductName);
  const selectedProducts = products.filter(product => product.product === selectedProductName);
  if (selectedProducts.length > 0) {
    const allDesigns = selectedProducts.reduce((accumulator, currentProduct) => {
      accumulator.push(...currentProduct.designs);
      return accumulator;
    }, []);
    setAvailableDesigns(allDesigns);
    setDesign('');
    setStock(0);
    setPrice(0);
    setSelectedDesignStock(0);
  } else {
    // Si no hay productos seleccionados, resetear las variables relacionadas con el diseño
    setAvailableDesigns([]);
    setDesign('');
    setStock(0);
    setPrice(0);
    setSelectedDesignStock(0);
  } 
};

  // Función para manejar el cambio de diseño seleccionado
  const handleDesignChange = (e) => {
    const selectedDesignName = e.target.value; // Usamos el nombre del diseño en lugar de su identificador
    setDesign(selectedDesignName); // Establecemos el estado design con el nombre del diseño seleccionado
    const selectedDesignInfo = availableDesigns.find(design => design.design === selectedDesignName);
    if (selectedDesignInfo) {
      setStock(selectedDesignInfo.stock);
      setPrice(selectedDesignInfo.price);
      setSelectedDesignStock(selectedDesignInfo.stock);
    }
  };
  

   return (
    // Modal
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                      <PlusIcon
                        className="h-6 w-6 text-blue-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left ">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-semibold leading-6 text-gray-900 "
                      >
                        Editar Venta
                      </Dialog.Title>
                      <form onSubmit={update}>
                        <div className="grid grid-flow-row gap-4 mb-4 mt-4 sm:grid-cols-2">
                          <div className="col-span-2">
                            <label
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Producto
                            </label>
                            <input
                              value={product}
                              onChange={handleProductChange}
                              className="bg-gray-50 border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              disabled
                            />
                          </div>
                        </div>
                        <div className="grid grid-flow-row gap-4 my-4 grid-cols-2">
                          <div className="col-span-2">
                              <div className="grid gap-4 my-2 grid-cols-1">
                                
                                  <div>
                                    <label
                                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                      Diseño 
                                    </label>
                                    <input
                                      value={design}
                                      onChange={handleDesignChange}
                                      className="bg-gray-50 border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                      disabled
                                  />
                                    
                                  </div>
                                  <div className="grid gap-4 my-2 grid-cols-2">
                                  <div>
                                    <label
                                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                      Stock 
                                    </label>
                                    <input
                                      type="number"
                                      value={stock}
                                      disabled
                                      onChange={(e) => {
                                        const inputValue = parseInt(e.target.value);
                                       // Verificar que el valor ingresado no sea mayor al stock existente ni igual a 0
                                        if (!isNaN(inputValue) && inputValue > 0 && inputValue <= selectedDesignStock) {
                                          setStock(inputValue);
                                        }
                                      }}
                                      className="bg-gray-50 border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    />
                                  </div>
                                  <div>
                                  <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                  >
                                    Precio
                                  </label>
                                  <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => {
                                      const inputValue = setPrice(e.target.value);
                                      // Verificar que el valor ingresado sea un número válido
                                      if (!isNaN(inputValue)) {
                                        setPrice(inputValue);
                                      }
                                    }}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                  />
                                  </div>
                                  <div>
                                    <label
                                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                      Cliente 
                                    </label>
                                    <input
                                      type="text"
                                      value={client}
                                      onChange={ (e)=> setClient(e.target.value)}
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                      placeholder="Nombre cliente"
                                    />
                                  </div>
                               
                                <div>
                                  <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                  >
                                    Canal de venta
                                  </label>
                                  <input
                                    type="text"
                                    value={saleschannel}
                                    onChange={ (e)=> setSalesChannel(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="ej. Mercadolibre"
                                  />
                                </div>
                                <div>
                                  <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                  >
                                    Método de Pago
                                  </label>
                                  <input
                                    type="text"
                                    value={methodpay}
                                    onChange={ (e)=> setMethodPay(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="ej. Efectivo"
                                  />
                                </div>
                                <div>
                                  <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                  >
                                    Fecha
                                  </label>
                                  <input
                                    type="date"
                                    value={date}
                                    onChange={ (e)=> setDate(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="$299"
                                  />
                                </div>
                              </div>
                              </div>
                          </div>
                        </div>
                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                           
                         
                          <div className="sm:col-span-2">
                            <label
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Observación
                            </label>
                            <textarea
                              rows="5"
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Descripción breve del producto..."
                              value={description}
                              onChange={ (e)=> setDescription(e.target.value)}
                              maxLength={60}
                            >
                              Standard glass, 3.8GHz 8-core 10th-generation
                              Intel Core i7 processor, Turbo Boost up to 5.0GHz,
                              16GB 2666MHz DDR4 memory, Radeon Pro 5500 XT with
                              8GB of GDDR6 memory, 256GB SSD storage, Gigabit
                              Ethernet, Magic Mouse 2, Magic Keyboard - US
                            </textarea>
                          </div>
                        </div>
                        <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                          <button
                            type="button"
                            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                            onClick={update}
                          >
                            Actualizar
                          </button>
                          <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            onClick={() => setOpen(false)}
                          >
                            Cancelar
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
} 

export default UpdateSale
