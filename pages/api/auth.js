const {
  CLIENT_ID, CLIENT_SECRET
} = process.env
const SlackStrategy = require('passport-slack').Strategy
const passport = require('passport')
const express = require('express')
const app = express()

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

app.get(
  '/update-github-url',
  passport.authorize('slack'),
  (req, res) => {
    const data = {
      slack: req.account.user.id,
      github: req.query.state
    }

    const webhook = 'https://hooks.zapier.com/hooks/catch/507705/odyc4wo/'
    fetch(webhook, {
      method: 'POST',
      body: JSON.stringify(data)
    })
    return res.redirect(302, "https://draw-dino.hackclub.com/slackAuthSuccess")
  }
)

module.exports = app
