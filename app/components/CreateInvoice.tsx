"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { invoiceSchema } from "@/utils/zodSchemas";
import { useActionState, useState } from "react";
import { SubmitButton } from "./SubmitButtons";
import { createInvoice } from "@/actions/action";
import { formatCurrency } from "@/lib/formatCurrency";


interface iAppProps {
    firstName: string;
    lastName: string;
    address: string;
    email: string;
}
  

export default function CreateInvoice({
    address,
    email,
    firstName,
    lastName,
  }: iAppProps) {
    const [lastResult, action] = useActionState(createInvoice, undefined);
    const [form, fields] = useForm({
        lastResult,

         onValidate({ formData }) {
            return parseWithZod(formData, {
                schema: invoiceSchema
            });
         },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
   });


  const [selectedDate, setSelectedDate] = useState(new Date());
  const [rate, setRate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [currency, setCurrency] = useState("EUR");

  const calcualteTotal = (Number(quantity) || 0) * (Number(rate) || 0);

  return (
    <Card className="w-full max-w-4xl mx-auto"> 
        <CardContent  className="p-6">

        <form 
            id={form.id} action={action} onSubmit={form.onSubmit} noValidate
        >
          <input
            type="hidden"
            name={fields.date.name}
            value={selectedDate.toISOString()}
          />

          <input
            type="hidden"
            name={fields.total.name}
            value={calcualteTotal}
          />

            <div className="flex flex-col gap-1 w-fit mb-6">
                <div className="flex items-center gap-4">
                <Badge variant="secondary">Draft</Badge>
                <Input
                    name={fields.invoiceName.name}
                    key={fields.invoiceName.key}
                    defaultValue={fields.invoiceName.initialValue}
                    placeholder="Test 123"
                />
                </div>
                <p className="text-sm text-red-500">{fields.invoiceName.errors}</p>
                </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                <Label>Facrure No.</Label>
                <div className="flex">
                    <span className="px-3 border border-r-0 rounded-l-md bg-muted flex items-center">
                    #
                    </span>
                    <Input
                      name={fields.invoiceNumber.name}
                      key={fields.invoiceNumber.key}
                      defaultValue={fields.invoiceNumber.initialValue}
                    className="rounded-l-none"
                    placeholder="5"
                    />
                </div>
                <p className="text-red-500 text-sm">{fields.invoiceNumber.errors}</p>
                </div>

                    <div>
                        <Label>Devise</Label>
                        <Select
                            defaultValue="EUR"
                            name={fields.currency.name}
                            key={fields.currency.key}
                            onValueChange={(value) => setCurrency(value)}
                        >
                            <SelectTrigger>
                            <SelectValue placeholder="Selectionner la devise" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="USD">
                                United States Dollar -- USD
                            </SelectItem>
                            <SelectItem value="EUR">Euro -- EUR</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-red-500 text-sm">{fields.currency.errors}</p>
                    </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                <Label>De</Label>
                <div className="space-y-2">
                    <Input
                      name={fields.fromName.name}
                      key={fields.fromName.key}
                      placeholder="Votre Nom"
                      defaultValue={firstName + " " + lastName}
                    />
                    <p className="text-red-500 text-sm">{fields.fromName.errors}</p>
                    <Input
                      placeholder="Votre Email"
                      name={fields.fromEmail.name}
                      key={fields.fromEmail.key}
                      defaultValue={email}
                    />
                    <p className="text-red-500 text-sm">{fields.fromEmail.errors}</p>
                    <Input
                    placeholder="Votre adresse"
                      name={fields.fromAddress.name}
                      key={fields.fromAddress.key}
                      defaultValue={address}
                    />
                    <p className="text-red-500 text-sm">{fields.fromAddress.errors}</p>
                </div>
                </div>

                <div>
                <Label>A</Label>
                <div className="space-y-2">
                    <Input
                      name={fields.clientName.name}
                      key={fields.clientName.key}
                      defaultValue={fields.clientName.initialValue}
                    placeholder="Nom du Client"
                    />
                    <p className="text-red-500 text-sm">{fields.clientName.errors}</p>
                    <Input
                      name={fields.clientEmail.name}
                      key={fields.clientEmail.key}
                      defaultValue={fields.clientEmail.initialValue}
                    placeholder="Email du Client"
                    />
                    <p className="text-red-500 text-sm">{fields.clientEmail.errors}</p>
                    <Input
                      name={fields.clientAddress.name}
                      key={fields.clientAddress.key}
                      defaultValue={fields.clientAddress.initialValue}
                    placeholder="Adresse du Client"
                    />
                    <p className="text-red-500 text-sm">{fields.clientAddress.errors}</p>
                </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                <div>
                        <Label>Date</Label>
                    </div>
                    <Popover>
                        <PopoverTrigger asChild>
                        <Button variant="outline" className="w-[280px] text-left justify-start">
                            <CalendarIcon />
                            {selectedDate ? (
                            new Intl.DateTimeFormat("fr-FR", {
                                dateStyle: "full",
                                timeStyle: 'medium',
                            }).format(selectedDate)
                            ) : (
                            <span>Choisissez une date</span>
                            )}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                        <Calendar
                            selected={selectedDate}
                            onSelect={(date) => setSelectedDate(date || new Date())}
                            mode="single"
                            fromDate={new Date()}
                        />
                        </PopoverContent>
                    </Popover>
                    <p className="text-red-500 text-sm"> {fields.date.errors} </p>  
                </div>
                 
                <div>
                <Label>Facture Due</Label>
                <Select
                    name={fields.dueDate.name}
                    key={fields.dueDate.key}
                    defaultValue={fields.dueDate.initialValue}
                >
                    <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez la date d'échéance" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="0">À payer à réception</SelectItem>
                    <SelectItem value="15">Net 15</SelectItem>
                    <SelectItem value="30">Net 30</SelectItem>
                    </SelectContent>
                </Select>
                <p className="text-red-500 text-sm">{fields.dueDate.errors}</p> 
                </div>
            </div>

            <div>
                <div className="grid grid-cols-12 gap-4 mb-2 font-medium">
                    <p className="col-span-6">Description</p>
                    <p className="col-span-2">Quantité</p>
                    <p className="col-span-2">Taux Taxe</p>
                    <p className="col-span-2">Montant</p>
                </div>

            <div className="grid grid-cols-12 gap-4 mb-4">
                <div className="col-span-6">
                        <Textarea
                            name={fields.invoiceItemDescription.name}
                            key={fields.invoiceItemDescription.key}
                            defaultValue={fields.invoiceItemDescription.initialValue}
                            placeholder="Nom et description de l'article"
                        />
                        <p className="text-red-500 text-sm">{fields.invoiceItemDescription.errors}</p>
                </div>
                <div className="col-span-2">
                    <Input
                          name={fields.invoiceItemQuantity.name}
                          key={fields.invoiceItemQuantity.key}
                        type="number"
                        placeholder="0"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                        <p className="text-red-500 text-sm">{fields.invoiceItemQuantity.errors}</p>
                </div>
                <div className="col-span-2">
                        <Input
                            name={fields.invoiceItemRate.name}
                            key={fields.invoiceItemRate.key}
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                            type="number"
                            placeholder="0"
                        />
                        <p className="text-red-500 text-sm">{fields.invoiceItemRate.errors}</p>
                </div>
                <div className="col-span-2">
                    <Input 
                       value={formatCurrency({
                        amount: calcualteTotal,
                        currency: currency as any,
                     })}
                     disabled
                    />
                </div>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="w-1/3">
              <div className="flex justify-between py-2">
                <span>Sous - Total</span>
                <span>
                  {formatCurrency({
                    amount: calcualteTotal,
                    currency: currency as any,
                  })}
                </span>
              </div>
              <div className="flex justify-between py-2 border-t">
                <span>Total ({currency})</span>
                <span className="font-medium underline underline-offset-2">
                  {formatCurrency({
                    amount: calcualteTotal,
                    currency: currency as any,
                  })}
                </span>
              </div>
            </div>
          </div>

          <div>
            <Label>Note</Label>
            <Textarea
                name={fields.note.name}
                key={fields.note.key}
                defaultValue={fields.note.initialValue}
                placeholder="Ajoutez votre/vos note(s) ici ..."
            />
            <p className="text-red-500 text-sm">{fields.note.errors}</p>
          </div>

          <div className="flex items-center justify-end mt-6">
            <div>
              <SubmitButton text="Envoyer la facture au client" />
            </div>
          </div>
        </form> 

        </CardContent>
    </Card>
  );
}

