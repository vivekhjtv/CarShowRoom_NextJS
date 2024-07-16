import { connectDB } from '@/config/connectDB';
import Products from '@/models/Products';
import { NextRequest, NextResponse } from 'next/server';

connectDB();

export async function GET(request: NextRequest) {
  console.log("object")
  try {
    const cars = await Products.find();
    return NextResponse.json(cars);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error in getting data of cars !!' },
      { status: 500 }
    );
  }
}
export async function POST(request: NextRequest) {
  try {
    const { make,
      model,
      year,
      price,
      color,
      mileage,
      fuelType,
      transmission,
      engineSize,
      horsepower,
      torque,
      drivetrain,
      doors,
      seats,
      description,
      images, } = await request.json();

    const product = new Products({
      make,
      model,
      year,
      price,
      color,
      mileage,
      fuelType,
      transmission,
      engineSize,
      horsepower,
      torque,
      drivetrain,
      doors,
      seats,
      description,
      images,
    });
    
    const createdProduct = await product.save();
    
    return NextResponse.json(
      { message: 'Product added successfully', product: createdProduct },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {

  const {id} = await request.json()
  console.log(id)
}