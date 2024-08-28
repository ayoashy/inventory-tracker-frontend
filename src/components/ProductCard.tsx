import React from 'react';
import {
  FaBox,
  FaDollarSign,
  FaCubes,
  FaCalculator,
  FaEdit,
  FaTrash,
} from 'react-icons/fa';

type Product = {
  name: string;
  price: number;
  quantity: number;
};

interface ProductCardProps {
  product: {
    products: Product[];
    _id: string;
  };
  totalQuantity: number;
  totalPrice: number;
  handleEdit: (product: any) => void;
  handleDelete: (id: string) => void;
}

const ProductCardComponent: React.FC<ProductCardProps> = ({
  product,
  totalQuantity,
  totalPrice,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div>
      <div className="space-y-4">
        {product.products.map((prod, index) => (
          <div
            key={index}
            className="flex items-center justify-between space-x-4"
          >
            <div className="flex items-center space-x-2 w-1/3">
              <FaBox className="text-indigo-500" />
              <span className="text-gray-800 dark:text-gray-300">
                {prod.name}
              </span>
            </div>
            <div className="flex items-center space-x-2 w-1/3">
              <FaDollarSign className="text-green-500" />
              <span className="text-gray-800 dark:text-gray-300">
                ${prod.price.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center space-x-2 w-1/3">
              <FaCubes className="text-blue-500" />
              <span className="text-gray-800 dark:text-gray-300">
                {prod.quantity}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaCalculator className="text-purple-500" />
            <span className="font-semibold text-gray-800 dark:text-gray-300">
              Totals:
            </span>
          </div>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <FaCubes className="text-blue-500" />
              <span className="font-semibold text-gray-800 dark:text-gray-300">
                {totalQuantity}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <FaDollarSign className="text-green-500" />
              <span className="font-semibold text-gray-800 dark:text-gray-300">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={() => handleEdit(product)}
          className="p-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          <FaEdit className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleDelete(product._id)}
          className="p-2 text-red-600 hover:text-red-800 transition-colors duration-200"
        >
          <FaTrash className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ProductCardComponent;
