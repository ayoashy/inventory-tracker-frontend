import { FaBox, FaDollarSign, FaCubes, FaCalculator, FaEdit, FaTrash } from 'react-icons/fa';
import Loader from '../../common/Loader';
import CardFour from '../../components/CardFour';
import CardThree from '../../components/CardThree';
import CardTwo from '../../components/CardTwo';
import { useDeleteProductApi, useGetProductApi, useGetUserProductApi } from '../../data/hooks/product';
import { useGetUserApi } from '../../data/hooks/auth';
import { message } from 'antd';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiShoppingCart } from 'react-icons/fi';
import ProductCard from '../../components/ProductCard';


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
  const { data, isLoading, error } = useGetProductApi();
  const {
    data: userProductData,
    isLoading: userProductLoading,
    error: userProductError,
  } = useGetUserProductApi();
  console.log({ userProductData });
  
  const userData = useAuth();

  const isAdmin = userData?.user?.type === 'admin';
  console.log({ userProductData });
  

  const emptyState =  (userData?.user.type === 'sales' && userProductData?.products.length < 1)

  console.log({data});
  

if(error){
  message.error('message')
}
  


  if (isLoading) return <Loader />;

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {/* <CardTwo sales={data?.processProduct.totalSales} /> */}
        <CardTwo
          sales={
            isAdmin
              ? data?.processProduct.totalSales
              : userProductData?.processProduct.totalSales
          }
        />
        <CardThree
          product={
            isAdmin
              ? data?.processProduct.totalProduct
              : userProductData?.processProduct.totalProduct
          }
        />
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.products?.map((product: DisplayProductType) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default DisplayProduct;