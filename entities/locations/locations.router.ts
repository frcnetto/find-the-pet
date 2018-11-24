import restify from 'restify';
import { Location } from './locations.model';
import { ModelRouter } from '../../common/model-router';

class LocationRouter extends ModelRouter<Location> {

    constructor () {
        super( Location );
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

export const locationsRouter = new LocationRouter();