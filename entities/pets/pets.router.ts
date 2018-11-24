import restify from 'restify';
import { Pet } from './pets.model';
import { ModelRouter } from '../../common/model-router';

class PetsRouter extends ModelRouter<Pet> {

    constructor () {
        super( Pet );
    }

    petsNode = '/pets';
    petsIdNode = this.petsNode + '/:id';

    applyRoutes( application: restify.Server ) {

        application.get( this.petsNode, restify.plugins.conditionalHandler( [
            { version: '1.0.0', handler: this.findAll }
        ] ) );

        application.get( this.petsIdNode, restify.plugins.conditionalHandler( [
            { version: '1.0.0', handler: [ this.validateId, this.findById ] }
        ] ) );

        application.post( this.petsNode, restify.plugins.conditionalHandler( [
            { version: '1.0.0', handler: this.save }
        ] ) );

        application.put( this.petsIdNode, restify.plugins.conditionalHandler( [
            { version: '1.0.0', handler: [ this.validateId, this.replace ] }
        ] ) );

        application.patch( this.petsIdNode, restify.plugins.conditionalHandler( [
            { version: '1.0.0', handler: [ this.validateId, this.update ] }
        ] ) );

        application.del( this.petsIdNode, restify.plugins.conditionalHandler( [
            { version: '1.0.0', handler: [ this.validateId, this.delete ] }
        ] ) );
    }
}

export const petsRouter = new PetsRouter();