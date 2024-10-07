import AddProductForm from '../../components/AddProductForm.tsx';
// import CardFour from '../../components/CardFour.tsx';
// import CardThree from '../../components/CardThree.tsx';
// import CardTwo from '../../components/CardTwo.tsx';
import { Bar } from 'react-chartjs-2'; // Import Bar chart for representation
import { Chart as ChartJS, registerables } from 'chart.js';
import { useAuth } from '../../context/AuthContext.tsx';
import {
  useGetProductApi,
  useGetUserProductApi,
} from '../../data/hooks/product.ts';
import Breadcrumb from '../../components/Breadcrumb.tsx';
ChartJS.register(...registerables);

const ECommerce = () => {
  const { user } = useAuth();
  const isAdmin = user?.type === 'admin';

  const { data: adminData } = useGetProductApi();
  const { data: userProductData } = useGetUserProductApi();

  const data = isAdmin ? adminData : userProductData;
  const { totalSales, totalProduct, totalUser } = data?.processProduct || {};

  // Prepare data for each chart
  const salesData = {
    labels: ['Total Sales'],
    datasets: [
      {
        label: 'Sales',
        data: [totalSales],
        backgroundColor: ['rgb(75, w192, 192)'],
      },
    ],
  };

  const productData = {
    labels: ['Total Products'],
    datasets: [
      {
        label: 'Products',
        data: [totalProduct],
        backgroundColor: ['rgb(54, 162, 235)'],
      },
    ],
  };

  const userChartData = {
    labels: ['Total Users'],
    datasets: [
      {
        label: 'Users',
        data: [totalUser],
        backgroundColor: ['rgb(255, 205, 86)'],
      },
    ],
  };

  return (
    <>
      <Breadcrumb pageName="Home" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:gap-7.5">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
          <h3 className="text-xl font-semibold text-black dark:text-white">
            Total Sales
          </h3>
          <Bar data={salesData} options={{ responsive: true }} />
        </div>
        <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
          <h3 className="text-xl font-semibold text-black dark:text-white">
            Total Products
          </h3>
          <Bar data={productData} options={{ responsive: true }} />
        </div>
        {isAdmin && (
          <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
            <h3 className="text-xl font-semibold text-black dark:text-white">
              Total Users
            </h3>
            <Bar data={userChartData} options={{ responsive: true }} />
          </div>
        )}
      </div>
      <AddProductForm />
    </>
  );
};

export default ECommerce;
