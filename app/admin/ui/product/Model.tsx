import { useState, useEffect } from 'react';

export interface Product {
  _id: number;
  make: string;
  model: string;
  year: string;
  price: string;
  color: string;
  mileage: string;
  fuelType: string;
  transmission: string;
  engineSize: string;
  horsepower: string;
  torque: string;
  drivetrain: string;
  doors: string;
  seats: string;
  description: string;
  images: string[];
}

interface ModalProps {
  onClose: () => void;
  onAddItem: (newProduct: Product) => void;
  onEditItem: (updatedProduct: Product) => void;
  isEditMode: boolean;
  initialData?: Product;
}

const Modal: React.FC<ModalProps> = ({
  onClose,
  onAddItem,
  onEditItem,
  isEditMode,
  initialData,
}) => {
  const [newItem, setNewItem] = useState<Product>({
    _id: 0,
    make: '',
    model: '',
    year: '',
    price: '',
    color: '',
    mileage: '',
    fuelType: 'Petrol',
    transmission: 'Manual',
    engineSize: '',
    horsepower: '',
    torque: '',
    drivetrain: 'FWD',
    doors: '',
    seats: '',
    description: '',
    images: [''],
  });

  useEffect(() => {
    if (isEditMode && initialData) {
      setNewItem(initialData);
    }
  }, [isEditMode, initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({
      ...prevItem,
      [name]:
        name === 'year' ||
        name === 'price' ||
        name === 'mileage' ||
        name === 'engineSize' ||
        name === 'horsepower' ||
        name === 'torque' ||
        name === 'doors' ||
        name === 'seats'
          ? Number(value)
          : name === 'images'
          ? value.split(',')
          : value,
    }));
  };

  const handleSave = () => {
    const updatedProductData = { ...newItem };

    if (!isEditMode) {
      // For adding new product
      fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProductData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to add product');
          }
          return response.json();
        })
        .then((data) => {
          onAddItem(data); // Assuming `onAddItem` function handles the addition in your UI
          onClose();
        })
        .catch((error) => {
          console.error('Error adding product:', error);
        });
    } else {
      // For editing existing product
      fetch(`http://localhost:3000/api/products/${updatedProductData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProductData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to edit product');
          }
          return response.json();
        })
        .then((data) => {
          onEditItem(data); // Assuming `onEditItem` function handles the update in your UI
          onClose();
        })
        .catch((error) => {
          console.error('Error editing product:', error);
        });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4">
          {isEditMode ? 'Edit Product' : 'Add New Product'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="make"
            value={newItem.make}
            onChange={handleChange}
            placeholder="Make"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="model"
            value={newItem.model}
            onChange={handleChange}
            placeholder="Model"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="year"
            value={newItem.year}
            onChange={handleChange}
            placeholder="Year"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="price"
            value={newItem.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="color"
            value={newItem.color}
            onChange={handleChange}
            placeholder="Color"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="mileage"
            value={newItem.mileage}
            onChange={handleChange}
            placeholder="Mileage"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="fuelType"
            value={newItem.fuelType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
          <select
            name="transmission"
            value={newItem.transmission}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
          <input
            type="number"
            name="engineSize"
            value={newItem.engineSize}
            onChange={handleChange}
            placeholder="Engine Size"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="horsepower"
            value={newItem.horsepower}
            onChange={handleChange}
            placeholder="Horsepower"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="torque"
            value={newItem.torque}
            onChange={handleChange}
            placeholder="Torque"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="drivetrain"
            value={newItem.drivetrain}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="FWD">FWD</option>
            <option value="RWD">RWD</option>
            <option value="AWD">AWD</option>
            <option value="4WD">4WD</option>
          </select>
          <input
            type="number"
            name="doors"
            value={newItem.doors}
            onChange={handleChange}
            placeholder="Doors"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="seats"
            value={newItem.seats}
            onChange={handleChange}
            placeholder="Seats"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="description"
            value={newItem.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
          />
          <input
            type="text"
            name="images"
            value={newItem.images.join(',')}
            onChange={(e) =>
              setNewItem((prevItem) => ({
                ...prevItem,
                images: e.target.value.split(','),
              }))
            }
            placeholder="Images (comma separated URLs)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
          />
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
          >
            {isEditMode ? 'Save Changes' : 'Add Product'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
