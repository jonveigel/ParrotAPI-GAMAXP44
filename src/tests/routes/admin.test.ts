import app from "../../app";
import { AppDataSource } from "../../data-source";
import request from "supertest";

var token = ''
var badtoken = ''

beforeAll(async () => {
    await AppDataSource.initialize();
    const response = await request(app).post("/login")
    .send({ "email": "admin@admin.com", "password": "admin" })
    const response2 = await request(app).post("/login")
    .send({ "email": "user1@admin.com", "password": "admin" })
        token = response.body.token;
        badtoken = response2.body.badtoken;
});

afterAll(() => {
    AppDataSource.close()
});

describe("Admin route test", () => {
    test("Admin login", async () => {
        await request(app)
            .post("/admin/login")
            .send({ "email": "admin@admin.com", "password": "admin" })
            .expect(200)
    })

    test("Fail to Admin login, password incorrect", async () => {
        await request(app)
            .post("/admin/login")
            .send({ "email": "admin@admin.com", "password": "4dm1n" })
            .expect(401)
    })

    test("Get all users", async () => {
        await request(app)
            .get("/admin/users")
            .set('Authorization', 'bearer ' + token)
            .expect(200)
            .expect('Content-Type', /json/)
    })

    test("Fail to get users, your not admin :(", async () => {
        await request(app)
            .get("/admin/users")
            .set('Authorization', 'bearer ' + badtoken)
            .expect(401)
    })

    test("Get user by Id", async () => {
        await request(app)
            .get("/admin/2")
            .set('Authorization', 'bearer ' + token)
            .expect(200)
            .expect('Content-Type', /json/)
    })

    test("Fail to get user by Id, your not admin", async () => {
        await request(app)
        .get("/admin/2")
        .set('Authorization', 'bearer ' + badtoken)
        .expect(401)
    })

    test("Fail to get user by Id, user not exists", async () => {
        await request(app)
            .post("/admin/32164987")
            .set('Authorization', 'bearer ' + token)
            .expect(404)
    })
})