# Casos de prueba - Login, Catalogo y Checkout

Formato: ID | Titulo | Precondicion | Pasos | Resultado esperado | Prioridad | Automatizado

## Login

| ID | Titulo | Precondicion | Pasos | Resultado esperado | Prioridad | Automatizado |
|---|---|---|---|---|---|---|
| LOGIN-01 | Login exitoso con usuario valido | Ninguna | 1. Ir a saucedemo.com 2. Ingresar standard_user / secret_sauce 3. Click en Login | Redirige a /inventory.html y muestra el titulo "Products" | Alta | Si |
| LOGIN-02 | Login bloqueado para usuario locked_out_user | Ninguna | 1. Ingresar locked_out_user / secret_sauce 2. Click en Login | Muestra mensaje de error indicando que el usuario esta bloqueado | Alta | Si |
| LOGIN-03 | Login con contrasena incorrecta | Ninguna | 1. Ingresar standard_user / contrasena invalida 2. Click en Login | Mensaje: "Username and password do not match..." | Alta | Si |
| LOGIN-04 | Login con campos vacios | Ninguna | 1. Click en Login sin completar campos | Mensaje: "Username is required" | Media | Si |
| LOGIN-05 | Login con problem_user (exploratorio visual) | Ninguna | 1. Ingresar problem_user / secret_sauce 2. Explorar catalogo | Loguea correctamente, pero las imagenes de producto se ven rotas (bug conocido de la demo) | Baja | No (exploratorio manual) |
| LOGIN-06 | Login exitoso con problem_user | Ninguna | 1. Ingresar problem_user / secret_sauce 2. Click en Login | Redirige a /inventory.html y muestra el titulo "Products" | Media | Si |
| LOGIN-07 | Login exitoso con performance_glitch_user | Ninguna | 1. Ingresar performance_glitch_user / secret_sauce 2. Click en Login | Redirige a /inventory.html (puede demorar mas de lo normal) | Media | Si |
| LOGIN-08 | Login exitoso con error_user | Ninguna | 1. Ingresar error_user / secret_sauce 2. Click en Login | Redirige a /inventory.html | Media | Si |
| LOGIN-09 | Login exitoso con visual_user | Ninguna | 1. Ingresar visual_user / secret_sauce 2. Click en Login | Redirige a /inventory.html | Media | Si |
| LOGIN-10 | Username con formato invalido (numeros) | Ninguna | 1. Ingresar "123456" / secret_sauce 2. Click en Login | Mensaje: "Username and password do not match..." | Media | Si |
| LOGIN-11 | Username con formato invalido (espacios) | Ninguna | 1. Ingresar "standard user" / secret_sauce 2. Click en Login | Mensaje: "Username and password do not match..." | Media | Si |
| LOGIN-12 | Username con formato invalido (simbolos) | Ninguna | 1. Ingresar "standard_user!@#" / secret_sauce 2. Click en Login | Mensaje: "Username and password do not match..." | Media | Si |
| LOGIN-13 | Pegar usuario y contrasena con Ctrl+V | Ninguna | 1. Copiar "standard_user" y pegarlo en el campo usuario 2. Copiar "secret_sauce" y pegarlo en el campo contrasena 3. Click en Login | Los campos aceptan el valor pegado y el login es exitoso | Media | Si (solo Chromium) |

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

## Flujo E2E de compra completa

| ID | Titulo | Precondicion | Pasos | Resultado esperado | Prioridad | Automatizado |
|---|---|---|---|---|---|---|
| E2E-01 | Compra de punta a punta con multiples productos | Ninguna | 1. Login con standard_user 2. Agregar 2 productos al carrito 3. Ir al carrito y hacer checkout 4. Completar datos y finalizar | Se muestra "Thank you for your order!" y el flujo completo se ejecuta sin errores | Alta | Si |
| E2E-02 | Chequeo de API post-compra (patron ilustrativo) | Ninguna | 1. Crear un recurso via POST simulando la orden (Restful-Booker, ya que SauceDemo no tiene API real) 2. Verificar por GET que quedo persistido | El recurso creado se puede recuperar con los mismos datos enviados | Media | Si |

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

## Automation Exercise - Auth

| ID | Titulo | Precondicion | Pasos | Resultado esperado | Prioridad | Automatizado |
|---|---|---|---|---|---|---|
| AE-AUTH-01 | Registro completo de usuario nuevo por UI | Ninguna | 1. Ir a Signup/Login 2. Completar nombre y email 3. Completar datos de cuenta 4. Create Account | Se muestra "ACCOUNT CREATED!" y luego "Logged in as" | Alta | Si |
| AE-AUTH-02 | Login con credenciales validas | Cuenta creada por API | 1. Ingresar email y password 2. Click en Login | Se muestra "Logged in as" con el nombre de la cuenta | Alta | Si |
| AE-AUTH-03 | Login con credenciales invalidas | Ninguna | 1. Ingresar email y password inexistentes 2. Click en Login | Mensaje: "Your email or password is incorrect!" | Alta | Si |
| AE-AUTH-04 | Logout despues de loguearse | Cuenta creada por API, usuario logueado | 1. Click en Logout | Vuelve a la pantalla "Login to your account" | Media | Si |
| AE-AUTH-05 | Registro con email ya existente | Cuenta creada por API | 1. Ir a Signup/Login 2. Completar nombre y el email ya existente 3. Click en Signup | Mensaje: "Email Address already exist!" | Media | Si |

## Automation Exercise - Catalogo / Carrito

| ID | Titulo | Precondicion | Pasos | Resultado esperado | Prioridad | Automatizado |
|---|---|---|---|---|---|---|
| AE-CART-01 | Agregar dos productos al carrito | Ninguna | 1. Agregar producto 1 2. Continue Shopping 3. Agregar producto 2 4. View Cart | Ambos productos aparecen con precio y total correctos | Alta | Si |
| AE-CART-02 | Quitar un producto del carrito | Producto en el carrito | 1. Click en "X" de un producto | El producto desaparece de la tabla del carrito | Media | Si |
| AE-CART-03 | Buscar un producto | Ninguna | 1. Escribir "dress" en el buscador 2. Click en buscar | Se muestra "SEARCHED PRODUCTS" con resultados relacionados | Media | Si |
| AE-CART-04 | El checkout pide login si no hay sesion | Producto en el carrito, sin login | 1. Click en Proceed To Checkout | Modal: "Register / Login account to proceed on checkout." | Alta | Si |

## Automation Exercise - Flujo E2E de compra completa

| ID | Titulo | Precondicion | Pasos | Resultado esperado | Prioridad | Automatizado |
|---|---|---|---|---|---|---|
| AE-E2E-01 | Compra de punta a punta con verificacion de direccion contra los datos de registro | Ninguna | 1. Crear cuenta por API 2. Login por UI 3. Agregar 2 productos 4. Checkout 5. Verificar que la direccion de envio coincide con los datos de la cuenta 6. Completar pago | Se muestra "ORDER PLACED!" y "Congratulations! Your order has been confirmed!"; la direccion del checkout coincide con la registrada | Alta | Si |

## Automation Exercise - API

| ID | Titulo | Precondicion | Pasos | Resultado esperado | Prioridad | Automatizado |
|---|---|---|---|---|---|---|
| AE-API-01 | Crear cuenta | Ninguna | POST /api/createAccount con datos validos | responseCode 201, "User created!" | Alta | Si |
| AE-API-02 | Verificar login valido | Cuenta creada | POST /api/verifyLogin con email y password correctos | responseCode 200, "User exists!" | Alta | Si |
| AE-API-03 | Verificar login invalido | Ninguna | POST /api/verifyLogin con credenciales incorrectas | responseCode 404, "User not found!" | Alta | Si |
| AE-API-04 | Verificar login sin parametro | Ninguna | POST /api/verifyLogin sin password | responseCode 400 | Media | Si |
| AE-API-05 | Obtener detalle de usuario por email | Cuenta creada | GET /api/getUserDetailByEmail?email=... | responseCode 200, datos coinciden con lo creado | Media | Si |
| AE-API-06 | Borrar cuenta | Cuenta creada | DELETE /api/deleteAccount con email y password | responseCode 200, "Account deleted!"; verifyLogin posterior da 404 | Alta | Si |
| AE-API-07 | Listar productos | Ninguna | GET /api/productsList | responseCode 200, devuelve un array de productos | Alta | Si |
| AE-API-08 | POST a productsList no soportado | Ninguna | POST /api/productsList | responseCode 405 | Baja | Si |
| AE-API-09 | Listar marcas | Ninguna | GET /api/brandsList | responseCode 200, devuelve un array de marcas | Media | Si |
| AE-API-10 | PUT a brandsList no soportado | Ninguna | PUT /api/brandsList | responseCode 405 | Baja | Si |
| AE-API-11 | Buscar producto con parametro valido | Ninguna | POST /api/searchProduct con search_product=dress | responseCode 200, devuelve productos relacionados | Media | Si |
| AE-API-12 | Buscar producto sin parametro | Ninguna | POST /api/searchProduct sin body | responseCode 400 | Baja | Si |
| AE-API-13 | GET no soportado en deleteAccount | Ninguna | GET /api/deleteAccount (probado manualmente desde la barra de direcciones / DevTools) | responseCode 405 (Method Not Allowed); el header de respuesta "Allow" lista "OPTIONS, DELETE"; la cuenta NO se borra | Baja | No (hallazgo exploratorio confirmado en DevTools, 27/07/2026) |
