import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import PaidGif from "@/public/paid-gif.gif";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { MarkAsPaidAction } from "@/actions/action";
import prisma from "@/utils/db";
import { redirect } from "next/navigation";
import { requireUser } from "@/utils/hooks";

async function Authorize(invoiceId: string, userId: string) {
  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: userId,
    },
  });

  if (!data) {
    return redirect("/dashboard/invoices");
  }
}

type Params = Promise<{ invoiceId: string }>;

export default async function MarkAsPaid({ params }: { params: Params }) {

  const { invoiceId } = await params;
  const session = await requireUser();
  await Authorize(invoiceId, session.user?.id as string);
  
  return (
    <div className="flex flex-1 justify-center items-center">
      <Card className="max-w-[500px]">
        <CardHeader>
          <CardTitle>Marquer comme payé ?</CardTitle>
          <CardDescription>
          Êtes-vous sûr de vouloir marquer cette facture comme payée ?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image src={PaidGif} alt="Paid Gif" className="rounded-lg" />
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Link
            className={buttonVariants({ variant: "outline" })}
            href="/dashboard/invoices"
          >
            Annuler
          </Link>
          <form
            action={async () => {
              "use server";
              await MarkAsPaidAction(invoiceId);
            }}
          >
            <SubmitButton text="Marquer comme payé !" />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
