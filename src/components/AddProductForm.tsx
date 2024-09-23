import { ChangeEvent, useEffect, useState } from 'react';
import { ButtonsWithIcon } from './Buttons';
import SingleProductForm from './SingleProductForm';
import { useAddProductApi, useEditProductApi } from '../data/hooks/product';
import { useGetUserApi } from '../data/hooks/auth';
import { message } from 'antd';
import { useSearchParams } from 'react-router-dom';

type ProductType = {
  name: string;
  price: number;
  quantity: number;
};

type EditDataType = {
  authorId: {
    email: string;
    name: string;
    resetPasswordExpire: string;
    resetPasswordToken: string;
    type: string;
  };
  products: ProductType[];
};

type ProductTypeExtend = ProductType & { _id?: string }; // ... existing type definitions ...

const AddProductForm = () => {
  const [searchParams] = useSearchParams();
  const [editId, setEditId] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductTypeExtend[]>([
    { name: '', quantity: 1, price: 0 },
  ]);

  const { data: userData } = useGetUserApi();
  const { mutateAsync: addProduct, isLoading: addProductLoading } =
    useAddProductApi();
  const { mutateAsync: editProduct } = useEditProductApi();

  useEffect(() => {
    const urlEditId = searchParams.get('edit');
    const storedEditId = localStorage.getItem('editId');
    const storedIsEditing = localStorage.getItem('isEditingData');

    if (urlEditId || (storedEditId && storedIsEditing)) {
      setEditId(urlEditId || storedEditId);
      const editData = localStorage.getItem('editData');
      if (editData) {
        const parsedData = JSON.parse(editData) as EditDataType;
        setProducts(parsedData.products);
      }
    }
  }, [searchParams]);

  const handleAdd = () =>
    setProducts([...products, { name: '', quantity: 1, price: 0 }]);

  const handleRemove = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProducts(
      products.map((prod, i) =>
        i === index ? { ...prod, [name]: value } : prod,
      ),
    );
  };

  const validateProducts = () => {
    return products.every(
      (product) => product.name !== '' && product.price !== 0 && product.quantity !== 0,
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateProducts()) {
      await message.error('Product name or price cannot be empty');
      return;
    }

    try {
      if (editId) {
        const formattedProducts = products.map(({ _id, ...rest }) => rest);
        await editProduct({
          id: editId,
          post: { products: formattedProducts },
        });
        message.success('Product successfully updated');
        localStorage.removeItem('editData');
        setEditId(null);
      } else {
        await addProduct({ products, authorId: userData.user._id });
        message.success('Product successfully added');
      }
      setProducts([{ name: '', quantity: 1, price: 0 }]);
    } catch (error: any) {
      await message.error(error.message|| "unknown error");
    }
  };

  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mt-5">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white text-center">
            {editId ? 'Update Product' : 'Add Product'}
          </h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
            {products.map((product, index) => (
              <SingleProductForm
                key={index}
                handleRemove={handleRemove}
                index={index}
                element={product}
                handleChange={handleChange}
              />
            ))}

            <div className="mb-4.5">
              <ButtonsWithIcon text="Add More Product" handleAdd={handleAdd} />
            </div>

            <button
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray disabled:bg-gray disabled:text-black"
              disabled={addProductLoading}
            >
              {addProductLoading
                ? 'Loading...'
                : editId
                ? 'Update Product'
                : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
