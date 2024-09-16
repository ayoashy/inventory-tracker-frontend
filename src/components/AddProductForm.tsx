import { ChangeEvent, useEffect, useState } from 'react'
import { ButtonsWithIcon } from './Buttons';
import SingleProductForm from './SingleProductForm';
import { useAddProductApi, useEditProductApi, useGetProductApi } from '../data/hooks/product';
import { useGetUserApi } from '../data/hooks/auth';
import { message } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';

type ProductType = {
 name: string;
 price: number;
 quantity: number;
}

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

type ProductTypeExtend = ProductType & { _id?: string }


const AddProductForm = () => {
  const [searchParams] = useSearchParams();
  // const navigate = useNavigate();
  const [editId, setEditId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [products, setProducts] = useState<ProductTypeExtend[]>([
    { name: '', quantity: 1, price: 0 },
  ]);

  useEffect(() => {
    const urlEditId = searchParams.get('edit');
    const storedEditId = localStorage.getItem('editId');
    const storedIsEditing = localStorage.getItem('isEditingData');

    if (urlEditId || (storedEditId && storedIsEditing)) {
      setEditId(urlEditId || storedEditId);
      setIsEditing(true);
      let editData = localStorage.getItem('editData');
      if (editData) {
        const parsedData = JSON.parse(editData) as EditDataType;
        setProducts(parsedData.products);
      }
    }
  }, [searchParams]);

 const handleAdd  = ()=>{
  setProducts([...products, {name:'', quantity: 1, price: 0}])
 }


 const handleRemove = (i: number)=>{
  const filteredProducts = products.filter((item, index)=> index !== i )
  setProducts(filteredProducts)
 }
 const {data: getProductData,} = useGetProductApi()
 console.log({getProductData});


const handleChange = (index: number,e: ChangeEvent<HTMLInputElement> )=>{
  const newArray  = products.map((prod, ind)=>{
    if(ind === index){
      return {...prod, [e.target.name]: e.target.value}
    }else{
      return prod
    }
  })
  setProducts(newArray)
}
const {data, isLoading,} =  useGetUserApi()
const { mutateAsync, isLoading: addProductLoading, error: addProductError  } = useAddProductApi()
const { mutateAsync: editMutateAsync } = useEditProductApi();

const handleAddProduct = async  (e: any)=>{
  const postObject = {
    products,
    authorId: data.user._id
  }

  let isInvalidInput;

  for (let i = 0; i < products.length; i++) {
    if(products[i].name === '' || products[i].price === 0 ){
      isInvalidInput = true;
    }
  }

  e.preventDefault()

try {
  if(isInvalidInput){
    await message.error('Product name or price can not be empty')
    return
  }
const response = await mutateAsync(postObject)
if(response){
   message.success('Product successfully added')
}

setProducts([{name: '', quantity: 1, price: 0}])
} catch (error: any) {
  await message.error(error)
  
}
}

const handleEditProduct = async (e: any) => {
  let isInvalidInput;

  for (let i = 0; i < products.length; i++) {
    if (products[i].name === '' || products[i].price === 0) {
      isInvalidInput = true;
    }
  }

  e.preventDefault();

  try {
    if (isInvalidInput) {
      await message.error('Product name can not be empty');
      return;
    }
    const formattedProduct = products.map((product)=>{
      // remove _id prop from product object
      const { _id, ...rest } = product;
      return rest;
    })
    const response = await editMutateAsync({
      id: editId as string,
      post: { products: formattedProduct },
    });
    if (response) {
      message.success('Product successfully updated');
    }
    localStorage.removeItem('editData');
    // navigate('/')


    setProducts([{ name: '', quantity: 1, price: 0 }]);
  } catch (error: any) {
    await message.error(error);
  }
};

const handleSubmit = editId ? handleEditProduct : handleAddProduct;

 
  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mt-5">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white text-center">
            {editId ? 'Update Product' : 'Add Product'}
          </h3>
        </div>
        <form action="#" onSubmit={handleSubmit}>
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
              {/* <label className="mb-2.5 block text-black dark:text-white">
                Subject
              </label> */}
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
}

export default AddProductForm
