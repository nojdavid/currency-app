function submitForm() {

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    if (this.status !== 200) {
      const res = JSON.parse(this.responseText);
      document.getElementById("answer").innerHTML = res.error;
    }
    
    if (this.readyState == 4 && this.status == 200) {
    	const res = JSON.parse(this.responseText);
      document.getElementById("answer").innerHTML = "Total: $" + res.bananaCost;
    }
  };
  
  var date = document.getElementById("start").value;
  var range = document.getElementById("range").value;
  var url = "http://localhost:5000/bananas" + "?date=" + date + "&range=" + range;
  xhttp.open("GET", url, true);
  xhttp.send();
}