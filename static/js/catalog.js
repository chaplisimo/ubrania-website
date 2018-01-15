(() => {
	$("label.disabled").on("click",()=>{
		event.stopPropagation();
	});
})();