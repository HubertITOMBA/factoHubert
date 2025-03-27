import { z } from "zod";

export const onboardingSchema = z.object({
  firstName: z.string().min(2, "Le prénom requis"),
  lastName: z.string().min(2, "Le nom requis"),
  address: z.string().min(2, "L'adresse est requis"),
});


export const invoiceSchema = z.object({
  invoiceName : z.string().min(1, "Nom de la facture obligatoire"),
  total : z.number().min(1, "1$€ minimum"),
  status : z.enum(["PAYE", "ENCOURS"]).default("ENCOURS"),
  date : z.string().min(1, "Date obligatoire"),
  dueDate : z.number().min(0, "Date d'échéance obligatoire"),
  fromName : z.string().min(1, "Votre nom obligatoire"),
  fromEmail : z.string().email("Adresse e-mail invalide"),
  fromAddress : z.string().min(1, "Votre adresse obligatoire"),
  clientName : z.string().min(1, "Nom du client obligatoire"),
  clientEmail : z.string().email("Adresse e-mail invalide"),
  clientAddress : z.string().min(1, "L'adresse du client est requis"),
  currency: z.string().min(1, "Devise requise"),
  invoiceNumber: z.number().min(1, "Numéro de facture minimum : 1"),
  note: z.string().optional(),
  invoiceItemDescription: z.string().min(1, "Description requise"),
  invoiceItemQuantity: z.number().min(1, "Quantité minimum : 1"),
  invoiceItemRate: z.number().min(1, "Taux minimum : 1"),
});


// export const invoiceZSchema = z.object({
//   invoiceName: z.string().min(1, "Invoice Name is required"),
//   total: z.number().min(1, "1$ is minimum"),
//   status: z.enum(["PAID", "PENDING"]).default("PENDING"),
//   date: z.string().min(1, "Date is required"),
//   dueDate: z.number().min(0, "Due Date is required"),
//   fromName: z.string().min(1, "Your name is required"),
//   fromEmail: z.string().email("Invalid Email address"),
//   fromAddress: z.string().min(1, "Your address is required"),
//   clientName: z.string().min(1, "Client name is required"),
//   clientEmail: z.string().email("Invalid Email address"),
//   clientAddress: z.string().min(1, "Client address is required"),
//   currency: z.string().min(1, "Currency is required"),
//   invoiceNumber: z.number().min(1, "Minimum invoice number of 1"),
//   note: z.string().optional(),
//   invoiceItemDescription: z.string().min(1, "Description is required"),
//   invoiceItemQuantity: z.number().min(1, "Qunatity min 1"),
//   invoiceItemRate: z.number().min(1, "Rate min 1"),
// });