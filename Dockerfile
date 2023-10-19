FROM lukechannings/deno:v1.37.2

USER deno
WORKDIR /app
ADD . /app
RUN deno cache src/deps.ts && deno cache src/main.ts

CMD ["run", "--allow-env", "--allow-net", "src/main.ts"]