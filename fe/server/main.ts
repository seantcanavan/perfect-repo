// @deno-types="npm:@types/express@4"
import express, { NextFunction, Request, Response } from "npm:express@4.18.2";
import demoData from "./data_blob.json" assert { type: "json" };

const app = express();
const port: number = Number(Deno.env.get("PORT")) || 3000;

// deno-lint-ignore no-explicit-any
const reqLogger = function (req: Request<any>, _res: Response<any>, next: NextFunction): void {
    console.info(`${req.method} request to "${req.url}" by ${req.hostname}`);
    next();
};

app.use(reqLogger);

app.get("/users", (_req, res: Response<Array<User>>): void  => {
    res.status(200).json(demoData.users);
});

app.get("/users/:id", (req: Request, res: Response<User | ErrorRes>): void => {
    const idx = Number(req.params.id);
    for (const user of demoData.users as Array<User>) {
        if (user.id === idx) {
            res.status(200).json(user);
        }
    }
    res.status(400).json({ msg: "User not found" });
});

app.listen(port, (): void => {
    console.log(`Listening on ${port} ...`);
});

type User = {
    "id": number
    "name": string
    "department": string
}

type ErrorRes = {
    "msg": string
}
