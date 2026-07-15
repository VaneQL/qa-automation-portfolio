# QA Automation Portfolio - Vane Quintana

Portfolio de QA Automation Engineer. Vengo de QA manual y esto muestra mi transicion hacia automatizacion: tests E2E de UI, tests de API, y los artefactos de QA manual (test plan, casos de prueba, bug reports) que sigo usando como base antes de automatizar.

## Que demuestra este proyecto

| Habilidad | Como se ve en el repo |
|---|---|
| Automatizacion UI | tests/ui/ - login, catalogo y checkout con Playwright |
| Page Object Model | pages/ - selectores y acciones separados de las aserciones |
| Automatizacion de API | tests/api/ - ciclo completo CRUD + autenticacion con Restful-Booker |
| CI/CD | .github/workflows/playwright.yml - corre toda la suite en cada push/PR |
| Proceso de QA manual | manual-qa/ - test plan, casos de prueba y bug report de ejemplo |
| Reportes | Reporte HTML de Playwright con screenshots y video en fallos |

## Apps bajo prueba

- UI: saucedemo.com - app de e-commerce demo mantenida por Sauce Labs, pensada especificamente para practicar automatizacion.
- API: Restful-Booker (restful-booker.herokuapp.com) - API publica de prueba (sistema de reservas de hotel), sin necesidad de signup ni API key.

## Estructura del repo

```
qa-automation-portfolio/
  .github/workflows/
      playwright.yml       (Pipeline de CI)
        pages/                 (Page Object Model)
            LoginPage.js
                InventoryPage.js
                    CheckoutPage.js
                      tests/
                          ui/                  (Tests E2E: login, catalogo, checkout)
                              api/                 (Tests de API: Restful-Booker)
                                manual-qa/             (Artefactos de QA manual)
                                    test-plan.md
                                        test-cases.md
                                            bug-report-example.md
                                              playwright.config.js
                                                package.json
                                                ```

                                                ## Como correr los tests localmente

                                                Requisitos: Node.js 18 o superior.

                                                ```bash
                                                # Instalar dependencias
                                                npm install

                                                # Instalar los navegadores que usa Playwright
                                                npx playwright install --with-deps

                                                # Correr toda la suite (UI + API)
                                                npm test

                                                # Correr solo los tests de UI
                                                npm run test:ui

                                                # Correr solo los tests de API
                                                npm run test:api

                                                # Correr con el navegador visible (util para debuggear)
                                                npm run test:headed

                                                # Ver el ultimo reporte HTML generado
                                                npm run report
                                                ```

                                                ## Decisiones de diseno

                                                - Page Object Model: cada pantalla de la app tiene su propia clase con los selectores y las acciones posibles.
                                                - test.describe.serial() en los tests de API: los tests de booking dependen unos de otros (crear, leer, actualizar, borrar), asi que se fuerza que corran en orden.
                                                - Selectores estables: se priorizan atributos data-test sobre clases CSS.
                                                - Reportes con evidencia: la config captura screenshot y video automaticamente solo cuando un test falla.

                                                ## Sobre mi

                                                QA con experiencia en testing manual (funcional, regresion, exploratorio), en proceso de especializacion en automatizacion con Playwright. Este repo es mi base de practica y portfolio para postulaciones a roles de QA Automation.

                                                vanesaquintanaq@gmail.com
                                                
