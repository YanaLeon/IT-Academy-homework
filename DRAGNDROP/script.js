window.addEventListener('load', getImages);
function getImages () {
    let images = document.querySelectorAll('img');
    for (let i = 0; i < images.length; i++) {
        images[i].style.left = images[i].getBoundingClientRect().left + 'px';
        images[i].style.top = images[i].getBoundingClientRect().top + 'px';
    }
    let countzIndex = 1;
    for (let y = 0; y < images.length; y++) {
        images[y].style.position ='absolute';
        images[y].style.zIndex = countzIndex;
        images[y].addEventListener('mousedown', imgMouseDown);
        images[y].addEventListener('dragstart', function (eo) {
            eo.preventDefault();
        })
    }
    function imgMouseDown(eo) {
        eo = eo || window.event;
        let mouseOnImageX = eo.offsetX; // eo.pageX - eo.target.getBoundingClientRect().left;
        let mouseOnImageY = eo.offsetY; // eo.pageY - eo.target.getBoundingClientRect().top;
        console.log('нажат');
        moveImage(eo.pageX, eo.pageY);
        function moveImage (pageX, pageY) {
            eo = eo || window.event;
            eo.target.style.left = pageX - mouseOnImageX + 'px';
            eo.target.style.top = pageY - mouseOnImageY + 'px';
            eo.target.style.zIndex = countzIndex++;
            eo.target.style.cursor = 'grab';
        }
        document.body.addEventListener('mousemove', imageMove);
        function imageMove (eo) {
            eo = eo || window.event;
            moveImage(eo.pageX, eo.pageY)
        }
        eo.target.addEventListener('mouseup', imageMouseUp);
        function imageMouseUp () {
            document.body.removeEventListener('mousemove', imageMove);
            console.log('отпущен');
        }
    }
}
