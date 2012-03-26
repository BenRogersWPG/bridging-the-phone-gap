var app = (function() {
	
	var pub = {};
	
	var tmp = new kendo.data.DataSource({
		transport: {
			read: "test.json"
		},
		schema: {
			data: "data.children",
			fields: {
				title: "data.title",
				url: "data.url",
				points: "data.score"
			}
		},
		sort: { field: "data.score", dir: "desc" }
	});

	var reddit = new kendo.data.DataSource({
		transport: {
			read: {
				url: "http://reddit.com/r/programming.json",
				dataType: "json"
			}
		},
		schema: {
			data: "data.children",
			fields: {
				title: "data.title",
				url: "data.url",
				score: "data.score"
			}
		},
		sort: { field: "data.score", dir: "desc" }
	});


	pub.init = function() {
		
		// create the kendo ui mobile application
		var kendo_app = new kendo.mobile.Application();
	
		// create the listview
		$("#popular_news").kendoMobileListView({
			dataSource: reddit,
			template: kendo.template($("#template").html()),
			style: "inset",
			/*click: function(e) {

			}*/
		});
		
	}
	

	pub.goToUrl = function(sender) {
		var url = $(sender).data("url");
		var cb = ChildBrowser.install();
		if(cb != null)
			window.plugins.childBrowser.showWebPage(url);
	}
	
	return pub;
	
})();