# Exercise Tracker Microservice

Este proyecto es parte del curso de APIs y Microservicios de freeCodeCamp. Es una API que permite registrar usuarios y sus rutinas de ejercicios.

## 🧩 Funcionalidad

- Crear nuevos usuarios
- Registrar ejercicios para cada usuario
- Consultar el registro completo o filtrado por fechas y cantidad

## 📦 Endpoints

### POST /api/users
Crea un nuevo usuario.

*Body:*
```json
{ "username": "nombre_usuario" }
