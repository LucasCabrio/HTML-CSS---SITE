/* Javascript utilizando Jquery*/

$(document).ready(function(){
    $('.carrossel').slick({
        dots:true,
        slideToShow:5,
        autoplay:true,
        infinite:true,
        speed: 1500,
        autoplayspeed: 3000
    })
})

/*
$ chama a Jquery
.click chama a função quando o elemento #grupo-menu for clicado
toggleClass - classe que alterna o status de um elemento, nesse CacheStorage, do elemento .menu de visível para oculto
*/