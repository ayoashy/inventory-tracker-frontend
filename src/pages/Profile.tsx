import { FaSpinner } from 'react-icons/fa';
import Loader from '../common/Loader';
import Breadcrumb from '../components/Breadcrumb';
import { useAuth } from '../context/AuthContext';
import { useGetUserProductApi } from '../data/hooks/product';
import CoverOne from '../images/cover/cover-01.png';
import userSix from '../images/user/user-06.png';

const Profile = () => {
  const userData = useAuth()
  const {data, isLoading} = useGetUserProductApi()
  console.log(data);
  
  console.log({userData});
  
  return (
    <>
      <Breadcrumb pageName="Profile" />

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65">
          <img
            src={CoverOne}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          />
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 backdrop-blur sm:h-44 sm:max-w-44 flex justify-center items-center">
            <div className="relative drop-shadow-2">
              <div className="flex justify-center items-center mx-auto">
                <h1 className="text-3xl text-center">
                  {userData?.user?.name[0]}
                </h1>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              {userData?.user?.name}
            </h3>
            <p className="font-medium">{userData?.user?.email}</p>
            <div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  {isLoading ? (
                    <FaSpinner />
                  ) : (
                    data?.processProduct.totalProduct
                  )}
                </span>
                <span className="text-sm">Product</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  {isLoading ? <FaSpinner /> : data?.processProduct.totalSales}
                </span>
                <span className="text-sm">Sales</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  {userData?.user?.type}
                </span>
                <span className="text-sm">Type</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
