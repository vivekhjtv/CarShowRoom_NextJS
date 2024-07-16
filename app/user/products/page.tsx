'use client';
import React, { useState, useEffect } from 'react';
import CarCard from '@/app/components/products/CarCard';

interface Car {
  _id: number;
  images: string;
  make: string;
  model: string;
  year: number;
  price: number;
  currency: string;
}

export default function Page() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch car data');
        }
        const data = await response.json();
        // console.log(data);
        setCars(data);
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
    <main className="flex min-h-screen flex-col items-center justify-center p-12 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Available Cars</h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </section>
    </main>
  );
}
