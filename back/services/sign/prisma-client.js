const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function prismaSignUp(username, password) {
    try {
        const newUser = await prisma.user.create({
            data: {
                email: username,
                password: password,
            }
        });
        console.log('user ' + newUser);
        return true;
    } catch (error) {
        console.log('error ' + error);
        return false;
    }
}

//class AreaPrismaClient{
//    constructor () {
//        this.prisma = new PrismaClient();
//    }
//
//
//
//        console.log('>' + username.toString() + ' ' + password.toString());
//                await this.prisma.user.create({
//                    data: {
//                      email: username.toString(),
//                      password: password.toString(),
//                    },
//                })
//    }
//}

module.exports = { prismaSignUp };