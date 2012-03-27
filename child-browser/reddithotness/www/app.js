var app = (function() {
	
	var reddit_base = "http://reddit.com";
	
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
	
	var reddits = new kendo.data.DataSource({
		transport: {
			read: "reddits.json"
		},
		schema: {
			data: "data.children",
			fields: {
				name: "data.display_name",
				url: reddit_base + "data.url" + ".json",
				title: "title"
			}
		},
		group: {
			
		}
	})


	pub.init = function() {
		
		// create the kendo ui mobile application
		var kendo_app = new kendo.mobile.Application();
	
		// create the listview
		$("#popular_news").kendoMobileListView({
			dataSource: tmp,
			template: kendo.template($("#template").html()),
			style: "inset"
			/*click: function(e) {

			}*/
		});
		
		$("#select-a-reddit").kendoMobileListView({
			dataSource: reddits,
			template: "${name}"
			style: "inset"
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