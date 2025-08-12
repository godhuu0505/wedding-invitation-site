import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, attendance } = body;

  try {
    await addDoc(collection(db, 'rsvps'), {
      name,
      attendance,
      timestamp: new Date(),
    });

    return new Response('OK', { status: 200 });
  } catch (error) {
    return new Response('Error saving RSVP', { status: 500 });
  }
}
