FROM cypress/included:13.7.3

WORKDIR /app

# Copy the entry.sh script from deployment folder to /app
COPY ./deployment/entry.sh /app/entry.sh

# Install npm dependencies
RUN npm install

# Make sure entry.sh is executable
RUN chmod +x /app/entry.sh

# Set the entry point to the entry.sh script
ENTRYPOINT ["bash", "/app/entry.sh"]
