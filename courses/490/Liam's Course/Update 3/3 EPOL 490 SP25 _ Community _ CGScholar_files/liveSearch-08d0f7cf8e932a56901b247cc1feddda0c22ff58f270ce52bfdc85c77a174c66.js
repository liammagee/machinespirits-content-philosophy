  /**
   * Apply live search to `$searchField`, a jquery object pointing to
   * an input element inside a form with a particular layout (to be
   * defined...  for now, read the code).
   *
   * currently used in admin tools for switch user and edit user searches
   * but not for last name search tp prevent duplicate accounts
   */

    // keep track of whether or not the browser window has focus
    var window_focus = true;
    window.onblur = function() { window_focus = false; };
    window.onfocus = function() { window_focus = true; };

  function userLiveSearch($searchField, userOptions) {
    // default options for live search
    var defaultOptions = {
      delay: 1500,                 // milliseconds
      lastSearchAttr: 'data-last-search',
      form: true,
      pass_user: false
    };

    var options = $.extend({}, defaultOptions, userOptions);

    if ($searchField.size() === 0) {
      return;
    }


    // clicking anywhere in the page will hide the search results
    $('body').on('click', function(e) {
      if (!$searchField.hasClass('display_none')) {
        searchForm().find('.live_search').addClass('display_none');
        $("#add_members .item").find(".live_search").hide();
      }
    });

    // prevent clicks in the search field from propagating up the DOM
    $searchField.on('click', function(e){ e.stopPropagation(); });

    function searchString() {
      return encodeURIComponent($searchField.val());
    }

    function searchForm() {
      return $searchField.closest('.live_search_wrapper');
    }

    function searchAction() {
      if (options.form) { // live search in a form
        if(searchForm().attr('action').split('?').length > 1){
          return searchForm().attr('action') + '&search_string=' + searchString();
        }else{
          return searchForm().attr('action') + '?search_string=' + searchString();
        }
      } else { // live search in a div
          var custom_data = searchForm().data("custom");
          var custom_data = (custom_data != undefined ? '&custom_data='+ custom_data : "");
        return searchForm().data('url') + '?search_string=' + searchString() + custom_data;
      }
    }

    function passCurrentUser() {
      var result = "&";
      if (options.pass_user) {
        var form = $searchField.closest('form');
        var match = form.attr('action').match(/\d+$/);
        result = "&user_id=" + match[0];
      }
      return  result;
    }

    function results() {
      return searchForm().find('.live_search');
    }

    /**
     * Record the current search string so that we can check if the
     * current search string is the same as what we've just searched.
     */
    function recordSearch() {
      $searchField.attr(options.lastSearchAttr, searchString());
    }

    /**
     * Test if the search field has focus.  If it does not, no point
     * in performing the search.
     */
    function hasFocus() {
      return $searchField.is(':focus');
    }

    /**
     * Test if a search should be performed based on whether the
     * search text has been changed and if the search field has focus.
     */
    function shouldSearch() {
      var lastSearchString = $searchField.attr(options.lastSearchAttr);
      var currentSearchString = searchString();
      return !$searchField.hasClass('blur') && currentSearchString !== "" && currentSearchString !== lastSearchString;
    }

    /**
     * Show or hide the results div based on the presence of any
     * results.
     */
    function updateVisibility() {
      var hasAnyMatch = results().find("ul > li").length > 0;

      if (hasAnyMatch) {
        results().removeClass('display_none');
      } else {
        // only hide the search results if the window has focus
        if (window_focus && !results().hasClass('display_none')) {
          results().addClass('display_none');
        }
      }

      $searchField.removeClass('loading');
    }

    function doSearch() {
        if (searchString() === "") {
            results().children().remove();
            recordSearch();
        }

      if (shouldSearch()) {
          $searchField.addClass('loading');
          recordSearch();

          window.searchRequest = jQuery.ajax({
              type: 'GET',
              data: passCurrentUser(),
              url: searchAction(),
              beforeSend: function(){           
                if(window.searchRequest != null) {
                  window.searchRequest.abort();
                };
                results().addClass('loading');
              },
              success: function(data){
                results().html(data);
                updateVisibility();     
              }
          });
      } else {
      }
    };

    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    function debounce(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    };

    $searchField.on('keyup', function() {
      var delayedFn = debounce(doSearch, 1500);
      delayedFn();
    });

    /**
     * Hide results area on blur for delay time.
     */
    // $searchField.on('blur', function(evt) {
    //   setTimeout(updateVisibility, options.delay);
    // });

    /**
     * Show results area on return to focus.
     */
    $searchField.on('focus', function(evt) {
      setTimeout(updateVisibility, options.delay);
    });

    /**
     * Merge in more results if 'more' link is clicked.
     */
    searchForm().off('click').on('click', 'a.more', function(evt) {
      evt.preventDefault();

      $searchField.focus();

      var that = $(this);
      that.hide();

      results().find('.loading_content').show();
      
      $.ajax({
        type: "GET",
        url: searchAction(),
        data: "page=" + that.attr('page'),
        success: function(html) {
          results().children("ul").append(html);
          var page = parseInt(that.attr('page'), 10);
          var max_pages = parseInt(that.attr('max_pages'), 10);
          if (page < max_pages){
            that.attr('page', parseInt(that.attr('page'), 10) + 1);
            that.show();
          }
        },
        complete: function(){
          results().find('.loading_content').hide();
        }
      });
    });

    searchForm().on('submit', function(evt) {
      evt.preventDefault();
      evt.stopPropagation();
    });

  }

/* 
 * Used in account settings page for last_name search.  Appears to do largely the same thing as the previous function
 */
liveSearch = {
  lastNameField: $('#account_person_attributes_last_name'),
  registerHandlers: function () {
    this.lastNameField.live('keyup', function(evt){
      var $searchDiv = $(".live_search");
      var $lastName = $(this);
      var searchString = $(this).val();
      var action = $searchDiv.attr("data-action") + "?search_string=" + encodeURIComponent(searchString);
      var delay = 1500;
      var lastSearchAttr = "data-last-search";

      function valueHasNotChangedSinceEvent () {
        return searchString == $lastName.val();
      }

      function valueIsDifferentFromLastSearch() {
        return searchString != $searchDiv.attr(lastSearchAttr);
      }

      function recordSearch() {
        $searchDiv.attr(lastSearchAttr, searchString);
      }

      function lastNameIsStillFocused() {
        return $lastName.is(":focus");
      }

      function updateVisibility() {
        var atLeastOneMatch = $searchDiv.find("ul > li").length > 0;

        lastNameIsStillFocused() && atLeastOneMatch ?
          $searchDiv.removeClass('display_none') :
          $searchDiv.addClass('display_none');
      }

      function emptyAndHide() {
        $searchDiv.find("ul > li").remove();
        $searchDiv.addClass('display_none');
      }

      setTimeout(function() {
        if (valueHasNotChangedSinceEvent() && valueIsDifferentFromLastSearch() && lastNameIsStillFocused()) {
          recordSearch();

          if (searchString) {
            $searchDiv.load(action, function () { updateVisibility(); });
          }
          else {
            emptyAndHide();
          }
        }
      }, delay);
    });

    this.lastNameField.live('blur', function(evt){
      $(".live_search").addClass('display_none');
    });
  }
};
