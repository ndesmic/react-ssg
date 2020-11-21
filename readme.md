React-SSG
=========

NextJS and Gatsby can be overkill, this is simple 20-line example of doing react static-site generation using [htm](https://github.com/developit/htm) instead of transpilation.

## How to use:

Included are two flavors, react and preact.  While both are included, if you use this as a base you'll probably only want to use one (and I'd recommend Preact because it's much smaller).

```
node renderers/htm-react-renderer.js
```
or
```
node renderers/htm-preact-renderer.js
```

| Option | Description | Default |
|--------|-------------|---------|
| `-o`   | output directory name | "./output/" |
| `-t`   | template directory name | "./templates/" |

Files are exported using the same name to the output folder.  Files with preceeding `_` are partials and will not be exported.  You can use these for layouts and such.  Path for folders must end with `/`.

This is designed to be an example you build on, it should be easy to hook up other CLI tools to render other assets.
