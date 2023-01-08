/**
 * @author Louis Kenney
 */

// depends on jquery-1.7.1
// depends on app.business.js

/**
 * Unit Test Suite for the App Business Functions
 */
function UnitTests() {

    if(appBusiness.Conversions.DEGREES != 1) {
        ReportFail('Degrees Constant incorrect. ' + appBusiness.Conversions.DEGREES);
    }
    if(appBusiness.Conversions.RADIANS != 2) {
        ReportFail('Radian Constant incorrect. ' + appBusiness.Conversions.RADIANS);
    }

    Test(1, 0.01745329251994329576923690768489);
    Test(2, 0.03490658503988659153847381536977);
    Test(3, 0.05235987755982988730771072305466);
    Test(4, 0.06981317007977318307694763073954);
    Test(5, 0.08726646259971647884618453842443);
    Test(18, 0.31415926535897932384626433832795);
    Test(90, 1.5707963267948966192313216916398);
    Test(180, 3.1415926535897932384626433832795);

}

/**
 * Test all variants for the degrees-radians combo
 */
function Test(degrees, radians) {

    RadianTest(degrees, radians);
    CalculateTest(degrees, radians, appBusiness.Conversions.RADIANS, 'CalculateResult(Radians)');
    DegreeTest(radians, degrees);
    CalculateTest(radians, degrees, appBusiness.Conversions.DEGREES, 'CalculateResult(Degrees)');
}

/**
 * Test the underlying Radians conversion
 */
function RadianTest(value, expected) {
    var actual = appBusiness.ToRadians(value);

    if(actual == expected) {
        ReportSuccess('ToRadians() : ' + value.toString() + ' = ' + expected.toString() + ' Passed');
    } else {
        ReportFail('ToRadians() : ' + value.toString() + ' = ' + expected.toString() + ' Failed, actual was ' + actual.toString());
    }
}

/**
 * Test the underlying Degrees conversion
 */
function DegreeTest(value, expected) {
    var actual = appBusiness.ToDegrees(value);

    if(actual == expected) {
        ReportSuccess('ToDegrees : ' + value.toString() + ' = ' + expected.toString() + ' Passed');
    } else {
        ReportFail('ToDegrees : ' + value.toString() + ' = ' + expected.toString() + ' Failed, actual was ' + actual.toString());
    }
}

/**
 * Test the public conversion method
 */
function CalculateTest(value, expected, conversionType, method) {

    var actual = appBusiness.CalculateResult(value, conversionType);

    if(actual == expected) {
        ReportSuccess(method + ' : ' + value.toString() + ' = ' + expected.toString() + ' Passed');
    } else {
        ReportFail(method + ' : ' + value.toString() + ' = ' + expected.toString() + ' Failed, actual was ' + actual.toString());
    }
}

/**
 * Write out a success line
 */
function ReportSuccess(message) {
    $('#unitTestResults').append('<div style="color: green;">' + message + '<div>');
}

/**
 * Write out a failure line
 */
function ReportFail(message) {
    $('#unitTestResults').append('<div style="color: red;">' + message + '<div>');
}
