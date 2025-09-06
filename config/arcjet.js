import arcjet from '@arcjet/node';

const aj = arcjet({
    key: process.env.ARCJET_KEY || 'demo',
    rules: [
        {
            mode: 'LIVE',
            priority: 1,
            rateLimit: {
                characteristics: ['ip'],
                max: 5,
                period: '1m',
            },
        },
    ],
});

export default aj;