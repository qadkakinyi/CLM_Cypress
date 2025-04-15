FROM cypress/included:13.7.3

WORKDIR /app

# Copy your project files into the container
COPY ./Release /app
COPY ./deployment/entry.sh /app  

# Install npm dependencies
RUN npm install

# Ensure entry.sh is executable
RUN chmod +x /app/entry.sh

# Set the entry point to the entry.sh script
ENTRYPOINT ["bash", "/app/entry.sh"]
