import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function CreateUser() {
    try {
        const user = await prisma.user.create({ data: {} });
        return NextResponse.json({ mensaje: "Usuario creado", user: user });
    } catch (error) {
        return NextResponse.json({ mensaje: "Error al crear el usuario", error: error });
    }
}