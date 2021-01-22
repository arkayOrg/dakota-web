

$(document).ready(function(){
// Add your custom javascript here
console.log("Hello from michael's script");
  var filterHeaders=[];
  var filterHeadersText=[];
  var filterHeadersInput=[];
  var filterHeadersInputText=[];
  var tags;

if($(".filters__results").length > 0) {
	//adds filter tags
    var tags = false;
    for ( var i = 0, l = filterHeadersInput.length; i < l; i++ ) {
      tags = true;
      $('.filters__active ul').append("<li class='inputtrigger' triggerinput='"+ filterHeadersInput[i] + "'>" + filterHeadersInputText[i] + "</li>");
    }

    for ( var i = 0, l = filterHeaders.length; i < l; i++ ) {  
      tags = true;
      $('.filters__active ul').append("<li class='trigger' trigger='"+ filterHeaders[i] + "'>" + filterHeadersText[i] + "</li>");
    }
    if(tags)
    {
      //add the clear all tag.
      $('.filters__active ul').append("<li class='clearall'>Clear All</li>");
    }

    $('.views-exposed-form .usa-search--small button.usa-button').click(function(e){
      e.preventDefault();
      $(".js-form-submit").first().click();
    });

	$('.filters__active li.clearall').click(function() {      
      $( "input" ).val('');
      $("input:checkbox").prop('checked', false);
      $(".js-form-submit").first().click();
    });
	$('.filters__active li.inputtrigger').each(function() {      
      var id = $(this).attr("triggerinput");  
      $(this).click(function() {
        $( "input[id^=" + id +"]").val('');
        $(".js-form-submit").first().click();
      });
    });
	$('.filters__active li.trigger').each(function() {      
      var id = $(this).attr("trigger");  
      $(this).click(function() {
        $( "input[id^=" + id +"]").first().click();
        $(".js-form-submit").first().click();
      });
    });

    filterHeaders = [];
    filterHeadersText = [];
    filterHeadersInput = [];
    filterHeadersInputText = [];

	function createTags() {
      var dataLayer = [];
      filterHeaders = [];
      filterHeadersText = [];
      filterHeadersInput = [];
      filterHeadersInputText = [];
      if($("#edit-field-year" ).val()) {
        filterHeadersInput.push("edit-field-year");
        filterHeadersInputText.push("After: " + $("#edit-field-year" ).val());

        dataLayer.push({
          'event': 'directory_search', 
          'tag': "After: " + $("#edit-field-year" ).val(),
        });
      }
      if($("#edit-field-year-1" ).val()) {
        filterHeadersInput.push("edit-field-year-1");
        filterHeadersInputText.push("After: " + $("#edit-field-year-1" ).val());

        dataLayer.push({
          'event': 'directory_search', 
          'tag': "After: " + $("#edit-field-year-1" ).val(),
        });
      }
      if($('#search-fulltext').val()) {
      	console.log("searching fulltext");
        filterHeadersInput.push("search-fulltext");
        filterHeadersInputText.push( "Search: " + $('#search-fulltext').val());
        console.log(filterHeadersInputText);

        dataLayer.push({
          'event': 'directory_search', 
          'tag': "Search: " + $('#search-fulltext').val(),
        });
      }
      
      $( "input[type='checkbox']" ).each(function() {
        //go through the entire list, check what's checked, add it to the array.
        if($(this).is(":checked")) {
          filterHeaders.push($(this).attr("id"));
          filterHeadersText.push($(this).parent().find('label').html());
          dataLayer.push({
            'event': 'directory_search', 
            'tag': $(this).parent().find('label').html(),
          });
        }

        //console.log(dataLayer)
      });
      $('.filters__active ul').empty();
	    for ( var i = 0, l = filterHeadersInput.length; i < l; i++ ) {
	      tags = true;
	      $('.filters__active ul').append("<li class='inputtrigger' triggerinput='"+ filterHeadersInput[i] + "'>" + filterHeadersInputText[i] + "</li>");
	    }

	    for ( var i = 0, l = filterHeaders.length; i < l; i++ ) {  
	      tags = true;
	      $('.filters__active ul').append("<li class='trigger' trigger='"+ filterHeaders[i] + "'>" + filterHeadersText[i] + "</li>");
	    }
	    if(tags)
	    {
	      //add the clear all tag.
	      $('.filters__active ul').append("<li class='clearall'>Clear All</li>");
	      //clearing button
		    $('.filters__active li.clearall').click(function() {      
	          $( "input" ).val('');
	          $("input:checkbox").prop('checked', false);
	          filterAll();
	        });
	    }
        $('.filters__active li.inputtrigger').each(function() {      
          var id = $(this).attr("triggerinput");  
          $(this).click(function() {
            $( "input[id^=" + id +"]").val('');
		          filterAll();
          });
        });

        $('.filters__active li.trigger').each(function() {      
          var id = $(this).attr("trigger");  
          $(this).click(function() {
            $( "input[id^=" + id +"]").first().click();
		          filterAll();
          });
        });
    }

    

	//actual filtering code
   //filter on name

	$rows = $(".filters__results .centers .row:visible");
    $input = $('#search-fulltext');
	$($input).keyup(function () {
	    
		filterAll();
	});
	$year1 = $(".after input");
	$year2 = $(".before input");

	$($year1).keyup(function () {
	    
		filterAll();
	});


	$($year2).keyup(function () {
	    
		filterAll();
	});
	$focuses = $("#edit-field-focus input");
	$universities = $("#edit-field-universities input");
	$locations = $("#edit-field-states input");

	$($focuses).change(function () {
		filterAll();
	});

	$($locations).change(function () {
		filterAll();
	});

	$($universities).change(function () {
		filterAll();
	});
	function filterAll(){
		tags = false;
		$(".filters__results .centers .row").show();

		$rows = $(".filters__results .centers .row:visible");
	    
	    $filter = $input.val().toUpperCase();
	    $.each($rows, function(i, val){
	        $name = $(val).find(".title").text();
	        console.log($name.toUpperCase() + " " + $filter);
	        if ($name.toUpperCase().indexOf($filter) >= 0) 
	            $(val).show();
	        else
	            $(val).hide();
	    });

	    if(parseInt($year1.val())>0)
	    {
	    	$rows = $(".filters__results .centers .row:visible");
		    $filter = $year1.val();
		    $.each($rows, function(i, val){
		        $year = $(val).find(".year").text();
		        console.log($year+ " " + $filter + ($year >= $filter));
		        if (parseInt($year) >= parseInt($filter)) 
		            $(val).show();
		        else
		            $(val).hide();
			});
		}

	    if(parseInt($year2.val())>0)
	    {
	    	$rows = $(".filters__results .centers .row:visible");
			$filter = $year2.val();
		    $.each($rows, function(i, val){
		        $year = $(val).find(".year").text();
		        if (parseInt($year) <= parseInt($filter)) 
		            $(val).show();
		        else
		            $(val).hide();
		    });
	    }
	    $rows = $(".filters__results .centers .row:visible");

		$.each($universities, function(i, foc){
	        if ($(this).is(':checked')) {
	        	$filter = $(foc).parent().find("label").text().toUpperCase();
    			$.each($rows, function(j, val){
			        $university = $(val).find(".universities").text();
			        if ($university.toUpperCase().indexOf($filter) >= 0) 
			            $(val).show();
			        else
			            $(val).hide();
		    	});
  			}
	    });
		
	    $rows = $(".filters__results .centers .row:visible");

	    $.each($locations, function(i, foc){
	        if ($(this).is(':checked')) {
	        	$filter = $(foc).parent().find("label").text().toUpperCase();
    			$.each($rows, function(j, val){
			        $location = $(val).find(".location").text();
			        if ($location.toUpperCase().indexOf($filter) >= 0) 
			            $(val).show();
			        else
			            $(val).hide();
		    	});
  			}
	    });
	    
	    $rows = $(".filters__results .centers .row:visible");

	    $.each($focuses, function(i, foc){
	        if ($(this).is(':checked')) {
	        	$filter = $(foc).parent().find("label").text().toUpperCase();
    			$.each($rows, function(j, val){
			        $focus = $(val).find(".focus").text();
			        if ($focus.toUpperCase().indexOf($filter) >= 0) 
			            $(val).show();
			        else
			            $(val).hide();
		    	});
  			}
	    });
		createTags();
	}
}
});