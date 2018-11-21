import restify from 'restify';
import { Location } from './locations.model';
import { ModelRouter } from '../../common/model-router';

class LocationRouter extends ModelRouter<Location> {

    constructor () {
        super( Location );
    }

    locationsNode = '/locations';
    locationsIdNode = this.locationsNode + '/:id';

    applyRoutes( application: restify.Server ) {

        application.get( this.locationsNode, this.findAll );

        application.get( this.locationsIdNode, [ this.validateId, this.findById ] );

        application.post( this.locationsNode, this.save );

        application.put( this.locationsIdNode, [ this.validateId, this.replace ] );

        application.patch( this.locationsIdNode, [ this.validateId, this.update ] );

        application.del( this.locationsIdNode, [ this.validateId, this.delete ] );
    }
}

export const locationsRouter = new LocationRouter();