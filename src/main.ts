import * as core from '@actions/core'
import * as appInsights from 'applicationinsights'

import { wait } from './wait'
import { isUndefined } from 'util'


function varOrUnknown(name: string): string {
  var x = process.env[name]
  if (isUndefined(x)) {
    x = "Unknown"
  }
  return x
}

async function run(): Promise<void> {
  try {
    const datamap: string = core.getInput('datamap')
    core.debug(`Datamap is ${datamap}`)
    const datapoints = JSON.parse(datamap)

    appInsights.setup(core.getInput('aikey'))
    var client = appInsights.defaultClient;

    client.commonProperties = {
      "sha": varOrUnknown("GITHUB_SHA"),
      "repository": varOrUnknown("GITHUB_REPOSITORY"),
      "ref": varOrUnknown("GITHUB_REF")
    }

    client.trackMetric(datapoints);

    client.flush({
      callback: (response: any) => {
        console.debug(`response: ${response}`)
      }
    });

  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
