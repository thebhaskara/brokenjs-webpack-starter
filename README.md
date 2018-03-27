# brokenjs-webpack-starter
A starter repo with all the dependencies included with brokenjs and webpack

## Steps to setup

step 1:
install all dependencies by using following commands
```
cd /path/to/this/repo/
npm install
```

step 2:
clone the repositories
```
cd modules
git clone https://github.com/thebhaskara/brokenjs.git
git clone https://github.com/thebhaskara/broken-styles.git
cd ..
```

step 3:
run the following commands when `webpack`, `webpack-dev-server` and `gulp` commands don't work on cli
```
npm install -g webpack webpack-dev-server gulp
```

## Development
start the application by using command `webpack-dev-server`.
this starts the application on http://localhost:8080

Also compilation can manually be done by running `webpack` command
