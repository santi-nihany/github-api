import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function Commits({ data, user, repo, goal, description }) {
  console.log(data);
  return (
    <div className=" w-[24rem] space-y-4">
      <h1 className="text-3xl text-center">{goal}</h1>
      <p className="text-center text-sm pb-4">{description}</p>
      <Collapsible>
        <div className="flex justify-between mb-3">
          <CollapsibleTrigger>
            <h3 className="text-center self-center text-md font-semibold">
              Show commit log ⬇
            </h3>
          </CollapsibleTrigger>
          <Link
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
      {/* <h3 className="text-center self-center text-xl font-bold">
        {" "}
        Commit log{" "}
      </h3> */}
    </div>
  );
}
