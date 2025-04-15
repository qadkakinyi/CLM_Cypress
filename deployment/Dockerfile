FROM cypress/included:13.7.3

WORKDIR /app

# Copy the entire project folder into /app (including package.json and node_modules)
COPY . /app

# Copy entry.sh from the deployment folder into /app
COPY ./deployment/entry.sh /app/entry.sh

# Install npm dependencies
RUN npm install

# Make sure entry.sh is executable
RUN chmod +x /app/entry.sh

# Set the entry point to the entry.sh script
ENTRYPOINT ["bash", "/app/entry.sh"]
