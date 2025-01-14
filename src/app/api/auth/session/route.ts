import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function GET() {
  try {
    // Obtener el token de las cookies
    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    // Si no hay token, no hay sesión
    if (!token) {
      return NextResponse.json(
        { error: 'No hay sesión activa' },
        { status: 401 }
      )
    }

    // Verificar el token
    const decoded = jwt.verify(
      token.value,
      process.env.JWT_SECRET || ''
    ) as { userId: string }

    // Buscar el usuario en la base de datos
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
        role: true,
        reservations: true,
        createdAt: true,
        updatedAt: true
      }
    })

    // Si no existe el usuario
    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({ 
      user: user
    })

  } catch (error) {
    // Si el token es inválido o hay otro error
    return NextResponse.json({
      mensaje: "Error al verificar la sesión",
      error: error
    }, { status: 401 })
  }
}