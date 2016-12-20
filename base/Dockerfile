FROM ubuntu:trusty
MAINTAINER Hoonio <hoonio@hoonio.com>

ENV TERM=xterm-256color

RUN sed -i "s/http:\/\/archive./http:\/\/uk.archive./g" /etc/apt/sources.list

RUN apt-get update && \
    apt-get install -y \
    -o APT::Install-Recommend=false -o APT::Install-Suggests=false \
    python python-virtualenv

RUN virtualenv /appenv && \
    . /appenv/bin/activate && \
    pip install pip --upgrade

ADD scripts/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
