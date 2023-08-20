1. extract files from archive
2. install docer desctop (https://www.docker.com/products/docker-desktop/)
3. enter this command in terminal <docker run -it -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.12-management> (with ot <>).
This command creats docker container and starts it
4. Open files as a new project in your IDE
5. initiate commant <npm install> in the project directory (in the terminal)
6. create a new ".env" file at the root of the project
7. enter HOST, PORT in the .env (in the swagger http://localhost:3000/)
8. initiate commant <node M1> in the project directory (in the terminal)
9. initiate commant <node M2> in the project directory (in the terminal)
10. send POST request to http://HOST:PORT/ with query parameters p1 and p2. It calculate sum and will return answer
