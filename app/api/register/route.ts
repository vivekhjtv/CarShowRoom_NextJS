import { connectDB } from '@/config/connectDB';
import User from '@/models/Register';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

connectDB();
// get the user information.
export async function GET (request: NextRequest){
  let users = [];
  try {
    users = await User.find().select("-password"); //  ---- get user information without password field.
  } catch (error) {
    return NextResponse.json({
      message: "failed to get users",
      success: false,
    });
  }

  return NextResponse.json(users);
}

// create user API
export async function POST(request: NextRequest) {
  try {
    const { username, email, password, role } = await request.json();
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists', ok: true },
        { status: 409 },
        
      );
    }
    
    
    const hashedPassword = bcrypt.hashSync(password, parseInt(process.env.BCRYPT_SALT));
    
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });
    
    const createdUser = await user.save();
    
    return NextResponse.json(
      { message: 'User created successfully', user: createdUser },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
