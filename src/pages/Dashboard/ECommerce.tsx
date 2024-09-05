import AddProductForm from '../../components/AddProductForm.tsx';

import CardFour from '../../components/CardFour.tsx';
import CardThree from '../../components/CardThree.tsx';
import CardTwo from '../../components/CardTwo.tsx';
import { useAuth } from '../../context/AuthContext.tsx';

import { useGetProductApi, useGetUserProductApi } from '../../data/hooks/product.ts';
// import { useEffect } from 'react';

const ECommerce = () => {
    const userData = useAuth()
    const isAdmin = userData?.user?.type === 'admin'
    
  const { data, isLoading } = useGetUserProductApi();
  const { data: userProductData, isLoading: userProductLoading } = useGetUserProductApi();

  console.log({ userProductData });
  
  
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardTwo sales={userProductData?.processProduct.totalSales}/>
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
        {isAdmin && <CardFour user={data?.processProduct.totalUser} />}
      </div>

      <AddProductForm />
    </>
  );
};

export default ECommerce;
