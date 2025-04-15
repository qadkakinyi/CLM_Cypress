FROM cypress/included:13.7.3

# Set the working directory inside the container
WORKDIR /app

# Copy the contents of the 'deployment' folder into /app in the container
COPY ./deployment /app

# Ensure entry.sh has executable permissions
RUN chmod +x /app/entry.sh

# Install npm dependencies
RUN npm install

# Set the entry point to the entry.sh script
ENTRYPOINT ["bash", "/app/entry.sh"]
