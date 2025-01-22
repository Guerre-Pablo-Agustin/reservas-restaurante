import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
    const { pathname } = new URL(request.url);
    const id = pathname.split("/").pop();

    if (!id) {
        return NextResponse.json({ mensaje: "ID no proporcionado" }, { status: 400 });
    }

    const { name, lastName, email, password } = await request.json();
    try {
        const user = await prisma.user.update({
            where: { id: id },
            data: { name, lastName, email, password },
        });
        return NextResponse.json({ mensaje: "Usuario actualizado", user: user });
    } catch (error) {
        return NextResponse.json({ mensaje: "Error al actualizar el usuario", error: error });
    }
}

export async function GET(request: NextRequest) {
    const { pathname } = new URL(request.url);
    const id = pathname.split("/").pop();

    if (!id) {
        return NextResponse.json({ mensaje: "ID no proporcionado" }, { status: 400 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: id },
            include: { reservations: true },
        });
        return NextResponse.json({ mensaje: "Usuario obtenido", user: user });
    } catch (error) {
        return NextResponse.json({ mensaje: "Error al obtener el usuario", error: error });
    }
}