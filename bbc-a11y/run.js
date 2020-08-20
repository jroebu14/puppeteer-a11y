const run = require('./index')

;(async () => {
  const results = await run()
  console.log(JSON.stringify(results, null, 2))
})()
