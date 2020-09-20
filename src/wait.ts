export async function wait(milliseconds: number): Promise<string> {
  return new Promise(resolve => {
    if (isNaN(milliseconds)) {
      throw new Error('milliseconds not a number')
    }

    setTimeout(() => resolve('done!'), milliseconds)
  })
}

export async function blah(name: string): Promise<string> {
  return Promise.resolve(`blah ${name}`)
}