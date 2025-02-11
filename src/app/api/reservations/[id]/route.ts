import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request: NextRequest) {
    const { pathname } = new URL(request.url);
    const id = pathname.split("/").pop();
    console.log("id 🚀", id);


    if (!id) {
        return NextResponse.json({ mensaje: "ID no proporcionado" }, { status: 400 });
    }

    try {
        const reservation = await prisma.reservation.delete({
            where: { id: id },
        });
        return NextResponse.json({ mensaje: "Reserva eliminada", reservation: reservation });
    } catch (error) {
        return NextResponse.json({ mensaje: "Error al eliminar la reserva", error: error });
    }
}

export async function GET(request: NextRequest) {
    const { pathname } = new URL(request.url);
    const id = pathname.split("/").pop();

    console.log("id 🚀", id);

    if (!id) {
        return NextResponse.json({ mensaje: "ID no proporcionado" }, { status: 400 });
    }

    try {
        const reservation = await prisma.reservation.findUnique({
            where: { id: id },
        });

        if (!reservation) {
            return NextResponse.json({ mensaje: "Reserva no encontrada" }, { status: 404 });
        }

        return NextResponse.json({ mensaje: "Reserva obtenida", reservation: reservation });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ mensaje: "Error al obtener la reserva", error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ mensaje: "Error desconocido al obtener la reserva" }, { status: 500 });
        }
    }
}

export async function PUT(request: NextRequest) {
    const { pathname } = new URL(request.url);
    const id = pathname.split("/").pop();

    if (!id) {
        return NextResponse.json({ mensaje: "ID no proporcionado" }, { status: 400 });
    }

    const { clientName, details, status, date, time, quantity } = await request.json();
    try {
        const reservation = await prisma.reservation.update({
            where: { id: id },
            data: { clientName, details, status, date, time, quantity },
        });
        return NextResponse.json({ mensaje: "Reserva actualizada", reservation: reservation });
    } catch (error) {
        return NextResponse.json({ mensaje: "Error al actualizar la reserva", error: error });
    }
}