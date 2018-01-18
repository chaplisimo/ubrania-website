//Previene el evento de click en labels desactivadas
$("label.disabled").on("click",()=>{
	event.stopPropagation();
});

//Funcionalidad cantidad -1
$("#minusQty").on('click', () =>{
	let value = $("#quantity").val();
	if(value > 1){
		$("#quantity").val(Number(value) -1);
		
		if(value-1 == 1){
			$("#minusQty").attr("disabled","disabled");
		}
	}
});

//Funcionalidad cantidad +1
$("#plusQty").on('click', () =>{
	let value = $("#quantity").val();
	$("#quantity").val(Number(value) +1);
	
	$("#minusQty").removeAttr("disabled");
});

//Linkear los cambios de talle en Form y Detalle
$("[name='sizes']").on('change', function(){
	$("[name='sizesDetail'][value="+$(this).val()+"]").click();
});
$("[name='sizesDetail']").on('change', function(){
	$("[name='sizes'][value="+$(this).val()+"]").click();
});

//Tooltip de imagen TALLES
$("[data-toggle='tooltip']").tooltip();

//Fix para los tooltip en AREA TAG
$("area[data-toggle='tooltip']").each(function(){
	let position = $("#sizePreview").position();
	let coords = $(this).attr("coords").split(',');
	
	let top = coords[1];
	let left = coords[0];
	let width = coords[2]-coords[0];
	let heigth = coords[3]-coords[1];
	
	$(this).css({ 'top': position.top + Number(top) +"px", 'left': position.left + Number(left) +"px", 'width': width, 'height' : heigth});
});