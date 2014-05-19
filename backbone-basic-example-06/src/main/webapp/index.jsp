<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>hello-backbonejs</title>
        <!-- Cargamos los ficheros Java Script -->
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript"></script>
        <script src="http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.3/underscore-min.js" type="text/javascript"></script>
        <script src="http://cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.2/backbone-min.js" type="text/javascript"></script>
        <script src="http://cdnjs.cloudflare.com/ajax/libs/backbone-localstorage.js/1.0/backbone.localStorage-min.js" type="text/javascript"></script> 
    </head>
    <body>

        <p><a href="#" class="goHome">Go Home</a></p>
        <p><a href="#" class="goEdit">Edit User #4</a></p>

        <script>

            // Definimos nuestro router.
            var Router = Backbone.Router.extend({
                // definimos la rutas
                routes: {
                    "": "home", // url:event that fires
                    "new": "createNew",
                    "edit/:id": "editItem",
                    "download/*anything": "downloadItem",
                }
            });

            // Instanciamos un nuevo router.
            var router = new Router;

            // asociamos la implementaci�n de una funci�n a home.
            router.on('route:home', function() {
                alert('We have loaded the home view')
            });

            // asociamos la implementaci�n de una funci�n a createnew.
            router.on('route:createNew', function() {
                alert('We are going to create something new here...')
            });

            // asociamos la implementaci�n de una funci�n a editItem.
            router.on('route:editItem', function(idParam) {
                alert('We are going to edit entry number ' + idParam);
            });

            // asociamos la implementaci�n de una funci�n a downloadItem.
            router.on('route:downloadItem', function(anythingParam) {
                alert('The anything parameter is ' + anythingParam);
            });

            /** 
             * Una vez definidos todos nuestros routers con todas sus rutas 
             * asociadas, es necesario que alguna entidad se encargue de monitorizar 
             * las solicitudes realizadas dentro de la aplicaci�n para capturar 
             * los eventos hashchange (actualizaci�n de fragmento hash) del 
             * navegador y as� poder aplicar la ruta oportuna y ejecutar las 
             * funciones asociadas. Esta entidad es Backbone.Hostory, y debemos 
             * crearla tras definir todos nuestros routers invocando al m�todo 
             * start([options]):
             * 
             * Una vez que hayamos definido todas las rutas de nuestra aplicaci�n 
             * en uno o m�s routers, debemos iniciar.
             * 
             * Backbone.history.start();
             * 
             * Si nuestra aplicaci�n no empieza desde el la URL ra�z /, podemos 
             * indic�rselo a trav�s de la propiedad root:
             * 
             * Backbone.history.start({root: '/app/home'});
             */
            Backbone.history.start();

            // Asociamos al enlace goHome en evento click para lanzar la navegacion.
            $('.goHome').click(function() {
                // Navegamos a ''
                router.navigate('', {trigger: true});
                return false;
            });
            // Asociamos al enlace goEdit en evento click para lanzar la navegacion.
            $('.goEdit').click(function() {
                // Navegamos a 'edit/4'
                router.navigate('edit/4', {trigger: true});
                return false;
            });

        </script>

    </body>
</html> 