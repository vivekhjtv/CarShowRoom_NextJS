import { connectDB } from '@/config/connectDB';
import User from '@/models/Register';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

connectDB();

// Login API with JWT for authentication.
export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return NextResponse.json(
        { message: 'User not found in database' },
        { status: 404 }
      );
    }

    const matched = bcrypt.compareSync(password, user.password);
    if (!matched) {
      return NextResponse.json(
        { message: 'Incorrect password' }, 
        { status: 401 }
      );
    }

    // Generate JWT 
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    console.log(token);
    
    return NextResponse.json({
      message: 'Login successful',
      success: true,
      user: { _id: user._id, username: user.username, email: user.email, role: user.role, token },
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 }); 
  }
}