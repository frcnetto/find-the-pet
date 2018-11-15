"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const users_router_1 = require("./entities/users/users.router");
const locations_router_1 = require("./entities/locations/locations.router");
const server = new server_1.Server();
server.bootstrap([users_router_1.usersRouter, locations_router_1.locationsRouter]).then(server => {
    console.log('Listening on:', server.application.address());
}).catch(error => {
    console.log('Server failed to start!');
    console.error(error);
    process.exit(1);
});
