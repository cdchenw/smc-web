FROM node AS builder
# set working directory
WORKDIR /app

# install and cache app dependencies
COPY . /app

# install dependencies and build the angular app
RUN npm install && npm run build

FROM nginx:stable-alpine

# copy from dist to nginx root dir
COPY --from=builder /app/dist/smc-web /usr/share/nginx/html

# expose port 80
EXPOSE 80

# set author info
LABEL maintainer="vg <10594559@qq.com>"

# run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]