## Installation

Install this project bun

```bash
  git clone https://github.com/rijal-hafizhun-hidayat/rumahweb-app.git
  cd rumahweb-app
  bun install
```

to run this project

```bash
  bun run dev
```

structure code
-public: this folder to store asset static like css, js, image, or vide
-node_module: this file is to descripe all package that used in app
-src: this folder is store all source code such as component, view, route and other stuff
-postcss.config.js: this is for configuation of postcss
-tailwind.config.js: this is for configuration of tailwind css
-tsconfig.json: this is for configuration of typescript
-vite.config.ts: this is form configuration of vite

flow code
-access index.html
-index.html call main.ts to call use vue file
-main.ts mount all package like pinia, route and other
-and mount with using id "#app"
-route will access all view according to url file of view and call it using object of name
