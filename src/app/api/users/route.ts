import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    // Obtener los datos del cuerpo de la solicitud
    const { name, lastName, email, password } = await request.json();

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'El usuario ya existe' },
        { status: 400 }
      );
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const user = await prisma.user.create({
      data: {
        name,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ mensaje: 'Usuario creado exitosamente', user });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    return NextResponse.json(
      { mensaje: 'Error al crear el usuario', error: (error as Error).message },
      { status: 500 }
    );
  }
}