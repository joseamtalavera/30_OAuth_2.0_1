const express = require('express');
const path = require('path');

//installing the oauth2-server module to implement an OAuth 2.0 provider in node
//it requires to install npm install oauth2-server
const OAuth2Server = require('oauth2-server');

const app = express();



app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PORT = 4001;






//we create a an OAuth 2.0 instance of the OAuth2Server object
const oauth = new OAuth2Server({
    model: require('./model.js'), //model object contains functions to access, store, and validate our access tokens
    allowBearerTokensInQueryString: true, //to pass tokens inside the URL
    //accessTokenLifetime: 60 * 60 //set the access token lifetime to one hour
});








//let’s create a middleware function to handle authenticating access tokens inside our application.

const authenticateRequest = (req, res, next) => {
    let request = new OAuth2Server.Request(req);
    let response = new OAuth2Server.Response(res);

    return oauth.authenticate(request, response)
    .then((token) => {
      next();
    })
    .catch((err) => {
        res.sendFile(path.join(__dirname, 'public/error.html'));
  })
}












//We create a function named obtainToken() that takes the HTTP request and HTTP response as arguments - req and res

const obtainToken = (req, res) => {
    console.log(req.body)
    let request = new OAuth2Server.Request(req);
    let response = new OAuth2Server.Response(res);

    return oauth.token(request, response)
    .then((token) => {
        res.json(token);
    })
    .catch((err) => {
        res.json(err);
    });
}

app.all('/auth', obtainToken);













//routes

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/home.html'));
})    

app.get('/login', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/login.html'));
})

app.get('/public', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/allowed.html'));
})

app.get('/secret', authenticateRequest, (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/private.html'));
})

app.listen(PORT, ()=>console.log(`Listening on port ${PORT}`));
