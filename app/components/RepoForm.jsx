"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import getRepo from "@/utils/ghApi";
import Commits from "./Commits";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  repo: z.string().min(2, {
    message: "Repo must be at least 2 characters.",
  }),
});

export function RepoForm() {
  const [data, setData] = useState(null);
  const [values, setValues] = useState({ user: "", repo: "" });

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      repo: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values) {
    console.log(values);
    const res = await getRepo(values.username, values.repo);
    setValues({ user: values.username, repo: values.repo });
    setData(res);
  }

  return (
    <div className="flex justify-center gap-20 mt-10">
      <div className=" w-[24rem] h-[24rem] border rounded-xl border-[#76819b] border-opacity-90 p-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Github Username</FormLabel>
                  <FormControl>
                    <Input placeholder="santi-nihany" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the owner of the repo.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="repo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repository</FormLabel>
                  <FormControl>
                    <Input placeholder="sciencetifical" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public repo name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
      {data ? (
        <Commits data={data} user={values.user} repo={values.repo} />
      ) : null}
    </div>
  );
}
