import express, { Application, Request, Response } from "express";
require('./db/mongoose');

const { createUser, findUser } = require('./models/user');
const app: Application = express();
const PORT = 3000;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
    "/",
    async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send({
            message: "Hello!"
        });
    }
);

app.post(
    "/user",
    async (req: Request, res: Response): Promise<Response> => {
        const userData = req.body;
        let user = await createUser(userData);

        return res.status(200).send({
            message: "User added",
            user: user
        });
    }
);

app.get(
    "/user",
    async (req: Request, res: Response): Promise<Response> => {
        // const name = req.query.name;
        // const age = req.query.age;
        // const email = req.query.email;

        let query = {
            // name: name
        };

        let users = await findUser(query);

        return res.status(200).send({
            message: "Users found",
            users: users
        });
    }
);

try {
    app.listen(PORT, (): void => {
        console.log(`Connected successfully on port ${PORT}`);
    });
} catch (error) {
    console.error(`Error occured: ${error}`);
}