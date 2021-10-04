import Jira from "../service/jira";
import db from "../service/db";

export const addUserToContext = (getUserFromJira) => async (req, res, next) => {
    try {
        if (getUserFromJira) {
            const jira = new Jira(req.context);
            const user = await jira.getUser();
            await db.storeUser(req.context.clientKey, user);
            req.context.user = user;
        } else {
            const existingUser = await db.getUser(req.context.clientKey, req.context.userAccountId);
            if (existingUser) {
                req.context.user = existingUser.info;
            } else {
                const jira = new Jira(req.context);
                const user = await jira.getUser();
                await db.storeUser(req.context.clientKey, user);
                req.context.user = user;
            }
        }
        next();
    } catch (e) {
        next(e);
    }
}

export const noFilenames = (req, res, next) => {
    if (req.path.includes(".")) {
        res.status(404).send();
    } else {
        next();
    }
}
