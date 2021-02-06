import dotenv from 'dotenv';
dotenv.config();

const config = {
    db: {
        url: process.env.MONGODB,
        name: 'chatdb',
    },
};

export default config;
