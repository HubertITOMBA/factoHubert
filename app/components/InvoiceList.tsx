import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import InvoiceActions from "./InvoiceActions";
import prisma from "@/utils/db";
import { requireUser } from "@/utils/hooks";
import { formatCurrency } from "@/lib/formatCurrency";
import { Badge } from "@/components/ui/badge";
import { badgeVariants } from "@/components/ui/badge"

import { EmptyState } from "./EmptyState";

async function getData(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      clientName: true,
      total: true,
      createdAt: true,
      status: true,
      invoiceNumber: true,
      currency: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}


export default async function InvoiceList() {

  const session = await requireUser();
  const data = await getData(session.user?.id as string);
  
  return (
    <>
        {data.length === 0 ? (
          <EmptyState
            title="Aucune facture trouvée"
            description="Créer une facture pour commencer"
            buttontext="Créer une facture"
            href="/dashboard/invoices/create"
          />
         ) : (
          <Table className="border-2 rounded-3xl shadow-2xl">
              <TableHeader className="rounded-3xl">
                  <TableRow className="group bg-blue-600 font-bold text-white rounded-3xl">
                      <TableHead className=" text-white">Numéro</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                 {data.map((invoice) => (
                  <TableRow  key={invoice.id}>
                          <TableCell>#{invoice.invoiceNumber}</TableCell>
                          <TableCell>{invoice.clientName}</TableCell>
                          <TableCell> {formatCurrency({
                              amount: invoice.total,
                              currency: invoice.currency as any,
                            })}</TableCell>
                          <TableCell>
                            
                            <Badge>{invoice.status}</Badge>
                            
                            </TableCell>
                          <TableCell  className="text-right">
                              {new Intl.DateTimeFormat("fr-FR", {
                                  dateStyle: "short",
                                }).format(invoice.createdAt)}
                          </TableCell>
                          <TableCell><InvoiceActions status={invoice.status} id={invoice.id} /></TableCell>
                      </TableRow>
                  ))}
              </TableBody>    
          </Table>
      )}
    </>
  )
}
