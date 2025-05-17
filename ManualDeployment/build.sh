version="v.1.0.4"
folder_path="Release"

if [ -d "$folder_path" ]; then
    # If it exists, delete it
    rm -rf "$folder_path"
    echo "Folder deleted."
else
    # If it does not exist, print a message
    echo "Folder does not exist."
fi

mkdir Release
cp -r ../cypress ./Release/
cp ../cypress.config.ts ./Release/
cp ../package.json ./Release
cp entry.sh ./Release
rm -rf ./Release/cypress/results

docker image rm -f clm-cypress:"$version"
docker build -t clm-cypress:"$version" .