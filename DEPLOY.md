# Deployment

This project is a static Vite site. In production, the repository lives under `/projects`, GitHub Actions SSHs into the server, pulls the latest code, builds `dist/`, and Nginx serves that `dist/` directory.

## GitHub Actions Secrets

Add these repository secrets in GitHub:

- `DEPLOY_HOST`: server IP or domain, for example `1.2.3.4`
- `DEPLOY_USER`: SSH user, for example `root` or `deploy`
- `DEPLOY_PORT`: SSH port, usually `22`
- `PROJECT_PATH`: repository path on the server, for example `/projects/ai-projects-official`
- `DEPLOY_SSH_KEY`: private key used by GitHub Actions to SSH into the server

The matching public key for `DEPLOY_SSH_KEY` must be added to the server user's `~/.ssh/authorized_keys`.

## Server Nginx

Copy `deploy/nginx-ai-projects-official.conf` to the server's Nginx site config directory, then update:

- `server_name`
- `root`

Example:

```nginx
server {
    listen 80;
    server_name stackfield.org www.stackfield.org;

    root /projects/ai-projects-official/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /assets/ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location /media/ {
        expires 30d;
        add_header Cache-Control "public";
    }
}
```

After enabling the site:

```bash
nginx -t
systemctl reload nginx
```

## Trigger

Every push to `main` runs:

```bash
cd $PROJECT_PATH
git pull --ff-only origin main
npm ci
npm run build
```

You can also trigger it manually from GitHub Actions with `workflow_dispatch`.
