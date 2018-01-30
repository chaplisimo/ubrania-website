//settings.js (front-end)

//////SETTINGS

$("#articleNew").on("click",function(event){
	event.preventDefault();
	$.ajax("/settings/articleNew",{
		method : "GET",
		success : function(data){
			$("#settings_content").html(data);
		}
	});
});

$("#articleList").on("click",function(event){
	event.preventDefault();
	$.ajax("/settings/articleList",{
		method : "GET",
		success : function(data){
			$("#settings_content").html(data);
		}
	});
});

$(document).on("click","#cancel",function(){
	$.ajax("/settings",{
		method : "GET",
		success : function(data){
			$("#settings_content").html($(data).find("#settings_content"));
		}
	});
});


///// ARTICULOS ADD

//Enable OnSalePrice
$(document).on("click","#onSale",function(){
	if($(this).is(":checked")){
		$("#onSalePrice").removeAttr("readonly");
	}else{
		$("#onSalePrice").prop("readonly","readonly");
		$("#onSalePrice").val("");
	}
});

//Agregar Articulo
$(document).on("click","#articleAdd",function(){
	$.ajax("/settings/articleAdd",{
		method : "POST",
		data : {
			articleName : $("#articleName").val(),
			price : $("#price").val(),
			onSale : $("#onSale").is(":checked"),
			onSalePrice : $("#onSalePrice").val(),
			description : $("#description").val(),
			//images : $("#images").val(),
			sizes : $("input[name^='size'][type='checkbox']:checked").map(function(){
						return $(this).val();
					}).get()
			},
		success : function(data){
			$("#settings_content").html($(data));
		}
	});
});