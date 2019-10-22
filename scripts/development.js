const exec = require('exec-sh')
const os = require('os')

if (os.type() === 'Linux') {
  exec('sh ./scripts/start-dev.sh')
} else if (os.type() === 'Darwin') {
  exec('sh ./scripts/start-dev.sh')
} else if (os.type() === 'Windows_NT') {
  exec('start ./scripts/start-dev.sh')
} else {
  throw new Error(`Unsupported OS found: ${os.type()}`)
}
