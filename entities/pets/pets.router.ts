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

        application.get( this.petsNode, this.findAll );

        application.get( this.petsIdNode, [ this.validateId, this.findById ] );

        application.post( this.petsNode, this.save );

        application.put( this.petsIdNode, [ this.validateId, this.replace ] );

        application.patch( this.petsIdNode, [ this.validateId, this.update ] );

        application.del( this.petsIdNode, [ this.validateId, this.delete ] );
    }
}

export const petsRouter = new PetsRouter();