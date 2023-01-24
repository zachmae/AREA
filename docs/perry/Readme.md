# Area

# Technical Architecture

## Diagram
<img src="assets/Area%20Technical%20Architecture%20(2).png" alt="LucidChart representation of technical architecture" width="1000"/>

and to build our project like the picture we will use this repository architecture.

# Repositories

```js
back/
    api-gateway/
        (app.js)
        (.gitignore)
        router/
            routes/
                (example.js)
            controllers/ //services
                (example.js)
            protos/
                (example.proto)
    services/
        example/
            (server.[js,py,..])
            (.gitignore)
            protos/
                (example.proto)
    api-hooker/ //redirect the request to the right service
        (app.js)
        router/
            routes/
                (example.js)
            controllers/ //services
                (example.js)
            protos/
                (example.proto)
    databases/


mobile/
    ???

web/
    ???

docs/
    perry/
        assets/
            (img.png[])
        SETUP.MD
        README.MD
    ???/
README.md (link to docs/README.MD)
```