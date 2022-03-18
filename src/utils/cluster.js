const cluster = require('cluster');
const { cpus } = require('os');
const process = require('process');

const CPUS = cpus();

console.log(cluster.isMaster);
console.log(cluster.isPrimary);

if (cluster.isMaster) {
  console.log(`worker ${process.pid} is running`);
  CPUS.forEach(() => {
    cluster.fork();
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  require('./index');
}
