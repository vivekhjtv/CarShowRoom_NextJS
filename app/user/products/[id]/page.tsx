'use client';

import { useCartContext } from '@/context/cartContext';
import { useEffect, useState } from 'react';

interface IParams {
  id: string;
}

export default function Page({ params }: { params: IParams }) {
  const { addProduct, cartProduct, addToWishlist } = useCartContext();

  interface Product {
    _id: string;
    make: string;
    model: string;
    year: number;
    price: number;
    description: string;
    images: string;
    fuelType: string;
    transmission: string;
    color: string;
  }

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const id = params.id;

  useEffect(() => {
    // Define a function to fetch product data
    const fetchProductData = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        const data: Product = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductData();
    }
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Loading...</h1>
      </main>
    );
  }

  function addProductToCart() {
    if (product) {
      addProduct(product._id);
    } else {
      console.log('No product to add');
    }
  }
  function addProductToWishlist() {
    if (product) {
      addToWishlist(product._id);
    } else {
      console.log('No product to add to wishlist');
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <section className="relative">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mx-auto max-md:px-2">
            <div className="img">
              <div className="img-box h-full max-lg:mx-auto">
                <img
                  src={product?.images}
                  alt="Yellow Tropical Printed Shirt image"
                  className="max-lg:mx-auto lg:ml-auto h-full"
                />
              </div>
            </div>
            <div className="data w-full lg:pr-8 pr-0 xl:justify-start justify-center flex items-center max-lg:pb-10 xl:my-2 lg:my-5 my-0">
              <div className="data w-full max-w-xl">
                <p className="text-lg font-medium leading-8 text-indigo-600 mb-4">
                  {product?.make}&nbsp; /&nbsp; {product?.model}
                </p>
                <h2 className="font-manrope font-bold text-3xl leading-10 text-gray-900 mb-2 capitalize">
                  {product?.year} {product?.make} {product?.model}
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                  <h6 className="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">
                    ${product?.price}
                  </h6>
                </div>
                <p className="text-gray-500 text-base font-normal mb-5">
                  {product?.description}
                  <a href="#" className="text-indigo-600">
                    {' '}
                    More....
                  </a>
                </p>
                <ul className="grid gap-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="26" height="26" rx="13" fill="#4F46E5" />
                      <path
                        d="M7.66669 12.629L10.4289 15.3913C10.8734 15.8357 11.0956 16.0579 11.3718 16.0579C11.6479 16.0579 11.8701 15.8357 12.3146 15.3913L18.334 9.37183"
                        stroke="white"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="font-normal text-base text-gray-900 ">
                      {product?.fuelType}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="26" height="26" rx="13" fill="#4F46E5" />
                      <path
                        d="M7.66669 12.629L10.4289 15.3913C10.8734 15.8357 11.0956 16.0579 11.3718 16.0579C11.6479 16.0579 11.8701 15.8357 12.3146 15.3913L18.334 9.37183"
                        stroke="white"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="font-normal text-base text-gray-900 ">
                      {product?.transmission}
                    </span>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-2 mb-8">
                  {[product?.color].map((size, index) => (
                    <div
                      key={index}
                      className={`h-10 flex items-center justify-center border text-center px-4 py-2 rounded-lg cursor-pointer text-base text-gray-500 ${
                        index === 0
                          ? 'bg-indigo-50 text-indigo-700 border-indigo-500'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {size}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2 mb-8">
                  <button
                    type="button"
                    onClick={addProductToCart}
                    className="flex items-center justify-center bg-indigo-600 text-white h-10 px-6 py-2 rounded-lg text-base font-semibold"
                  >
                    Add to Cart ({cartProduct.length})
                  </button>
                  <button
                    type="button"
                    onClick={addProductToWishlist}
                    className="flex items-center justify-center bg-white text-gray-900 h-10 px-6 py-2 rounded-lg border border-gray-300 text-base font-semibold"
                  >
                    Add to Wish list
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
