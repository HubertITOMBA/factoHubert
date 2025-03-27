import prisma from "@/utils/db";
import { requireUser } from "@//utils/hooks";
import { emailClient } from "@/utils/mailtrap";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  }
) {
  try {
    const session = await requireUser();

    const { invoiceId } = await params;

    const invoiceData = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
        userId: session.user?.id,
      },
    });

    if (!invoiceData) {
      return NextResponse.json({ error: "Facture non trouvée !" }, { status: 404 });
    }

    const sender = {
      email: "dev@hitomba.com",
      name: "Hubert ITOmBA",
    };

    // emailClient.send({
    //   from: sender,
    //   to: [{ email: "jan@alenix.de" }],
    //   template_uuid: "03c0c5ec-3f09-42ab-92c3-9f338f31fe2c",
    //   template_variables: {
    //     first_name: invoiceData.clientName,
    //     company_info_name: "HubertFacturation",
    //     company_info_address: "Chad street 124",
    //     company_info_city: "Paris",
    //     company_info_zip_code: "345345",
    //     company_info_country: "France",
    //   },
    // });

    
      emailClient.send({
      from: sender,
      to: [{ email: "hubert.itomba@gmail.com" }],
      subject: "Relance de cotisation du mois",
      text: "Hey, Vous avez oublié de verser votre cotisation du mois !",
      category: "Cotisation Test",
     });




    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Échec de l'envoi de l'e-mail de relance" },
      { status: 500 }
    );
  }
}
