let db = require('./db.js')


const getClient = (clientId, clientSecret) => {
    //console.log(`getClient called with clientId=${clientId} and clientSecret=${clientSecret}`);
    let confidentialClients = db.confidentialClients.filter((client) => {
        return client.clientId === clientId && 
                client.clientSecret === clientSecret;   
    });
    //console.log(`Found ${confidentialClients.length} matching clients`);
    return confidentialClients[0];
}


const saveToken = (token, client, user) => {
    token.client = {
        id: client.clientId
    }
    token.user = {
        username: user.username
    }
    db.tokens.push(token);
    return token;
}



const getUserFromClient = (client) => {
    return {}
}

//now we request the accessToken and we compare it to the savedToken. Then we export the module

const getAccessToken = (accessToken) => {
    let tokens = db.tokens.filter((savedToken) => {
      return savedToken.accessToken === accessToken;
    })
    return tokens[0];
}

module.exports = {
    getClient: getClient,
    saveToken: saveToken,
    getUserFromClient: getUserFromClient,
    getAccessToken: getAccessToken
}


//the function getClient() is used to retrieve a client using a Client ID and / or a Client Secret combination

// the saveToken() must be implemented fo all the grant types in the model use by OAuth2Server. This function stores the access 
// token as an object to a database when an access token is obtained