import AddProductForm from '../../components/AddProductForm.tsx';

import CardFour from '../../components/CardFour.tsx';
import CardThree from '../../components/CardThree.tsx';
import CardTwo from '../../components/CardTwo.tsx';

import { useGetProductApi } from '../../data/hooks/product.ts';
// import { useEffect } from 'react';

const ECommerce = () => {
  const {data,isLoading} = useGetProductApi()
  console.log('this should be a homepage');
  
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardTwo sales={data?.processProduct.totalSales}/>
        <CardThree product={data?.processProduct.totalProduct}/>
        <CardFour user={data?.processProduct.totalUser} />
      </div>

    <AddProductForm/>
    </>
  );
};

export default ECommerce;
