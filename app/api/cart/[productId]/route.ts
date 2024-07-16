import { connectDB } from '@/config/connectDB';
import Cart from '@/models/Cart';
import Products from '@/models/Products';
import { NextRequest, NextResponse } from 'next/server';

connectDB();
interface IParams {
  productId: string;
}
export async function GET(request:any, { params }: { params: IParams }) {
  const { productId } = params;
  const productIds = productId.split(',');
  try {
    // const task = await Products.findOne(productId);
    const tasks = await Products.find({ _id: { $in: productIds } });
    // console.log(task)
    return NextResponse.json(tasks);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
