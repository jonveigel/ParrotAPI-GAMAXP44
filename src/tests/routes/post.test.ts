import request from "supertest";
import app from "../../app"
import { AppDataSource } from "../../data-source";


var token = '';

beforeAll(async () => {
    await AppDataSource.initialize()
    const response = await request(app).post("/login")
        .send({ "email": "user1@user.com", "password": "admin" })
        token = response.body.token;
});

afterAll(() => {
    AppDataSource.close()
});

describe("Post route test", () => {
    test("Create post", async () => {
        await request(app)
            .post("/post")
            .send({ "content": "oioioioioioioioioi!!!!!!!!!!!!" })
            .set('Authorization', 'bearer ' + token)
            .expect(201)
            .expect('Content-Type', /json/)
    })

    test('fail to create post, invalid token', async () => {
        await request(app)
        .post("/post")
        .send({
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc egestas tristique turpis eu interdum. Proin rutrum cursus rhoncus. Cras gravida vel nisl in malesuada."
        })
        .set('Authorization', 'bearer ' + "badtoken")
        .expect(401)
    })
    test('fail to create post, not suported content', async () => {
        await request(app)
        .post("/post")
        .send({
            "content": " !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! "
        })
        .set('Authorization', 'bearer ' + token)
        .expect(400)
    })

    test('list all posts', async () => {
        await request(app)
        .get("/post")
        .set('Authorization', 'bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
    })
    test('fail to list all posts, invalid token', async () => {
        await request(app)
        .get("/post")
        .set('Authorization', 'bearer ' + "badtoken")
        .expect(401)
    })

    test('list all posts', async () => {
        await request(app)
        .get("/post")
        .set('Authorization', 'bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
    })
    test('fail to list all posts, invalid token', async () => {
        await request(app)
        .get("/post")
        .set('Authorization', 'bearer ' + "badtoken")
        .expect(401)
    })
})