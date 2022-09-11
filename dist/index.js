"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
require("reflect-metadata");
const express = require("express");
const typeorm_1 = require("typeorm");
const http_1 = require("http");
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const apollo_server_core_1 = require("apollo-server-core");
const graphqlPlayground_1 = require("apollo-server-core/dist/plugin/landingPage/graphqlPlayground");
const librarian_1 = require("./resolvers/librarian");
const Librarian_1 = require("./entities/Librarian");
const readers_1 = require("./entities/readers");
const readers_2 = require("./resolvers/readers");
const Authors_1 = require("./entities/Authors");
const authors_1 = require("./resolvers/authors");
const Category_1 = require("./entities/Category");
const category_1 = require("./resolvers/category");
const Company_1 = require("./entities/Company");
const company_1 = require("./resolvers/company");
const Titles_1 = require("./entities/Titles");
const titles_1 = require("./resolvers/titles");
const Liquidation_1 = require("./entities/Liquidation");
const Receipt_1 = require("./entities/Receipt");
const ReceiptDetails_1 = require("./entities/ReceiptDetails");
const BookBorrow_1 = require("./entities/BookBorrow");
const BookStatus_1 = require("./entities/BookStatus");
const Book_1 = require("./entities/Book");
const Verification_1 = require("./entities/Verification");
const BorrowDetails_1 = require("./entities/BorrowDetails");
const receipt_1 = require("./resolvers/receipt");
const book_1 = require("./resolvers/book");
const main = async () => {
    await (0, typeorm_1.createConnection)({
        type: 'postgres',
        database: 'LMS',
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        logging: true,
        synchronize: true,
        entities: [Librarian_1.Librarian, readers_1.Readers, Authors_1.Authors, Category_1.Category, Company_1.Company, Titles_1.Titles, Liquidation_1.Liquidations, Receipt_1.Receipt, ReceiptDetails_1.ReceiptDetails, BookBorrow_1.BookBorrow, BookStatus_1.BookStatus, Book_1.Book, BorrowDetails_1.BorrowDetails, Verification_1.Verification]
    });
    const app = express();
    const httpServer = (0, http_1.createServer)(app);
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            validate: false,
            resolvers: [librarian_1.LibrarianResolver, readers_2.ReadersResolver, authors_1.AuthorsResolver, category_1.CategoryResolver, company_1.CompanyResolver, titles_1.TitlesResolver, receipt_1.ReceiptResolver, book_1.BooksResolver]
        }),
        plugins: [
            (0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
            graphqlPlayground_1.ApolloServerPluginLandingPageGraphQLPlayground
        ],
        context: ({ req, res }) => ({ req, res })
    });
    const startServer = async () => {
        await apolloServer.start();
        apolloServer.applyMiddleware({
            app, cors: {
                origin: 'http://localhost:3000',
                credentials: true
            }
        });
    };
    startServer();
    const PORT = process.env.PORT || 5000;
    await new Promise(resolve => httpServer.listen(PORT, resolve));
    console.log(`Server ready at http://localhost:5000${apolloServer.graphqlPath}`);
};
main().catch(error => console.log('Error: ', error));
//# sourceMappingURL=index.js.map