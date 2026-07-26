# QA Automation Portfolio — Vane Quintana

![Playwright](https://img.shields.io/badge/-Playwright-2EAD33?style=flat&logo=playwright&logoColor=white)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![GitHub Actions](https://img.shields.io/badge/-GitHub%20Actions-2088FF?style=flat&logo=github-actions&logoColor=white)

Portfolio de QA Automation Engineer. Vengo de QA manual y esto muestra mi transición hacia automatización: tests E2E de UI, tests de API, y los artefactos de QA manual (test plan, casos de prueba, bug reports) que sigo usando como base antes de automatizar.

> Reemplazar este badge por el real una vez conectado el repo a GitHub Actions:
> `[![Playwright Tests](https://github.com/<tu-usuario>/qa-automation-portfolio/actions/workflows/playwright.yml/badge.svg)](https://github.com/<tu-usuario>/qa-automation-portfolio/actions)`

## Qué demuestra este proyecto

| Habilidad | Cómo se ve en el repo |
|---|---|
| Automatización UI | `tests/ui/` — login, catálogo y checkout con Playwright, en dos apps distintas |
| Page Object Model | `pages/` — selectores y acciones separados de las aserciones |
| Automatización de API | `tests/api/` — ciclo completo CRUD + autenticación, en dos APIs distintas |
| UI + API conectadas de verdad | `tests/*/automation-exercise/` — misma app, mismo backend real (ver sección abajo) |
| CI/CD | `.github/workflows/playwright.yml` — corre toda la suite en cada push/PR |
| Proceso de QA manual | `manual-qa/` — test plan, casos de prueba y bug report de ejemplo |
| Reportes | Reporte HTML de Playwright con screenshots y video en fallos |

## Apps bajo prueba

Este repo tiene **dos proyectos** de automatización, elegidos a propósito para mostrar dos escenarios distintos que se dan en la vida real:

### 1. SauceDemo + Restful-Booker (UI y API separadas)

- **UI**: [saucedemo.com](https://www.saucedemo.com/) — app de e-commerce demo mantenida por Sauce Labs. Es una demo estática: no tiene backend propio, así que no hay ninguna API real para consultar lo que se compra en la UI.
- **API**: [Restful-Booker](https://restful-booker.herokuapp.com/apidoc/index.html) — API pública de prueba (sistema de reservas de hotel), sin relación con SauceDemo. Se usa como app de referencia para practicar API testing.
- El E2E de compra de esta app (`tests/ui/purchase-flow.spec.js`) incluye un chequeo de API **ilustrativo** contra Restful-Booker, documentado como tal en el código: sirve para mostrar el patrón de verificación backend de una orden, no para validar una compra real (porque esa compra real no tiene API).

### 2. Automation Exercise (UI + API conectadas de punta a punta)

- **App**: [automationexercise.com](https://automationexercise.com/) — tienda de ropa real pensada específicamente para practicar automatización, con UI completa (catálogo, carrito, login/signup, checkout con pago ficticio) y una **API REST real** en el mismo dominio (`/api/productsList`, `/api/createAccount`, etc.), documentada oficialmente en [automationexercise.com/api_list](https://automationexercise.com/api_list).
- A diferencia del proyecto anterior, acá la UI y la API comparten backend de verdad: una cuenta creada por API se puede usar para loguearse por la UI, y los productos que devuelve la API son los mismos que se ven en el catálogo.
- El E2E de compra (`tests/ui/automation-exercise/purchase-flow.spec.js`) aprovecha esto: crea la cuenta por API, compra por UI, y verifica que la dirección de envío del checkout coincida exactamente con los datos mandados al crear la cuenta. Es la prueba más fuerte de que ambas capas hablan con el mismo sistema.
- Los escenarios de este proyecto (UI y API) están basados en los [test cases](https://automationexercise.com/test_cases) y la [lista de APIs](https://automationexercise.com/api_list) que el propio sitio publica oficialmente para practicar.

## Estructura del repo

```
qa-automation-portfolio/
  .github/workflows/
    playwright.yml            Pipeline de CI (corre toda la suite)
  pages/                      Page Object Model
    LoginPage.js               SauceDemo
    InventoryPage.js           SauceDemo
    CheckoutPage.js            SauceDemo
    automation-exercise/       Automation Exercise
      AuthPage.js
      AccountInfoPage.js
      ProductsPage.js
      CartPage.js
      CheckoutPage.js
      PaymentPage.js
  tests/
    ui/                        Tests E2E de UI
      login.spec.js             SauceDemo
      inventory.spec.js         SauceDemo
      checkout.spec.js          SauceDemo
      purchase-flow.spec.js     SauceDemo (E2E + chequeo de API ilustrativo)
      automation-exercise/      Automation Exercise
        auth.spec.js
        cart.spec.js
        purchase-flow.spec.js    E2E real, UI + API conectadas
    api/                        Tests de API
      booking-api.spec.js       Restful-Booker
      automation-exercise/      Automation Exercise
        account-api.spec.js
        products-api.spec.js
    utils/
      automationExerciseAccount.js   Helper para crear/borrar cuentas de prueba por API
  manual-qa/                  Artefactos de QA manual
    test-plan.md
    test-cases.md
    bug-report-example.md
  playwright.config.js
  package.json
```

## Cómo correr los tests localmente

**Requisitos**: Node.js 18 o superior.

```bash
# Instalar dependencias
npm install

# Instalar los navegadores que usa Playwright
npx playwright install --with-deps

# Correr toda la suite (las dos apps, UI + API)
npm test

# Correr solo los tests de UI
npm run test:ui

# Correr solo los tests de API
npm run test:api

# Correr con el navegador visible (útil para debuggear)
npm run test:headed

# Ver el último reporte HTML generado
npm run report
```

## Decisiones de diseño

- **Page Object Model**: cada pantalla de la app tiene su propia clase con los selectores y las acciones posibles. Los archivos de test solo llaman a esos métodos y hacen las aserciones — si mañana cambia un selector en la app real, se arregla en un solo lugar.
- **`test.describe.serial()` en los tests de API**: los tests de booking y de cuentas dependen unos de otros (crear → leer → actualizar → borrar), así que se fuerza que corran en orden en vez de en paralelo. Está comentado en el código el porqué.
- **Selectores estables**: se priorizan atributos `data-test` / `data-qa` sobre clases CSS, porque son los que menos cambian cuando el diseño visual de una app se actualiza.
- **Cuentas de prueba por API, no por UI**: en Automation Exercise, los tests que necesitan un usuario logueado lo crean por API (`tests/utils/automationExerciseAccount.js`) en vez de completar el formulario de signup a mano. Es más rápido y no depende de que el formulario visual esté disponible. El formulario de signup por UI sí se prueba, pero en su propio test dedicado.
- **Bloqueo de anuncios en el signup por UI**: automationexercise.com es gratuita y muestra anuncios intersticiales de terceros — confirmamos explorando el sitio a mano que un anuncio llegó a tapar el botón "Create Account". El test de registro completo por UI bloquea esos dominios con `page.route()` antes de arrancar, para que la corrida no dependa de si un anuncio se cargó o no.
- **Emails únicos por corrida**: cada cuenta de prueba en Automation Exercise se crea con un email generado con timestamp + número random, para que corridas en paralelo (Chromium + Firefox, varios workers) nunca choquen entre sí.
- **Reportes con evidencia**: la config captura screenshot y video automáticamente solo cuando un test falla, para no generar archivos de más en corridas exitosas.

## Sobre mí

QA con experiencia en testing manual (funcional, regresión, exploratorio), en proceso de especialización en automatización con Playwright. Este repo es mi base de práctica y portfolio para postulaciones a roles de QA Automation.

📫 vanesaquintanaq@gmail.com
