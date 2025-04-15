FROM cypress/included:13.7.3
WORKDIR /app
COPY ./Release /app
RUN npm install
ENTRYPOINT ["bash","entry.sh"]