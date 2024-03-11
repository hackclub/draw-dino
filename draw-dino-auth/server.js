const {
  CLIENT_ID="2210535565.929474391893", CLIENT_SECRET="cfe9cf57c0af475ef06abccc41d0035d"
} = process.env
const SlackStrategy = require('passport-slack').Strategy
const passport = require('passport')
const express = require('express')
const fetch = require('node-fetch')
const app = express()
import metrics from './metrics'

passport.use(new SlackStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  state: true
}, (accessToken, refreshToken, profile, done) => {
  done(null, profile)
}))

app.use(passport.initialize())
app.use(passport.session())
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

app.listen(3000, server => console.log('server is running on port', 3000))
