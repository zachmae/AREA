FROM cirrusci/flutter:latest

COPY . /app/mobile

WORKDIR /app/mobile

RUN flutter build apk --release

WORKDIR /app/shared

RUN cp /app/mobile/build/app/outputs/apk/release/app-release.apk .
