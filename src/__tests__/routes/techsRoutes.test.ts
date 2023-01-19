import request from "supertest";
import app from "../../app";
import { adminLogin, technology } from "../integration/index.test";
import { mockedTechnology } from "../mocks";

describe("/technologies - ROUTE TECHNOLOGIES TEST", () => {
    test("POST /technologies -  Must be able to create a technology", async () => {        
        expect(technology.status).toBe(201);
        expect(technology.body).toHaveProperty("name");
        expect(technology.body).toHaveProperty("id");
    });

    test("POST /technologies -  Should not be able to create technology that already exists", async () => {
        const response = await request(app)
            .post("/technologies")
            .set("Authorization", `Bearer ${adminLogin.body.token}`)
            .send(mockedTechnology);

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(409);
    });

    test("POST /technologies -  should not be able to create technology without authentication", async () => {
        const response = await request(app).post("/technologies").send(mockedTechnology);

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    });

    test("GET /technologies -  Must be able to list all technologies", async () => {
        const response = await request(app)
            .get("/technologies")
            .set("Authorization", `Bearer ${adminLogin.body.token}`);

        expect(response.body).toHaveLength(1);
        expect(response.status).toBe(200);
    });
});

export default describe;
