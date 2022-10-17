# bsale backend
API Rest con NodeJS y Express para la prueba técnica de bsale.

## Objetivo y funcionamiento
La idea principal de esta API es poder hacer consultas a una base de datos ya preparada de typo MySql. La API debe ser capaz de hacer las consultas necesarias, para busqueda y filtrado de información.

## Peticiones

Debido a que esta API es de solo consulta, todas las peticiones que puedes realizar son de tipo GET. Los endpoints a los que puedes llamar son los siguientes:
### Productos

```
BASE_API/api/products
```
Esta petición devuelve un arreglo de objetos con todas las propiedades de un producto.
```json
[
	{
		"id": 5,
		"name": "ENERGETICA MR BIG",
		"url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/misterbig3308256.jpg",
		"price": 1490,
		"discount": 20,
		"category": 1
	},
	{
		"id": 6,
		"name": "ENERGETICA RED BULL",
		"url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/redbull8381.jpg",
		"price": 1490,
		"discount": 0,
		"category": 1
	},
	{
		"id": 7,
		"name": "ENERGETICA SCORE",
		"url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/logo7698.png",
		"price": 1290,
		"discount": 0,
		"category": 1
    }
]
```
### Productos por busqueda

Para realizar esta consulta se necesita mandar la busqueda utilizando query params. La peticion se tiene que ver asi:
```
BASE_API/api/products?search=energetica
```
Y resultado será un arreglo de productos que cumplen con la condición de que su propiedad name incluya de alguna forma la búsqueda.
```json
[
	{
		"id": 5,
		"name": "ENERGETICA MR BIG",
		"url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/misterbig3308256.jpg",
		"price": 1490,
		"discount": 20,
		"category": 1
	},
	{
		"id": 6,
		"name": "ENERGETICA RED BULL",
		"url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/redbull8381.jpg",
		"price": 1490,
		"discount": 0,
		"category": 1
	}
]
```
### Producto por id
Este consulta utiliza los request params de la siguiente manera.
```
BASE_API/api/products/5
```
Y devuelve un único objeto cuyo id coincida
```json
[
	{
		"id": 5,
		"name": "ENERGETICA MR BIG",
		"url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/misterbig3308256.jpg",
		"price": 1490,
		"discount": 20,
		"category": 1
	}
]
```

### Categorias
Las consultas a las categorias siguen la misma idea que las consultas a los productos, solo cambian los objetos que devuelve.

Consulta
```
BASE_API/categories
```
Respuesta
```json
[
	{
		"id": 1,
		"name": "bebida energetica"
	},
	{
		"id": 2,
		"name": "pisco"
	},
	{
		"id": 3,
		"name": "ron"
	}
]
```
### Categorias por busqueda
Consulta:
```
BASE_API/api/categories?search=bebida
```
Respuesta:
```json
[
	{
		"id": 1,
		"name": "bebida energetica"
	},
	{
		"id": 4,
		"name": "bebida"
	}
]
```
### Categoria por id (productos)
En este caso, este endpoint sirve para listar aquellos productos que encajan con la categoria especificada.
```
BASE_API/api/categories/5
```
Respuesta
```json
[
	{
		"id": 47,
		"name": "Maní salado",
		"url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/manisaladomp4415.jpg",
		"price": 600,
		"discount": 0,
		"category": 5
	},
	{
		"id": 53,
		"name": "Mani Sin Sal",
		"url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/manisinsalmp6988.jpg",
		"price": 500,
		"discount": 0,
		"category": 5
	}
]
```
## Como prepararlo y correrlo
Para preparar el entorno es suficiente con clonar el repositorio y utilizar el comando 
```sh
npm run install
```
Con este comando se instalarán las dependecias necesarias, pero hay que hacer un par de aclaraciones primero.

### Base de datos y variables de entorno
Para conectarse a la base de datos son necesarios cuatro datos, como se puede ver en el *.env.example*
```.env
DB_HOST= 
DB_DB= 
DB_USER = 
DB_PASSWORD = 
```
Estas llaves me fueron proporcionadas por **bsale** para la prueba y son para usa base de datos específica.

Si deseas replicarlo con una base propia, debes saber que la base de datos consta de dos tablas con la siguiente estructura:

|product| |
|---|---|
id | Identificador único del producto (int)
name | Nombre del producto (varchar)
url_image | URL de la imagen asociada al producto (varchar)
price | Precio de venta del producto (float)
discount | Porcentaje de descuento del producto (int)
category | Identificador de la categoría (int)

|category| |
|---|---|
id | Identificador único de la categoría (int)
name | Nombre de la categoría (varchar)

También es importante saber que la base de datos que se utilizó es de tipo MySQL. Por lo que se usa la librería de MySQL para NodeJS.

## Estructura del proyecto
Una vez explicado esto podemos ver la estructura del proyecto.

El proyecto cuenta con tres directorios principales, esto ayuda a tener el código segmentando y evitar boilerplate. 
### schemas
Utilizando la librería **JOI** he creado esquemas para cada los productos y las categorías que me permiten validar los datos al hacer una búsqueda y tener mejor controlados los errores de tipos.

En este caso, los esquemas solo constan de un id, pues solo se utilizan en las consultas específicas, pero en un sistema CRUD completo sería necesario para validar los datos que se mandarán a la base de datos.

### services
En este directorio, se organizan los servicios referentes a los productos y a las categorías. Esto en forma de una clase de servicio que cuenta con diferentes métods que ejecutan las consultas necesarias. 
Por ejemplo, para encontrar un producto se hace uso del método siguiente:
```javascript
 findOne(id) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM product WHERE id = ${id}`, (err, rows, fields) =>{
                if(err) reject(err);
                resolve(rows);
            })
        })
    }
```

### routes
Por último, el directorio routes se encarga de asignar estos métodos a los distintos endpoints correspondientes. De esta forma, los métodos de productos solo pueden accederse desde endpoints de productos. Todo esto lo maneja el router de **express.js**.