import AddProductForm from '../../components/AddProductForm.tsx';
// import CardFour from '../../components/CardFour.tsx';
// import CardThree from '../../components/CardThree.tsx';
// import CardTwo from '../../components/CardTwo.tsx';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
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

    // Prepare data for charts
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        data: [totalSales, totalSales * 0.8, totalSales * 1.2, totalSales * 0.9, totalSales * 1.1, totalSales],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const productData = {
    labels: ['In Stock', 'Sold'],
    datasets: [
      {
        data: [totalProduct, totalProduct * 0.7],
        backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)'],
      },
    ],
  };

  const userChartData = {
    labels: ['Active', 'Inactive'],
    datasets: [
      {
        data: [totalUser, totalUser * 0.2],
        backgroundColor: ['rgb(75, 192, 192)', 'rgb(255, 205, 86)'],
      },
    ],
  };
  
  return (
    <>
      <Breadcrumb pageName="Home" />
      {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardTwo sales={totalSales} />
        <CardThree product={totalProduct} />
        {isAdmin && <CardFour user={totalUser} />}
      </div> */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:gap-7.5">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
          <h3 className="text-xl font-semibold text-black dark:text-white">
            Sales Overview
          </h3>
          <Line data={salesData} options={{ responsive: true }} />
        </div>
        <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
          <h3 className="text-xl font-semibold text-black dark:text-white">
            Product Distribution
          </h3>
          <Doughnut data={productData} options={{ responsive: true }} />
        </div>
        {isAdmin && (
          <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
            <h3 className="text-xl font-semibold text-black dark:text-white">
              User Statistics
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
