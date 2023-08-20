import {Connection} from 'rabbitmq-client';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const rabbit = new Connection(`amqp://guest:guest@${process.env.HOST}:${process.env.PORT}`);

rabbit.on('error', (err) => {
    console.log('RabbitMQ connection error ', err);
})
rabbit.on('connection', () => {
    console.log('Connection successfully (re)established ');
})
rabbit.on('connection.blocked', (err) => {
        console.log('RabbitMQ connection was closed ', err);
})



const rpcClient = rabbit.createRPCClient({confirm: true})

const app = express();

app.post("/", async function(request, response){
    try {
        console.log(`sending query parameters to M2`)
        const res = await rpcClient.send('my-rpc-queue', request.query);
        console.log('sending response: ', res.body);
        response.status(res.body.code).send(res.body.message.toString());
    } catch (e) {
        console.log('sending error ', e);
        response.sendStatus(500);
    }
});

const server = app.listen(3000);
console.log("http://localhost:3000")

process.on('SIGINT', async () => {
    console.log('rpcClient.close')
    await rpcClient.close()
    console.log('rabbit.close')
    await rabbit.close()
    console.log('server.close')
    server.close()
    console.log('SIGINT end')
})