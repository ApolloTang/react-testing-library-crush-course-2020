const api = {
  subscription: async (data) => {
    let message

    await new Promise(rs=>setTimeout(rs, 1000))
    try {
      const rand = Math.random()
      if (rand > .5) {
        throw new Error('Opps! Some things has gone wrong. Please try again later.')
      } else {
        message = `Thank you ${data.name}, you have been added to email list`
      }
    } catch (er) {
      message = er+''
    }

    return message
  }
}

export { api }
