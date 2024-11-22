# Contribute to the Codebase

- Clone the repository
- install dependency with `npm install`
- build the packages with `npm run build`

```cmd
[in pdfme dir] $ npm install
[in pdfme dir] $ npm run build
```

At this point, to check if the build is done correctly, let's execute `npm run test` once. This will call the test suites for each package.

```cmd
[in pdfme dir] $ npm run test
```

Then, run `npm run dev` on `packages/common`, `packages/schemas`, `packages/generator`, and `packages/ui`,
and make sure that any changes are output to each packages `dist` folder.

```cmd
[in pdfme/packages/common dir] $ npm run dev
[in pdfme/packages/schemas dir] $ npm run dev
[in pdfme/packages/ui dir] $ npm run dev
[in pdfme/packages/generator dir] $ npm run dev
```

If you want to check the changes in the browser, go to `playground`.

```cmd
[in pdfme/playground dir] $ npm install
[in pdfme/playground dir] $ npm run dev
```

If `npm run dev` is running in each package, changes made will be reflected in the playground. (For the UI package, it may take about 5-10 seconds for the changes to be reflected.)

Please feel free to send a PR if you can fix bugs or add new features. Also, don't forget to add the necessary tests before sending a PR and make sure that the tests pass.

Happy hacking!


1. Configure Workspaces
Ensure each workspace has its own properly scoped name and configuration in package.json. For example:

packages/common/package.json
json
Copy code
{
  "name": "@dsapdfme/common",
  "version": "6.6.6",
  "main": "dist/index.js",
  "files": ["dist", "README.md"],
  "author": "8an3",
  "license": "MIT"
}
packages/schemas/package.json
json
Copy code
{
  "name": "@dsapdfme/schemas",
  "version": "6.6.6",
  "main": "dist/index.js",
  "files": ["dist", "README.md"],
  "author": "8an3",
  "license": "MIT"
}
packages/generator/package.json
json
Copy code
{
  "name": "@dsapdfme/generator",
  "version": "6.6.6",
  "main": "dist/index.js",
  "files": ["dist", "README.md"],
  "author": "8an3",
  "license": "MIT"
}
packages/ui/package.json
json
Copy code
{
  "name": "@dsapdfme/ui",
  "version": "6.6.6",
  "main": "dist/index.js",
  "files": ["dist", "README.md"],
  "author": "8an3",
  "license": "MIT"
}
2. Verify Repository and Metadata
In your root package.json, the repository field should reference the main repository, while each workspace's package.json can optionally include repository fields specific to their submodules (if necessary).

For the root:

json
Copy code
"repository": {
  "type": "git",
  "url": "https://github.com/8an3/dsapdfme-6.6.6.git"
}
For workspaces:

json
Copy code
"repository": {
  "type": "git",
  "url": "https://github.com/8an3/dsapdfme-6.6.6.git",
  "directory": "packages/common"
}
3. Build and Prepare the Workspaces
Run npm run build (or equivalent) in each workspace to generate the dist directory (or wherever your compiled output goes). If you don’t already have a build script, add one to each workspace package.json:

json
Copy code
"scripts": {
  "build": "tsc" // or your build command
}
Then build everything:

bash
Copy code
npm install
npm run build --workspaces
4. Publish Each Package
Publish each workspace individually from its directory:

Publishing Scoped Packages
Scoped packages default to private. To publish as public:

bash
Copy code
cd packages/common
npm publish --access=public

cd ../schemas
npm publish --access=public

cd ../generator
npm publish --access=public

cd ../ui
npm publish --access=public
5. Troubleshooting Scoped Packages
If you see errors like Scope not found, ensure:
You are logged into npm with the correct account:
bash
Copy code
npm login
The scope @dsapdfme is linked to your npm account or organization:
Log in to npm.
Verify that the @dsapdfme scope is under your account or organization.
6. Verify Published Packages
Once published, test your packages:

bash
Copy code
npm install @dsapdfme/common
npm install @dsapdfme/schemas
npm install @dsapdfme/generator
npm install @dsapdfme/ui
