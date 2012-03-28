var app = (function() {

    var reddit_base = "http://www.reddit.com";

    var pub = {};

    var tmp = new kendo.data.DataSource({
        transport: {
            read: {
                url: "test.json",
                dataType: "json"
            }
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
                url: "http://www.reddit.com/r/programming.json",
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


    pub.initPopularViews = function() {
        // create the listview
        $("#popular_news").kendoMobileListView({
            dataSource: tmp,
            template: kendo.template($("#template").html()),
            pullToRefresh: true,
            style: "inset",
            click: function(e) {
                console.log(e);
            }
        });
    }

    pub.initSelectReddit = function() {
        $("#select-a-reddit").kendoMobileListView({
            dataSource: tmp,
            template: "${name}",
            style: "inset"
        });
    }

    pub.init = function() {
        // create the kendo ui mobile application
        var kendo_app = new kendo.mobile.Application();
    }


    pub.goToUrl = function(sender) {
        var url = $(sender).data("url");
        var cb = ChildBrowser.install();
        if(cb != null)
            window.plugins.childBrowser.showWebPage(url);
    }

    return pub;

})();
