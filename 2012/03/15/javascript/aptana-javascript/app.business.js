/**
 * @author Louis Kenney
 */

// depends on jquery-1.7.1

// This is the core business rules and
// contains the actual conversion code

/**
 * Conversion enum
 * only two types available
 */
function ConversionEnum() {
    this.DEGREES = 1;
    this.RADIANS = 2;
}

/**
 *  Represents the saved information in
 *  the saves list
 */
function SaveSlot(text){
    this.Text = text;
}

/**
 * The business logic 'class'
 * 
 * Pass in how many save slots are 
 * allowed to be stored
 */
function business(saveSlots) {

    /**
     * Access to the conversion enum
     */
    this.Conversions = new ConversionEnum();
    
    /**
     * List of saves
     */
    this.Saves = new Array();
    
    /**
     * Maximum number of save slots allowed
     * before the oldest save gets overriden
     */
    this.MaximumSaveSlots = saveSlots;
    
    /**
     * Run the calculation for the given inputs
     * Function CalculateResult ( value as decimal, type as int )
     */
    this.CalculateResult = function(valueToConvert, conversionType) {

        // result as decimal
        var result;

        // IF type is equal to 1 THEN
        if(conversionType == this.Conversions.DEGREES) {

            // result = ToDegrees ( value )
            result = this.ToDegrees(valueToConvert);

            // ELSE IF type is equal to 2 THEN
        } else if(conversionType == this.Conversions.RADIANS) {

            // result = ToRadians ( value )
            result = this.ToRadians(valueToConvert);

            // FI
        }

        // Return result
        return result;

        // End Function
    }

    /**
     * Convert value to Degrees
     * 
     * Function ToDegrees (value as decimal)
     */
    this.ToDegrees = function(valueToConvert) {
        // degrees as decimal
        var degrees;

        // degrees = value * (180 / PI)
        degrees = valueToConvert * (180 / Math.PI);

        // Return degrees
        return degrees;

        // End Function
    }

    /**
     * Convert the value to Radians
     * 
     * Function ToRadians ( value as decimal)
     */
    this.ToRadians = function(valueToConvert) {
        // radians as decimal
        var radians;

        // radians = value * (PI / 180)
        radians = valueToConvert * (Math.PI / 180);

        // Return radians
        return radians;

        // End Function
    }

    /**
     * Add the value to the Saves list
     * 
     * signature changed from initial design
     * original was : 
     * Function AddToSaves ( value as decimal, type as int )
     */
    this.AddToSaves = function(value, result, type) {
        
        // IF saves.Length is greater than or equal to 10 THEN
        if(this.Saves.length >= this.MaximumSaveSlots) {
            
            // Remove oldest save from list
            this.Saves.splice(0,1);
                        
        // FI
        }
        
        var text = value.toString();
        
        if(type == this.Conversions.DEGREES) {
            text = text + ' Radians = ' + result.toString() + ' Degrees';    
        }
        else {
            text = text + ' Degrees = ' + result.toString() + ' Radians';
        }
        
        // Add value, type current date and time to the Saves list
        this.Saves[this.Saves.length] = new SaveSlot(text);
        
        // End Function
    }
}

var appBusiness = new business(10);
