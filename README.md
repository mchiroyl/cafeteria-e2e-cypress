# Cafetería E2E — Sistema de Pedidos con Cypress

Aplicación full-stack con pruebas end-to-end automatizadas.

## Arquitectura

```
Browser (React/Vite :5173)
        │
        ▼
Backend (Express/Node :3000)
        │
        ▼
Base de Datos (PostgreSQL :5432)
```

## Estructura del proyecto

```
cafeteria-e2e-cypress/
├── backend/                  # API Node.js + Express + TypeScript
│   └── src/
│       ├── db/               # schema.sql, seed.sql, pool de conexión
│       └── routes/           # products, orders, test (reset)
├── frontend/                 # React + Vite + TypeScript
│   └── src/
│       ├── components/       # ProductList, Cart, OrderConfirmation
│       └── api.ts            # Funciones fetch hacia el backend
├── cypress/
│   ├── e2e/                  # happy-path, validation, controlled-failure
│   └── support/              # commands.ts (resetData), e2e.ts
└── .github/workflows/        # e2e.yml (CI con PostgreSQL service)
```

## Comandos

```bash
# Base de datos
psql $DATABASE_URL -f backend/src/db/schema.sql
psql $DATABASE_URL -f backend/src/db/seed.sql

# Backend
cd backend && npm ci && npm run dev

# Frontend
cd frontend && npm ci && npm run dev

# Cypress interactivo
npm run cy:open

# Cypress headless (CI)
npm run cy:run
```

## Estrategia de datos

Cada prueba llama `cy.resetData()` en `beforeEach`, que ejecuta
`POST /api/test/reset`. Este endpoint solo está activo con
`NODE_ENV=test` y corre el archivo `seed.sql`, restaurando los
5 productos originales y eliminando todas las órdenes previas.
Esto garantiza independencia total entre pruebas.

## Dependencias reales vs simuladas

| Llamada                        | Tipo     | Motivo                                       |
|--------------------------------|----------|----------------------------------------------|
| GET /api/products              | Real     | Verifica integración completa                |
| POST /api/orders (éxito)       | Real     | Verifica persistencia real en DB             |
| POST /api/orders (fallo 500)   | Simulada | Reproduce error sin contaminar datos         |
| POST /api/test/reset           | Real     | Mecanismo de seed para cada prueba           |

## Cypress vs Playwright vs Agent Browser

| Criterio              | Cypress                        | Playwright                        | Agent Browser                    |
|-----------------------|--------------------------------|-----------------------------------|----------------------------------|
| Mejor para            | SPAs, DX rápido, intercepción  | Multi-tab, multi-browser, OAuth   | Flujos no deterministas, scraping|
| cy.intercept nativo   | ✅ Sí                          | ✅ route.fulfill()                | ❌ No aplica                     |
| Ejecución en CI       | ✅ Excelente                   | ✅ Excelente                      | ⚠️ No recomendado                |
| Limitaciones          | Un solo tab/origen             | Más verboso para SPAs simples     | No determinista para QA formal   |

**Elegiría Playwright** para flujos con múltiples pestañas, autenticación
OAuth o pruebas cross-browser exhaustivas.
**Elegiría Agent Browser** solo para exploración o scraping, nunca para CI.

## Uso de IA

Claude (Anthropic) fue utilizado para estructurar los atributos
`data-cy`, revisar las aserciones de `cy.intercept()` y organizar
la estrategia de datos de prueba. Todas las pruebas fueron
revisadas, comprendidas e implementadas por el autor.
