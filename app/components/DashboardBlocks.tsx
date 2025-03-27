import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CreditCard, DollarSign, Users, EuroIcon } from "lucide-react";
import prisma from "@/utils/db";
import { requireUser } from "@/utils/hooks";
import { formatCurrency } from "@/lib/formatCurrency";
 


async function getData(userId: string) {
    const [data, openInvoices, paidinvoices] = await Promise.all([
      prisma.invoice.findMany({
        where: {
          userId: userId,
        },
        select: {
          total: true,
        },
      }),
      prisma.invoice.findMany({
        where: {
          userId: userId,
          status: "ENCOURS",
        },
        select: {
          id: true,
        },
      }),
  
      prisma.invoice.findMany({
        where: {
          userId: userId,
          status: "PAYE",
        },
        select: {
          id: true,
        },
      }),
    ]);
  
    return {
      data,
      openInvoices,
      paidinvoices,
    };
  }

export default async function DashboardBlocks() {

  const session = await requireUser();
  const { data, openInvoices, paidinvoices } = await getData(
    session.user?.id as string
  );

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
        <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenue Totale</CardTitle>
          <EuroIcon className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">
            {formatCurrency({
              amount: data.reduce((acc, invoice) => acc + invoice.total, 0),
              currency: "EUR",
            })}
          </h2>
          <p className="text-xs text-muted-foreground">Basé sur le volume total</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total des factures émises
          </CardTitle>
          <Users className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">+{data.length}</h2>
          <p className="text-xs text-muted-foreground"> Total des factures émises !</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Factures payées</CardTitle>
          <CreditCard className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">+{paidinvoices.length}</h2>
          <p className="text-xs text-muted-foreground">
           Total des factures qui ont été payées !
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Factures en attente
          </CardTitle>
          <Activity className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">+{openInvoices.length}</h2>
          <p className="text-xs text-muted-foreground">
            Factures actuellement en attente !
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
