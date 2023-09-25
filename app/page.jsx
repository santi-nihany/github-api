"use client";
import { useEffect, useState } from "react";
import "./globals.css";
import { RepoForm } from "./components/RepoForm";

export default function Home() {
  return (
    <div className="flex flex-col">
      <h1 className="w-full text-center text-5xl font-semibold text-[#7857ed] mt-10">
        Talent Protocol Demo App
      </h1>
      <RepoForm />
    </div>
  );
}
