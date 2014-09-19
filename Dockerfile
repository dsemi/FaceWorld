FROM phusion/baseimage:0.9.13

# Environment variables
ENV DEBIAN_FRONTEND noninteractive
ENV LC_ALL en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8
ENV OPTS_APT -y --force-yes --no-install-recommends
ENV CABVER 1.20
ENV GHCVER 7.8.3

# Add Haskell repos
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys F6F88286\
    && echo 'deb http://ppa.launchpad.net/hvr/ghc/ubuntu trusty main' >> /etc/apt/sources.list.d/haskell.list\
   && echo 'deb-src http://ppa.launchpad.net/hvr/ghc/ubuntu trusty main' >> /etc/apt/sources.list.d/haskell.list

# Install all needed packages
RUN apt-get update\
    && apt-get install ${OPTS_APT} gcc libc6 libc6-dev libgmp10 libgmp-dev libncursesw5\
                                   libtinfo5 zlib1g-dev rsync llvm\
                                   cabal-install-${CABVER} ghc-${GHCVER}\
                                   nodejs npm

# Add new Haskell binaries to PATH
ENV PATH /opt/ghc/${GHCVER}/bin:/opt/cabal/${CABVER}/bin:$PATH

ADD . /src

WORKDIR /src

# Update cabal
RUN cabal update

RUN cabal sandbox init
RUN cabal install --dependencies-only
RUN cabal configure && cabal build

RUN cd build; ./build.sh
RUN rsync -a bin/* .

EXPOSE 3000

CMD ["./dist/build/FaceWorld/FaceWorld"]