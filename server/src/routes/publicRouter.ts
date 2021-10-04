import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
    res.redirect("/atlassian-connect.json");
});

export default router;
