# kennis

## Production prep

Build the app for production
`yarn run build:prod`

Assemble and run the docker image using PowerShell
`yarn run assemble; docker run --rm -p 3200:3200 -d -v "$(Get-Location)/content:/opt/content" --name ks kennis-server`
