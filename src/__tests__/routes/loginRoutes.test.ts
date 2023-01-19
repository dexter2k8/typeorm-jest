import request from "supertest";
import app from "../../app";
import { adminLogin, user } from "../integration/index.test";
import {  mockedUser } from "../mocks";

describe("/login - LOGIN ROUTE TESTS ", () => {
    test("POST /login -  should be able to login with the user", async () => {
        
        expect(adminLogin.body).toHaveProperty("token");
        expect(adminLogin.status).toBe(200);
    });

    test("POST /login -  should not be able to login with the user with incorrect password or email", async () => {
        const response = await request(app).post("/login").send({
            email: "felipe@mail.com",
            password: "1234567",
        });

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(400);
    });

    test("POST /login -  should not be able to login with user removed", async () => {
        await request(app)
            .delete(`/users/${user.body.id}`)
            .set("Authorization", `Bearer ${adminLogin.body.token}`);
        const response = await request(app).post("/login").send(mockedUser);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(400);
    });
});

export default describe;
