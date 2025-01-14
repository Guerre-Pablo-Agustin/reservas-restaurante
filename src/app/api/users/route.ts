import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { name, email, password, lastName } = await request.json(); // Obtener datos del usuario desde el body de la petición

        // Crear el usuario en la base de datos
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password,
                lastName: lastName
            }
        });

        return NextResponse.json({ mensaje: "Usuario creado", user: user });
    } catch (error) {
        return NextResponse.json({ mensaje: "Error al crear el usuario", error: error });
    }
}