FROM ubuntu:trusty
MAINTAINER Hoonio <hoonio@hoonio.com>

# Prevent dpkg errors
ENV TERM=xterm-256color

# Set mirrors to UK
# RUN sed -i "s/http:\/\/archive./http:\/\/uk.archive./g" /etc/apt/sources.list

# Install Ansible
RUN apt-get update -qy && \
    apt-get install -qy software-properties-common && \
    apt-add-repository -y ppa:ansible/ansible && \
    apt-get update -qy && \
    apt-get install -qy ansible

# Copy baked in playbooks
COPY playbooks /ansible

# Add volume for Ansible playbooks
VOLUME /ansible
WORKDIR /ansible

# Entrypoint
ENTRYPOINT ["ansible-playbook"]
CMD ["probe.yml"]
