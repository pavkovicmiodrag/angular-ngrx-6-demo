(function () {
  'use strict';
  angular
    .module('app.directives')
    .controller('shSearchTableController', shSearchTableController);

  /* @ngInject */
  function shSearchTableController($scope, $translate, generalHelperService, $location) {
    var vm = this;

    vm.callItemLinkFunction = callItemLinkFunction;
    vm.clearSearchCriteria = clearSearchCriteria;
    vm.doSearch = doSearch;
    vm.findTranslationForSearchKey = findTranslationForSearchKey;
    vm.findTranslationForSearchValue = findTranslationForSearchValue;
    vm.findTypeForSearchKey = findTypeForSearchKey;
    vm.isItemClickable = isItemClickable;
    vm.onPaginate = onPaginate;
    vm.onReorder = onReorder;
    vm.paginationLabel = {};
    vm.resolveOrderBy = resolveOrderBy;
    vm.searchCriteriaPresent = searchCriteriaPresent;
    vm.changeTriStateCheckbox = changeTriStateCheckbox;
    vm.isBoolean = isBoolean;
    vm.isFilterParam = isFilterParam;

    //----------------------------------------------------------------------------//

    if (angular.isUndefined(vm.tableOnly)) {
      vm.tableOnly = false;
    }
    if (angular.isUndefined(vm.startCollapsed)) {
      vm.collapseSearch = false;
    }

    updateTranslations();
    initSearchRequest();

    function initSearchRequest() {
      if (vm.tableOnly == false) {
        if ($location.search().searchRequest) {
          doInitSearchRequest(angular.fromJson($location.search().searchRequest));
          doSearch();
        } else {
          doInitSearchRequest({pageForm: {size:30, page: 1}});
        }
      } else if (vm.tableOnly == true) {
        doInitSearchRequest({pageForm: {size:30, page: 1}});
        doSearch();
      }

      if (vm.startCollapsed == true) {
        vm.collapseSearch = true;
      }
    }

    function doInitSearchRequest(sr) {
      vm.searchRequest = sr;
      if(angular.isDefined(vm.filterParams)) {
        for (var i = 0; i < vm.filterParams.length; i++) {
          delete vm.filterParams[i].index;
          if (angular.isDefined(vm.filterParams[i].default)) {
            if (angular.isUndefined(vm.searchRequest.searchCriteria)) {
              vm.searchRequest.searchCriteria = {};
            }
            if (angular.isUndefined(vm.searchRequest.searchCriteria[vm.filterParams[i].name])) {
              vm.searchRequest.searchCriteria[vm.filterParams[i].name] = [];
            }
            vm.searchRequest.searchCriteria[vm.filterParams[i].name] = vm.filterParams[i].default;
          }
        }
      }
    }

    $scope.angular = angular;

    function updateTranslations() {
      $translate(['GENERAL.PAGINATION.PAGE', 'GENERAL.PAGINATION.ROWS_PER_PAGE', 'GENERAL.PAGINATION.OF']).then(function (translations) {
        vm.paginationLabel.page = translations['GENERAL.PAGINATION.PAGE'];
        vm.paginationLabel.rowsPerPage = translations['GENERAL.PAGINATION.ROWS_PER_PAGE'];
        vm.paginationLabel.of = translations['GENERAL.PAGINATION.OF'];
      });
    }

    function findTranslationForSearchKey(key) {
      for(var i = 0; i < vm.filterParams.length; i++) {
        if (vm.filterParams[i].name === key) {
          return vm.filterParams[i].label;
        }
      }
    }

    function findTypeForSearchKey(key) {
      for(var i = 0; i < vm.filterParams.length; i++) {
        if (vm.filterParams[i].name === key) {
          return vm.filterParams[i].type;
        }
      }
    }

    function findTranslationForSearchValue(value, key) {
      for(var i = 0; i < vm.filterParams.length; i++) {
        if (vm.filterParams[i].name === key) {
          if (vm.filterParams[i].optionLabel && vm.filterParams[i].optionValue) {
            var result = _.find(vm.filterParams[i].selectOptions, function(option) {
              return option[vm.filterParams[i].optionValue] == value;});

            return angular.isDefined(result) ? result[vm.filterParams[i].optionLabel] : '';
          }
          if (angular.isDefined(vm.filterParams[i].translationPrefix)) {
            return vm.filterParams[i].translationPrefix + '.' + value;
          }
        }
      }
      return value;
    }

    function onPaginate(page, size) {
      vm.searchRequest.pageForm.page = page;
      vm.searchRequest.pageForm.size = size;

      getOrderDirection(vm.searchRequest.pageForm.sortField);
      callSearchFunction();
    }

    function onReorder(order) {
      getOrderDirection(order);
      callSearchFunction();
    }

    function getOrderDirection(order) {
      if (order) {
        if (order.charAt(0) === '-') {
          vm.searchRequest.pageForm.sortDirection = 'DESC';
          vm.searchRequest.pageForm.sortField = order.substr(1);
        } else {
          vm.searchRequest.pageForm.sortDirection = 'ASC';
          vm.searchRequest.pageForm.sortField = order;
        }
      }
    }

    function doSearch() {
      if (vm.searchRequest.sortField) {
        getOrderDirection(vm.searchRequest.sortField);
      }
      vm.collapseSearch = true;
      vm.searchRequest.pageForm.page = 1;
      callSearchFunction();
    }

    function clearSearchCriteria() {
      vm.searchRequest.searchCriteria = {};
      doInitSearchRequest(vm.searchRequest);
    }

    function searchCriteriaPresent() {
      return generalHelperService.searchCriteriaPresent(vm.searchRequest.searchCriteria);
    }

    function callSearchFunction() {
      if (vm.tableOnly === false) {
        var params = {
          searchRequest: angular.toJson(vm.searchRequest)
        };
        if(angular.isDefined(vm.additionalParams)) {
          params = _.merge(params, vm.additionalParams);
        }
        $location.search(params);
      }
      vm.searchFn({searchRequest: vm.searchRequest});
    }

    function callItemLinkFunction(item, index, event) {
      if (isItemClickable()) {
        vm.itemLinkFn({item: item, index: index, event: event});
      }
    }

    function isItemClickable() {
      return angular.isDefined(vm.itemLinkFn);
    }

    function resolveOrderBy(column) {
      if (column.sortingDisabled) {
        return null;
      } else {
        return column.sortingName ? column.sortingName : column.name;
      }
    }

    function changeTriStateCheckbox(searchCriteria, searchField) {
      var values = [null, false, true];

      if(angular.isUndefined(searchField.index)) {
        // Only on init
        if(angular.isUndefined(searchField.default) || searchField.default === null) {
          searchField.index = 0;
        } else if(!searchField.default) {
          searchField.index = 1;
        } else {
          searchField.index = 2;
        }
      }

      searchCriteria[searchField.name] = values[++searchField.index % values.length];
    }

    function isBoolean(key) {
      return typeof(key) === 'boolean';
    }

    function isFilterParam(key) {
      var isFilterParam = false;
      for(var i = 0; i < vm.filterParams.length; i++) {
        if (vm.filterParams[i].name === key) {
          isFilterParam = true;
          break;
        }
      }
      return isFilterParam;
    }

  }
})();
