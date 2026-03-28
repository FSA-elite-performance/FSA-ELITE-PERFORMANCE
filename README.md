# FSA Elite Performance

Official repository for FSAElitePerformance.com.
High-performance training, development, and elite optimization platform.

---

## Overview

FSA Elite Performance is a full-scale digital platform designed to deliver advanced performance training, athlete development systems, and structured optimization programs.

This repository contains source code, assets, branding elements, and deployment configurations required to run and scale the application.

---

## Features

- Elite performance training systems
- Data-driven athlete tracking
- Mental and physical optimization modules
- Fully responsive web application
- Integrated branding, logos, and UI assets
- Optimized for fast deployment and scalability

---

## Tech Stack

- Frontend: React / Next.js (Pages Router)
- Backend: Node.js / Next.js API routes
- Styling: Global CSS / Custom UI
- Deployment: Vercel (recommended), static export support
- Version Control: Git + GitHub

---

## Project Structure

```text
next-app/
	pages/
	pages/api/
	styles/
	lib/
	public/
	next.config.js
README.md
```

---

## Branding and Assets

Official FSA Elite Performance visual assets are stored in:

```text
next-app/public/
```

Use branding consistently across all pages and components.

---

## Installation and Setup

```bash
# Clone repository
git clone https://github.com/yourusername/fsa-elite-performance.git

# Navigate into project root
cd fsa-elite-performance

# Install dependencies
cd next-app
npm ci

# Configure environment
cp .env.example .env.local

# Run development server
npm run dev
```

The app runs at `http://localhost:3000`.

---

## Deployment

This app is optimized for modern deployment platforms:

- Vercel (recommended)
- Static export hosting (with API limitations)
- Cloud hosting

Build commands (run from `next-app/`):

```bash
npm run build
NEXT_EXPORT=1 npm run build
```

---

## Environment Variables

Create `.env.local` in `next-app/` and include required values documented in `next-app/.env.example`:

```env
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_BASE_URL=
OPENAI_API_KEY=
STRIPE_TRAINING_PRICE_ID=
```

---

## Vision

FSA Elite Performance is built to become a premier digital ecosystem for elite training, performance tracking, and next-level athlete development.

---

## Espanol

### Descripcion General

FSA Elite Performance es una plataforma digital disenada para ofrecer entrenamiento de alto rendimiento, desarrollo de atletas y sistemas avanzados de optimizacion.

Este repositorio contiene el codigo fuente, recursos visuales y configuraciones necesarias para ejecutar y escalar la aplicacion.

### Funcionalidades

- Sistemas de entrenamiento de elite
- Seguimiento de rendimiento basado en datos
- Optimizacion mental y fisica
- Aplicacion web totalmente adaptable
- Integracion completa de marca y diseno
- Alto rendimiento y escalabilidad

### Instalacion

```bash
git clone https://github.com/yourusername/fsa-elite-performance.git
cd fsa-elite-performance/next-app
npm ci
cp .env.example .env.local
npm run dev
```

### Despliegue

Compatible con:

- Vercel (recomendado)
- Static export hosting
- Servicios en la nube

### Vision

FSA Elite Performance esta disenado para convertirse en una plataforma lider en entrenamiento, rendimiento y desarrollo de atletas de alto nivel.

---

## License

MIT License

---

## Contribution

Pull requests are welcome. For major changes, open an issue first to discuss the proposal.

---

## Live Site

https://fsaeliteperformance.com
