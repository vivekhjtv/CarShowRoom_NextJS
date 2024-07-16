// api/products/{productId}
import { NextResponse } from "next/server";
import Products from '@/models/Products';

interface IParams {
  productId: string;
}

// Get single product
export async function GET(request, { params }: { params: IParams }) {
  const { productId } = params;
  try {
    const product = await Products.findById(productId);
    return NextResponse.json(product);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete product
export async function DELETE(request, { params }: { params: IParams }) {
  try {
    const { productId } = params;
    await Products.deleteOne({
      _id: productId,
    });
    return NextResponse.json("Product Deleted !!");
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update product
export async function PUT(request, { params }: { params: IParams }) {
  const { productId } = params;
  try {
    const updatedProductData = await request.json();
    const updatedProduct = await Products.findByIdAndUpdate(productId, updatedProductData, {
      new: true, // Return the updated document
    });

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProduct);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
