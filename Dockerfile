# pull official base image
FROM public.ecr.aws/docker/library/node:14.19.1-alpine as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN apk add git
RUN yarn
COPY . ./
RUN yarn build

FROM public.ecr.aws/docker/library/nginx:stable-perl
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]