import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const { name, lastName, email, password  } = await request.json();
    try {
        const user = await prisma.user.update({ where: { id: id }, data: { name: name, lastName: lastName, email: email, password: password } });
        return NextResponse.json({ mensaje: "Usuario actualizado", user: user });
    } catch (error) {
        return NextResponse.json({ mensaje: "Error al actualizar el usuario", error: error });
    }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const user = await prisma.user.findUnique({ where: { id: id } }); 
        return NextResponse.json({ mensaje: "Usuario obtenido", user: user }); 
    } catch (error) {
        return NextResponse.json({ mensaje: "Error al obtener el usuario", error: error }); 
    }
}