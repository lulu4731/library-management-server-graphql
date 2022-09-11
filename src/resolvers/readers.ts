import { Readers } from "../entities/readers";
import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { checkAuth } from "../middleware/checkAuth";
// import { LibrarianMutationResponse } from "../types/LibrarianMutationResponse";
import { MutationResponse, ReaderInput } from "../types/interface";

@Resolver()
export class ReadersResolver {
    @Query(() => [Readers])
    @UseMiddleware(checkAuth)
    async readers(): Promise<Readers[]> {
        return await Readers.find()
    }

    @Mutation(_return => MutationResponse)
    @UseMiddleware(checkAuth)
    async addReaders(
        @Arg('reader') reader: ReaderInput
    ): Promise<MutationResponse> {
        const { email, phone, citizen_identification } = reader

        const phoneExist = await Readers.findOne({
            where: {
                phone
            }
        })

        const citizenIdentificationExist = await Readers.findOne({
            where: {
                citizen_identification
            }
        })

        const emailExist = await Readers.findOne({
            where: {
                email
            }
        })

        if (emailExist) {
            return {
                code: 400,
                success: false,
                message: 'Duplicated email',
            }
        }

        if (phoneExist) {
            return {
                code: 400,
                success: false,
                message: 'Duplicated phone',
            }
        }

        if (citizenIdentificationExist) {
            return {
                code: 400,
                success: false,
                message: 'Duplicated citizen identification',
            }
        }

        const newReader = Readers.create(reader)
        await newReader.save()

        return {
            code: 200,
            success: true,
            message: 'Load readers success',

            data: newReader
        }
    }

    @Mutation(_return => MutationResponse)
    @UseMiddleware(checkAuth)
    async deleteReaders(
        @Arg('id_readers') id_readers: string
    ): Promise<MutationResponse> {
        const readerExist = await Readers.findOne({
            where: {
                id_readers
            }
        })

        if (!readerExist) {
            return {
                code: 400,
                success: false,
                message: 'No readers found',
            }
        }

        await Readers.delete(id_readers)

        return {
            code: 200,
            success: true,
            message: 'Delete readers success',
        }
    }

    @Mutation(_return => MutationResponse)
    @UseMiddleware(checkAuth)
    async updateReaders(
        @Arg('reader') reader: ReaderInput,
        @Arg('id_readers') id_readers: string
    ): Promise<MutationResponse> {
        const { email, phone, citizen_identification } = reader

        const readerById = await Readers.findOneBy({
            id_readers: id_readers,
        })

        if (!readerById) {
            return {
                code: 400,
                success: false,
                message: 'No readers found',
            }
        }

        const emailOldExist = await Readers.findOne({
            where: {
                id_readers,
                email
            }
        })

        const phoneOldExist = await Readers.findOne({
            where: {
                id_readers,
                phone
            }
        })

        const citizenIdentificationOldExist = await Readers.findOne({
            where: {
                id_readers,
                citizen_identification
            }
        })

        if (!emailOldExist) {
            const emailExist = await Readers.findOne({
                where: {
                    email
                }
            })
            if (emailExist) {
                return {
                    code: 400,
                    success: false,
                    message: 'Duplicated email',
                }
            }
        }

        if (!phoneOldExist) {
            const phoneExist = await Readers.findOne({
                where: {
                    phone
                }
            })
            if (phoneExist) {
                return {
                    code: 400,
                    success: false,
                    message: 'Duplicated phone',
                }
            }
        }

        if (!citizenIdentificationOldExist) {
            const citizenIdentificationExist = await Readers.findOne({
                where: {
                    citizen_identification
                }
            })
            if (citizenIdentificationExist) {
                return {
                    code: 400,
                    success: false,
                    message: 'Duplicated citizen identification',
                }
            }
        }

        let newReader = { ...reader, id_readers: readerById.id_readers, readers_status: readerById.readers_status }

        const updateReader = await Readers.save(newReader)

        // const a = await Readers.createQueryBuilder().select("readers").from(Readers, "readers").getMany()
        // console.log(a)
        // const b = await Readers.query("select * from readers")
        // console.log(b)

        return {
            code: 200,
            success: true,
            message: 'Update readers success',

            data: updateReader
        }
    }
}