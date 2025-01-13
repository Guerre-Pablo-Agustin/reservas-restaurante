import { NextResponse } from 'next/server'
import prisma  from '@/lib/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function POST(request: Request) {
  try {
    // 1. Obtener email y password del body de la petición
    const { email, password } = await request.json()

    // 2. Buscar el usuario en la base de datos
    const user = await prisma.user.findUnique({
      where: { email },
      include: { reservations: true } // Incluir las reservas del usuario
    })

    // 3. Si no existe el usuario, devolver error
    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      )
    }

    // 4. Verificar que la contraseña sea correcta
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return NextResponse.json(
        { error: 'Contraseña incorrecta' },
        { status: 401 }
      )
    }

    // 5. Crear un token JWT
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'tu-secret-key',
      { expiresIn: '24h' }
    )

    // 6. Crear la respuesta y establecer la cookie
    const response = NextResponse.json(
      { 
        user: { 
          ...user, 
          password: undefined // No enviar la contraseña al cliente
        } 
      },
      { status: 200 }
    )

    // 7. Establecer la cookie con el token
    response.cookies.set('token', token, {
      httpOnly: true, // La cookie no es accesible via JavaScript
      secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
      sameSite: 'strict',
      maxAge: 86400 // 24 horas en segundos
    })

    return response

  } catch (error) {
    return NextResponse.json({
      mensaje: "Error en el servidor",
      error: error,
    });
  }
}