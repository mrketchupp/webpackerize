
<h1 align="center">
  <br>
  <a href="https://github.com/mrketchupp/webpackerize"><img src="https://u.cubeupload.com/mrketchupp/webpackerize.png" alt="Webpackerize" width="200"></a>
  <br>
  Webpackerize
  <br>
</h1>

<h4 align="center">Prepara todo lo necesario para trabajar con <a href="https://webpack.js.org/" target="_blank">Webpack</a>.</h4>

<p align="center">
  <a href="https://badge.fury.io/js/webpackerize">
    <img src="https://badge.fury.io/js/webpackerize.svg" alt="npm version" height="18">
  </a>
</p>

<p align="center">
  <a href="#funcion">Función</a> •
  <a href="#uso">Uso</a> •
  <a href="#alias">Alias</a> •
  <a href="#manejo-de-imágenes-y-fuentes">Manejo de imágenes y fuentes</a> •
  <a href="#dependencias">Dependencias</a> •
  <a href="#licencia">licencia</a>
</p>

## Funcion
Incluye las dependencias necesarias, junto con archivos de configuración listos para usar. Esto te permite empezar a trabajar con Webpack de manera sencilla y rápida sin tener que configurar nada tú mismo. Es ideal si buscas una forma fácil de empezar a trabajar con Webpack en tu proyecto.

## Uso
Para usar Webpackerize, simplemente ejecuta el siguiente comando en la raíz de tu proyecto:

```bash
npx webpackerize
```
Webpackerize creará los archivos y carpetas necesarios para usar Webpack.

Una vez ejecutado el comando, podrás utilizar los siguientes scripts:

| Script  | Descripción                                                                                                           |
| ------- | --------------------------------------------------------------------------------------------------------------------- |
| `build` | Genera una versión del código empaquetado y optimizado, Listo para producción                                     |
| `dev`   | Genera una versión del código que no esta optimizado. |
| `start` | Inicia el servidor de desarrollo de Webpack para que puedas ver tu aplicación en tiempo real mientras trabajas.        |


Puedes ejecutar estos scripts desde la línea de comandos con el comando `npm run <nombre-del-script>`. Por ejemplo, para preparar el proyecto para producción, deberías ejecutar el siguiente comando:

```bash
npm run build
```

## Alias
Webpackerize establece los siguientes alias por defecto para que puedas referenciar tus imágenes y estilos de manera más fácil en tu código:

- `@images`: directorio `src/assets/images`
- `@styles`: directorio `src/styles`
Para utilizar los alias, simplemente referéncialos en tu código con la sintaxis de `import` o `require`.

Por ejemplo, si quieres importar una imagen en un archivo JavaScript, puedes hacerlo así:

```javascript
import logo from '@images/logo.png';
```

De esta manera, Webpack sabe que debe buscar la imagen en el directorio `src/assets/images`.

## Manejo de imágenes y fuentes
Webpackerize también maneja automáticamente las imágenes y fuentes que se encuentran en el directorio `src/assets`. Esto significa que puedes agregar imágenes y fuentes a tus proyectos sin necesidad de configurar nada adicional.

Para incluir una imagen en tu proyecto, simplemente coloca la imagen en el directorio `src/assets/images`. Luego, puedes importar la imagen en tu código utilizando el alias `@images`, como se muestra en el ejemplo anterior.

Webpackerize también configura automáticamente la carga de fuentes en tu proyecto. Para incluir una fuente en tu proyecto, coloca la fuente que deses usar en el directorio `src/assets/fonts`.

## Dependencias

Webpackerize instala las siguientes dependencias

| Tecnología         | Descripción                                                                            |
| ------------------ | -------------------------------------------------------------------------------------- |
| Babel              | Transpila el código JavaScript a una versión compatible con una gran cantidad de navegadores |
| TailwindCSS        | Un framework de diseño CSS que te permite crear diseños personalizados con poco esfuerzo |
| Webpack            | Empaqueta y optimiza el código JavaScript para su uso en un navegador |
| HtmlWebpackPlugin | Genera un archivo HTML para incluir automáticamente todos los paquetes compilados de JavaScript |
| css-loader         | Carga archivos CSS en su aplicación                                                      |
| postcss-loader     | Carga archivos CSS y los transforma con PostCSS, que permite aplicar transformaciones en el código CSS |
| autoprefixer      | Plugin de PostCSS que añade prefijos CSS automáticamente para garantizar la compatibilidad entre navegadores |
| terser-webpack-plugin | Optimizador de JavaScript que utiliza el motor de compresión Terser |
| css-minimizer-webpack-plugin | Plugin que minimiza el CSS generado por Webpack |

## Licencia
Webpackerize está disponible bajo la Licencia MIT. Ver el archivo LICENSE para más información.

---
### Nota
Este paquete lo hice para uso personal, pero pienso que puede ser de utilidad para mas personas, por lo que le añadire mas cosas conforme las necesite :)