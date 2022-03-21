var link = "https://github-readme-stats.vercel.app/api?"

window.onload = () => {
	var input = document.querySelector("form");
	var preview = document.getElementById("preview")

	
	document.querySelectorAll('form > input:not([name="username"])').forEach(f => {
		f.setAttribute("changed", "false")
		f.addEventListener("input", () => {
			if (f.getAttribute("changed") === "false") f.setAttribute("changed","true")
		})
	})

	updatePreview()
	
	document.getElementById("input").addEventListener("change", () => {
		updatePreview()
		
		// Code for adding "are you sure to leave?"
		//
		// window.onbeforeunload = (e) => {
		// 	e = e || window.event
		// 	var message = null
		// 	if (e) { e.returnValue = message }
		// 	return message
		// }
	})


	function updatePreview() {
		
		var params:string[] = [];

	
		Array.from(input.elements).forEach(e => {
			if (e.getAttribute("changed") != "false") switch (e.getAttribute("type")) {
				case "color": 
					params.push(`${e.getAttribute("name")}=${e.value.replace("#","")}`)
					break;
				case "checkbox":
					params.push(`${e.name}=${e.value == "on" ? "true" : "false"}`)
					break;
				case "text":
					if (e.value.length > 0) params.push(`${e.name}=${e.value}`)
					break;
				default: 
					params.push(`${e.name}=${e.value}`)
					break
				
			}
		});
		preview.setAttribute("src",link+params.join("&"))
	}
}
