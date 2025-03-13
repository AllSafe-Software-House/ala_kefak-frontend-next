import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  try {
    const { body } = await request.json();
    // const { title, description } = body;
    console.log(body);

    const response = await axios.post(
      'https://alaa-kaifak.allsafeeg-project.com/api/v1/auth/update-about-user',
      { body },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // إرجاع الاستجابة للعميل
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error('Error updating about:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}