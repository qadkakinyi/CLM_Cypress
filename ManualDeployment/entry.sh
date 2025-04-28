#bin/sh

npm run cypress:run
#npm run cypress:run-specific
npm run mochawesome:merge

echo "Test Execution Completed"

#tail -f /dev/null