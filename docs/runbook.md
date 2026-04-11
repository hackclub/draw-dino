# draw-dino runbook

## References
- Grafana Dashboard at [telemetry.hackclub.com](https://telemetry.hackclub.com/d/dfd172a5-ba5e-43c0-b9c5-3dd46197bc39/draw-dino?orgId=1)
- Hack Club Auth endpoints are served by this app under `/api/hca/start` and `/api/hca/callback`.

## draw-dino fails to authenticate with Hack Club Auth

- Check deployment logs for the main draw-dino app, specifically requests to `/api/hca/start` and `/api/hca/callback`.
- Verify `HACKCLUB_CLIENT_ID`, `HACKCLUB_CLIENT_SECRET`, `HACKCLUB_REDIRECT_URI`, and `PASSPORT_SESSION_SECRET` are configured.

## Making sure the application works

- Open [draw-dino.hackclub.com](https://draw-dino.hackclub.com/).
- After a few seconds, the application should reload. Make sure there's a text saying `Orpheus the Dinosaur and <Your-GitHub-Username> co-star in...`
- Click the "Click to Continue" button which should take you to the next page
- Click on the text saying "Click here to sign into Hack Club Auth" and sign in.
- If the sign in is successful, you should be redirected back to the draw-dino application within a few seconds.
- Otherwise, go back and check why Hack Club authentication fails
