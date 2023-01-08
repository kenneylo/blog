/**
 * @author Louis Kenney
 */

// depends on jquery-1.7.1
// depends on app.business.js

// This file handles all the GUI functionality
// hooking up buttons to the business and 
// handle rendering issues.

function gui(){
    
    /**
     * turn debug output on or off
     */
    this.Debug = false;
    
    /**
     * debug logging
     */
    this.Log = function(text){
       if(this.Debug) {
           $('#traceLog').append(text + '<br />');
       }
    }
    
	/**
	 *  Scrape data from screen and
	 *  calculate the new result
	 */
	this.Update = function() {
	    this.Log('Getting value');
	    
	    var usersValue = $('#usersValue').val();
	    
	    if(usersValue == '') {
	        this.Display('Results');
	    }
	    else {
    	    this.Log('Users entered ' + usersValue);
    	    
    	    usersValue = this.ValidateInput(usersValue);
    	    
    	    if(usersValue === null) {
    	        this.Display('Invalid input, enter a number.');
            }
            else {
                
        	    var conversionType = $('input[name=conversion]:checked').val();
        	    
        	    this.Log('Conversion value is ' + conversionType);
        	    
        	    var result = appBusiness.CalculateResult(usersValue, conversionType);
        	    
        	    this.Log('Result is ' + result);
        	    
        	    this.Display(result);
    	    }
	    }
	}
	
	/**
	 * validate the users value
	 */
	this.ValidateInput = function(input){
	    var result = parseFloat(input);
        	   
	    if( isNaN(result)){
            result = null;
        }
        
	    return result;
	}
	
	/**
	 * Display results to user
	 */
	this.Display = function(result){
	    $('#resultsDisplay').html(result.toString());
	}
	
	/**
	 * Render Saves list
	 */
	this.RenderSavesList = function() {
	   for(var i = 0; i < appBusiness.MaximumSaveSlots; i++){
	       
	       if(i > appBusiness.Saves.length){
	           this.RenderSave('- Empty -');
	       }
	       else 
	       {
    	       var save = appBusiness.Saves[i];
    	       
    	       if(save == null) {
    	           this.RenderSave('- Empty -');
    	       }
    	       else {
    	           this.RenderSave(save.Text);
    	       }
	       }
	   }
	}
	
	/**
	 * Render a save slot
	 */
    this.RenderSave = function(text){
        $('#usersSaves').append('<tr><td>'+ text +'</td></tr>');
    }
    
    /**
     * Clear all the save slots
     */
    this.ClearSaves = function(text){
        $('#usersSaves').html('');
    }
    
	/**
	 * Add to Saves
	 */
	this.AddToSaves = function(){
	    
	   var usersValue = $('#usersValue').val();
       var conversionType = $('input[name=conversion]:checked').val();
       var result = appBusiness.CalculateResult(usersValue, conversionType);
       
       appBusiness.AddToSaves(usersValue, result, conversionType);
	}
		
	/**
	 * Check if the key is a number
	 */
	this.AllowedInput = function(key) {
	    var result = false;
	    
	    if((key > 47 && key < 58) || // 0 to 9 
	        (key == 46) || // .
	        (key == 45) || // -
	        (key == 8) || // backspace
	        (key == 0) || // arrows, delete, e.t.c
	        (key == 13) ) { // enter
	            
	            result = true;
        }
	    
	    this.Log('Pressed ' + key);
	    
	    return result;
	}
}

var appGui = new gui();

/**
 *  When the DOM has finished loading
 */
$(function(){
    
    // Set up the GUI 
    
    // Render the user save slots
    appGui.RenderSavesList();
    
    // Hook up the add button click event
    $('#addToStore').click(function(){
       
       // Add to Saves
       appGui.AddToSaves();
       
       // Clear and render saves list 
       appGui.ClearSaves();
       appGui.RenderSavesList();
    });
    
    // Hook up the change event on the text field
    $('#usersValue').keyup(function(){
       
       appGui.Log('Value changed');
       appGui.Update();
        
    }).keypress(function(event){
       var allowed = appGui.AllowedInput(event.which);
       
       if(!allowed) {
           event.preventDefault();
       }
       
       return allowed;   
    });
    
    // Hook up the change event on the radio buttons
    $('input[name=conversion]').click(function(){
        $('#usersValue').keyup();
    });
});
