import React from 'react';
import { Dialog, Transition } from "@headlessui/react";
import axios from 'axios'

const DeleteProduct = ({ 
    productId, 
    showDeleteModal, 
    setShowDeleteModal, 
    endpoint, 
    setProducts, 
    products, 
    setFilteredProducts, 
    filteredProducts
 
}) => {


    const confirmDelete = () => {
        if (productId) { 
            deleteProduct(productId);
        }
    };



       
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${endpoint}/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
      setFilteredProducts(filteredProducts.filter(product => product.id !== id));
      setShowDeleteModal(false); // Cerrar el modal de confirmación después de eliminar
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };


  return (
    <div>
        <Transition.Root show={showDeleteModal}>
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
                            ¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.
                        </p>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-center">
                        <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mr-3"
                        onClick={confirmDelete}
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
    </div>
  )
}

export default DeleteProduct
