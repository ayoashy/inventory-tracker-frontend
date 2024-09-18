import { ChangeEvent } from 'react';

type SingleProductFormProps = {
  handleRemove: (index: number) => void;
  index: number;
  element: {
    name: string;
    price: number;
    quantity: number;
  };
  handleChange: (index: number, e: ChangeEvent<HTMLInputElement>) => void;
};

const SingleProductForm = ({
  handleRemove,
  index,
  element,
  handleChange,
}: SingleProductFormProps) => {
  const inputClassName =
    'w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary';

  return (
    <div className="mb-4.5 flex items-center gap-2 lg:gap-6 xl:flex-row">
      <div className="w-full xl:w-1/3">
        <label className="mb-2.5 block text-black dark:text-white">
        Name
        </label>
        <input
          type="text"
          placeholder="Enter product name"
          className={inputClassName}
          value={element.name}
          onChange={(e) => handleChange(index, e)}
          name="name"
          required
        />
      </div>

      <div className="w-1/2 xl:w-1/3">
        <label className="mb-2.5 block text-black dark:text-white">Price</label>
        <input
          type="number"
          placeholder="Enter price"
          className={inputClassName}
          value={element.price}
          onChange={(e) => handleChange(index, e)}
          name="price"
          min="0"
          step="0.01"
          required
        />
      </div>

      <div className="w-1/2 xl:w-1/3">
        <label className="mb-2.5 block text-black dark:text-white">
          Quantity
        </label>
        <input
          type="number"
          placeholder="Enter quantity"
          className={inputClassName}
          value={element.quantity}
          onChange={(e) => handleChange(index, e)}
          name="quantity"
          min="1"
          required
        />
      </div>

      {index !== 0 && (
        <button
          type="button"
          onClick={() => handleRemove(index)}
          className="mt-8 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default SingleProductForm;