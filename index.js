const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
    try {
        const owner = core.getInput('owner', { required: true });
        const repo = core.getInput('repo', { required: true });
        const token = core.getInput('token', { required: true });
        const octokit = new github.getOctokit(token);

        await octokit.rest.teams.addOrUpdateRepoPermissionsInOrg({
            org: 'ClevertecTest',
            team_slug: 'Mentors',
            owner,
            repo,
            permission: 'push'
        });

        await octokit.rest.repos.updateBranchProtection({
            owner,
            repo,
            branch: 'main',
            required_status_checks: null,
            enforce_admins: false,
            required_pull_request_reviews: {
                required_approving_review_count: 1
            },
            restrictions: null,
        });

    } catch (error) {
        core.setFailed(error.message);
    }
}

main();