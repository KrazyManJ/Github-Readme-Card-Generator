var link = "https://github-readme-stats.vercel.app/api?"

interface theme {
	name: string
	title_color: string
	icon_color: string
	text_color: string
	bg_color: string | string[]
}

window.onload = () => {

	const input:HTMLFormElement = document.querySelector("form")
	const preview: HTMLElement = document.getElementById("preview")
	
	document.querySelectorAll('form > input:not([name="username"])').forEach(f => {
		f.setAttribute("changed", "false")
		f.addEventListener("input", () => {
			if (f.getAttribute("changed") === "false") f.setAttribute("changed","true")
		})
	})

	updatePreview()
	
	document.getElementById("input").addEventListener("change", () => {
		updatePreview()
	})

	/**
	 * Updates preview image
	 */
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
		})
		preview.setAttribute("src",link+params.join("&"))
	}

	/**
	 * Register alert window upon leaving page
	 */
	function registerSaveCheck() {
		window.onbeforeunload = (e:BeforeUnloadEvent) => {
			e = e || window.event
			var message:null = null
			if (e) { e.returnValue = message }
			return message
		}
	}
}
