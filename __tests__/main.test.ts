import { wait, blah } from '../src/wait'
import { aitest } from '../src/ai'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

let appInsights = require('applicationinsights');

test('throws invalid number', async () => {
  const input = parseInt('foo', 10)
  await expect(wait(input)).rejects.toThrow('milliseconds not a number')
})

test('wait 500 ms', async () => {
  const start = new Date()
  await wait(500)
  const end = new Date()
  var delta = Math.abs(end.getTime() - start.getTime())
  expect(delta).toBeGreaterThan(450)
})

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['INPUT_MILLISECONDS'] = '500'
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecSyncOptions = {
    env: process.env
  }
  console.log(cp.execSync(`node ${ip}`, options).toString())
})

test('blah', async () => {
  await expect(blah('fish')).resolves.toBe('blah fish')
})

test('ai2', done => {
  var client = new appInsights.TelemetryClient();

  client.trackMetric({ name: "test metric", value: 3 });

  client.flush({
    callback: (response: any) => {
      console.log(`response: ${response}`)
      done();
    }
  });
})
