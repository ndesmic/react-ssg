React-SSG
=========

NextJS and Gatsby can be overkill, this is simple 20-line example of doing react static-site generation using [htm](https://github.com/developit/htm) instead of transpilation. The branch `preact` has a preact version as well.

How to use:

```
node renderers/htm-renderer.js
```

| Option | Description | Default |
|--------|-------------|---------|
| `-o`   | output directory name | "./output/" |
| `-t`   | template directory name | "./templates/" |

Files are exported using the same name to the output folder.  Files with preceeding `_` are partials and will not be exported.  You can use these for layouts and such.  This is designed to be an example you build on, it should be easy to hook up other CLI tools to render other assets.
