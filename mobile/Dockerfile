FROM cirrusci/flutter:latest

COPY . /app

WORKDIR /app

RUN flutter build apk --release

RUN cp build/app/outputs/apk/release/app-release.apk /app/shared
