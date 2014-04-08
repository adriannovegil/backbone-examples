/**
 * This file is part of backbone-examples.
 *
 * backbone-examples is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 2, or (at your option) any later version.
 *
 * backbone-examples is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
 * details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program; see the file COPYING. If not, see
 * <http://www.gnu.org/licenses/>.
 */
(function($) {

    /**
     * Objeto Backbone que modela un elemento de la lista.
     * @type @exp;Backbone@pro;Model@call;extend
     */
    var Item = Backbone.Model.extend({
        defaults: {
            part1: 'hello',
            part2: 'world'
        }
    });

    /**
     * Colección que contiene los objetos item de la vista.
     * @type @exp;Backbone@pro;Collection@call;extend
     */
    var List = Backbone.Collection.extend({
        model: Item
    });

    /**
     * Las vistas en Backbone.js pueden resultar un poco confusas, ya que se 
     * asemejan más a un controlador que a una vista. Las vistas son clases que 
     * se encargan de representar los modelos dentro de nuestra aplicación y de 
     * escuchar los eventos lanzados por los modelos y las colecciones.
     * @type @exp;Backbone@pro;View@call;extend
     */
    var ListView = Backbone.View.extend({
        /**
         * El atributo "el" que se usa en el método render hace referencia al 
         * objeto DOM que tiene todo el contenido de la vista, es decir, el 
         * elemento html sobre el que actúa la vista, en nuestro ejemplo, 
         * representa a <body>.
         */
        el: $('body'),
        /**
         * Podemos definir en la vista el comportamiento frente a eventos que se 
         * produzcan en los elementos que contiene nuestro elemento "el", del 
         * que hablamos anteriormente. Para ello, definimos un evento junto el 
         * callback con el formato: { 'evento selector': 'callback' }, en 
         * nuestro ejemplo: { ‘click button#add': 'addItem' }, indocando que 
         * para cada evento click que se produzca sobre los botones con 
         * id=”add”, se ejecuta la función "addItem".
         */
        events: {
            'click button#add': 'addItem'
        },
        /**
         * initialize: con la función de underscore _.bindAll haremos que la 
         * referencia a this sea la vista en las funciones indicadas (render, 
         * addItem y appendItem). 
         * Finalmente, cuando se inicia la aplicación se dibuja por primera vez 
         * la vista.
         * @returns {undefined}
         */
        initialize: function() {
            //http://blog.bigbinary.com/2011/08/18/understanding-bind-and-bindall-in-backbone.html
            _.bindAll(this, 'render', 'addItem', 'appendItem');
            // Instanciamos una nueva colección de objetos.
            this.collection = new List();
            // Hacemos un bind entre el método "add" del objeto Collection de 
            // Backbone.js con nuestro método "appenItem"
            this.collection.bind('add', this.appendItem);
            // Contador de elementos añadidos.
            this.counter = 0;
            // Esta vista se renderiza a sí misma.
            this.render();
        },
        /**
         * render: se encarga de actualizar la vista.
         * El método render se llamará cada vez que se redibuje la vista, es 
         * quien se encarga de redibujarla cada vez que haya un cambio en el 
         * modelo.
         * En este caso añade un botón en la interfaz y la lista de elementos 
         * vacía.
         * @returns {undefined}
         */
        render: function() {
            var self = this;
            $(this.el).append("<button id='add'>Add list item</button>");
            $(this.el).append("<ul></ul>");
            _(this.collection.models).each(function(item) {
                self.appendItem(item);
            }, this);
        },
        /**
         * Función que se ejecuta cuando detectamos el evento de click en el 
         * botón.
         * @returns {undefined}
         */
        addItem: function() {
            // Incrementamos en una unidad el contados.
            this.counter++;
            // Instanciamos un nuevo item
            var item = new Item();
            item.set({
                // Concatenamos la segunda parte del item "part2" con el valor 
                // del contador.
                part2: item.get('part2') + ' ' + this.counter
            });
            // Añadimos el item a la colección.
            this.collection.add(item);
        },
        /**
         * Función que añade un item en la lista de la vista.
         * @param {type} item
         * @returns {undefined}
         */
        appendItem: function(item) {
            // Añadimos un nuevo elemento <li> a la lista <ul> con los datos 
            // almacenados en el objeto item que pasamos como parámetro.
            $('ul', this.el).append("<li>" + item.get('part1') + " " +
                    item.get('part2') + "</li>");
        }
    });

    // Instancia de ListWiew
    var listView = new ListView();

})(jQuery);
