import request from "supertest"
import { app } from "../src/index.js"

describe("GET /", () => {
    it("retorna mensagem da rota raiz", async () => {
        const response = await request(app).get("/")

        expect(response.status).toBe(200)
        expect(response.text).toBe("API com JavaScript e Nodemon 🚀")
    })
})
