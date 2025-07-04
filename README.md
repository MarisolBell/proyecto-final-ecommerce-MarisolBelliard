# API de Gestión de Productos con Autenticación JWT y Firebase

Este proyecto es una API backend desarrollada en Node.js y Express.js que permite gestionar productos y autenticar usuarios utilizando JSON Web Tokens (JWT). Los datos de los productos se almacenan en Firestore (Firebase).

## Características Principales

* **Gestión de Productos**: Operaciones CRUD completas (Crear, Leer, Actualizar de manera parcial o completa , Eliminar) para productos.
* **Filtro de productos**: Filtrado por nombre, categoría y precios desde query params.
* **Búsqueda de productos**: Por palabra clave en nombre o descripción.
* **Autenticación de Usuarios**: Endpoint de login que genera un Bearer Token (JWT) para usuarios autenticados.
* **Rutas Protegidas**: Las rutas para crear, actualizar y eliminar productos requieren un token JWT válido.
* **Modo dual de almacenamiento**: Local (archivo JSON) o Firestore.
* **Integración con Firebase**: Utiliza Firestore para el almacenamiento persistente de los datos de los productos.
* **Configuración Dinámica de CORS**: Permite peticiones de origen cruzado, con orígenes permitidos configurables según el entorno (desarrollo/producción).
* **Variables de Entorno**: Manejo seguro de configuraciones sensibles a través de archivos `.env`.

## Tecnologías Utilizadas

* **Node.js**: Entorno de ejecución para JavaScript del lado del servidor.
* **Express.js**: Framework web para Node.js, utilizado para construir la API.
* **Firebase Firestore**: Base de datos NoSQL en la nube para el almacenamiento de datos.
* **JSON Web Tokens (JWT)**: Para la generación y verificación de tokens de autenticación.
* **cors**: Middleware para habilitar Cross-Origin Resource Sharing.
* **dotenv**: Módulo para cargar variables de entorno desde un archivo `.env`.
* **body-parser / express.json**: Middleware para parsear los cuerpos de las solicitudes entrantes (JSON).

## Prerrequisitos

* Node.js 
* npm (Node Package Manager, usualmente viene con Node.js)
* Una cuenta de Firebase y un proyecto de Firestore configurado con una colección llamada `products`.

## Instalación

1.  **Clona el repositorio:**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd <NOMBRE_DEL_DIRECTORIO_DEL_PROYECTO>
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

## Configuración

1.  **Crea un archivo `.env`** en la raíz del proyecto. Puedes copiar el contenido de `.env.example`.

2.  **Añade las siguientes variables de entorno** al archivo `.env` con tus propios valores:

    ```ini
    # Configuración del Servidor
    PORT=3000 # O el puerto que prefieras
    NODE_ENV=development # O production

    # Orígenes permitidos para CORS
    ALLOWED_ORIGIN_DEV=http://localhost:5173 # Ejemplo para desarrollo Frontend
    ALLOWED_ORIGIN_PROD=[https://tu-frontend-en-produccion.com]

    # Claves de API de Firebase (obtenidas desde la consola de Firebase)
    FIREBASE_API_KEY=TU_FIREBASE_API_KEY
    FIREBASE_AUTH_DOMAIN=TU_FIREBASE_AUTH_DOMAIN
    FIREBASE_PROJECT_ID=TU_FIREBASE_PROJECT_ID
    FIREBASE_STORAGE_BUCKET=TU_FIREBASE_STORAGE_BUCKET
    FIREBASE_MESSAGING_SENDER_ID=TU_FIREBASE_MESSAGING_SENDER_ID
    FIREBASE_APP_ID=TU_FIREBASE_APP_ID

    # Clave secreta para JWT (elige una cadena larga y aleatoria)
    JWT_SECRET_KEY=TU_CLAVE_SECRETA_PARA_JWT
    ```

    * Asegúrate de que la colección en Firestore se llame `products`.
  

## Ejecución del Proyecto

Para iniciar el servidor, ejecuta:

```bash
npm run start

## Endpoints principales

- `POST /auth/login` → Login y obtención de token
- `GET /api/products` → Listar todos los productos
- `GET /api/products/:id` → Obtener producto por ID
- `POST /api/products/create` → Crear producto (requiere token)
- `PUT /api/products/:id` → Actualizar producto completo (requiere token)
- `PATCH /api/products/:id` → Actualizar parcialmente un producto (requiere token)
- `DELETE /api/products/:id` → Eliminar producto (requiere token)
- `GET /api/products/search?q=xxx` → Buscar por nombre o descripción
- `GET /api/products/filter?categoria=...&precioMin=...&precioMax=...` → Filtrar productos

## Usuario de prueba para obtener el token

Email: "ejemplo@email.com"  
Password: "admin123"

## Colección Postman

Podés descargar la colección de pruebas Postman para importar y probar fácilmente los endpoints:

 [Descargar colección](./docs/E-commerceVoila.postman_collection%20(2).json)

o acceder a través del siguiente link:

https://web.postman.co/workspace/09b93cda-5a56-4876-87bb-9ea68592353b/collection/36226506-4c60d7ed-2dbb-4f9a-9154-6c852822a723?action=share&source=copy-link&creator=36226506


## Despliegue

La API está desplegada y disponible en:
 [https://proyecto-final-ecommerce-marisolbelliard-vlcs.onrender.com]
