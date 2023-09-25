import Link from "next/link";

export default function Commits({ data, user, repo }) {
  console.log(data);
  return (
    <div className=" w-[24rem]">
      <div className="flex justify-between mb-3">
        <h3 className="text-center self-center text-xl font-bold">
          {" "}
          Commit log{" "}
        </h3>
        <Link
          className="text-center self-center text-md font-bold border-b-2  hover:border-black"
          href={`https://github.com/${user}/${repo}`}
        >
          Link to repo 🚀
        </Link>
      </div>
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
    </div>
  );
}
