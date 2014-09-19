FROM ubuntu:14.04

RUN apt-get update

RUN apt-get install -y build-essential libedit2 libglu1-mesa-dev libgmp3-dev zlib1g-dev freeglut3-dev wget

# Download GHC
RUN wget -q http://www.haskell.org/ghc/dist/7.8.3/ghc-7.8.3-x86_64-unknown-linux-deb7.tar.xz
RUN tar xf ghc-7.8.3-x86_64-unknown-linux-deb7.tar.xz
RUN rm ghc-7.8.3-x86_64-unknown-linux-deb7.tar.xz

# Build and install GHC
RUN cd ghc-7.8.3; ./configure && make install

RUN cd ..; rm -r ghc-7.8.3

RUN apt-get install -y cabal-install

# Update cabal
RUN cabal update
RUN cabal install cabal-install

ADD . /src

EXPOSE 3000

RUN cd /src; cabal sandbox init

RUN cabal install --dependencies-only

RUN cabal configure; cabal build

CMD ["./dist/build/FaceWorld/FaceWorld"]