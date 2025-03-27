"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "../components/SubmitButtons";
import { useActionState } from "react";
import { onboardUser } from "@/actions/action";
import { useForm } from "@conform-to/react";
import { onboardingSchema } from "@/utils/zodSchemas";
import { parseWithZod } from "@conform-to/zod";


export default function Onboarding() {

  const [lastResult, action] = useActionState(onboardUser, undefined); 

  const [form, fields] = useForm({
      lastResult,

      onValidate({formData}) {
        return parseWithZod(formData, {
          schema: onboardingSchema,
        });
      },

      shouldValidate: "onBlur",
      shouldRevalidate: "onInput",

  })

  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
        <Card className="max-w-sm mx-auto">
            <CardHeader>
               <CardTitle className="text-xl">Vous avez presque terminé !</CardTitle>
                <CardDescription>
                    Saisissez vos informations pour créer un compte
                </CardDescription>
            </CardHeader>
            <CardContent><p className="text-red-500 text-sm">{fields.address.errors}</p>
                <form 
                  className="grid gap-4"
                  action={action}
                  id={form.id}
                  onSubmit={form.onSubmit}
                  noValidate
                  >
                    <div className="grid grid-cols-2 gap-4">
                        <div className=" flex flex-col gap-2">
                            <Label>Prénom</Label>
                            <Input
                              name={fields.firstName.name}
                              key={fields.firstName.key}
                              defaultValue={fields.firstName.initialValue} 
                              placeholder="Prénom" />
                        </div>
                        <div className=" grid gap-2">
                            <Label>Nom</Label>
                            <Input
                              name={fields.lastName.name}
                              key={fields.lastName.key}
                              defaultValue={fields.lastName.initialValue} 
                              placeholder="Nom" />
                        </div>
                    </div>
                    <div className="grid gap-2">
                      <Label>Adresse</Label>
                      <Input
                        name={fields.address.name}
                        key={fields.address.key}
                        defaultValue={fields.address.initialValue}
                        placeholder="Kipako avenue 123"
                      />
                      <p className="text-red-500 text-sm">{fields.address.errors}</p>
                    </div>
                    <SubmitButton text ="Terminer l'inscription"/>
                </form>

            </CardContent>
        </Card> 

    </div>
  )
}
