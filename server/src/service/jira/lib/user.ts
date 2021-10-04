export const getUserFromJiraByAccountId = async ({http}, userAccountId) => {
    const url = '/rest/api/3/user?accountId=' + userAccountId + "&expand=groups";
    return new Promise((resolve, reject) => {
        http.get({
            url,
            headers: {
                "x-atlassian-force-account-id": true
            },
        }, (err, response, body) => {
            if (err) return reject(err);
            if (response.statusCode >= 400) {
                return reject(body);
            }
            resolve(JSON.parse(body));
        });
    });
}
