# kennis

## Development

You can start the server with
`cd server; yarn run serve`

You can run the UI with
`cd app; yarn run start`

Note that the server needs to be restarted to pick up code changes, the UI will rebuild changed files and refresh your browser for you.

## Release process

Use the _pacakge.sh_ script in the root of the project. Remember to bump the version of the container tags *AFTER* each release.
This means that running the build script in development will always produce a tag for the built images which doesn't clash with the released versions.

You can test the images with Docker using PowerShell
`docker run --rm -p 3200:3200 -d -v "$(Get-Location)/content:/opt/content" kennis-server`
`docker run --rm -p 4200:80 -d kennis-app`

Then you can open [http://localhost:4200](http://localhost:4200) in your browser.

If everything is working, then you can push the new tags (latest and the new version, for each app) to your container image repository.
