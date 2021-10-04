import express from "express";
import publicRouter from "./publicRouter";
const router = express.Router();

router.use("/", publicRouter);

// add userId to "body" - leadAccountId for BPM project
router.post("/installed", (req, res, next) => {
    let userAccountId = req.query.user_account_id;

    if (!userAccountId && req.headers.authorization) {
        const pattern = /^JWT\s+(?<header>\S+)\.(?<payload>\S+)\.(?<signature>\S+)$/;
        const rawAuthorizationHeader = req.headers.authorization;
        const parsedJWT = rawAuthorizationHeader.match(pattern);
        // @ts-ignore
        const {payload} = parsedJWT.groups;
        const parsedPayload = JSON.parse(Buffer.from(payload, "base64").toString());
        userAccountId = parsedPayload.sub;
    }

    req.body = {
        ...req.body,
        userAccountId
    };
    next();
});

export default router;
