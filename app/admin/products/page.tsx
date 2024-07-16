'use client';
import { useState, useMemo, useEffect } from 'react';
import Modal, { Product } from '../ui/product/Model';

interface Car {
  _id: string;
  make: string;
  model: string;
  description: string;
  price: string;
  fuelType: string;
  year: string;
  color: string;
  mileage: string;
  transmission: string;
  engineSize: string;
  horsepower: string;
  torque: string;
  drivetrain: string;
  doors: string;
  seats: string;
  images: string[];
}

export default function Page() {
  const [carList, setCarList] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const rowsLimit = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  // const [currentCar, setCurrentCar] = useState<Car | null>(null);
  const [currentCar, setCurrentCar] = useState<Product | undefined>(undefined);

  const totalPage = Math.ceil(carList.length / rowsLimit);

  const rowsToShow = useMemo(() => {
    const startIndex = currentPage * rowsLimit;
    return carList.slice(startIndex, startIndex + rowsLimit);
  }, [carList, currentPage]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch car data');
        }
        const data = await response.json();
        setCarList(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPage - 1));
  };

  const previousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const openModal = () => {
    setIsEditMode(false);
    setCurrentCar(undefined);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddItem = (newProduct: Product) => {
    const newItem: Car = {
      _id: newProduct._id,
      make: newProduct.make,
      model: newProduct.model,
      description: newProduct.description,
      price: newProduct.price,
      fuelType: newProduct.fuelType,
      year: newProduct.year || 'Unknown', // Provide a default value or handle as needed
      color: newProduct.color || 'Unknown', // Provide a default value or handle as needed
      mileage: newProduct.mileage || '0', // Provide a default value or handle as needed
      transmission: newProduct.transmission || 'Unknown', // Provide a default value or handle as needed
      engineSize: newProduct.engineSize || 'Unknown', // Provide a default value or handle as needed
      horsepower: newProduct.horsepower || 'Unknown', // Provide a default value or handle as needed
      torque: newProduct.torque || 'Unknown', // Provide a default value or handle as needed
      drivetrain: newProduct.drivetrain || 'Unknown', // Provide a default value or handle as needed
      doors: newProduct.doors || 'Unknown', // Provide a default value or handle as needed
      seats: newProduct.seats || 'Unknown', // Provide a default value or handle as needed
      images: newProduct.images || [], // Provide a default value or handle as needed
    };

    setCarList((prevList) => [...prevList, newItem]);
    setIsModalOpen(false);
  };

  const handleEditItem = (editedProduct: Product) => {
    const updatedCarList = carList.map((car) =>
      car._id === editedProduct._id ? editedProduct : car
    );
    setCarList(updatedCarList);
    setIsModalOpen(false);
  };

  const editProduct = (car: Car) => {
    setCurrentCar(car);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const deleteProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      const updatedCarList = carList.filter((car) => car._id !== id);
      setCarList(updatedCarList);

      console.log(`Deleted product with ID ${id}`);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Loading...</h1>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">
          Error: {error}
        </h1>
      </main>
    );
  }

  return (
    <div className="h-full bg-white flex items-center justify-center pt-14 pb-14">
      {isModalOpen && (
        <Modal
          onClose={closeModal}
          onAddItem={handleAddItem}
          onEditItem={handleEditItem}
          isEditMode={isEditMode}
          initialData={currentCar}
        />
      )}
      <div className="w-full max-w-6xl px-2">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-medium">Car Inventory</h1>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={openModal}
            >
              Add Item
            </button>
          </div>
        </div>
        <div className="w-full overflow-x-scroll md:overflow-auto max-w-7xl 2xl:max-w-none mt-2">
          <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border">
            <thead className="rounded-lg text-base text-white font-semibold w-full">
              <tr className="bg-[#222E3A]/[6%]">
                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                  Brand
                </th>
                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                  Model
                </th>
                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                  Description
                </th>
                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                  Price
                </th>
                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                  Type
                </th>
                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {rowsToShow.map((car) => (
                <tr key={car._id}>
                  <td className="py-2 px-3 border border-t whitespace-nowrap">
                    {car.make}
                  </td>
                  <td className="py-2 px-3 border border-t whitespace-nowrap">
                    {car.model}
                  </td>
                  <td className="py-2 px-3 border border-t fixed-width-cell">
                    {car.description}
                  </td>
                  <td className="py-2 px-3 border border-t whitespace-nowrap">{`$${car.price}`}</td>
                  <td className="py-2 px-3 border border-t whitespace-nowrap">
                    {car.fuelType}
                  </td>
                  <td className="py-2 px-3 border border-t whitespace-nowrap">
                    <div className="flex justify-center space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-700"
                        onClick={() => editProduct(car)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                      </button>
                      <button
                        className="text-red-600 hover:text-red-700"
                        onClick={() => deleteProduct(car._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full flex justify-center sm:justify-between flex-col sm:flex-row gap-5 mt-1.5 px-1 items-center pt-3">
          <div className="text-lg">
            Showing {currentPage * rowsLimit + 1} to{' '}
            {Math.min((currentPage + 1) * rowsLimit, carList.length)} of{' '}
            {carList.length} entries
          </div>
          <div className="flex">
            <ul
              className="flex justify-center items-center gap-x-[10px] z-30"
              role="navigation"
              aria-label="Pagination"
            >
              <li
                className={`prev-btn flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] ${
                  currentPage === 0
                    ? 'bg-[#cccccc] pointer-events-none'
                    : 'cursor-pointer'
                }`}
                onClick={previousPage}
              >
                <img
                  src="https://www.tailwindtap.com/assets/travelagency-admin/leftarrow.svg"
                  alt="left-side-arrow"
                />
              </li>
              {Array.from({ length: totalPage }, (_, index) => (
                <li
                  className={`flex items-center justify-center w-[36px] rounded-[6px] h-[34px] border-[1px] border-solid border-[2px] bg-[#FFFFFF] cursor-pointer ${
                    currentPage === index
                      ? 'text-blue-600 border-sky-500'
                      : 'border-[#E4E4EB] '
                  }`}
                  onClick={() => setCurrentPage(index)}
                  key={index}
                >
                  {index + 1}
                </li>
              ))}
              <li
                className={`flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] ${
                  currentPage === totalPage - 1
                    ? 'bg-[#cccccc] pointer-events-none'
                    : 'cursor-pointer'
                }`}
                onClick={nextPage}
              >
                <img
                  src="https://www.tailwindtap.com/assets/travelagency-admin/rightarrow.svg"
                  alt="right-side-arrow"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
