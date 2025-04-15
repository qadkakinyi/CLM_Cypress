FROM cypress/included:13.7.3

WORKDIR /app

# Copy the entire project folder (including package.json) into /app
COPY . /app

# Install npm dependencies
RUN npm install

# Make sure entry.sh is executable
RUN chmod +x /app/entry.sh

# Set the entry point to the entry.sh script
ENTRYPOINT ["bash", "/app/entry.sh"]
