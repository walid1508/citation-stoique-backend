import connect from "@/lib/db";
import Quote from "@/lib/models/quote";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    await connect();

    // Récupérer le paramètre `num` de l'URL
    const url = new URL(req.url);
    const numParam = url.searchParams.get("num");
    const num = numParam ? parseInt(numParam, 10) : 10;

    // Valider `num`
    if (Number.isNaN(num) || num <= 0 || num > 100) {
      return NextResponse.json(
        { erreur: "`num` doit être un entier compris entre 1 et 100." },
        { status: 422 }
      );
    }

    // Récupérer toutes les citations et les mélanger
    const quotesCount = await Quote.countDocuments();
    if (quotesCount === 0) {
      return NextResponse.json(
        { message: "Aucune citation trouvée" },
        { status: 404 }
      );
    }

    // Limiter la requête au nombre total de citations disponibles
    const count = Math.min(num, quotesCount);

    // Récupérer des citations aléatoires
    const randomQuotes = await Quote.aggregate([
      { $sample: { size: count } },
      { $project: { _id: 0, __v: 0 } }, // Exclure les champs `_id` et `__v`
    ]);

    return NextResponse.json(randomQuotes, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ erreur: `${error.message}` }, { status: 500 });
  }
};
