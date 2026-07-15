# Bug Report - BUG-001

Titulo: Todas las imagenes de producto se muestran identicas al loguearse con problem_user

Severidad: Media
Prioridad: Media
Estado: Abierto
Reportado por: Vanesa Quintana
Fecha: 2026-07-15
Entorno: Chrome 128, saucedemo.com, usuario problem_user

## Resumen
Al iniciar sesion con el usuario problem_user, todas las imagenes de la pagina de catalogo (/inventory.html) muestran la misma foto (un perro), en vez de la imagen real de cada producto. Con standard_user las imagenes se ven correctas.

## Pasos para reproducir
1. Ir a https://www.saucedemo.com/
2. Ingresar usuario problem_user, contrasena secret_sauce
3. Click en "Login"
4. Observar las imagenes de los 6 productos listados en el catalogo

## Resultado actual
Las 6 imagenes de producto son identicas entre si (foto de un perro), sin relacion con el producto real (mochila, luz de bicicleta, remera, etc.).

## Resultado esperado
Cada producto deberia mostrar su imagen correspondiente, igual que ocurre con standard_user.

## Evidencia
- Comparar inventory.html logueado como standard_user vs problem_user
- Screenshot sugerido: captura de pantalla del catalogo con ambos usuarios, lado a lado

## Impacto
Afecta la experiencia de compra: el usuario no puede identificar visualmente que producto esta agregando al carrito, lo que puede derivar en compras equivocadas.

## Notas adicionales
Este comportamiento es conocido y reproducible de forma consistente; parece ser un bug intencional de la app de demo (problem_user esta disenado para simular una build con bugs de UI), por lo que se documenta como ejemplo de reporte, no como algo a escalar a un equipo de desarrollo real.
