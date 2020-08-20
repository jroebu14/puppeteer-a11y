### ⚠️ This is just a hacked together proof of concept

### Get started

Clone repo and run `npm install`

Currently only runs against [2 urls](https://github.com/jroebu14/puppeteer-a11y/blob/master/bbc-a11y/index.js#L8) - https://www.bbc.co.uk and https://www.bbc.co.uk/news

### Run a11y automated tests which uses Puppeteer instead of Electron

```
node bbc-a11y/run
```

This return JSON of any standards with errors or warnings.

### Run a React app that displays output from bbc-a11y automated tests

```
npm run start
```

then navigate to http://localhost:3000/
