'use client';
import { useCartContext } from '@/context/cartContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Product {
  _id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  description: string;
  images: string[];
  fuelType: string;
  transmission: string;
  color: string;
  quantity: number;
}

export default function Page() {
  const { cartProduct, addProduct, removeProduct } = useCartContext();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const router = useRouter();
  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true); // Set loading state before fetch
      try {
        const response = await fetch(`/api/cart/${cartProduct}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        const data: Product[] = await response.json();

        const productsWithQuantity = data.map((product) => ({
          ...product,
          quantity: cartProduct.filter((id) => id === product._id).length,
        }));
        setProducts(productsWithQuantity);
      } catch (error) {
        console.error('Error fetching product data:', error);
      } finally {
        setLoading(false); // Set loading state after fetch completes
      }
    };

    if (cartProduct.length > 0) {
      fetchProductData();
    } else {
      setLoading(false); // No items in cart, so set loading to false
    }
  }, [cartProduct]);

  const increaseQuantity = (productId: string) => {
    addProduct(productId);
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const decreaseQuantity = (productId: string) => {
    removeProduct(productId);
    setProducts((prevProducts) =>
      prevProducts
        .map((product) =>
          product._id === productId
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
        .filter((product) => product.quantity > 0)
    );
  };

  const subtotal = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  const taxRate = 0.13; // 13% tax rate
  const total = subtotal * (1 + taxRate);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 bg-gray-100">
      <section className="h-screen bg-gray-100">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <h1 className="text-3xl font-semibold text-gray-900">Your Cart</h1>
          </div>

          {loading && (
            <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
              <h1 className="text-3xl font-bold mb-8 text-gray-900">
                Loading...
              </h1>
            </main>
          )}

          {!loading && products.length > 0 && (
            <div className="mx-auto mt-8 max-w-md md:mt-12">
              <div className="rounded-3xl bg-white shadow-lg">
                <div className="px-4 py-6 sm:px-8 sm:py-10">
                  <div className="flow-root">
                    <ul className="-my-8">
                      {products.map((product, index) => (
                        <li
                          key={index}
                          className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                        >
                          <div className="shrink-0 relative">
                            <img
                              className="h-24 w-24 max-w-full rounded-lg object-cover"
                              src={product.images[0]} // Assuming first image from images array
                              alt={`${product.make} ${product.model}`}
                            />
                          </div>

                          <div className="relative flex flex-1 flex-col justify-between">
                            <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                              <div className="pr-8 sm:pr-5">
                                <p className="text-base font-semibold text-gray-900">
                                  {product.make} {product.model}
                                </p>
                                <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">
                                  {product.year}
                                </p>
                                <p className="text-base mt-5 font-semibold text-gray-900">
                                  $
                                  {(product.price * product.quantity).toFixed(
                                    2
                                  )}
                                </p>
                              </div>

                              <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                <div className="flex items-center space-x-2">
                                  <button
                                    type="button"
                                    className="p-1 text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                                    onClick={() =>
                                      decreaseQuantity(product._id)
                                    }
                                  >
                                    -
                                  </button>
                                  <span className="text-base font-semibold text-gray-900">
                                    {product.quantity}
                                  </span>
                                  <button
                                    type="button"
                                    className="p-1 text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                                    onClick={() =>
                                      increaseQuantity(product._id)
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 space-y-3 border-t border-b py-8">
                    <div className="flex items-center justify-between">
                      <p className="text-gray-400">Subtotal</p>
                      <p className="text-lg font-semibold text-gray-900">
                        ${subtotal.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-400">Canadian Tax (13%)</p>
                      <p className="text-lg font-semibold text-gray-900">
                        ${(subtotal * taxRate).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">Total</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      <span className="text-xs font-normal text-gray-400">
                        CAD
                      </span>{' '}
                      {total.toFixed(2)}
                    </p>
                  </div>

                  <div className="mt-6 text-center">
                    <h1 className="text-lg font-semibold mb-3 text-gray-900">
                      You wanna book the car ?
                    </h1>
                    <button
                      type="button"
                      onClick={() => router.push(`/user/placeOrder`)}
                      className="group inline-flex w-full items-center justify-center rounded-md bg-orange-500 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                    >
                      Book Now
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="mx-auto mt-8 max-w-md md:mt-12">
              <div className="rounded-3xl bg-white shadow-lg">
                <div className="px-4 py-6 sm:px-8 sm:py-10">
                  <h1 className="text-3xl font-semibold text-gray-900 mb-4">
                    Your Cart is Empty
                  </h1>
                  <p className="text-lg text-gray-700">
                    It looks like there are no items in your cart. Start adding
                    products to see them here.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
