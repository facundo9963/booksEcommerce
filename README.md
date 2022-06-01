# API ecommerce de libros

Esta es una REST API para un ecommerce principalmente de libros. Tiene Rutas para realizar las funcionalidades necesarias e impactar en la base de datos. Las tecnologías usadas son Node.js con Express, Prisma como ORM, PostgreSQL como base de datos relacional. 
Para una mejor seguridad tiene un manejo de las contraseñas con bcrypt. Además tiene un middleware de autorización que proteje algunas rutas si no recibe un token. Se usó jwt para generar y comparar el token de sesión.

# Comenzar

Para iniciar el proyecto tienes que descargar el repositorio e instalar las dependecias. Luego necesitas agregar un archivo .env a la raiz de tu repositorio con las siguientes variables que completaras segun lo requieras:

DATABASE_URL (contiene la url de tu base de datos y va a variar segun el puerto, usuario y contraseña y nombre de tu base de datos)

JWT_SECRET (tiene la clave secreta de jwt, puedes poner una clave que quieras para tu proyecto local)


# Rutas API

## **/users** 
 
#### /register
Esta ruta sirve para registrar un usuario en la base de datos. Es de tipo POST y recibe obligatoriamente por body los campos name: STRING, email: STRING, password: STRING.
Devuelve un token de autenticación

#### /login
Esta ruta sirve para loguearse con un usuario en la base de datos. Es de tipo POST y recibe obligatoriamente por body los campos email: STRING, password: STRING.
Devuelve un token de autenticación

#### /updateProfile
Esta ruta sirve para actualizar la dirección y la foto del perfil. Es de tipo PUT y recibe opcionalmente por body los campos direction: STRING, image: STRING. 
Necesita autenticarse con el token que se devuelve al registrarse o loguearse ya que es una funcionalidad solo para usuarios. El Token es de tipo Bearer y debe ser enviado en el header Authorization en la petición

## **/products**

#### /add
Esta ruta sirve para añadir un producto en venta. Es de tipo POST y recibe obligatoriamente por body los campos  title: STRING, price: FLOAT, stock: INT. Puede recibir opcionalmente los campos categoryId: INT, isbn: STRING, author: STRING, editorial:STRING

#### /changeStock
Esta ruta sirve para cambiar el stock de un producto. Es de tipo PUT y recibe obligatoriamente los campos id: INT, stock:INT

#### /allProducts
Esta ruta sirve para listar todos los productos. Es de tipo GET y devuelve todos los productos

## **/categories**

#### /add
Esta ruta sirve para agregar una categoría. Es de tipo POST y recibe obligatoriamente en el body el campo name:STRING


## **/cart**

#### /add
Esta ruta sirve para añadir un producto al carrito. Es de tipo post y recibe obligatoriamente el campo productId: INT. Necesita autenticarse con el token que se devuelve al registrarse o loguearse ya que es una funcionalidad solo para usuarios. El Token es de tipo Bearer y debe ser enviado en el header Authorization en la petición.

#### /getProducts
Esta ruta sirve para listar todos los productos del carrito. Es de tipo GET.
Necesita autenticarse con el token que se devuelve al registrarse o loguearse ya que es una funcionalidad solo para usuarios. El Token es de tipo Bearer y debe ser enviado en el header Authorization en la petición.

#### /buyCart
Esta ruta sirve para comprar el carrito del usuario. Vacía el carrito y disminuye el stock de los productos. Es de tipo PUT.
Necesita autenticarse con el token que se devuelve al registrarse o loguearse ya que es una funcionalidad solo para usuarios. El Token es de tipo Bearer y debe ser enviado en el header Authorization en la petición.

## **/purchases**

#### /add
Esta ruta sirve para que los dueños de aplicación puedan registrar una compra que hayan hecho y asi se guarde en la base de datos y se actualice el stock del producto comprado. Es de tipo POST y recibe obligatoriamente los campos 
productId: INT, distributor: STRING, stock: INT.

