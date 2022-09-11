require('dotenv').config()
import 'reflect-metadata'
import express = require('express');
import { createConnection } from "typeorm";
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core/dist/plugin/landingPage/graphqlPlayground';
import { LibrarianResolver } from './resolvers/librarian';
import { Context } from './types/Context';
import { Librarian } from './entities/Librarian';
import { Readers } from './entities/readers';
import { ReadersResolver } from './resolvers/readers';
import { Authors } from './entities/Authors';
import { AuthorsResolver } from './resolvers/authors';
import { Category } from './entities/Category';
import { CategoryResolver } from './resolvers/category';
import { Company } from './entities/Company';
import { CompanyResolver } from './resolvers/company';
import { Titles } from './entities/Titles';
import { TitlesResolver } from './resolvers/titles';
import { Liquidations } from './entities/Liquidation';
import { Receipt } from './entities/Receipt';
import { ReceiptDetails } from './entities/ReceiptDetails';
import { BookBorrow } from './entities/BookBorrow';
import { BookStatus } from './entities/BookStatus';
import { Book } from './entities/Book';
import { Verification } from './entities/Verification';
import { BorrowDetails } from './entities/BorrowDetails';
import { ReceiptResolver } from './resolvers/receipt';
import { BooksResolver } from './resolvers/book';

const main = async () => {
    await createConnection({
        type: 'postgres',
        database: 'LMS',
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        logging: true,
        synchronize: true,
        entities: [Librarian, Readers, Authors, Category, Company, Titles, Liquidations, Receipt, ReceiptDetails, BookBorrow, BookStatus, Book, BorrowDetails, Verification]
    })

    const app = express()
    const httpServer = createServer(app)
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            validate: false,
            resolvers: [LibrarianResolver, ReadersResolver, AuthorsResolver, CategoryResolver, CompanyResolver, TitlesResolver, ReceiptResolver, BooksResolver]
        }),
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            ApolloServerPluginLandingPageGraphQLPlayground
        ],
        context: ({ req, res }): Pick<Context, 'req' | 'res'> => ({ req, res })
    })

    const startServer = async () => {
        await apolloServer.start()
        apolloServer.applyMiddleware({
            app, cors: {
                origin: 'http://localhost:3000',
                credentials: true
            }
        })
    }

    startServer()
    const PORT = process.env.PORT || 5000

    await new Promise(resolve => httpServer.listen(PORT, resolve as () => void))

    console.log(`Server ready at http://localhost:5000${apolloServer.graphqlPath}`)
}

main().catch(error => console.log('Error: ', error))