# Application and service for Køreskoleoversigten 

## Technology used
* [Polymer](https://github.com/Polymer/polymer)
* [node.js](https://github.com/nodejs)
* [Viabill](https://viabill.dk/)
* Kubernetes
* Docker


## Up and running
Change the path in "work/cmd/filechange.bat" to match tour file path to get auto reloading to work in the development

For more devsetup, see https://github.com/benjaco/nodejs-docker-debugging

## Building and running example 
`docker build -f dev.Dockerfile -t kson . && docker run -v $PWD/server:/usr/src/app/server --rm -d -p 8080:80 -p 9229:9229 -p 9222:9222 --name backend kson`
 