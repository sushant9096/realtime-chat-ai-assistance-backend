FROM node:16
COPY . /app
WORKDIR /app
RUN npm ci
CMD ["/bin/bash", "-c", "ls && npm run start"]