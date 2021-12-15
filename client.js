const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDef = protoLoader.loadSync("todo.proto",{});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const client=new todoPackage.Todo('localhost:9000',grpc.credentials.createInsecure());
var params={n1:20, n2:10};
client.createTodo({
    'id':1,
    'text':"hello"
},(err,response)=>{
    console.log('Received from server'+JSON.stringify(response));
})

client.readTodos({},(err,response)=>{
    console.log('todos'+JSON.stringify(response));
})
/******* Users ***** */
client.createUser(
    {'id' : 1,
    'name' : "linda",
    'password' : "lindadadaaa",
},(err,response)=>{
    console.log('Received from server'+JSON.stringify(response));
})

client.useers({},(err,response)=>{
    console.log('users'+JSON.stringify(response));
})
/****** Calculator ****** */

client.add(params, (err,response)=>{
    console.log('n1 : '+JSON.stringify(response));
});


client.multiply(params, (err,response)=>{
    console.log('n1 : '+JSON.stringify(response));
});

client.sub(params, (err,response)=>{
    console.log('n1 : '+JSON.stringify(response));
});


