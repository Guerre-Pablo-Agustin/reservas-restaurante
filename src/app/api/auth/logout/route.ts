import { NextResponse } from 'next/server'

export async function POST() {
  try {
    // Crear una respuesta
    const response = NextResponse.json({
      mensaje: 'Logout exitoso',
      success: true
    })

    response.cookies.delete('token')
    
    return response
  } catch (error) {
    return NextResponse.json({
      mensaje: "Error en el servidor",
      error: error,
    })
  }
}