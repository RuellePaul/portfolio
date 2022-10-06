FROM node:16.16-alpine3.16

WORKDIR /ui

# ==== Arg section ====
# System args
ARG ENVIRONMENT

# ==== Env section ====
# System env
ENV ENVIRONMENT=$ENVIRONMENT

ENV PATH /node_modules/.bin:$PATH

COPY . /

RUN yarn add package.json
RUN yarn run build

CMD yarn run preview
