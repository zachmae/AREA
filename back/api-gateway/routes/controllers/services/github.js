const { Octokit } = require('@octokit/rest');


const config = {
    url: " https://0190-163-5-23-68.eu.ngrok.io/github/info",
    content_type: "json"
};

//const authToken = "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";

async function repoPubliciseCreate(authToken, args) {
    const { owner, repo } = JSON.parse(args);

    console.log("repoPubliciseCreate");

    const githubClient = new Octokit({
        auth: authToken,
    });

    return githubClient.repos.createWebhook({
        owner: owner,
        repo: repo,
        name: "web",
        config: config,
        //https://docs.github.com/fr/webhooks-and-events/webhooks/webhook-events-and-payloads
        events: ["star"],
        active: true
    }).then(response => {
      console.log("Webhook created:", response.data);
      return response.data;
    }).catch(error => {
      console.error("Error creating webhook:", error);
      return null;
    });
}

async function repoCreatedCreate(authToken, args) {
    const { owner, repo } = JSON.parse(args);

    console.log("repoCreatedCreate");

    const githubClient = new Octokit({
        auth: authToken,
    });

    return githubClient.repos.createWebhook({
        owner: owner,
        repo: repo,
        name: "web",
        config: config,
        //https://docs.github.com/fr/webhooks-and-events/webhooks/webhook-events-and-payloads
        events: ["star"],
        active: true
    }).then(response => {
      console.log("Webhook created:", response.data);
      return response.data;
    }).catch(error => {
      console.error("Error creating webhook:", error);
      return null;
    });
}

async function repoDeletedCreate(authToken, args) {
    const { owner, repo } = JSON.parse(args);

    console.log("repoDeletedCreate");

    const githubClient = new Octokit({
        auth: authToken,
    });

    //https://docs.github.com/fr/webhooks-and-events/webhooks/webhook-events-and-payloads
    return githubClient.repos.createWebhook({
      owner: owner,
      repo: repo,
      name: "web",
      config: config,
      events: ["star"],
      active: true
    }).then(response => {
      console.log("Webhook created:", response.data);
      return response.data;
    }).catch(error => {
      console.error("Error creating webhook:", error);
      return null;
    });}

async function starCreatedCreate(authToken, args) {
    const { owner, repo } = JSON.parse(args);
    console.log(owner + " " + repo);
    console.log("starCreatedCreate");

    const githubClient = new Octokit({
        auth: authToken,
    });
    return githubClient.repos.createWebhook({
        owner: owner,
        repo: repo,
        name: "web",
        config: config,
        //https://docs.github.com/fr/webhooks-and-events/webhooks/webhook-events-and-payloads
        events: ["star"],
        active: true
    }).then(response => {
      console.log("Webhook created:", response.data);
      return response.data;
    }).catch(error => {
      console.error("Error creating webhook:", error);
      return null;
    });
  }

async function githubHookDelete(authToken, args) {
    const { owner, repo, hook_id } = JSON.parse(args);

    console.log("starDeletedCreate");

    const githubClient = new Octokit({
        auth: authToken,
    });

    return githubClient.repos.deleteWebhook({
        owner: owner,
        repo: repo,
        hook_id: hook_id //403025894
    }).then(response => {
      console.log("Webhook deleted:", response.data);
      return response.data;
    }).catch(error => {
      console.error("Error deleting webhook:", error);
      return null;
    });
}

async function starDeletedCreate(authToken, args) {
    const { owner, repo } = JSON.parse(args);

    console.log("starDeletedCreate");

    const githubClient = new Octokit({
        auth: authToken,
    });
    return githubClient.repos.createWebhook({
        owner: owner,
        repo: repo,
        name: "web",
        config: config,
        //https://docs.github.com/fr/webhooks-and-events/webhooks/webhook-events-and-payloads
        events: ["star"],
        active: true
    }).then(response => {
      console.log("Webhook created:", response.data);
      return response.data;
    }).catch(error => {
      console.error("Error creating webhook:", error);
      return null;
    });}

async function watchCreate(authToken, args) {
    const { owner, repo } = JSON.parse(args);

    console.log("watchCreate");

    const githubClient = new Octokit({
        auth: authToken,
    });

    return githubClient.repos.createWebhook({
        owner: owner,
        repo: repo,
        name: "web",
        config: config,
        //https://docs.github.com/fr/webhooks-and-events/webhooks/webhook-events-and-payloads
        events: ["star"],
        active: true
    }).then(response => {
      console.log("Webhook created:", response.data);
      return response.data;
    }).catch(error => {
      console.error("Error creating webhook:", error);
      return null;
    });
}

function sendMail(authToken, args) {
    console.log("sendMail");
}

module.exports = {
    repoPubliciseCreate,
    repoCreatedCreate,
    repoDeletedCreate,
    starCreatedCreate,
    starDeletedCreate,
    watchCreate,

    sendMail
};