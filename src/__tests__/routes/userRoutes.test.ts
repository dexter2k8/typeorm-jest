import request from "supertest";
import app from "../../app";
import { admin, adminLogin, user, userLogin } from "../integration/index.test";
import { mockedAdmin, mockedUser } from "../mocks";

describe("/users - USERS ROUTE TESTS", () => {
    test("POST /users -  Must be able to create a user", async () => {
        expect(user.body).toHaveProperty("id");
        expect(user.body).toHaveProperty("street");
        expect(user.body).toHaveProperty("state");
        expect(user.body.user).toHaveProperty("id");
        expect(user.body.user).toHaveProperty("name");
        expect(user.body.user).toHaveProperty("email");
        expect(user.body.user).toHaveProperty("isAdm");
        expect(user.body.user).toHaveProperty("deletedAt");
        expect(user.body.user).toHaveProperty("createdAt");
        expect(user.body.user).toHaveProperty("updatedAt");
        expect(user.body.user).not.toHaveProperty("password");
        expect(user.body.street).toEqual("Rua Teste");
        expect(user.body.state).toEqual("SP");
        expect(user.body.user.name).toEqual("Joana");
        expect(user.body.user.email).toEqual("joana@mail.com");
        expect(user.body.user.isAdm).toEqual(false);
        expect(user.body.user.deletedAt).toEqual(null);
        expect(user.status).toBe(201);
    });

    test("POST /users -  should not be able to create a user that already exists", async () => {
        const response = await request(app).post("/users").send(mockedUser);

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(409);
    });

    test("GET /users -  Must be able to list users", async () => {
        const response = await request(app)
            .get("/users")
            .set("Authorization", `Bearer ${adminLogin.body.token}`);

        expect(response.body).toHaveLength(2);
        expect(response.body[0]).not.toHaveProperty("password");
    });

    test("GET /users -  should not be able to list users without authentication", async () => {
        const response = await request(app).get("/users");

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    });

    test("GET /users -  should not be able to list users not being admin", async () => {
        const response = await request(app)
            .get("/users")
            .set("Authorization", `Bearer ${userLogin.body.token}`);

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(403);
    });

    test("PATCH /users/:id -  should not be able to update user without authentication", async () => {
        const response = await request(app).patch(`/users/${user.body.id}`);

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    });

    test("PATCH /users/:id - should not be able to update user with invalid id", async () => {
        const newValues = { name: "Joana Brito", email: "joanabrito@mail.com" };

        const token = `Bearer ${adminLogin.body.token}`;

        const response = await request(app)
            .patch(`/users/13970660-5dbe-423a-9a9d-5c23b37943cf`)
            .set("Authorization", token)
            .send(newValues);

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(404);
    });

    test("PATCH /users/:id - should not be able to update isAdm if not admin", async () => {
        const newValues = { isAdm: true };

        const token = `Bearer ${userLogin.body.token}`;
        const userTobeUpdateId = admin.body.id;

        const response = await request(app)
            .patch(`/users/${userTobeUpdateId}`)
            .set("Authorization", token)
            .send(newValues);

        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty("message");
    });

    test("PATCH /users/:id - should not be able to update another user without adm permission", async () => {
        const newValues = { name: "Joana Brito", email: "joanabrito@mail.com" };

        const userToken = `Bearer ${userLogin.body.token}`;
        const userTobeUpdateId = admin.body.id;

        const response = await request(app)
            .patch(`/users/${userTobeUpdateId}`)
            .set("Authorization", userToken)
            .send(newValues);

        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty("message");
    });

    test("PATCH /users/:id -  should be able to update user", async () => {
        const newValues = { name: "Joana Brito", email: "joanabrito@mail.com" };

        const token = `Bearer ${userLogin.body.token}`;
        const userTobeUpdateId = user.body.user.id;

        const response = await request(app)
            .patch(`/users/${userTobeUpdateId}`)
            .set("Authorization", token)
            .send(newValues);        

        expect(response.status).toBe(200);
        expect(response.body.name).toEqual("Joana Brito");
        expect(response.body).not.toHaveProperty("password");
    });

    test("PATCH /users/:id/address -  should be able to update address", async () => {
        const newValues = { street: "Rua de Atualização", state: "AL" };

        const token = `Bearer ${adminLogin.body.token}`;
        const addressTobeUpdateId = admin.body.user.id;

        const response = await request(app)
            .patch(`/users/${addressTobeUpdateId}/address`)
            .set("Authorization", token)
            .send(newValues);

        expect(response.status).toBe(200);
        expect(response.body.street).toEqual("Rua de Atualização");
        expect(response.body.state).toEqual("AL");
    });

    test("DELETE /users/:id -  should not be able to remove user without authentication", async () => {
        const response = await request(app).delete(`/users/${user.body.user.id}`);

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    });

    test("DELETE /users/:id -  should not be able to remove user not being admin or owner", async () => {
        const response = await request(app)
            .delete(`/users/${admin.body.user.id}`)
            .set("Authorization", `Bearer ${userLogin.body.token}`);

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(403);
    });

    test("DELETE /users/:id -  Must be able to soft remove user", async () => {          
        const response = await request(app)
            .delete(`/users/${user.body.user.id}`)
            .set("Authorization", `Bearer ${adminLogin.body.token}`);
        const findUser = await request(app)
            .get("/users")
            .set("Authorization", `Bearer ${adminLogin.body.token}`);
        expect(response.status).toBe(204);
        expect(findUser.body[0].deletedAt).not.toBe(null);
    });

    test("DELETE /users/:id -  should not be able to delete user with invalid id", async () => {
        await request(app).post("/users").send(mockedAdmin);

        const response = await request(app)
            .delete(`/users/13970660-5dbe-423a-9a9d-5c23b37943cf`)
            .set("Authorization", `Bearer ${adminLogin.body.token}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
    });
});

export default describe;
