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
     * Función dummy que simula el almacen de datos. Esto permite el uso de la
     * función MOdel.destroy() si lanzar errores.
     * @param {type} method
     * @param {type} model
     * @param {type} success
     * @param {type} error
     * @returns {undefined}
     */
    Backbone.sync = function(method, model, success, error) {
        success();
    }

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
     * Vista que se encarga de modelar los items de la vista.
     * @type @exp;Backbone@pro;View@call;extend
     */
    var ItemView = Backbone.View.extend({        
        tagName: 'li',
        // Lista de eventos manejados en la vista.
        events: {
            // Evento que controla el intercambio de palabras.
            'click span.swap': 'swap',
            // Evento que controla el borrado de los items de la lista.
            'click span.delete': 'remove'
        },
        /**
         * initialize: con la función de underscore _.bindAll haremos que la 
         * referencia a this sea la vista en las funciones indicadas (render, 
         * unrender, swap y remove). 
         * Finalmente, cuando se inicia la aplicación se dibuja por primera vez 
         * la vista.
         * @returns {undefined}
         */
        initialize: function() {
            _.bindAll(this, 'render', 'unrender', 'swap', 'remove'); 
            // Hacemos un bind entre change y remove que son las opciones que 
            // nos ofrece cada uno de los items con las funciones que queremos
            // ejecutar.
            // En el caso de change, cada vez que hagamos click en la opción del
            // listado, lanzaremos el método render de la vista actual.
            // En el caso de remove, cuando hacemos click sobre esta opción
            // se ejcuta tanto la función remove que se mapea directamente, como
            // la función unrender que es la que indicamos en el bind.
            this.model.bind('change', this.render);
            this.model.bind('remove', this.unrender);
        },
        /**
         * render: se encarga de actualizar la vista.
         * El método render se llamará cada vez que se redibuje la vista, es 
         * quien se encarga de redibujarla cada vez que haya un cambio en el 
         * modelo.
         * @returns {_L17.Anonym$2}
         */
        render: function() {
            $(this.el).html('<span style="color:black;">' + 
                    this.model.get('part1') + ' ' + this.model.get('part2') + 
                    '</span> &nbsp; &nbsp; <span class="swap" style="font-family:sans-serif; color:blue; cursor:pointer;">[swap]</span> <span class="delete" style="cursor:pointer; color:red; font-family:sans-serif;">[delete]</span>');
            return this; // for chainable calls, like .render().el
        },
        /**
         * Función que se encarga de eliminar el elemento del HTML que se ha
         * renderizado en la insercción.
         * @returns {undefined}
         */
        unrender: function() {
            $(this.el).remove();
        },
        /**
         * Función que se encarga del intercambio de las palabras de los items
         * de la lista.
         * @returns {undefined}
         */
        swap: function() {
            var swapped = {
                part1: this.model.get('part2'),
                part2: this.model.get('part1')
            };
            this.model.set(swapped);
        },
        /**
         * El método destroy() se encarga de eliminar un objeto model de la 
         * colección.
         * @returns {undefined}
         */
        remove: function() {
            this.model.destroy();
        }
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

            this.collection = new List();
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
            this.counter++;
            var item = new Item();
            item.set({
                part2: item.get('part2') + this.counter // modify item defaults
            });
            this.collection.add(item);
        },
        /**
         * Función que se encarga de añadir un nuevo elemento en la lista,
         * para ello instancia un nuevo objeto ItemView al que le pasamos en
         * el constructor la instancia Modelo que queremos insertar.
         * A continuación, modificamos el HTML, concretamente la lista de 
         * elementos, añadiendo un nuevo elemento llamando al método render de 
         * la vista ItemView.
         * @param {type} item
         * @returns {undefined}
         */
        appendItem: function(item) {
            var itemView = new ItemView({
                model: item
            });
            $('ul', this.el).append(itemView.render().el);
        }
    });

    // Instancia de ListWiew
    var listView = new ListView();

})(jQuery);
