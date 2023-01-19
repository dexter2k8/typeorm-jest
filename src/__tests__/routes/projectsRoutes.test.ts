import request from "supertest";
import app from "../../app";
import { admin, adminLogin, user, userLogin } from "../integration/index.test";
import { mockedProject } from "../mocks";

let project: request.Response;

describe("/projects - ROUTE PROJECTS TEST", () => {
    test("POST projects -  Must be able to create a project", async () => {
        project = await request(app)
            .post("/projects")
            .set("Authorization", `Bearer ${adminLogin.body.token}`)
            .send(mockedProject);
        expect(project.status).toBe(201);
        expect(project.body).toHaveProperty("id");
        expect(project.body).toHaveProperty("name");
        expect(project.body).toHaveProperty("description");
    });

    test("POST /projects -  should not be able to create a project without authentication", async () => {
        const response = await request(app).post("/projects").send(mockedProject);

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    });

    test("GET /projects -  Must be able to list all projects", async () => {
        const response = await request(app).get("/projects").set("Authorization", `Bearer ${adminLogin.body.token}`);

        expect(response.body).toHaveLength(1);
        expect(response.status).toBe(200);
    });

    test("GET /projects -  Should not be able to list all projects not beign admin", async () => {
        const response = await request(app).get("/projects").set("Authorization", `Bearer ${userLogin.body.token}`);

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(403);
    });

    test("GET /projects/:id -  Must be able to list user projects", async () => {
        const response = await request(app)
            .get(`/projects/${admin.body.user.id}`)
            .set("Authorization", `Bearer ${adminLogin.body.token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("projects");
    });

    test("GET /projects/:id -  Should not be able to list user projects if not owner", async () => {
        const response = await request(app)
            .get(`/projects/${admin.body.user.id}`)
            .set("Authorization", `Bearer ${userLogin.body.token}`);

        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty("message");
    });

    test("DELETE /projects/:id -  Should not be able to delete a project not being admin or owner", async () => {
        const response = await request(app)
            .delete(`/projects/${project.body.id}`)
            .set("Authorization", `Bearer ${userLogin.body.token}`);

        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty("message");
    });

    test("DELETE /projects/:id -  Should not be able to delete a project that not exists", async () => {
        const response = await request(app)
            .delete(`/projects/10`)
            .set("Authorization", `Bearer ${adminLogin.body.token}`);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
    });

    test("DELETE /projects/:id -  Should be able to delete a project", async () => {
        const response = await request(app)
            .delete(`/projects/${project.body.id}`)
            .set("Authorization", `Bearer ${adminLogin.body.token}`);

        expect(response.status).toBe(204);
    });    
});

export default describe;
