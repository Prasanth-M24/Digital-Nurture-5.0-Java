const { spawn } = require('child_process');
const net = require('net');

const angularCliEntry = require.resolve('@angular/cli/bin/ng');

function findFreePort(startPort, endPort) {
  return new Promise((resolve, reject) => {
    const tryPort = (port) => {
      const server = net.createServer();

      server.once('error', () => {
        server.close();
        if (port >= endPort) {
          reject(new Error(`No free port found between ${startPort} and ${endPort}`));
          return;
        }

        tryPort(port + 1);
      });

      server.once('listening', () => {
        server.close(() => resolve(port));
      });

      server.listen(port, '127.0.0.1');
    };

    tryPort(startPort);
  });
}

function shutdown(code) {
  if (apiServer && !apiServer.killed) {
    apiServer.kill();
  }

  if (angularServer && !angularServer.killed) {
    angularServer.kill();
  }

  process.exit(code ?? 0);
}

let apiServer;
let angularServer;

async function main() {
  apiServer = spawn('node', ['api-server.js'], {
    stdio: 'inherit',
  });

  apiServer.on('exit', (code) => {
    if (code && code !== 0) {
      shutdown(code);
    }
  });

  const angularPort = await findFreePort(4200, 4210);
  console.log(`Starting Angular on port ${angularPort}`);

  angularServer = spawn(
    process.execPath,
    [angularCliEntry, 'serve', '--port', String(angularPort), '--no-open'],
    {
      stdio: 'inherit',
    },
  );

  angularServer.on('exit', (code) => {
    if (code && code !== 0) {
      shutdown(code);
    }
  });
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

main().catch((error) => {
  console.error(error);
  shutdown(1);
});
