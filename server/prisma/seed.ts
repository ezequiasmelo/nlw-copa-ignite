import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // const user = await prisma.user.create({
    //     data: {
    //         name: 'John Doe',
    //         email: 'john.doe@gmail.com',
    //         avatarUrl: 'https://github.com/ezequiasmelo'
    //     }
    // })

    // const pool = await prisma.pool.create({
    //     data: {
    //         title: 'Example Pool',
    //         code: 'BOL123',
    //         ownerId: user.id,
    //         participants: {
    //             create: {
    //                 userId: user.id
    //             }
    //         }
    //     }
    // })

    await prisma.game.create({
        data: {
            date: '2022-11-28T13:00:00.201Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'RS'
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-24T16:00:00.201Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'CH'
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-12-02T16:00:00.201Z',
            firstTeamCountryCode: 'CM',
            secondTeamCountryCode: 'BR'
        }
    })

    // await prisma.game.create({
    //     data: {
    //         date: '2022-11-03T12:00:00.201Z',
    //         firstTeamCountryCode: 'DE',
    //         secondTeamCountryCode: 'BR',
    //         guesses: {
    //             create: {
    //                 firstTeamPoints: 2,
    //                 secondTeamPoints: 1,
    //                 participant: {
    //                     connect: {
    //                         userId_poolId: {
    //                             userId: user.id,
    //                             poolId: pool.id
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // })
}

main()