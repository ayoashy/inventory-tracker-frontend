import { message } from "antd";
import { useEffect } from "react";
import { FaBox, FaCalculator, FaCubes, FaDollarSign, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDeleteProductApi } from "../data/hooks/product";
import { useGetUserApi } from "../data/hooks/auth";

type ProductType = {
  name: string;
  price: number;
  quantity: number;
};

type DisplayProductType = {
  _id: string;
  products: ProductType[];
  authorId: {
    name: string;
    _id: string;
    email: string;
    type: string;
  };
};

type ProductCardProps = {
  product: DisplayProductType;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const deleteProductMutation = useDeleteProductApi();
  const { error: deleteError } = deleteProductMutation;
  const { data: userData, isLoading } = useGetUserApi();
  const navigate = useNavigate();
  const isAdmin = userData?.user?.type === 'admin';


  useEffect(() => {
    if (deleteProductMutation.isError) {
      message.error('Unable to delete product' as string);
    }
    if (deleteProductMutation.isSuccess) {
      message.success('Product deleted successfully');
    }
  }, [deleteProductMutation.isError, deleteProductMutation.isSuccess]);

  const handleDelete = (id: string) => {
    deleteProductMutation.mutateAsync({ id });
  };

  const totalQuantity = product.products.reduce(
    (sum, prod) => sum + prod.quantity,
    0,
  );
  const totalPrice = product.products.reduce(
    (sum, prod) => sum + prod.price * prod.quantity,
    0,
  );

  const handleEdit = (product: DisplayProductType) => {
    localStorage.setItem('editData', JSON.stringify(product));
    navigate(`/?edit=${product._id}`);
  };

  return (
    <div className="rounded-lg border border-stroke bg-white p-6 shadow-md dark:border-strokedark dark:bg-boxdark">
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
                <span className="font-semibold text-gray-800 dark:text-gray-300">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
        {isAdmin && (
          <div className="mt-4 flex justify-between items-center">
            <div
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                product.authorId.type === 'admin'
                  ? 'bg-green-200 text-green-800'
                  : 'bg-yellow-200 text-yellow-800'
              }`}
            >
              {product.authorId.name}
            </div>
            <div className="flex space-x-2">
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
        )}
      </div>
    </div>
  );
};

export default ProductCard;