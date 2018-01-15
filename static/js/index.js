(() => {
	$("button.list-group-item").on("click",()=>{
		$("#menuForm").attr('action',"/catalog");
		$("#menuForm").submit();
	});
})();