// const core = require('@actions/core');
const github = require('@actions/github');
console.log(JSON.stringify(github));

// const context = github.context;

// async function run() {
//     // This should be a token with access to your repository scoped in as a secret.
//     // The YML workflow will need to set myToken with the GitHub Secret Token
//     // myToken: ${{ secrets.GITHUB_TOKEN }}
//     // https://help.github.com/en/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token#about-the-github_token-secret
//     console.log("Getting token...");
//     const myToken = core.getInput('myToken');
//     console.log("Getting Octokit...");
//     const octokit = github.getOctokit(myToken);

//     // You can also pass in additional options as a second parameter to getOctokit
//     // const octokit = github.getOctokit(myToken, {userAgent: "MyActionVersion1"});
  
//     console.log("Getting topics...");
//     const {data: topics} = await octokit.rest.repos.getAllTopics({...context.repo});
//     console.log(JSON.stringify(topics));
//     if (topics.names.indexOf("changed") === -1) {
// 	console.log("Settings topics...");
// 	topics.names.push("changed");
// 	await octokit.rest.repos.replaceAllTopics({...context.repo, ...topics});
//     }
// }

// run();


const { Octokit } = require("@octokit/action");

const octokit = new Octokit();
const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
async function run() {
    const {data} = await octokit.request("GET /repos/{owner}/{repo}/topics", {
	owner: owner,
	repo: repo
    });
    console.log(JSON.stringify(data));
    if (data.names.indexOf("changed") === -1) {
	console.log("Settings data.names...");
	data.names.push("changed");
	await octokit.request('PUT /repos/{owner}/{repo}/topics', {
	    owner: owner,
	    repo: repo,
	    names: data.names,
	    headers: {
		'X-GitHub-Api-Version': '2022-11-28'
	    }
	})
    }
}

run();
