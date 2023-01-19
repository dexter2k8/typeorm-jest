import AppDataSource from "../../data-source";
import * as users from "../routes/userRoutes.test";
import * as login from "../routes/loginRoutes.test";
import * as technologies from "../routes/techsRoutes.test";
import * as projects from "../routes/projectsRoutes.test";
import { DataSource } from "typeorm";
import request from "supertest";
import { mockedAdmin, mockedAdminLogin, mockedTechnology, mockedUser, mockedUserLogin } from "../mocks";
import app from "../../app";

let conn: DataSource;
export let user: request.Response;
export let admin: request.Response;
export let adminLogin: request.Response;
export let userLogin: request.Response;
export let technology: request.Response;

beforeAll(async () => {
    await AppDataSource.initialize()
        .then((res) => (conn = res))
        .catch((err) => console.error("Error during Data Source initialization", err));
        
    // Requisições utilizadas nas rotas
    user = await request(app).post("/users").send(mockedUser);
    admin = await request(app).post("/users").send(mockedAdmin);
    adminLogin = await request(app).post("/login").send(mockedAdminLogin);
    userLogin = await request(app).post("/login").send(mockedUserLogin);
    technology = await request(app)
            .post("/technologies")
            .set("Authorization", `Bearer ${adminLogin.body.token}`)
            .send(mockedTechnology);
});

users;
login;
technologies;
projects;

afterAll(async () => {
    await conn.destroy();
});
