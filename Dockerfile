# Usamos el archivo de Ruby base
FROM ruby:3.3.5 AS base

WORKDIR /rails

# Instala dependencias necesarias para Ruby, PostgreSQL, Node.js y Yarn
RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends \
    curl \
    build-essential \
    libvips \
    libffi-dev \
    libssl-dev \
    zlib1g-dev \
    postgresql-client \
    postgresql \
    libpq-dev \
    nodejs \
    npm && \
    npm install -g yarn && \
    rm -rf /var/lib/apt/lists/* /var/cache/apt/archives/*

# Instalamos Node.js usando la versión especificada
ARG NODE_VERSION=20.11.1
ENV PATH=/usr/local/node/bin:$PATH
RUN curl -sL https://github.com/nodenv/node-build/archive/master.tar.gz | tar xz -C /tmp/ && \
    /tmp/node-build-master/bin/node-build "${NODE_VERSION}" /usr/local/node && \
    npm install -g yarn && \
    rm -rf /tmp/node-build-master

# Copia el Gemfile y Gemfile.lock para instalar las dependencias de Ruby
COPY Gemfile Gemfile.lock ./

# Configuramos Bundler y luego instalamos las dependencias
RUN bundle config set deployment 'true' && bundle config set path 'vendor/bundle' && \
    bundle install --verbose

# Copia el package.json y yarn.lock para instalar las dependencias de JavaScript
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copia todos los archivos de la aplicación al contenedor
COPY . ./

# Precompila los activos de Rails
RUN bundle exec rails assets:precompile

# Usa un usuario no root para mayor seguridad
RUN groupadd --system --gid 1000 rails && \
    useradd rails --uid 1000 --gid 1000 --create-home --shell /bin/bash && \
    chown -R rails:rails db log storage tmp

USER rails

# Expone el puerto 3000 para la aplicación
EXPOSE 3000

# Inicia el servidor de Rails
CMD ["./bin/rails", "server", "-b", "0.0.0.0"]
