## Installation

Install this project bun

```bash
  git clone https://github.com/IlhamSetiaji/uni-voucher.git
  cd uni-voucher
  cp .env.example .env
  bun install
```

To migrate the database schema

```bash
  bunx prisma db push
  bunx prisma generate
```

to run this project

```bash
  bun run dev
```
