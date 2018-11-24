import restify from 'restify';
import mongoose from 'mongoose';

import { Pet } from './pets.model';
import { ModelRouter } from '../../common/model-router';

class PetsRouter extends ModelRouter<Pet> {

    constructor () {
        super( Pet );
    }

    protected prepareOne( query: mongoose.DocumentQuery<Pet, Pet> ): mongoose.DocumentQuery<Pet, Pet> {
        return query
            .populate( 'breed' )
            .populate( 'location' );
    }

    envelope( document: any ): any {
        let resource = super.envelope( document );

        const breed = document.breed._id ? document.breed._id : document.breed;
        resource._links.breed = `/breed/${breed}`;

        const location = document.location._id ? document.location._id : document.location;
        resource._links.location = `location/${location}`;

        return resource;
    }

    applyRoutes( application: restify.Server ) {

        application.get( this.basePath, restify.plugins.conditionalHandler( [
            { version: '1.0.0', handler: this.findAll }
        ] ) );

        application.get( this.baseIdPath, restify.plugins.conditionalHandler( [
            { version: '1.0.0', handler: [ this.validateId, this.findById ] }
        ] ) );

        application.post( this.basePath, restify.plugins.conditionalHandler( [
            { version: '1.0.0', handler: this.save }
        ] ) );

        application.put( this.baseIdPath, restify.plugins.conditionalHandler( [
            { version: '1.0.0', handler: [ this.validateId, this.replace ] }
        ] ) );

        application.patch( this.baseIdPath, restify.plugins.conditionalHandler( [
            { version: '1.0.0', handler: [ this.validateId, this.update ] }
        ] ) );

        application.del( this.baseIdPath, restify.plugins.conditionalHandler( [
            { version: '1.0.0', handler: [ this.validateId, this.delete ] }
        ] ) );
    }
}

export const petsRouter = new PetsRouter();