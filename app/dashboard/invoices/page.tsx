import InvoiceList from "@/app/components/InvoiceList";
import { buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function invoicesRoute() {
  return (
    <Card>
         <CardHeader>
            <div className="flex items-center justify-between">
                <div>
                    <CardTitle className="text-2xl font-bold">Factures</CardTitle>
                    <CardDescription>Gèrer vos factures ici</CardDescription>
                </div>
                <Link href="/dashboard/invoices/create" className={buttonVariants()}><PlusIcon /> Créer une facture</Link>
            </div>
         </CardHeader>
         <CardContent>
            <Suspense fallback={<Skeleton className="w-full h-[500px]" />}>
              <InvoiceList />
            </Suspense> 
         </CardContent>
    </Card>
  );
}
