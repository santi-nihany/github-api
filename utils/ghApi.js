import { Octokit, App } from "octokit";
require("dotenv").config();

const GH_TOKEN = process.env.GH_TOKEN || "";

export default async function getRepo() {  

    const octokit = new Octokit({ auth: GH_TOKEN});

    const res = await octokit.request("GET /repos/{owner}/{repo}/commits", {
        owner: "santi-nihany",
        repo: "sciencetifical"
    });

    // console.log(res.data);
    return res.data;
}