FROM cypress/included:13.7.3

WORKDIR /app

# Copy the entire 'deployment' directory to /app in the container
COPY ./deployment /app

# Install npm dependencies
RUN npm install

# Run Cypress tests and generate reports directly in the Dockerfile
RUN npm run cypress:run && npm run mochawesome:merge

# Optional: If you want to keep the container running, you can use `tail -f /dev/null` to keep it alive
CMD ["tail", "-f", "/dev/null"]
