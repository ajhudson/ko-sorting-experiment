ko.components.register('client-side-paginator', {
    viewModel: function(params) {

        var self = this,
            pageSizeOb = params.pagingInfo.pageSize,
            recordsOb = params.pagingInfo.records,
            pagesLength = Math.round(recordsOb().length / pageSizeOb()),
            pageNumbers = initPageNumbers(pagesLength),
            currentPageOb = params.pagingInfo.currentPage;

        function initPageNumbers(pageLength) {
            var pn = ["|<"];

            for (var i = 0; i <= pageLength; i++) {
                pn.push((i + 1).toString())
            }

            pn.push(">|");

            return pn;
        }

        var gotoPage = function(requestedPage) {
            currentPage(requestedPage);
        }

        var isActive = ko.computed(function() {
            return true;
        });

        return {
            pageNumbers: pageNumbers,
            pageSize: pageSizeOb,
            currentPage: currentPageOb,
            gotoPage: gotoPage,
            isActive: isActive
        }
    },
    template: 
        '<ul class="pagination" data-bind="foreach: pageNumbers">\
            <li data-bind="css: { active: $parent.currentPage() == $data }"><a href="#" data-bind="text: $data, click: function() { $parent.gotoPage($data) }"></a></li>\
        </ul>\
        <p>Page size: <span data-bind="text: pageSize"></span>. Current page: <span data-bind="text: currentPage"></span></p>\
        '
});
