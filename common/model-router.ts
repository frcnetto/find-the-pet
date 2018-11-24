import { Router } from "./router";
import mongoose from "mongoose";
import restify from "restify";
import { NotFoundError } from "restify-errors";


export abstract class ModelRouter<D extends mongoose.Document> extends Router {

    basePath: string;
    baseIdPath: string;
    pageSize: number;

    constructor ( protected model: mongoose.Model<D> ) {
        super();
        this.basePath = `/${this.model.collection.name}`;
        this.baseIdPath = `/${this.basePath}/:id`;
        this.pageSize = 10;
    }

    protected prepareOne( query: mongoose.DocumentQuery<D | null, D> ): mongoose.DocumentQuery<D | null, D> {
        return query;
    }

    envelope( document: any ): any {
        let resource = Object.assign( { _links: {} }, document.toJSON() );
        resource._links.self = `${this.basePath}/${resource._id}`;
        return resource;
    }

    envelopeAll( documents: any[], options: any = {} ) {
        const resource: any = {
            _links: {
                previus: ``,
                self: `${options.url}`,
                next: ``
            },
            items: documents
        }
        if ( options.page && options.count && options.pageSize ) {

            if ( ( options.count - options.page * options.pageSize ) > 0 ) {
                resource._links.next = `${this.basePath}?_page=${options.page + 1}`;
            }

            if ( options.page > 1 ) {
                resource._links.previous = `${this.basePath}?_page=${options.page - 1}`;
            }
        }
        return resource;
    }

    validateId = ( req: restify.Request, res: restify.Response, next: restify.Next ) => {
        if ( !mongoose.Types.ObjectId.isValid( req.params.id ) )
            next( new NotFoundError( 'Documento não encontrado' ) );
        else
            next();
    }

    findAll = ( req: restify.Request, res: restify.Response, next: restify.Next ) => {
        this.model.find()
            .then( this.render( res, next ) )
            .catch( next );
    }

    findById = ( req: restify.Request, res: restify.Response, next: restify.Next ) => {
        this.prepareOne( this.model.findById( req.params.id ) )
            .then( this.render( res, next ) )
            .catch( next );
    }

    save = ( req: restify.Request, res: restify.Response, next: restify.Next ) => {
        let user = new this.model( req.body );
        user.save()
            .then( this.render( res, next ) )
            .catch( next );
    }

    replace = ( req: restify.Request, res: restify.Response, next: restify.Next ) => {
        const options = { runValidators: true, overwrite: true }
        this.model.update( { _id: req.params.id }, req.body, options )
            .exec()
            .then( result => {
                if ( result.n ) {
                    return this.model.findById( req.params.id );
                } else {
                    throw new NotFoundError( 'Documento não encontrado.' );
                }
            } )
            .then( this.render( res, next ) )
            .catch( next );
    }

    update = ( req: restify.Request, res: restify.Response, next: restify.Next ) => {
        const options = { runValidators: true, new: true };
        this.model.findByIdAndUpdate( req.params.id, req.body, options )
            .then( this.render( res, next ) )
            .catch( next );
    }

    delete = ( req: restify.Request, res: restify.Response, next: restify.Next ) => {
        this.model.deleteOne( { _id: req.params.id } ).exec().then( result => {
            console.log( result )
            if ( result.n )
                res.send( 204 );
            else
                throw new NotFoundError( 'Documento não encontrado.' );
            return next();
        } );
    }

}