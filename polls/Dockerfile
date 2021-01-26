# FROM debian:buster

# MAINTAINER Liu Chong <mail@clojure.cn>

# WORKDIR /root

# # common packages
# RUN apt-get update && \
#     apt-get install --no-install-recommends -y \
#     ca-certificates curl file \
#     build-essential \
#     autoconf automake autotools-dev libtool xutils-dev && \
#     rm -rf /var/lib/apt/lists/*

# ENV SSL_VERSION=1.0.2u

# RUN curl https://www.openssl.org/source/openssl-$SSL_VERSION.tar.gz -O && \
#     tar -xzf openssl-$SSL_VERSION.tar.gz && \
#     cd openssl-$SSL_VERSION && ./config && make depend && make install && \
#     cd .. && rm -rf openssl-$SSL_VERSION*

# ENV OPENSSL_LIB_DIR=/usr/local/ssl/lib \
#     OPENSSL_INCLUDE_DIR=/usr/local/ssl/include \
#     OPENSSL_STATIC=1

# # install all 3 toolchains
# RUN curl https://sh.rustup.rs -sSf | \
#     sh -s -- --default-toolchain stable -y && \
#     /root/.cargo/bin/rustup update beta && \
#     /root/.cargo/bin/rustup update nightly

# ENV PATH=/root/.cargo/bin:$PATH

FROM liuchong/rustup

ENV ROCKET_ADDRESS=0.0.0.0
# ENV ROCKET_PORT=8000
RUN rustup default nightly

WORKDIR /usr/src

# Create blank project
RUN USER=root cargo new PROJ

# We want dependencies cached, so copy those first.
COPY Cargo.toml /usr/src/PROJ/
COPY Cargo.lock /usr/src/PROJ/

WORKDIR /usr/src/PROJ

RUN cargo build --release

COPY src /usr/src/PROJ/src

RUN cargo build --release
RUN mv /usr/src/PROJ/target/x86_64-unknown-linux-musl/release/app /bin 
RUN rm -rf /usr/src/PROJ

# CMD ["tail", "-f", "/dev/null"]
EXPOSE 8000
WORKDIR /
CMD [ "/bin/app" ]