const path = require('path')
const grpc = require('grpc')
const PROTO_PATH = path.join(`${__dirname}/../src/protos/`)
const helloProto = grpc.load(`${PROTO_PATH}/helloworld.proto`).helloworld

function sayHello (call, callback) {
  console.log(`Hello ${call.request.name}`)
  callback(null, { message: `Hello ${call.request.name}` })
}

function main () {
  const server = new grpc.Server()
  server.addService(helloProto.Greeter.service, { sayHello })
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure())
  server.start()
  console.log('Server is running')
}

main()
