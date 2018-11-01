require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const axios = require('axios');
const massive = require('massive');

const app = express();
app.use(bodyParser.json())

const {
    SERVER_PORT,
    REACT_APP_DOMAIN,
    REACT_APP_CLIENT_ID,
    CLIENT_SECRET,
    CONNECTION_STRING,
    SECRET,
    AUTH_PROTOCAL
} = process.env;

massive(CONNECTION_STRING).then(db => {
    console.log('db connected')
    app.set('db',db) 
})

app.use( express.static( `${__dirname}/../build` ) );

app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}))


let authBypass = async (req, res, next) => {
    if(process.env.NODE_ENV) {
        const db = req.app.get('db')
        let user = await db.session_user();
        req.session.user = user[0]
        next();
    } else {
        next();
    }
}


app.get('/auth/callback', async (req, res) => {
    let payload = {
        client_id: REACT_APP_CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: req.query.code,
        grant_type: 'authorization_code',
        redirect_uri: `${AUTH_PROTOCAL}://${req.headers.host}/auth/callback`
      }
      let tokenRes = await axios.post(`https://${REACT_APP_DOMAIN}/oauth/token`, payload);
      let userRes = await axios.get(`https://${REACT_APP_DOMAIN}/userinfo?access_token=${tokenRes.data.access_token}`)

      let {location, picture, sub, name} = userRes.data

        const db = app.get('db');
      let foundUser = await db.find_user([sub]);
      console.log('test')
      if(foundUser[0]){
        req.session.user = foundUser[0];
      } else {
        let createdUser = await db.create_user([name, sub]);
        req.session.user = createdUser[0];
      }
      res.redirect('/#/trails')
})

app.get('/api/user-data', authBypass, (req, res) => {
    console.log(req.session.user)
    if(req.session.user) {
        res.status(200).send(req.session.user);
    } else {
        res.status(401).send('Please log in again');
    }
})

app.get('/auth/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/#/')
})
app.get('/api/commentList/:trailid', (req, res) => {
    const{trailid} = req.params
    const db = req.app.get('db')
    db.get_trail_comments([trailid])
    .then((comments) => res.status(200).send(comments))
})

app.post('/api/addComment',(req, res) => {
    console.log(req.body)
    const{comment, trailID} = req.body
    const db = req.app.get('db')
    console.log(req.session)
    const user = req.session.user.user_id
    db.add_comment([trailID, comment, user])
    .then((comments) => {
        res.status(200).send(comments)
    })
})

app.delete('/api/removeComment/:id/:trail_id',(req, res) => {
    const db = req.app.get('db')
    db.delete_comment([+req.params.id, req.params.trail_id])
    .then((updatedComments) =>
    res.status(200).send(updatedComments))
})

app.listen(SERVER_PORT, () => console.log(`I hear it on: ${SERVER_PORT}`))