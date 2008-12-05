{
	tests: [
		{
			title	 : "RadClass",
			verify : "did the text change after 5 seconds?",
			before : function(){
				(function(){
					new RadClass($('test'))
				}).delay(5000)
			}
		}
	]
}