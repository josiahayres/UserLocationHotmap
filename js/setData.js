function submitMe()
{
   variableString = 'name='+$("#name").val()+'&location='+$("#location").val();
   jQuery.ajax({
   type: "POST",
   url: "http://google.com/some.php",
   data: variableString,
   success: function(msg){
	 alert( "Data Saved: " + msg );
   }
 });
}