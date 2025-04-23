#!/bin/sh

# Run Cypress tests
npm run cypress:run

# Optionally run a specific test suite (if needed)
# npm run cypress:run-specific

# Merge Mochawesome reports
npm run mochawesome:merge

echo "Test Execution Completed"

# Keep the container running if needed
# tail -f /dev/null
