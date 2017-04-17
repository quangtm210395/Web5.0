$(document).ready(function () {
    console.log($(window).width());
    if ($(window).width() >= 1200)
        $('#content').masonry({
            // options
            itemSelector: '.item-grid',
            columnWidth: '.col-lg-3',
            percentPosition: true
        });
    else if ($(window).width() >= 768)
        $('#content').masonry({
            // options
            itemSelector: '.item-grid',
            columnWidth: '.col-sm-4',
            percentPosition: true
        });
    else
        $('#content').masonry({
            // options
            itemSelector: '.item-grid',
            columnWidth: '.col-xs-12',
            percentPosition: true
        });
});