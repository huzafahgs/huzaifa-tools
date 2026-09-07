import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { createRequire } from 'node:module';

// Publish PDF.js's optional font/codec resources locally; never fetch document data from a CDN.
export function pdfjsAssets() {
  const root = dirname(createRequire(import.meta.url).resolve('pdfjs-dist/package.json'));
  const assets = new Map();
  for (const folder of ['cmaps','standard_fonts','wasm']) {
    for (const file of readdirSync(join(root,folder), { withFileTypes:true })) {
      if (file.isFile()) assets.set(`pdfjs/${folder}/${file.name}`, join(root,folder,file.name));
    }
  }
  return {
    name:'local-pdfjs-assets',
    generateBundle() { for (const [fileName,path] of assets) this.emitFile({ type:'asset', fileName, source:readFileSync(path) }); },
    configureServer(server) {
      server.middlewares.use((req,res,next) => {
        const name = (req.url || '').split('?')[0].replace(/^\//,'');
        const path = assets.get(name);
        if (!path) return next();
        res.setHeader('Content-Type', name.endsWith('.wasm') ? 'application/wasm' : name.endsWith('.js') ? 'text/javascript' : 'application/octet-stream');
        res.end(readFileSync(path));
      });
    }
  };
}
