const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class PrismaClientSign {
    constructor() {
    }

    async isUsername(username) {
        try {
            const oldUser = await prisma.user.findMany({
                where: {
                    email: username
                }
            })
            console.log('>>> ' + oldUser.length);
            return (oldUser.length === 0) ? true : false;
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

    async setGithubToken(token, githubToken) {
        try {
            await prisma.user.update({
                where: {
                    UserGithubToken: {
                        token: token,
                        active: true
                    }
                },
                data: {
                    githubToken: githubToken
                }
            });
            return true;
        } catch (error) {
            console.log('error ' + error);
            return false;
        }
    }

    async getGithubToken(token) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    UserGithubToken: {
                        token: token,
                        active: true
                    }
                }
            })
            return user.githubToken;
        } catch (error) {
            console.log('error ' + error);
            return null;
        }
    }

    async createArea(request) {
        try {
            await prisma.user.update({
                where: {
                    token: request.token
                },
                data: {
                    area: [
                        {
                            serviceAct: request.serviceAct,
                            action: request.action,
                            actionArgs: request.actionArgs,
                            actionData: request.actionData,
                            serviceRea: request.serviceRea,
                            reaction: request.reaction,
                            reactionArgs: request.reactionArgs,
                        }
                    ]
                }
            });
            return true;
        } catch (error) {
            console.log('error ' + error);
            return false;
        }
    }

    async getUserArea(request) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    UserGithubToken: {
                        token: request.token,
                        active: true
                    }
                },
                select: {
                    areas: true
                }
            });
            return (user) ? user.areas : null;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async listArea() {
        try {
            const areas = await prisma.area.findMany({
            });
            return areas;
        } catch (err) {
            return null;
        }
    }

};

module.exports = { PrismaClientSign };