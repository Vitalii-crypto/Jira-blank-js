import {
    getUserFromJiraByAccountId
} from "./lib/user";

class Jira {
    private readonly context: any;

    constructor(context) {
        this.context = context;
    }

    async getUser() {
        return getUserFromJiraByAccountId(this.context, this.context.userAccountId);
    }
}

export default Jira;
