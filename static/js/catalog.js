//-Previene el evento de click en labels desactivadas
$("label.disabled").on("click",()=>{
	event.stopPropagation();
});

//-Funcionalidad cantidad -1
$("#minusQty").on('click', () =>{
	let value = $("#quantity").val();
	if(value > 1){
		$("#quantity").val(Number(value) -1);
		
		if(value-1 == 1){
			$("#minusQty").attr("disabled","disabled");
		}
	}
});

//-Funcionalidad cantidad +1
$("#plusQty").on('click', () =>{
	let value = $("#quantity").val();
	$("#quantity").val(Number(value) +1);
	
	$("#minusQty").removeAttr("disabled");
});

//-Linkear los cambios de talle en Form y Detalle
$("[name='sizes']").on('change', function(){
	$("[name='sizesDetail'][value="+$(this).val()+"]").click();
});
$("[name='sizesDetail']").on('change', function(){
	$("[name='sizes'][value="+$(this).val()+"]").click();
});

//-Tooltip de imagen TALLES
$("[data-toggle='tooltip']").tooltip();

//-Fix para los tooltip en AREA TAG
$("area[data-toggle='tooltip']").each(function(){
	let position = $("#sizePreview").position();
	let coords = $(this).attr("coords").split(',');
	
	let top = coords[1];
	let left = coords[0];
	let width = coords[2]-coords[0];
	let heigth = coords[3]-coords[1];
	
	$(this).css({ 'top': position.top + Number(top) +"px", 'left': position.left + Number(left) +"px", 'width': width, 'height' : heigth});
});

//-Popover cart
var cartPopover = $("[data-toggle='popover']")
cartPopover.popover({
	animation : false,
	placement : "bottom",
	template : '<div class="popover popover-lg" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
	html : true,
	trigger : 'click',
	content : $("#cart_popover").html()//,
	//container : 'body'
});
/*cartPopover.on("mouseenter", function () {
    var _this = this;
    $(this).popover("show");
    $(".popover").on("mouseleave", function () {
        $(_this).popover('hide');
    });
}).on("mouseleave", function () {
    var _this = this;
    setTimeout(function () {
        if (!$(".popover:hover").length) {
            $(_this).popover("hide");
        }
    }, 300);
});*/

//-Actualizar las medidas aproximadas segun la talla
$("[name='sizesDetail']").on("change",function(){
	let value = $(this).val();
	$("[id^=sizesDetailDesc]").addClass("hidden");
	$("#sizesDetailDesc_"+value).removeClass("hidden");
});

//-Imagen principal a partir de thumbnails
$("[id^='radio_picture']").on("change",function(){
	let image = $("#picture"+$(this).val());
	$("#mainPicture").attr('src',$(image).attr('src'));
	$("#thumbImage").val($(image).attr('src'));
});

//-Modal ImagenPrincipal + Carousel
$("#mainPicture").on('click',function(){
	$("#modal_carousel").modal('toggle');
	$("#carouselArticle").carousel();
});

//-Add to Cart 
$("#addToCart").on('click',function(){
	$.ajax('/catalog/addToCart', {
		method : "POST",
		data : {
				quantity : $("#quantity").val(),
				name : $("#item_name").text(),
				price : $("[name='price']").val(),
				imageUrl : $("#mainPicture").attr('src')
				},
		success : function(data){
			
			//Efecto carrito
			var cartPosition = $("#myCart").offset();
			var okButton = $("#addToCart").offset();
			$("#cartOK").toggleClass('cartOK');
			$("#cartOK").css({"top" : okButton.top-cartPosition.top, "left" : okButton.left-cartPosition.left});
			setTimeout(()=>{$("#cartOK").toggleClass('cartOK')}, 1000);
			
			//Actualizo carrito dropdown
			$("#cart_popover").html($(data).find("#cart_popover").html());
			cartPopover.data('bs.popover').options.content = $("#cart_popover").html();
		}
	});
});

//-Remove from cart
$("body").on('click',"[name='removeFromCart']",function(event){
	event.preventDefault();
	$.ajax('/catalog/removeFromCart', {
		method : "POST",
		data : { index : $(this).val() },
		success : function(data){
			//Actualizo carrito dropdown
			$("#cart_popover").html($(data).find("#cart_popover").html());
			cartPopover.data('bs.popover').options.content = $("#cart_popover").html();
			cartPopover.popover('show');
		}
	});
});

$("body").on('click', "#checkOut", function(){
	let form = $("#formArticle");
	form.attr('action', '/catalog/checkOut');
	form.attr('method', 'POST');
	form.submit();
	
});