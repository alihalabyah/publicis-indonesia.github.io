

;(function(window, $) {
    'use strict';
    
    // Define global variable
    var doc = $(window.document);
    var math = window.Math;
    
    // Define application namespace
    var app = {
        
        // Application document properties
        doc: {
            width: 0,
            height: 0
        },
        
        box: {
            width: 0,
            height: 0
        },
    
        /**
         * Generate random number
         */
        randomNumber: function(min, max) {
            return math.floor(math.random() * (max - min + 1)) + min;
        },
        
        /**
         * Change document properties on resize
         */
        resize: function() {
            
            // Resize document
            app.doc.width = $(window).width();
            app.doc.height = $(window).height();
            
            // Resize box
            app.box.width = app.doc.width / 4;
            app.box.height = app.doc.height / 4;
            
            // Resize each element
            $('#boxes span').each(function() {
                
                var width = app.box.width;
                var height = app.box.height;
                var x = $(this).data('x');
                var y = $(this).data('y');
                
                $(this).css({
                    top: (height * y) + 'px',
                    left: (width * x) + 'px',
                    width: width + 'px',
                    height: height + 'px',
                });
                
            });
        },
        
        /**
         * Move box element to specific coordinate
         */
        move: function(element, x, y) {
            
            // Get random type move, x first or y first
            var type = app.randomNumber(0, 1);
            var left = app.box.width * x;
            var top  = app.box.height * y;
            
            // Coordinate X on the first move by default
            var first = 'left';
            var second = 'top';
            var firstVal = left;
            var secondVal = top;
            
            // Coordinate Y on the first move
            if (type === 1) {
                first = 'top';
                second = 'left';
                firstVal = top;
                secondVal = left;
            }
            
            // Bind data coordinate
            element.attr('data-x', x);
            element.attr('data-y', y);
            
            element.css(first,  firstVal + 'px');
            window.setTimeout(function() {
                element.css(second,  secondVal + 'px');
            }, 1000);
            
        },
        
        // Initialize box position to starting coordinate
        init: function() {
            
            // Append span to the boxes
            var span = '';
            
            for (var a = 0; a < 16; a++) {
                span += '<span></span>';
            }
            
            $('#boxes').append(span);
            
            // Set properties value
            app.resize();
            
            // Move to the first coordinate
            $('#boxes span').each(function(index) {
                
                var x = index % 4;
                var y = parseInt(index/4);
                var time = app.randomNumber(0, 2000);
                var el = $(this);
                
                // Bind data id
                el.attr('data-id', index);
                
                window.setTimeout(function() {
                    app.move(el, x, y);
                    if (index === 15) {
                        app.run();
                    }
                }, time);
                
            });
        },
        
        // Run the boxes
        run: function() {
            
            // Get random numbers
            var id = app.randomNumber(0, 15);
            var x = app.randomNumber(0, 3);
            var y = app.randomNumber(0, 3);
            var time = app.randomNumber(1000, 2000);
            
            var element = $('#boxes span[data-id="'+id+'"]');
            
            window.setTimeout(function() {
                app.move(element, x, y);  
                app.run();
            }, time);
            
        },
    };
    
    doc.on('ready', function() {
        
        app.init();
        $(window).on('resize', app.resize);
        
    });
    
})(window, jQuery);