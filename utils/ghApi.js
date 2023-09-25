import { Octokit, App } from "octokit";
require("dotenv").config();

const GH_TOKEN = process.env.GH_TOKEN || "";

export default async function getRepo(user, repo) {
  const octokit = new Octokit({ auth: GH_TOKEN });

  const res = await octokit.request("GET /repos/{owner}/{repo}/commits", {
    owner: user,
    repo: repo,
  });

  // console.log(res.data);
  return res.data;
}
