import {Connection} from 'rabbitmq-client';
const rabbit = new Connection('amqp://guest:guest@localhost:5672');

rabbit.on('error', (err) => {
    console.log('RabbitMQ connection error', err);
})
rabbit.on('connection', () => {
    console.log('Connection successfully (re)established');
})
rabbit.on('connection.blocked', (err) => {
    console.log('RabbitMQ connection was closed', err);
})

const rpcServer = rabbit.createConsumer({
    queue: 'my-rpc-queue'
}, async (req, reply) => {
    console.log('got request:', req.body);
    let p1 = req.body.p1;
    let p2 = req.body.p2;

    if (!p1 || !p2) {
        console.log('query parameter error!!');
        await reply({code: 400, message: 'enter query parameters p1 and p2'});
        return
    }

    p1 = Number(p1);
    p2 = Number(p2);
    const sum = p1 + p2;
    if ( isNaN(sum) ) {
        console.log('query parameter error!!');
        await reply({code: 400, message: 'p1 and p2 must be a numbers'});
        return
    }

    console.log('sending amount p1 and p2: ' + sum);
    await reply({code: 400, message: sum});
})

process.on('SIGINT', async () => {
    await rpcServer.close()
    await rabbit.close()
})