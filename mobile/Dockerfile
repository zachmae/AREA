FROM cirrusci/flutter:latest

COPY . /app/mobile

WORKDIR /app/mobile

RUN flutter build apk --release

RUN cp build/app/outputs/apk/release/app-release-unsigned.apk /app/shared
