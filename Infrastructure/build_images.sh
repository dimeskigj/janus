#!/bin/bash

die() {
  echo "$1" >&2
  exit 1
}

git rev-parse --show-toplevel >/dev/null 2>&1 || die "This script must be run from a Git repository."

VERSION="$1"
if [ -z "$VERSION" ]; then
  read -p "Enter the version tag: " VERSION
  if [ -z "$VERSION" ]; then
    die "Version tag is required."
  fi
fi

IMAGE_NAME=dimeskigj/janus
COMMIT_HASH=$(git rev-parse --short HEAD) || die "Failed to get Git commit hash."

echo "Building Docker images..."

docker build -t "$IMAGE_NAME:web-$VERSION" -t "$IMAGE_NAME:web-$COMMIT_HASH" Web || die "Failed to build Docker image for Web."
docker build -t "$IMAGE_NAME:api-$VERSION" -t "$IMAGE_NAME:api-$COMMIT_HASH" Backend/Janus.Api || die "Failed to build Docker image for Backend."

echo "Successfully built and tagged with $VERSION and $COMMIT_HASH."

