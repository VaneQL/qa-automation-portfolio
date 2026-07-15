# Plan de pruebas - SauceDemo (login, catalogo, checkout)

## 1. Objetivo
Validar las funcionalidades criticas del flujo de compra de SauceDemo: autenticacion, catalogo de productos y proceso de checkout, tanto por la interfaz (UI) como a nivel de API (Restful-Booker, usado como app de referencia para API testing).

## 2. Alcance

Dentro de alcance:
- Login (casos validos, invalidos, usuario bloqueado, campos vacios)
- Catalogo: agregar/quitar productos del carrito, ordenamiento
- Checkout: datos del comprador, validaciones, confirmacion de orden
- API de reservas: crear, leer, actualizar y borrar un recurso, con y sin autenticacion

Fuera de alcance:
- Pruebas de performance/carga
- Pruebas de seguridad exhaustivas (pentesting)
- Compatibilidad cross-browser completa (se prueba solo en Chromium y Firefox)

## 3. Estrategia
- Manual exploratorio: se uso primero para entender el comportamiento real de la app (por ejemplo, detectar que problem_user tiene bugs de UI intencionales).
- Automatizado: los casos regresivos y repetibles se automatizan con Playwright, para que corran en cada cambio via CI.
- Priorizacion: se automatizan primero los flujos "happy path" criticos para el negocio (login exitoso, compra completa) y luego los casos negativos mas relevantes.

## 4. Criterios de entrada
- Ambiente de prueba (saucedemo.com / restful-booker.herokuapp.com) accesible.
- Casos de prueba documentados y revisados.

## 5. Criterios de salida
- 100% de los casos criticos (prioridad alta) ejecutados.
- Sin bugs de severidad alta/critica abiertos sin justificacion documentada.
- Suite automatizada corriendo en verde en CI.

## 6. Riesgos

| Riesgo | Impacto | Mitigacion |
|---|---|---|
| App de demo externa cambia su comportamiento | Tests rotos sin causa real | Revisar changelog de la demo, usar selectores estables (data-test) |
| Tests "flaky" por tiempos de carga | Falsos negativos en CI | Uso de expect con auto-retry de Playwright, reintentos en CI |
| Datos de prueba compartidos entre corridas | Resultados inconsistentes en API | Cada test de API crea su propio recurso y lo limpia al final |

## 7. Entregables
- Este plan de pruebas
- Casos de prueba (test-cases.md)
- Reportes de ejecucion (HTML de Playwright)
- Bug report de ejemplo (bug-report-example.md)
