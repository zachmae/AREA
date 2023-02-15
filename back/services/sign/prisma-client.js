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

    async addUser(username, password, code) {
        try {
            await prisma.user.create({
                data: {
                    email: username,
                    password: password,
                    code: code,
                    token: code
                }
            });
            return true;
        } catch (error) {
            console.log('error ' + error);
            return false;
        }
    }

    async userVerif(username, code) {
        try {
            await prisma.user.update({
                where: {
                    UserUp: {
                        email: username,
                        code: code,
                        active: false
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

    async getUser(username, password) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    UserIn: {
                        email: username,
                        password: password,
                        active: true
                    }
                }
            })
            return user;
        } catch (error) {
            console.log('error ' + error);
            return null;
        }
    }

};

module.exports = { PrismaClientSign };