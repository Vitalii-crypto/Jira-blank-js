import express from "express";
import pageRouter from "./pageRouter";
import addon from "../addon";
import path from "path";
import {addUserToContext, noFilenames} from "./middleware";
const router = express.Router();

// @ts-ignore
// router.use("/api", addon.checkValidToken(), addUserToContext(false), apiRouter);



if (process.env.STANDALONE) {
    router.all("/rest", function (req: any, res) {
        const url = req.body.path.url;
        const httpClient = addon.httpClient({clientKey: "381249ea-0f75-37f3-a3d5-922f645cf89f"});
        if (req.body.method === "GET") {
            const params = new URLSearchParams(req.body.path.data).toString();
            httpClient.get(`${url}?${params}`, function(err, resp, body) {
                res.json({body: body});
            });
        }
    });
}

router.use("/", noFilenames, addon.authenticate(), addUserToContext(true), pageRouter);


export default router;
