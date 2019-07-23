sortByProperty = function(arr, propertyName, isDescending) {
    return arr.sort(function (a, b) {
        if (a[propertyName] === b[propertyName]) {
            return 0;
        }

        if (a[propertyName] < b[propertyName]) {
            return isDescending ? 1 : -1;
        }

        return isDescending ? -1 : 1;
    });
}

ko.bindingHandlers.tableSort = {
    init: function(el, valueAccessor, allBindings, viewModel, bindingContext) {
        $(el).attr("data-sortdescending", false);
        var dataArray = ko.utils.unwrapObservable(valueAccessor());

        if (dataArray.length == 0) {
            return;
        }

        if (Object.keys(dataArray[0]).length == 0) {
            return;
        }

        var columnNames = Object.keys(dataArray[0]);
        $(el).attr("data-sortbycolumn", columnNames[0]);

        $(el).find("thead > tr > th > a[data-sortby]").each(function (index, anchorEl) {
            $(anchorEl).on("click", function(event) {
                var selectedCol = $(this).attr("data-sortby");
                var isDescending = $(el).attr("data-sortdescending") == "true";
                var lastSelectedCol = $(el).attr("data-sortbycolumn");

                if (selectedCol == lastSelectedCol) {
                    isDescending = !isDescending;
                }
                
                $(el).attr("data-sortbycolumn", selectedCol);
                $(el).attr("data-sortdescending", isDescending);

                sortByProperty(valueAccessor(), selectedCol, isDescending);
            });
        });
        
        

    },
    update: function(el, valueAccessor, allBindings, viewModel, bindingContext) {
        
    }
}