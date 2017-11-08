window.addEventListener('load', logoutLoad, false);

function logoutLoad(){
	document.getElementById('logout-link').addEventListener("click",function(evt){
		evt.preventDefault();
		document.getElementById("logout-form").submit();
	});
	console.log('helper');
}