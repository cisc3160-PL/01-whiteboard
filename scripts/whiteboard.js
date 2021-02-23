'use strict';

(function()
{
    let canvas = document.getElementById('whiteboard');
    let ctx = canvas.getContext('2d');

    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mouseout', onMouseUp, false);
    canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);

    function onMouseDown(event)
    {
        console.log('mouse down');
    }

    function onMouseUp(event)
    {
        console.log('mouse up');
    }

    function onMouseMove(event)
    {
        console.log('mouse move');
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
})();
