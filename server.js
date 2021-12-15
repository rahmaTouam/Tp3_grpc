const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDef = protoLoader.loadSync("todo.proto",{});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const server = new grpc.Server();

server.bind('localhost:9000',grpc.ServerCredentials.createInsecure());
server.addService(todoPackage.Todo.service,{
    'createTodo' : createTodo,
    'readTodos' : readTodos,
    'createUser' : createUser,
    'useers' : useers,

    'add' : add,
    'multiply' : multiply,
    'sub' : sub
})

server.start();
const todos = [];

function createTodo (call, callback){
    const todoItem = {
        'id' : todos.length + 1,
        'text' : call.request.text
    }
    todos.push(todoItem);
    callback(null, todoItem);
}

function readTodos(call, callback){
    callback(null, {
        'items' : todos
    });
}
/*** Users */

const users = [];

function createUser (call, callback){
    const user = {
        'id' : users.length + 1,
        'name' : call.request.text,
        'password' : call.request.text,
    }
    users.push(user);
    callback(null, user);
}

function useers(call, callback){
    callback(null, {
        'users' : users
    });
}

/****** */
function add(call, callback){
    callback(null, {
        "n1" : call.request.n1+call.request.n2});
}


function multiply(call, callback){
    callback(null, {
        "n1" : call.request.n1*call.request.n2});
}

function sub(call, callback){
    callback(null, {
        "n1" : call.request.n1-call.request.n2});
}
