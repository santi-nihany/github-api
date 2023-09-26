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
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  goal: z.string().min(2, {
    message: "Goal Title must be at least 2 characters.",
  }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(100, {
      message: "Description must not be longer than 100 characters.",
    }),
  username: z.union([
    z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .optional(),
    z.literal(""),
  ]),
  repo: z.union([
    z
      .string()
      .min(2, {
        message: "Repo must be at least 2 characters.",
      })
      .optional(),
    z.literal(""),
  ]),
  link: z.union([
    z
      .string()
      .url({ message: "Link must be a valid URL." })
      .startsWith("https://github.com/", {
        message: "Must provide a valid Github URL: https://github.com/",
      })
      .nullish(),
    z.literal(""),
  ]),
});

export function RepoForm() {
  const [data, setData] = useState(null);
  const [values, setValues] = useState({
    user: "",
    repo: "",
    goal: "",
    description: "",
  });

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      repo: "",
      goal: "",
      description: "",
      link: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values) {
    console.log(values);
    let user;
    let repo;
    if (values.link) {
      const match = values.link.match(/github\.com\/([^/]+)\/([^/]+)/);

      if (match && match.length === 3) {
        user = match[1];
        repo = match[2];
        console.log("Username:", user);
        console.log("Repo:", repo);
      } else {
        console.log("Invalid URL format");
      }
    } else if (values.username && values.repo) {
      user = values.username;
      repo = values.repo;
    } else {
      return;
    }
    const res = await getRepo(user, repo);
    setValues({
      user: user,
      repo: repo,
      goal: values.goal,
      description: values.description,
    });
    setData(res);
  }

  return (
    <div className="flex justify-center gap-20 mt-10">
      <div className=" w-[24rem] h-full border rounded-xl border-[#76819b] border-opacity-90 p-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="goal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Goal *</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your goal!"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <h2 className="pt-[1rem] font-bold text-md">
              Add your Github Repo !
            </h2>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Github Username (Owner)</FormLabel>
                  <FormControl>
                    <Input placeholder="santi-nihany" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="repo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repository (public) </FormLabel>
                  <FormControl>
                    <Input placeholder="sciencetifical" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="font-bold text-center ">or </p>
            <FormField
              className="space-y-0"
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repository Link </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://github.com/santi-nihany/sciencetifical"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-4">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
      {data ? (
        <Commits
          data={data}
          user={values.user}
          repo={values.repo}
          goal={values.goal}
          description={values.description}
        />
      ) : null}
    </div>
  );
}
