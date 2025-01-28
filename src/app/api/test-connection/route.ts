import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Intentar obtener usuarios de la base de datos
    const users = await prisma.user.findMany();
    return NextResponse.json({ mensaje: 'Conexión exitosa', users });
} catch (error) {
    // Si el token es inválido o hay otro error
    return NextResponse.json({
      mensaje: "Error al acceder a la base de datos",
      error: error
    }, { status: 500 })
  }
}