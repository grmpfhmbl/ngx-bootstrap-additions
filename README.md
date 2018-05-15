# Angular-cli seed for ngx-bootstrap

This seed uses [ngx-bootstrap](https://valor-software.com/ngx-bootstrap/) and adds some nice stuff like
BUILD_NUMBER and VERSION.

**FIND ALL ngx-bootstrap-seed in config files and replace with you project name**

Production build (on Linux / OSX) with (on Windows you have to look up how to set ENV to timestamp)

```
$ TIMESTAMP=`date -u +"%Y%m%d%H%M%S"` npm run build:prod
```

**TODO** remove rxjs-compat as soon as ngx-bootrap [fixes this](https://github.com/valor-software/ngx-bootstrap/issues/4308)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.1.

Build up on following resources
- https://github.com/valor-software/ngx-bootstrap/blob/development/docs/getting-started/bootstrap.md
- https://stackoverflow.com/questions/34907682/how-to-display-app-version-in-angular2
- https://stackoverflow.com/questions/41733660/how-to-insert-a-build-number-or-timestamp-at-build-time-in-angularcli
- https://github.com/angular/angular-cli/issues/4318#issuecomment-318359461

Starting little webserver to test the final prod-build

```
$ cd dist/<project-name>
$ python -m SimpleHTTPServer 8000   ## python 2.x
$ python -m http.server 8000        ## python 3.x and later
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
