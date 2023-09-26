import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Image from "next/image";

export default function Commits({ data, user, repo, goal, description }) {
  return (
    <div className=" w-[24rem] space-y-4 border rounded-2xl h-fit p-4">
      <h1 className="text-2xl text-center font-semibold">{goal}</h1>
      <p className=" text-sm pb-3">{description}</p>
      <Collapsible>
        <div className="flex justify-center pb-3 gap-2 border-t pt-1">
          <h1 className="w-fit self-center font-semibold">Github</h1>
          <Image
            className="self-center"
            src={"/gh.svg"}
            alt="GH logo"
            width={20}
            height={20}
          />
        </div>
        <div className="flex justify-between mb-3">
          <CollapsibleTrigger>
            <h3 className="text-center self-center text-md font-semibold">
              Show commit log ⬇
            </h3>
          </CollapsibleTrigger>
          <Link
            target="_blank"
            className="text-center self-center text-md font-bold border-b-2  hover:border-black"
            href={`https://github.com/${user}/${repo}`}
          >
            Link to repo 🚀
          </Link>
        </div>
        <CollapsibleContent>
          <div className="grid gap-4">
            {data.slice(0, 3).map((item) => {
              const commitDate = new Date(item.commit.author.date);
              const formattedDate = commitDate.toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                // timeZoneName: "short",
              });
              return (
                <div
                  key={item.sha}
                  className="border rounded-xl bg-slate-950 text-white p-3"
                >
                  <h3>Author: {item.commit.author.name}</h3>
                  <h4>Message: {item.commit.message}</h4>
                  <h4>Date: {formattedDate}</h4>
                </div>
              );
            })}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
