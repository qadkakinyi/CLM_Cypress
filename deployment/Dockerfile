FROM cypress/included:13.7.3

WORKDIR /app
COPY . /app

# Copy entry.sh from the deployment folder into /app => important
COPY ./deployment/entry.sh /app/entry.sh

# Install npm dependencies
RUN npm install

# Make sure entry.sh is executable => important
RUN chmod +x /app/entry.sh

# Set the entry point to the entry.sh script
ENTRYPOINT ["bash", "/app/entry.sh"]
