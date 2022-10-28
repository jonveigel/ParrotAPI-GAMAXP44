import app from "../../app"
import request from "supertest"
import { AppDataSource } from "../../data-source";

const randomstring = (Math.random() + 1).toString(36).substring(7);
var token = '';

beforeAll(async () => {
    await AppDataSource.initialize()
    const response = await request(app).post('/login')
    .send({
        "email": "user1@user.com",
        "password": "admin"
    })
    token = response.body.token;
});

afterAll(() => {
  AppDataSource.close()
});


describe("Users route tests", () => {

    test('Create user',async () => {
        await request(app)
        .post("/user")
        .send({
            "name": randomstring,
            "email": randomstring+"@teste.com",
            "password": "123456",
            "apartment": "666",
            "userphoto":""
        })
        .expect(201)
        
    })

    test('Create user with password length lass then 5 digits',async () => {
        await request(app)
        .post("/user")
        .send({
            "name": randomstring,
            "email": randomstring+"B"+"@teste.com",
            "password": "123",
            "apartment": "666",
            "userphoto":""
        })
        .expect(400)
        
    })

    test('create user email already exist',async () => {
        await request(app)
        .post("/user")
        .send({
            "name": randomstring,
            "email": randomstring+"@teste.com",
            "password": "123456",
            "apartment": "666",
            "userphoto":""
        })
        .expect(400)
        
    })

    test("Edit user", async () => {
        await request(app)
            .put("/user")
            .send({
                "name": "editedtest"
            })
            .set('Authorization', 'bearer ' + token)
            .expect(201)
            
    })
    test("Fail edit user, incorrect token", async () => {
        await request(app)
            .put("/user")
            .send({
                "name": "editedtest"
            })
            .set('Authorization', 'bearer ' + 'tokenIncorrect')
            .expect(401)
    })
})