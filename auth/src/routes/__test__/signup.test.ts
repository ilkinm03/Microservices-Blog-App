import request from "supertest";
import { app } from "../../app";

describe("Signup", () => {
  it("returns 400 if email is invalid", async () => {
    await request(app)
      .post("/api/auth/signup")
      .send({
        email: "abcasd",
        password: "123456",
        confirmPassword: "123456",
      })
      .expect(400);
  });

  it("returns 400 if password is invalid", async () => {
    await request(app)
      .post("/api/auth/signup")
      .send({
        email: "test@test.com",
        password: 123456,
        confirmPassword: 123456,
      })
      .expect(400);
    await request(app)
      .post("/api/auth/signup")
      .send({
        email: "test@test.com",
        password: "",
        confirmPassword: "",
      })
      .expect(400);
    await request(app)
      .post("/api/auth/signup")
      .send({
        email: "test@test.com",
        password: "123",
        confirmPassword: "123",
      })
      .expect(400);
  });

  it("returns 400 if confirmPassword is not equal to password", async () => {
    await request(app)
      .post("/api/auth/signup")
      .send({
        email: "test@test.com",
        password: "123456",
        confirmPassword: "123456789",
      })
      .expect(400);
  });

  it("returns 400 if email is already exists", async () => {
    await request(app)
      .post("/api/auth/signup")
      .send({
        email: "test@test.com",
        password: "123456",
        confirmPassword: "123456",
      })
      .expect(201);
    await request(app)
      .post("/api/auth/signup")
      .send({
        email: "test@test.com",
        password: "123456",
        confirmPassword: "123456",
      })
      .expect(400);
  });

  it("returns new user on successful signup", async () => {
    const response = await request(app)
      .post("/api/auth/signup")
      .send({
        email: "test@test.com",
        password: "123456",
        confirmPassword: "123456",
      })
      .expect(201);
    expect(response.get("Set-Cookie")).toBeDefined();
  });
});
