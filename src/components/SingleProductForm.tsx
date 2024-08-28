// import React, { MouseEventHandler } from 'react'
import { ChangeEvent, MouseEventHandler } from 'react';
import { ButtonsWithIcon } from './Buttons';

type SingleProductFormType = {
  // handleRemove?: void;
  handleRemove?: MouseEventHandler<HTMLAnchorElement> | undefined;
  index: number;
  element: {
    name: string;
    price: number;
    quantity: number;
  };
  handleChange: (i: number, e: ChangeEvent<HTMLInputElement>) => void;
};

const SingleProductForm = (prop: SingleProductFormType) => {
  return (
    <div>
      <div className="mb-4.5 flex items-center  gap-2 lg:gap-6 xl:flex-row">
        <div className="w-full xl:w-1/3">
          <label className="mb-2.5 block text-black dark:text-white">
            Product
          </label>
          <input
            type="text"
            placeholder="Enter your product name"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            value={prop.element.name}
            onChange={(e)=>prop.handleChange(prop.index,e)}
            name='name'
          />
        </div>

        <div className="w-1/2 xl:w-1/3">
          <label className="mb-2.5 block text-black dark:text-white">
            Price
          </label>
          <input
            type="number"
            placeholder="Enter your last name"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            value={prop.element.price}
            onChange={(e)=>prop.handleChange(prop.index, e)}
            name='price'
          />
        </div>
        <div className="w-1/2 xl:w-1/3">
          <label className="mb-2.5 block text-black dark:text-white">
            quantity
          </label>
          <input
            type="number"
            placeholder="Enter your last name"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            value={prop.element.quantity}
            onChange={(e)=>prop.handleChange(prop.index, e)}
            name='quantity'
          />
        </div>
      </div>
    </div>
  );
}

export default SingleProductForm