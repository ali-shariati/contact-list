import http from "http";

const server = http.createServer((req, res) => {
    res.write('Hello World!');
    res.end();
});

server.listen(3000 ,()=>{
    console.log('Server started on port 3000');
});