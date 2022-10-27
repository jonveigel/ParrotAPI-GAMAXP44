import app from "../../app"
import request from "supertest"
import { AppDataSource } from "../../data-source"



beforeAll(async () => {
    await AppDataSource.initialize()
});

afterAll(() => {
    AppDataSource.close()
});

describe("Auth route tests", () => {
    test("User login", async () => {
        await request(app)
        .post("/login")
        .send({ "email": "user1@user.com", "password": "admin" })
        .expect(200)
    })

    test("User not exist!", async () => {
        await request(app)
            .post("/login")
            .send({ "email": "abc@abc.com", "password": "admin" })
            .expect(400)
    })
})