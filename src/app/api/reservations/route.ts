import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Reservation } from "@/types/types";



console.log("prisma reservation",prisma.reservation)


export async function GET() {
  try {
    const reservations = await prisma.reservation.findMany();
    return NextResponse.json({
      mensaje: "Listado de reservaciones",
      reservations: reservations,
    });
  } catch (error) {
    return NextResponse.json({
      mensaje: "Error al obtener las reservaciones",
      error: error,
    });
  }
}

export async function POST(request: Request) {
  const { clientName, details, status, date, time, quantity, userId, phone } : Reservation =
    await request.json();

  console.log('datos', { clientName, details, status, date, time, quantity, userId, phone });


  if (!clientName || !details || !status || !date || !time || !quantity || !userId || !phone) {
    return NextResponse.json({
      mensaje: "Error al crear la reserva",
      error: "Todos los campos son obligatorios",
    });
  }

  
  try {
    const reservation = await prisma.reservation.create({
      data: {
        clientName: clientName,
        details: details,
        status: status,
        date: date,
        time: time,
        quantity: quantity,
        userId: userId,
        phone: phone
      },
    });

    console.log("reservation", reservation);
    return NextResponse.json({
      mensaje: "Reserva creada",
      reservation: reservation,
    });
  } catch (error) {
    return NextResponse.json({
      mensaje: "Error al crear la reserva",
      error: error,
    });
  }
}
