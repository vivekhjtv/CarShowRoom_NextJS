import { connectDB } from '@/config/connectDB';
import Users from '@/models/Users';
import { NextRequest, NextResponse } from 'next/server';

connectDB();

export async function GET(request: NextRequest) {
  console.log("object")
  try {
    const users = await Users.find();
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error in getting data of users !!' },
      { status: 500 }
    );
  }
}
// export async function POST(request: NextRequest) {
//   try {
//     const { username,
//         email,
//         password,
//         role,
//       } = await request.json();

//     const users = new Users({
//       username,
//       email,
//       password,
//       role,
      
//     });
    
//     const createdUsers = await users.save();
    
//     return NextResponse.json(
//       { message: 'users added successfully', users: createdUsers },
//       { status: 201 }
//     );
//   } catch (error: any) {
//     console.error(error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

