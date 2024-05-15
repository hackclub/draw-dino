# draw-dino runbook

## References
- Grafana Dashboard at [telemetry.hackclub.com](https://telemetry.hackclub.com/d/dfd172a5-ba5e-43c0-b9c5-3dd46197bc39/draw-dino?orgId=1)
- Draw Dino Slack Authentication service app at [draw-dino-slack-auth](https://railway.app/project/83c44d6e-0f65-4b4a-aa19-bef5909c047a)

## draw-dino fails to authenticate with slack

- Open the app dashboard on railway.app at [draw-dino-slack-oauth](https://railway.app/project/83c44d6e-0f65-4b4a-aa19-bef5909c047a/service/9687e7fd-6efd-424b-9817-f59d9792ad39)
- Checkout the logs by clicking on the "View Logs" button under the Deployments tab of the *draw-dino* app to identify what's wrong with the app

## Making sure the application works

- Open [draw-dino.hackclub.com](https://draw-dino.hackclub.com/).
- After a few seconds, the application should reload. Make sure there's a text saying `Orpheus the Dinosaur and <Your-GitHub-Username> co-star in...`
- Click the "Click to Continue" button which should take you to the next page
- Click on the text saying "Click here to sign into Slack" and sign into your Slack account.
- If the sign in is successful, you should be redirected back to the draw-dino application within a few seconds.
- Otherwise, go back and check why Slack authentication fails
