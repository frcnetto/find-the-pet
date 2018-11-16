import { Server } from './server/server';
import { usersRouter } from './entities/users/users.router';
import { locationsRouter } from './entities/locations/locations.router';
import { petsRouter } from './entities/pets/pets.router';
import { breedsRouter } from './entities/breeds/breed.router';

const server = new Server();

server.bootstrap( [ usersRouter, locationsRouter, petsRouter, breedsRouter ] ).then( server => {
    console.log( 'Listening on:', server.application.address() );
} ).catch( error => {
    console.log( 'Server failed to start!' );
    console.error( error );
    process.exit( 1 );
} );
