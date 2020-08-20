### ⚠️ This is just a hacked together proof of concept with bugs and doesn't have a lot of the existing bbc-a11y tool functionality such as skipping tests and probably many other things

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

then navigate to http://localhost:3000/ and you should see a basic accordion UI with the results like below

<img width="2032" alt="Screenshot 2020-08-20 at 17 05 04" src="https://user-images.githubusercontent.com/4798332/90796746-a0300800-e307-11ea-9bd4-9edbd948025a.png">
