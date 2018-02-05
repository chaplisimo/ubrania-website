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

//Pestaña Measures
//cargar los talles de la primer tab
$(document).on('show.bs.tab', "[data-toggle='tab']",function(){
	$("[id^='size']").addClass("disabled");
	$("input[name^='size'][type='checkbox']:checked").each(function(){
		let name = $(this).attr("name");
		$("#"+name).removeClass("disabled");
	});
});

//cargar las medidas de cada talle
$(document).on('click', "[id^='size']" ,function(){
	$("[id^='size']").removeClass("active");
	$(this).toggleClass("active");
	
	let size = $(this).hasClass("active") ? $(this).attr("id") : -1;
	
	//cargo las medidas
	$.ajax("/settings/measureList",{
		method : "POST",
		data : {size : size},
		success : function(data){
			$("#measureList").html($(data).find("#measureList"));
			$("#measureEdit").val($(data).find("#measureEdit").val());
		}
	});
});

//Agregar medida
$(document).on('click', "#measureAdd" ,function(e){
	e.preventDefault();
	if($("[id^='size'].active")){
		let size = $("[id^='size'].active").attr("id");
		let measureName = $("#measureName").val();
		let measureValue = $("#measureValue").val();
		let editMode = $("#measureEdit").val();
		
		if(size && measureName != "" && measureValue != ""){
			//agrego la medida
			$.ajax("/settings/measureAdd",{
				method : "POST",
				data : {
						size : size,
						measureName : measureName,
						measureValue : measureValue,
						editMode : editMode
						},
				success : function(data){
					$("#measureList").html($(data).find("#measureList"));
					$("#alert").html($(data).find("#alert"));
					$("#measureName").val("");
					$("#measureValue").val("");
					$("#measureEdit").val($(data).find("#measureEdit").val());
				}
			});
		}
	}
});

//eliminar medida
$(document).on('click', "[name^='remove_']" ,function(){
	let size = $("[id^='size'].active").attr("id");
	let index = $(this).attr("name").match(/d/g);
	$.ajax("/settings/measureRemove",{
		method : "POST",
		data : {
				size : size,
				index : index
				},
		success : function(data){
			$("#measureList").html($(data).find("#measureList"));
			$("#alert").html($(data).find("#alert"));
		}
	});
});

//editar medida
$(document).on('click', "[name^='edit_']" ,function(){
	let size = $("[id^='size'].active").attr("id");
	let index = $(this).attr("name").match(/\d+/g);
	$.ajax("/settings/measureEdit",{
		method : "POST",
		data : {
				size : size,
				index : index
				},
		success : function(data){
			$("#measureName").val($(data).find("#measureName").val());
			$("#measureValue").val($(data).find("#measureValue").val());
			$("#measureEdit").val($(data).find("#measureEdit").val());
		}
	});
});

//Agregar Articulo
$(document).on("click","#articleAdd",function(){
	if ($("#measures").hasClass("active")){
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
			success : function(data, code){
				if(code == "200"){
					$("#settings_content").html($(data));
				}else{
					$("#alert").html($(data).find("#alert").html());
					$("#warnMsg").html($(data).find("#warnMsg").html());
					$("#warnMsg").removeClass("hidden");
				}
			}
		});
	}else{
		$("[name='tab2']").click();
	}
});