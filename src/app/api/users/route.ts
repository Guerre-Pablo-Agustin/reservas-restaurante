import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
export async function POST(request: Request) {
    try {
        const { name, email, password, lastName } = await request.json(); // 
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
                lastName: lastName
            }
        });

        return NextResponse.json({ mensaje: "Usuario creado", user: user });
    } catch (error) {
        return NextResponse.json({ mensaje: "Error al crear el usuario", error: error });
    }
}