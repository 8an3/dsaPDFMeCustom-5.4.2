npm publish --access=public
cd packages

for dir in $(ls -d */); do
    cd "$dir"
    npm publish --access=public
    cd ..
done