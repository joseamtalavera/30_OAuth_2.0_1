module.exports = {
    confidentialClients: [{
        clientId: 'codecademy',
        clientSecret: 'codec@demy',
        grants: [
            'client_credentials'
        ]
    }],
    tokens: []
}




//we can register an application to the list of 'confidentialClients' in db.js
//Inside the module.exports object, we create an attribute named confidentialClients and set it equal to an array.
// we create a token attribute and set it to an empty array

