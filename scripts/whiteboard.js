'use strict';

(function()
{
    let canvas = document.getElementById('whiteboard');
    let ctx = canvas.getContext('2d');
    let colors = document.getElementsByClassName('color');
    let isDrawing = false;
    let current =
    {
        color: 'black'
    };

    window.addEventListener('resize', onResize, false);
    onResize();

    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mouseout', onMouseUp, false);
    canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);

    // Touch support for mobile
    canvas.addEventListener('touchstart', onMouseDown, false);
    canvas.addEventListener('touchend', onMouseUp, false);
    canvas.addEventListener('touchcancel', onMouseUp, false);
    canvas.addEventListener('touchmove', throttle(onMouseMove, 10), false);

    for(let i = 0; i < colors.length; i++)
    {
        colors[i].addEventListener('click', onColorUpdate, false);
    }

    function onColorUpdate(event)
    {
        current.color = event.target.className.split(' ')[1];
    }

    function drawLine(fromX, fromY, toX, toY, color)
    {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.stroke();
        ctx.closePath();
    }

    function onMouseDown(event)
    {
        console.log(event);
        isDrawing = true;
        current.x = event.clientX || event.touches[0].clientX;
        current.y = event.clientY || event.touches[0].clientY;
    }

    function onMouseUp(event)
    {
        if(!isDrawing) return;
        isDrawing = false;
        drawLine(
            current.x, current.y,
            event.clientX || event.touches[0].clientX,
            event.clientY || event.touches[0].clientY,
            current.color
        );
    }

    function onMouseMove(event)
    {
        if(!isDrawing) return;
        drawLine(
            current.x, current.y,
            event.clientX || event.touches[0].clientX,
            event.clientY || event.touches[0].clientY,
            current.color
        );
        
        current.x = event.clientX || event.touches[0].clientX;
        current.y = event.clientY || event.touches[0].clientY;
    }

    // Throttle number of events executed per second
    function throttle(cb, delay)
    {
        let prevCall = new Date().getTime();

        return function()
        {
            let currTime = new Date().getTime();
            
            if(currTime - prevCall >= delay)
            {
                prevCall = currTime;
                cb.apply(null, arguments);
            }
        };
    }

    function onResize()
    {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
})();
