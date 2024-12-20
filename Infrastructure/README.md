# Infrastrucutre 🏗

This directory contains infrastrucutre related tools.

## Build Images 🐋

Use `build_images.sh` to build docker images for the whole app.

The script will prompt for a version number. It will also tag the images with a short commit hash.

### How to use:

1. Go to the root of the project.
2. Make sure the script is executable with `chmod +x Infrastrucutre/build_images.sh`.
3. Run the script `./Infrastructure/build_images.sh {VERSION}`.

The images will be tagged in the following format: `dimeskigj/janus:web-{VERSION|HASH}` and `dimeskigj/janus:api-{VERSION|HASH}`.

Afterwards, push the images to the repository: `docker push dimeskigj/janus:{TAG}`. Use `docker login` beforehand with the token.

## Docker Compose 🐳

In the `compose` directory you will find 2 compose files: `api.compose.yaml` and `web.compose.yaml`. The API Compose file starts up the API and database container while the web compose file starts the angular frontend. The versioning is handled in these files, for each version bump we bump the version in the docker image tag. 

Make sure you configure the `.env` file using the variables defined in `.env.example`!

To start the services use `docker compose -f {api|web}.compose.yaml up -d`. 

Make sure you've used `docker login` so that compose can pull the images from docker hub.
