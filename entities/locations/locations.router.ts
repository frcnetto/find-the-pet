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

        application.get( this.locationsNode, restify.plugins.conditionalHandler( [
            { version: '1.0.0', handler: this.findAll }
        ] ) );

        application.get( this.locationsIdNode, restify.plugins.conditionalHandler( [
            { version: '1.0.0', handler: [ this.validateId, this.findById ] }
        ] ) );

        application.post( this.locationsNode, restify.plugins.conditionalHandler( [
            { version: '1.0.0', handler: this.save }
        ] ) );

        application.put( this.locationsIdNode, restify.plugins.conditionalHandler( [
            { version: '1.0.0', handler: [ this.validateId, this.replace ] }
        ] ) );

        application.patch( this.locationsIdNode, restify.plugins.conditionalHandler( [
            { version: '1.0.0', handler: [ this.validateId, this.update ] }
        ] ) );

        application.del( this.locationsIdNode, restify.plugins.conditionalHandler( [
            { version: '1.0.0', handler: [ this.validateId, this.delete ] }
        ] ) );
    }
}

export const locationsRouter = new LocationRouter();