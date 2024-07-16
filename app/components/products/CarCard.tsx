import { useRouter } from 'next/navigation';
import React from 'react';

interface Car {
  _id: number;
  images: string;
  make: string;
  model: string;
  year: number;
  price: number;
  currency: string;
}
function CarCard({ car }: { car: Car }) {
  const { _id, images, make, model, year, price, currency } = car;
  const router = useRouter();

  return (
    <div className="car-card bg-white rounded-lg shadow-md p-4">
      <img
        src={images}
        alt={`${make} ${model}`}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="car-info p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {year} {make} {model}
        </h3>
        <p className="text-gray-600 text-sm mb-2">
          Starting MSRP: {price} {currency}
        </p>
        <button
          type="button"
          onClick={() => router.push(`/user/products/${_id}`)}
          className="flex items-center justify-center px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default CarCard;
