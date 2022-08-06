import express from 'express'
import { Main } from './middlevare.js'
const app = express()

app.use(Main)

app.get('/api/send',  function (req, res) {
    
    const user_id = req.query.name;
    const token = req.query.token;
    const email = req.query.email;

    req.body = {
        name: user_id,
        email: email,
        token: token
    }
    res.json(req.body)
})

app.listen(5000)