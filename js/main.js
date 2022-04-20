
    let mode = 'single';
    let currentIndex = 0;
    var rotation = 0;
    var zoom = 1;

    var current_page = 1;
    let per_page = 2;
    let sakme_id = 1;

    $(document).ready(function() {
        loadResults(sakme_id, current_page, per_page);

    });

    // left side open close
    $('#leftOpenClose').click(function(){

        if($(this).attr('state')==='open'){
            $('#leftSide').hide();
            $('#middleBox').removeClass('boxed');
            $('#middleBox').addClass('full');
            $(this).attr('state', 'closed');
            $(this).css('left', '0%');
        }
        else{
            $('#leftSide').show();
            $('#middleBox').removeClass('full');
            $('#middleBox').addClass('boxed');
            $(this).attr('state', 'open');
            $(this).css('left', '25%');
        }
    });

    // Thumb Click
    $(document).on("click", '.img-element', function(event) {
        activateThumb($(this).attr('index'));
        // Change Index
        $("#indexID").val(parseInt($(this).attr('index')) + 1);

        let urlToGo = 'files/details/' + $(this).attr('elID');

        // Change URL DEPENDING ON THUMB
        $('#infoButton').attr('url', urlToGo);
    });

    // Open Details
    $(document).on("click", '#infoButton', function(event) {
        window.open('/' + $(this).attr('url'), '_blank');
    });

    // Change Mode
    $(".thumbSelector").click(function(){
       mode = $(this).val();
       $("#indexID").val();
       if(mode === 'double'){
        $('#content_viewer').removeClass('singleView');
        $('#content_viewer').addClass('bookView');
       }
       else{
        $('#content_viewer').addClass('singleView');
        $('#content_viewer').removeClass('bookView');
       }
       activateThumb(parseInt($("#indexID").val()) - 1);
    });

    // Index Change
    $(document).on("keyup", '#indexID', function(event) {
       if(parseInt(this.value) < $('#maxImages').attr('maxImages')){
            if ($.isNumeric(this.value)) {
                let newIndex = this.value - 1;
                activateThumb(newIndex);
            }
        }
        else{
            alert('ამ ინდექსის გვერდი არ არსებობს');
        }
    });


    // Next Prev Button
    $('.nextPrev').click(function(){
        let newIndex = 0;
        if($(this).attr('method') === 'next'){
            if(mode === 'double'){
                newIndex = parseInt($("#indexID").val()) + 2;
            }
            else{
                newIndex = parseInt($("#indexID").val()) + 1;
            }

            if(newIndex > $('#maxImages').attr('maxImages')){
                newIndex = 1;
            }
        }
        else{
            if(mode === 'double'){
                newIndex = parseInt($("#indexID").val()) - 2;
            }
            else{
                newIndex = parseInt($("#indexID").val()) - 1;
            }

            if(newIndex < 1){
                newIndex = $('#maxImages').attr('maxImages');
            }
        }
        $("#indexID").val(newIndex);
        activateThumb(newIndex -1);
    });


    // ROTATION
    $('.rotate').click(function() {
        let rotationMethod = $(this).attr('method');
        if(rotationMethod === 'plus'){
            rotation += 90;
        }
        else{
            rotation -= 90;
        }

        $(this).rotate(rotation);
    });
    jQuery.fn.rotate = function(degrees) {
        $('#content_viewer').css({'transform' : 'rotate('+ degrees +'deg)'});
    };


    // ZOOM
     $('.zoom').click(function() {
        let zoomMethod = $(this).attr('method');

        if(zoomMethod === 'in'){
            zoom += 0.3;
        }
        if(zoomMethod === 'out'){
            zoom -= 0.3;
        }
        if(zoomMethod === 'reset'){
            zoom = 1;
        }
        $("#content_viewer").animate({ 'zoom': zoom }, 0);
    });

    $(document).ready(function(){
        $('#middleBox').bind('wheel mousewheel', function(e){
            var delta;
            if (e.originalEvent.wheelDelta !== undefined)
                delta = e.originalEvent.wheelDelta;
            else
            delta = e.originalEvent.deltaY * -1;

            if(delta > 0) {
                zoom += 0.3;
                $("#content_viewer").animate({ 'zoom': zoom },0);
            }
            else{
               zoom -= 0.3;
                $("#content_viewer").animate({ 'zoom': zoom },0);
            }
        });
    });

    function activateThumb(index){

        var html = '';
        $('.img-element').removeClass('active');
        if(mode === 'single'){
            $('#thumb-' + index).addClass('active');
            let src = $('#thumb-' + index).children('img').attr('src');
            html = '<img src="'+src+'" class="img-fluid img-element-viewer" />';

            $('#pages').html(parseInt(index) + 1);

        }
        if(mode === 'double'){
            var nextID = parseInt(index) + 1;
            if($('#thumb-' + nextID).length){
                let currentHTML = '';
                let nextHTML = '';

                $('#thumb-' + index).addClass('active');
                let srcCurrent = $('#thumb-' + index).children('img').attr('src');
                currentHTML = '<img src="'+srcCurrent+'" class="img-fluid img-element-viewer" />';


                $('#thumb-' + nextID).addClass('active');
                let srcNext = $('#thumb-' + nextID).children('img').attr('src');
                nextHTML = '<img src="'+srcNext+'" class="img-fluid img-element-viewer"/>';

                html = currentHTML + nextHTML;

                let firstIndex = parseInt(index) + 1;
                let secondIndex = parseInt(index) + 2;
                $('#pages').html(firstIndex + ' - ' + secondIndex);

            }
            else{
                let currentHTML = '';
                let nextHTML = '';

                $('#thumb-' + index).addClass('active');
                let srcCurrent = $('#thumb-' + index).children('img').attr('src');
                currentHTML = '<img src="'+srcCurrent+'" class="img-fluid img-element-viewer" />';


                $('#thumb-0').addClass('active');
                let srcNext = $('#thumb-0').children('img').attr('src');
                nextHTML = '<img src="'+srcNext+'" class="img-fluid img-element-viewer"/>';
                html = currentHTML + nextHTML;

                let firstIndex = parseInt(index) + 1;
                let secondIndex = 1;
                $('#pages').html(firstIndex + ' - ' + secondIndex);

            }
        }
        $('#content_viewer').html(html);
    }

    // FILTERS
    function editImage() {
        var gs = $("#gs").val(); // grayscale
        var blur = $("#blur").val(); // blur
        var br = $("#br").val(); // brightness
        var ct = $("#ct").val(); // contrast
        var huer = $("#huer").val(); //hue-rotate
        var opacity = $("#opacity").val(); //opacity
        var invert = $("#invert").val(); //invert
        var saturate = $("#saturate").val(); //saturate
        var sepia = $("#sepia").val(); //sepia

        $("#content_viewer img").css(
        "filter", 'grayscale(' + gs+
        '%) blur(' + blur +
        'px) brightness(' + br +
        '%) contrast(' + ct +
        '%) hue-rotate(' + huer +
        'deg) opacity(' + opacity +
        '%) invert(' + invert +
        '%) saturate(' + saturate +
        '%) sepia(' + sepia + '%)'
        );

        $("#content_viewer img").css(
        "-webkit-filter", 'grayscale(' + gs+
        '%) blur(' + blur +
        'px) brightness(' + br +
        '%) contrast(' + ct +
        '%) hue-rotate(' + huer +
        'deg) opacity(' + opacity +
        '%) invert(' + invert +
        '%) saturate(' + saturate +
        '%) sepia(' + sepia + '%)'
        );
    }
    //When sliders change image will be updated via editImage() function
    $("input[type=range]").change(editImage).mousemove(editImage);
    // Reset sliders back to their original values on press of 'reset'
    $('#imageEditor').on('reset', function () {
        setTimeout(function() {
            editImage();
        }, 0);
    });

    // DRAGGABLE
    dragElement(document.getElementById("content_viewer"));
    function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        elmnt.onmousedown = dragMouseDown;
        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }



    function updateCurrentPage(page){
        current_page = page;
    }

    // Load Thumbs
    function loadResults(sakme_id, current_page, per_page) {
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": jQuery('meta[name="csrf-token"]').attr("content")
            }
        });
        $.ajax({
            url: "/sakmes/view-files-per-page",
            type: "post",
            async: "false",
            data: {
                delay: 3,
                sakme_id: sakme_id,
                current_page: current_page,
                per_page: per_page
            },
            beforeSend: function(xhr) {
                $("#thumbs").after($("<li class='loading'>Loading...</li>").fadeIn('slow')).data("loading", true);
            },
            success: function(data) {
                if(data.result === 'success'){
                    // Append Data To DOM
                    $.each(data.data, function() {
                        $('#thumbs').append(
                                '<li class="img-element" id="thumb-'+this.index+'" index="'+this.index+'" elID="'+this.id+'">'+
                                    '<img src="data:image/'+this.mime_type + ';base64,'+ this.file_base_64 +'" />'+
                                '</li>'
                            );
                    });
                    updateCurrentPage(current_page + 1);
                    $('.totalCounter').html(data.total);
                    $('#maxImages').attr('maxImages', data.total);

                }
                else{
                    if(data.message == 'No More Files'){
                        $('.scrollpane').removeClass('scrollpane');
                    }
                }
                $(".loading").fadeOut('fast', function() {
                    $(this).remove();
                });

            }
        });
    };

    // Load More Content AJAX
    $('.scrollpane').on('scroll', function() {
        let list = $(this).get(0);
        if(list.scrollTop + list.clientHeight >= list.scrollHeight) {
            loadResults(sakme_id, current_page, per_page);
        }
    });

    // FULLSCREEN
    $(document).on("click", '.fullscreen', function(event) {
        if($(this).attr('method') === 'open'){
            openFullscreen();
            $(this).attr('method', 'close');
        }
        else{
            closeFullscreen();
            $(this).attr('method', 'open');
        }
    });
    var elem = document.documentElement;
    function openFullscreen() {
        $('#leftOpenClose').click();
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
    }
    function closeFullscreen() {
        $('#leftOpenClose').click();
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    }
