import { defineConfig } from "deloyn";

export default defineConfig({
  serverIp: "1.2.3.4",
  username: "ubuntu",
  remotePath: "/proje",
  sshKey: "~/.ssh/id_rsa",
  excluded: [".git", "node_modules", "dist", "README.md", ".next"],
  batchSize: 5,
  localPath: process.cwd(),
  scripts: [
    "npm install",
    "npm run build",
    "npm run prod:db:deploy",
    "pm2 reload proje || pm2 start ecosystem.config.cjs --only proje", // projeyi restart attırıyorum veya bu projenin dizinindeki ecosystem.config.cjs'i kullanarak projeyi ayağa kaldırıyorum eğer proje diye bir şey yoksa.
  ],
});
