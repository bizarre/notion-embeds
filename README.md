# bizarre/notion-embeds

> rich (niche) embeds for your notion documents

currently only contains a github chart embed

## usage:
1. create a new Embed block in your Notion doc.
2. set embed url to `https://notion-github-embed.vercel.app/chart/{username}`` replacing `{username} `with your GitHub username.
3. adjust size of embed so it fits document better

## new in v2

cleaned up the logic for building the chart, now supports system setting theme

before:
![before](https://i.imgur.com/KCtayAP.png)

now:
![now](https://i.imgur.com/JMXvJqq.png)

also light mode:
![before](https://i.imgur.com/c3XZHkx.png)
