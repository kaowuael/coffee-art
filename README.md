# coffee.art – monorepo

Struktura:
- bc/      – rozszerzenie Business Central (AL)
- backend/ – backend API (Node.js)
- web/     – frontend (Next.js)
- docker/  – konfiguracje docker-compose do deploymentu na VPS

Docelowy workflow na VPS:

git pull
docker compose up -d
