"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const users_router_1 = require("./entities/users/users.router");
const locations_router_1 = require("./entities/locations/locations.router");
const pets_router_1 = require("./entities/pets/pets.router");
const breed_router_1 = require("./entities/breeds/breed.router");
const server = new server_1.Server();
server.bootstrap([users_router_1.usersRouter, locations_router_1.locationsRouter, pets_router_1.petsRouter, breed_router_1.breedsRouter]).then(server => {
    console.log('Listening on:', server.application.address());
}).catch(error => {
    console.log('Server failed to start!');
    console.error(error);
    process.exit(1);
});
