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
        application.get( this.usersNode, this.findAll );

        application.get( this.usersIdNode, [ this.validateId, this.findById ] );

        application.post( this.usersNode, this.save );

        application.put( this.usersIdNode, [ this.validateId, this.replace ] );

        application.patch( this.usersIdNode, [ this.validateId, this.update ] );

        application.del( this.usersIdNode, [ this.validateId, this.delete ] );
    }
}

export const usersRouter = new UsersRouter();