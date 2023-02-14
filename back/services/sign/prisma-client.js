const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class PrismaClientSign {
    constructor () {
    }

    async isUsername(username) {
        try {
            const oldUser = await prisma.user.findMany({
                where: {
                    email: username
                }
            })
            console.log('>>> ' + oldUser.length);
            return (oldUser.length === 0)? true: false;
        } catch (error) {
            console.log('error ' + error);
            return false;
        }
    }

    async isAccount(username, password) {
        try {
            const oldUser = await prisma.user.findMany({
                where: {
                    email: username,
                    password: password
                }
            })
            console.log('>>> ' + oldUser.length);
            return (oldUser.length === 0)? true: false;
        } catch (error) {
            console.log('error ' + error);
            return false;
        }
    }

    async addUser(username, password, code) {
        try {
            await prisma.user.create({
                data: {
                    email: username,
                    password: password,
                    code: code
                }
            });
            return true;
        } catch (error) {
            console.log('error ' + error);
            return false;
        }
    }

    async signUpVerif(username, code) {
        try {
            await prisma.user.update({
                where: {
                    UserEmailCode: {
                        email: username,
                        code: code
                    }
                },
                data: {
                    active: true
                }
            });
            return true;
        } catch (error) {
            console.log('error ' + error);
            return false;
        }
    }
};

module.exports = { PrismaClientSign };