FROM node:18.14.0-buster

LABEL maintainer="Roman Gonzalez <roman.gonzalez.ea@gmail.com>"

ARG USERNAME=node
RUN set -eux; \
  \
  apt-get update; \
  apt-get install -y --no-install-recommends \
    sudo=1.8.27-1+deb10u3 && \
  echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME && \
  chmod 0440 /etc/sudoers.d/$USERNAME && \
  rm -rf /var/lib/apt/lists/*

ENV HOME /home/${USERNAME}

RUN mkdir -p \
      /home/$USERNAME/.vscode-server/extensions \
      /home/$USERNAME/.vscode-server-insiders/extensions && \
    chown -R $USERNAME \
      /home/$USERNAME/.vscode-server \
      /home/$USERNAME/.vscode-server-insiders

CMD [ "sleep", "infinity"]
