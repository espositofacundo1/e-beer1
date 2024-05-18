"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const updateOrdersIsPaid = async (orderId: string, isPaid?: boolean) => {
  const session = await auth();
  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "No permitido",
    };
  }
  try {
    let updateData: any = {};
    if (isPaid !== undefined) {
      updateData.isPaid = isPaid;
      if (isPaid) {
        // Si isPaid es true, establece DisPaid en la fecha actual menos tres horas
        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours());
        updateData.DisPaid = currentDate;
      }
    }
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: updateData,
    });

    revalidatePath("/admin/orders");

    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo actualizar la orden",
    };
  }
};