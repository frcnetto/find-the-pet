import restify from 'restify';
import { User } from './users.model';
import { ModelRouter } from '../../common/model-router';

class UsersRouter extends ModelRouter<User> {

    usersNode = '/users';
    usersIdNode = this.usersNode + '/:id';

    constructor () {
        super( User );
        this.on( 'beforeRender', document => {
            document.password = undefined;
        } );
    }

    applyRoutes( application: restify.Server ) {
        application.get( this.usersNode, restify.plugins.conditionalHandler( [
            { version: '1.0.0', handler: this.findAll }
        ] ) );

        application.get( this.usersIdNode, restify.plugins.conditionalHandler( [
            { version: '1.0.0', handler: [ this.validateId, this.findById ] }
        ] ) );

        application.post( this.usersNode, restify.plugins.conditionalHandler( [
            { version: '1.0.0', handler: this.save }
        ] ) );

        application.put( this.usersIdNode, restify.plugins.conditionalHandler( [
            { version: '1.0.0', handler: [ this.validateId, this.replace ] }
        ] ) );

        application.patch( this.usersIdNode, restify.plugins.conditionalHandler( [
            { version: '1.0.0', handler: [ this.validateId, this.update ] }
        ] ) );

        application.del( this.usersIdNode, restify.plugins.conditionalHandler( [
            { version: '1.0.0', handler: [ this.validateId, this.delete ] }
        ] ) );
    }
}

export const usersRouter = new UsersRouter();