export async function aitest(aikey: string): Promise<string> {

    let appInsights = require('applicationinsights');
    const { promisify } = require('util');

    await appInsights.setup(aikey); // do not start(), we only want custom events

    let client = appInsights.defaultClient;
    client.trackMetric({ name: "testmetric", value: 3 });
    await promisify(client.flush())

    return Promise.resolve(`done`)
}