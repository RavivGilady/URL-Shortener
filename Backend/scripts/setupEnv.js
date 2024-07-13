const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../');
const exampleDir = path.resolve(rootDir,'example_env/');

const envFiles = [
    { example: '.env.example', target: '.env' },
    { example: '.env.test.example', target: '.env.test' }
];

envFiles.forEach(({ example, target }) => {
    const examplePath = path.resolve(exampleDir, example);
    const targetPath = path.resolve(rootDir, target);

    if (!fs.existsSync(targetPath)) {
        console.log(`${target} is missing. Creating from ${example}...`);
        fs.copyFileSync(examplePath, targetPath);
        console.log(`${target} has been created.`);
    } else {
        console.log(`${target} already exists. Skipping.`);
    }
});
