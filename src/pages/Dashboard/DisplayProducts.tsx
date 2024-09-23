import Loader from '../../common/Loader';
import CardFour from '../../components/CardFour';
import CardThree from '../../components/CardThree';
import CardTwo from '../../components/CardTwo';
import {
  useGetProductApi,
  useGetUserProductApi,
} from '../../data/hooks/product';
import { message } from 'antd';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiShoppingCart } from 'react-icons/fi';
import ProductCard from '../../components/ProductCard';
import Breadcrumb from '../../components/Breadcrumb';

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

const DisplayProduct = () => {
    const { user } = useAuth();
    const isAdmin = user?.type === 'admin';

    const {
      data: adminProductData,
      isLoading: adminLoading,
      error: adminError,
    } = useGetProductApi();
    const {
      data: userProductData,
      isLoading: userLoading,
      error: userError,
    } = useGetUserProductApi();

    const data = isAdmin ? adminProductData : userProductData;
    const isLoading = isAdmin ? adminLoading : userLoading;
    const error = isAdmin ? adminError : userError;

    const emptyState =
      (user?.type === 'sales' && userProductData?.products.length < 1) ||
      (user?.type === 'admin' && adminProductData?.products.length < 1);

    const hasShownError = useRef(false);

    useEffect(() => {
      if (error && !hasShownError.current) {
        message.error(
          error.message || 'An error occurred while fetching products',
        );
        hasShownError.current = true;
      }
    }, [error]);

    if (isLoading) return <Loader />;

  return (
    <div className="space-y-10">
      <Breadcrumb pageName="Products" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {/* <CardTwo sales={data?.processProduct.totalSales} /> */}
        <CardTwo sales={data?.processProduct.totalSales} />
        <CardThree product={data?.processProduct.totalProduct} />
        {/* <CardThree product={data?.processProduct.totalProduct} /> */}
        {isAdmin && <CardFour user={data?.processProduct.totalUser} />}
      </div>
      {emptyState && (
        <div className="flex flex-col items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <FiShoppingCart
              className="w-24 h-24 text-purple-500"
              aria-hidden="true"
            />
            <h1 className="mt-4 text-2xl font-bold text-gray-800">
              No Products Found
            </h1>
            <p className="mt-2 text-gray-600">
              It looks like there are no products available right now.
            </p>
            <div className="mt-6">
              <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-purple-500 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Add products
              </Link>
            </div>
          </div>
        </div>
      )}
      {(adminError || userError) && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md shadow-sm">
          <div className="flex items-center">
            <svg
              className="h-6 w-6 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="font-semibold">Error fetching products</p>
          </div>
          <p className="mt-2 text-sm">
            Please try refreshing the page or contact support if the problem
            persists.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.products?.map((product: DisplayProductType) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default DisplayProduct;
