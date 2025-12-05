import express from "express"

export const app = express()
const PORT = process.env.PORT ?? 3000

app.get("/", (req, res) => {
    res.send("API com JavaScript e Nodemon 🚀")
})

if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`)
    })
}
