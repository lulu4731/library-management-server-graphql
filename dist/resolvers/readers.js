"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadersResolver = void 0;
const readers_1 = require("../entities/readers");
const type_graphql_1 = require("type-graphql");
const checkAuth_1 = require("../middleware/checkAuth");
const interface_1 = require("../types/interface");
let ReadersResolver = class ReadersResolver {
    async readers() {
        return await readers_1.Readers.find();
    }
    async addReaders(reader) {
        const { email, phone, citizen_identification } = reader;
        const phoneExist = await readers_1.Readers.findOne({
            where: {
                phone
            }
        });
        const citizenIdentificationExist = await readers_1.Readers.findOne({
            where: {
                citizen_identification
            }
        });
        const emailExist = await readers_1.Readers.findOne({
            where: {
                email
            }
        });
        if (emailExist) {
            return {
                code: 400,
                success: false,
                message: 'Duplicated email',
            };
        }
        if (phoneExist) {
            return {
                code: 400,
                success: false,
                message: 'Duplicated phone',
            };
        }
        if (citizenIdentificationExist) {
            return {
                code: 400,
                success: false,
                message: 'Duplicated citizen identification',
            };
        }
        const newReader = readers_1.Readers.create(reader);
        await newReader.save();
        return {
            code: 200,
            success: true,
            message: 'Load readers success',
            data: newReader
        };
    }
    async deleteReaders(id_readers) {
        const readerExist = await readers_1.Readers.findOne({
            where: {
                id_readers
            }
        });
        if (!readerExist) {
            return {
                code: 400,
                success: false,
                message: 'No readers found',
            };
        }
        await readers_1.Readers.delete(id_readers);
        return {
            code: 200,
            success: true,
            message: 'Delete readers success',
        };
    }
    async updateReaders(reader, id_readers) {
        const { email, phone, citizen_identification } = reader;
        const readerById = await readers_1.Readers.findOneBy({
            id_readers: id_readers,
        });
        if (!readerById) {
            return {
                code: 400,
                success: false,
                message: 'No readers found',
            };
        }
        const emailOldExist = await readers_1.Readers.findOne({
            where: {
                id_readers,
                email
            }
        });
        const phoneOldExist = await readers_1.Readers.findOne({
            where: {
                id_readers,
                phone
            }
        });
        const citizenIdentificationOldExist = await readers_1.Readers.findOne({
            where: {
                id_readers,
                citizen_identification
            }
        });
        if (!emailOldExist) {
            const emailExist = await readers_1.Readers.findOne({
                where: {
                    email
                }
            });
            if (emailExist) {
                return {
                    code: 400,
                    success: false,
                    message: 'Duplicated email',
                };
            }
        }
        if (!phoneOldExist) {
            const phoneExist = await readers_1.Readers.findOne({
                where: {
                    phone
                }
            });
            if (phoneExist) {
                return {
                    code: 400,
                    success: false,
                    message: 'Duplicated phone',
                };
            }
        }
        if (!citizenIdentificationOldExist) {
            const citizenIdentificationExist = await readers_1.Readers.findOne({
                where: {
                    citizen_identification
                }
            });
            if (citizenIdentificationExist) {
                return {
                    code: 400,
                    success: false,
                    message: 'Duplicated citizen identification',
                };
            }
        }
        let newReader = Object.assign(Object.assign({}, reader), { id_readers: readerById.id_readers, readers_status: readerById.readers_status });
        const updateReader = await readers_1.Readers.save(newReader);
        return {
            code: 200,
            success: true,
            message: 'Update readers success',
            data: updateReader
        };
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [readers_1.Readers]),
    (0, type_graphql_1.UseMiddleware)(checkAuth_1.checkAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReadersResolver.prototype, "readers", null);
__decorate([
    (0, type_graphql_1.Mutation)(_return => interface_1.MutationResponse),
    (0, type_graphql_1.UseMiddleware)(checkAuth_1.checkAuth),
    __param(0, (0, type_graphql_1.Arg)('reader')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [interface_1.ReaderInput]),
    __metadata("design:returntype", Promise)
], ReadersResolver.prototype, "addReaders", null);
__decorate([
    (0, type_graphql_1.Mutation)(_return => interface_1.MutationResponse),
    (0, type_graphql_1.UseMiddleware)(checkAuth_1.checkAuth),
    __param(0, (0, type_graphql_1.Arg)('id_readers')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReadersResolver.prototype, "deleteReaders", null);
__decorate([
    (0, type_graphql_1.Mutation)(_return => interface_1.MutationResponse),
    (0, type_graphql_1.UseMiddleware)(checkAuth_1.checkAuth),
    __param(0, (0, type_graphql_1.Arg)('reader')),
    __param(1, (0, type_graphql_1.Arg)('id_readers')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [interface_1.ReaderInput, String]),
    __metadata("design:returntype", Promise)
], ReadersResolver.prototype, "updateReaders", null);
ReadersResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], ReadersResolver);
exports.ReadersResolver = ReadersResolver;
//# sourceMappingURL=readers.js.map