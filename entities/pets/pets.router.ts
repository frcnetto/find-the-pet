import { Router } from '../../common/router'
import restify from 'restify';
import { Pet } from './pets.model';
import { NotFoundError } from 'restify-errors';

class PetsRouter extends Router {

    petsNode = '/pets';
    petsIdNode = this.petsNode + '/:id';

    applyRoutes( application: restify.Server ) {
        application.get( this.petsNode, ( req: restify.Request, res, next ) => {
            Pet.find()
                .then( this.render( res, next ) )
                .catch( next );
        } );

        application.get( this.petsIdNode, ( req, res, next ) => {
            Pet.findById( req.params.id )
                .then( this.render( res, next ) )
                .catch( next );;
        } );

        application.post( this.petsNode, ( req, res, next ) => {

            if ( req.body instanceof Array ) {
                let pets = new Pet();

                pets.collection.insert( req.body )
                    .then( this.render( res, next ) )
                    .catch( next );

            } else {

                let pet = new Pet( req.body );

                pet.save()
                    .then( this.render( res, next ) )
                    .catch( next );

            }
        } );

        application.put( this.petsIdNode, ( req, res, next ) => {
            const options = { overwrite: true }
            Pet.update( { _id: req.params.id }, req.body, options )
                .exec()
                .then( result => {
                    if ( result.n ) {
                        return Pet.findById( req.params.id );
                    } else {
                        throw new NotFoundError( 'Documento não encontrado.' );
                    }
                } )
                .then( this.render( res, next ) )
                .catch( next );;
        } );

        application.patch( this.petsIdNode, ( req, res, next ) => {
            const options = { new: true };
            Pet.findByIdAndUpdate( req.params.id, req.body, options )
                .then( this.render( res, next ) )
                .catch( next );;
        } );

        application.del( this.petsIdNode, ( req, res, next ) => {
            Pet.deleteOne( { _id: req.params.id } ).exec().then( result => {
                console.log( result )
                if ( result.n )
                    res.send( 204 );
                else
                    throw new NotFoundError( 'Documento não encontrado.' );
                return next();
            } );
        } );
    }
}

export const petsRouter = new PetsRouter();