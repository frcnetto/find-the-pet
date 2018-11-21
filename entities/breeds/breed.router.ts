import restify from 'restify';
import { Breed } from './breed.model';
import { ModelRouter } from '../../common/model-router';

class BreedsRouter extends ModelRouter<Breed> {

    constructor () {
        super( Breed );
    }

    breedsNode = '/breeds';
    breedsIdNode = this.breedsNode + '/:id';

    applyRoutes( application: restify.Server ) {

        application.get( this.breedsNode, this.findAll );

        application.get( this.breedsIdNode, [ this.validateId, this.findById ] );

        application.post( this.breedsNode, this.save );

        application.put( this.breedsIdNode, [ this.validateId, this.replace ] );

        application.patch( this.breedsIdNode, [ this.validateId, this.update ] );

        application.del( this.breedsIdNode, [ this.validateId, this.delete ] );
    }
}

export const breedsRouter = new BreedsRouter();