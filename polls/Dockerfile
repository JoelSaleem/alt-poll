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