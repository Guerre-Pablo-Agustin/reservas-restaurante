import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
        return NextResponse.json({ mensaje: "ID no proporcionado" }, { status: 400 });
    }
    try {
        const reservation = await prisma.reservation.delete({ where: { id: id } });
        return NextResponse.json({ mensaje: "Reserva eliminada", reservation: reservation });
    } catch (error) {
        return NextResponse.json({ mensaje: "Error al eliminar la reserva", error: error });
    }
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
        return NextResponse.json({ mensaje: "ID no proporcionado" }, { status: 400 });
    }
    try {
        const reservation = await prisma.reservation.findUnique({ where: { id: id } });
        if (!reservation) {
            return NextResponse.json({ mensaje: "Reserva no encontrada" }, { status: 404 });
        }
        return NextResponse.json(reservation);
    } catch (error) {
        return NextResponse.json({ mensaje: "Error al obtener la reserva", error: error });
    }
}



export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const { clientName, details, status, date, time, quantity } = await request.json(); 
    try {
        const reservation = await prisma.reservation.update({ where: { id: id }, data: { clientName: clientName, details: details, status: status, date: date, time: time, quantity: quantity } }); 
        return NextResponse.json({ mensaje: "Reserva actualizada", reservation: reservation }); 
    } catch (error) {
        return NextResponse.json({ mensaje: "Error al actualizar la reserva", error: error }); 
    }
}