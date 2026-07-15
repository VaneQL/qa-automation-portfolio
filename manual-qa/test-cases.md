# Casos de prueba - Login, Catalogo y Checkout

Formato: ID | Titulo | Precondicion | Pasos | Resultado esperado | Prioridad | Automatizado

## Login

| ID | Titulo | Precondicion | Pasos | Resultado esperado | Prioridad | Automatizado |
|---|---|---|---|---|---|---|
| LOGIN-01 | Login exitoso con usuario valido | Ninguna | 1. Ir a saucedemo.com 2. Ingresar standard_user / secret_sauce 3. Click en Login | Redirige a /inventory.html y muestra el titulo "Products" | Alta | Si |
| LOGIN-02 | Login bloqueado para usuario locked_out_user | Ninguna | 1. Ingresar locked_out_user / secret_sauce 2. Click en Login | Muestra mensaje de error indicando que el usuario esta bloqueado | Alta | Si |
| LOGIN-03 | Login con contrasena incorrecta | Ninguna | 1. Ingresar standard_user / contrasena invalida 2. Click en Login | Mensaje: "Username and password do not match..." | Alta | Si |
| LOGIN-04 | Login con campos vacios | Ninguna | 1. Click en Login sin completar campos | Mensaje: "Username is required" | Media | Si |
| LOGIN-05 | Login con problem_user | Ninguna | 1. Ingresar problem_user / secret_sauce 2. Explorar catalogo | Loguea correctamente, pero las imagenes de producto se ven rotas (bug conocido de la demo) | Baja | No (exploratorio manual) |

## Catalogo / Carrito

| ID | Titulo | Precondicion | Pasos | Resultado esperado | Prioridad | Automatizado |
|---|---|---|---|---|---|---|
| CART-01 | Agregar un producto al carrito | Usuario logueado | 1. Click en "Add to cart" de un producto | El contador del carrito pasa de 0 a 1 | Alta | Si |
| CART-02 | Agregar multiples productos | Usuario logueado | 1. Agregar 2 productos distintos | El contador del carrito muestra 2 | Alta | Si |
| CART-03 | Ordenar productos por precio (menor a mayor) | Usuario logueado | 1. Seleccionar orden "Price (low to high)" | La lista se reordena sin errores | Media | Si |
| CART-04 | Quitar un producto del carrito | Producto en el carrito | 1. Click en "Remove" | El producto desaparece y el contador baja | Media | No (pendiente de automatizar) |

## Checkout

| ID | Titulo | Precondicion | Pasos | Resultado esperado | Prioridad | Automatizado |
|---|---|---|---|---|---|---|
| CHK-01 | Checkout completo con datos validos | Producto en el carrito | 1. Ir al carrito 2. Checkout 3. Completar nombre, apellido, codigo postal 4. Finish | Se muestra "Thank you for your order!" | Alta | Si |
| CHK-02 | Checkout sin codigo postal | Producto en el carrito | 1. Ir al carrito 2. Checkout 3. Dejar codigo postal vacio 4. Continue | Mensaje: "Postal Code is required" | Alta | Si |
| CHK-03 | Checkout sin productos en el carrito | Carrito vacio | 1. Ir al carrito 2. Checkout | No se puede avanzar / carrito vacio | Baja | No (pendiente de automatizar) |

## API - Booking (Restful-Booker)

| ID | Titulo | Precondicion | Pasos | Resultado esperado | Prioridad | Automatizado |
|---|---|---|---|---|---|---|
| API-01 | Health check | Ninguna | GET /ping | Status 201 | Alta | Si |
| API-02 | Crear reserva | Ninguna | POST /booking con datos validos | Status 200, devuelve bookingid | Alta | Si |
| API-03 | Obtener reserva por id | Reserva creada | GET /booking/{id} | Status 200, datos coinciden con lo creado | Alta | Si |
| API-04 | Login para obtener token | Ninguna | POST /auth con credenciales validas | Status 200, devuelve token | Alta | Si |
| API-05 | Actualizar reserva con token valido | Reserva creada + token | PUT /booking/{id} con Cookie de token | Status 200, datos actualizados | Alta | Si |
| API-06 | Borrar reserva sin token | Reserva creada | DELETE /booking/{id} sin auth | Status 403 | Alta | Si |
| API-07 | Borrar reserva con token valido | Reserva creada + token | DELETE /booking/{id} con Cookie de token | Status 201, luego GET devuelve 404 | Alta | Si |
