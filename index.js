const core = require('@actions/core');
const github = require('@actions/github');
const context = github.context;

async function run() {
    // This should be a token with access to your repository scoped in as a secret.
    // The YML workflow will need to set myToken with the GitHub Secret Token
    // myToken: ${{ secrets.GITHUB_TOKEN }}
    // https://help.github.com/en/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token#about-the-github_token-secret
    console.log("Getting token...");
    const myToken = core.getInput('myToken');
    console.log("Getting Octokit...");
    const octokit = github.getOctokit(myToken);

    // You can also pass in additional options as a second parameter to getOctokit
    // const octokit = github.getOctokit(myToken, {userAgent: "MyActionVersion1"});
  
    console.log("Getting topics...");
    const topics = await octokit.rest.repos.getAllTopics({...context.repo});
    
    if (topics.names.indexOf("changed") === -1) {
	    console.log("Settings topics...");

	topics.names.push("changed");
	await octokit.rest.repos.replaceAllTopics({...context, ...topics});
    }
}

run();


