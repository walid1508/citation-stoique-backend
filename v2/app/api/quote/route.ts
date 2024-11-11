import connect from "@/lib/db";
import Quote from "@/lib/models/quote";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connect();
    const quotesCount = await Quote.countDocuments();
    const randomIndex = Math.floor(Math.random() * quotesCount);
    const randomQuote = await Quote.findOne()
      .skip(randomIndex)
      .select("-_id -__v");
    if (!randomQuote) {
      // Aucune citation trouvée
      return new NextResponse("Aucune citation trouvée", { status: 404 });
    }
    return new NextResponse(JSON.stringify(randomQuote), { status: 200 });
  } catch (error: any) {
    return new NextResponse(`Erreur : ${error.message}`, {
      status: 500,
    });
  }
};