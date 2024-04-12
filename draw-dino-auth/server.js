const {
  CLIENT_ID, CLIENT_SECRET
} = process.env
const SlackStrategy = require('passport-slack').Strategy
const passport = require('passport')
const express = require('express')
const session = require("express-session")
const fetch = require('node-fetch')
const app = express()
const metrics = require("./metrics.js");

passport.use(new SlackStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  state: true
}, (accessToken, refreshToken, profile, done) => {
  done(null, profile)
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(session({ 
  // draw-dino-slack-auth
  secret: "9f27d9b366adfd65722437c2cbf6e5b07e0c2a0e698c4816fae9d76fd96d0ae4"
}))
app.use(require('body-parser').urlencoded({ extended: true }))

app.get("/failed-slack-auth", (req, res) => {
  metrics.increment("errors.slack_auth", 1);
})

app.get(
  '/update-github-url',
  passport.authorize('slack', { failureRedirect: "/failed-slack-auth" }),
  (req, res) => {
    const data = {
      slack: req.account.user.id,
      github: req.query.state
    }

    metrics.increment("success.slack_auth", 1);
    const webhook = 'https://hooks.zapier.com/hooks/catch/507705/odyc4wo/'
    fetch(webhook, {
      method: 'POST',
      body: JSON.stringify(data)
    })
    return res.redirect(302, "https://draw-dino.hackclub.com/slackAuthSuccess")
  }
)

const port = process.env.PORT || 3000
app.listen(port, server => console.log('server is running on port', port))
