// api/products/{productId}
import { NextResponse } from "next/server";
import User from '@/models/Register';
interface IParams {
    Id: string;
  }
// get single user
export async function GET(request, { params }: { params: IParams }) {
  const { Id } = params;
  try {
    const task = await User.findById(Id);
    return NextResponse.json(task);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }: { params: IParams }) {
  try {
    const { Id } = params;
    await User.deleteOne({
      _id: Id,
    });
    return NextResponse.json("User Deleted !!");
  } catch (error:any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 
export async function PUT(request, { params }: { params: IParams }) {
  const { Id } = params;
  console.log(Id)
  try {
    const updatedUserData = await request.json();
    const updatedUser = await User.findByIdAndUpdate(Id, updatedUserData, {
      new: true, // This option returns the updated document
    });

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}