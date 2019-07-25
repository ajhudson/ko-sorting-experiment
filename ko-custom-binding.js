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
        
        

    }
}

ko.bindingHandlers.toggleSlideFade = {
    init: function(el, valueAccessor, allBindings) {
        var btnId = ko.utils.unwrapObservable(valueAccessor());
        var btn = $("#" + btnId);
        var fadeSpeedMs = 500;
        var slideSpeedMs = 500;

        if (!btn.length) {
            throw "no button in toggleSlideFade custom binding!";
        }

        $(el).first().hide();
        $(el).first().css("opacity", 0);
        $(el).slideUp();

        btn.click(function(event) {
            var isOpen = $(el).css("display") == "none" ? false : true;

            if (isOpen) {
                $(el).first().animate({ opacity: 0 }, fadeSpeedMs, function() {
                    $(el).slideUp(slideSpeedMs, function() {
                        $(el).first().hide();
                        btn.text("+");
                    });
                });
            } else {
                $(el).slideDown(slideSpeedMs, function() {
                    $(el).first().show();
                    $(el).first().animate({ opacity: 1}, fadeSpeedMs);
                    btn.text("-");
                });
            }
        });
    }
}