// import { useEffect, useRef } from 'react';
// import AddProductForm from '../../components/AddProductForm.tsx';

// import CardFour from '../../components/CardFour.tsx';
// import CardThree from '../../components/CardThree.tsx';
// import CardTwo from '../../components/CardTwo.tsx';
// import { useAuth } from '../../context/AuthContext.tsx';

// import { useGetProductApi, useGetUserProductApi } from '../../data/hooks/product.ts';
// import { message } from 'antd';
// import Breadcrumb from '../../components/Breadcrumb.tsx';
// // import { useEffect } from 'react';

// const ECommerce = () => {
//     const userData = useAuth()
//     const isAdmin = userData?.user?.type === 'admin'
    
//   const { data, isLoading, error } = useGetProductApi();
//   const {
//     data: userProductData,
//     isLoading: userProductLoading,
//     error: userProductError,
//   } = useGetUserProductApi();
  
//  const hasShownAdminError = useRef(false);
//  const hasShownUserError = useRef(false);

//  useEffect(() => {
//    // Handle Admin Product Error (error from useGetProductApi)
//    if (error && !hasShownAdminError.current) {
//      message.error(
//        error?.message || 'An error occurred while fetching admin products',
//      );
//      hasShownAdminError.current = true; // Mark the admin error as shown
//    }

//    // Handle User Product Error (error from useGetUserProductApi)
//    if (userProductError && !hasShownUserError.current) {
//      message.error(
//        userProductError?.message ||
//          'An error occurred while fetching user products',
//      );
//      hasShownUserError.current = true; // Mark the user error as shown
//    }
//  }, [error, userProductData, hasShownAdminError.current, hasShownUserError.current]);
  
  
//   return (
//     <>
//       <Breadcrumb pageName="Home" />
//       <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
//         <CardTwo
//           sales={
//             isAdmin
//               ? data?.processProduct.totalSales
//               : userProductData?.processProduct.totalSales
//           }
//         />
//         <CardThree
//           product={
//             isAdmin
//               ? data?.processProduct.totalProduct
//               : userProductData?.processProduct.totalProduct
//           }
//         />
//         {isAdmin && <CardFour user={data?.processProduct.totalUser} />}
//       </div>

//       <AddProductForm />
//     </>
//   );
// };

// export default ECommerce;


import { useEffect, useRef } from 'react';
import AddProductForm from '../../components/AddProductForm.tsx';
import CardFour from '../../components/CardFour.tsx';
import CardThree from '../../components/CardThree.tsx';
import CardTwo from '../../components/CardTwo.tsx';
import { useAuth } from '../../context/AuthContext.tsx';
import {
  useGetProductApi,
  useGetUserProductApi,
} from '../../data/hooks/product.ts';
import { message } from 'antd';
import Breadcrumb from '../../components/Breadcrumb.tsx';

const ECommerce = () => {
  const { user } = useAuth();
  const isAdmin = user?.type === 'admin';

  const { data: adminData, error: adminError } = useGetProductApi();
  const { data: userData, error: userError } = useGetUserProductApi();

  const hasShownError = useRef(false);

  useEffect(() => {
    if ((adminError || userError) && !hasShownError.current) {
      message.error(
        adminError?.message ||
          userError?.message ||
          'An error occurred while fetching products',
      );
      hasShownError.current = true;
    }
  }, [adminError, userError]);

  const data = isAdmin ? adminData : userData;
  const { totalSales, totalProduct, totalUser } = data?.processProduct || {};

  return (
    <>
      <Breadcrumb pageName="Home" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardTwo sales={totalSales} />
        <CardThree product={totalProduct} />
        {isAdmin && <CardFour user={totalUser} />}
      </div>
      <AddProductForm />
    </>
  );
};

export default ECommerce;