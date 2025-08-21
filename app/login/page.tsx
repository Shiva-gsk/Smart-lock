"use client";
import React, { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardAction,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormError, FormSuccess } from "@/components/auth/FormComponents";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password:  z.string().min(2, {
    message: "Password must be at least 2 characters.",
  })
});
const Page = () => {
 const [success, setsuccess] = useState<string | undefined>("");
  // const [error, setError] = useState<string | undefined>("");
  // const [isPending, setTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setsuccess("Login Successful");
    setTimeout(()=>{

      router.push("/dashboard");
      // setsuccess("");
    }, 2000);

    console.log(values);
  }
  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden flex items-center justify-center">
      {/* <h1 className='text-3xl font-bold text-amber-50'>Login Page</h1> */}
      <Card className="w-full max-w-sm bg-gradient-to-br from-zinc-200 to-zinc-400 inset-0 shadow-md opacity-95">
        <CardHeader>
          <CardTitle className="text-center p-4">Login to your account</CardTitle>
          {/* <CardDescription>
            Enter your credentials 
          </CardDescription> */}
          <CardAction>
            
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="">
           <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4 md:w-[300px]">
                <FormField 
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <FormControl>
                      <Input {...field} id="username" type="text" placeholder="example" className="border-none" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
                {/* <successMessage message={success}/> */}
                <FormField 
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <Input {...field} id="password" type="password" placeholder="*******" className="border-none"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
              </div>
              <FormError message={error}/>
              <FormSuccess message={success}/>
              <Button disabled={isPending} type="submit" className="w-full cursor-pointer">Login</Button>
            </form>
          </Form>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          {/* <Button type="submit" className="w-full">
            Login
          </Button> */}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
