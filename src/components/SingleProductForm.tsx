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
        <label className="mb-2.5 block text-black dark:text-white">Name</label>
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
          className="mt-8 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          aria-label="Delete product"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SingleProductForm;