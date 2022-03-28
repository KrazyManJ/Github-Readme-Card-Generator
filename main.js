"use strict";

var link = "https://github-readme-stats.vercel.app/api";

window.onload = () => {
	const preview = document.getElementById("preview")
	const cardSelector = document.getElementById("card_type")
    
	load()

	function load() {
		document.querySelectorAll('form > input:not([name="username"])').forEach(f => {
			f.setAttribute("changed", "false");
			f.addEventListener("input", () => {
				if (f.getAttribute("changed") === "false") f.setAttribute("changed", "true");
			});
		});
		updateExclusiveOptions()
		cardSelector.onchange = () => updateExclusiveOptions()


		updatePreview();
		document.querySelectorAll("input, select").forEach(e => {
			e.addEventListener("change", () => updatePreview() );
		})
		document.getElementById("exclusive_options").onchange = () => updatePreview()
	}

	function updateExclusiveOptions() {
		var exl_html
			switch (cardSelector.value) {
				case "":
					exl_html = `
					Hide items: <input type=text name=hide >  
					<br>Hide title: <input type=checkbox name=hide_title >  
					<br>Hide rank: <input type=checkbox name=hide_rank >  
					<br>Show icons: <input type=checkbox name=show_icons >  
					<br>Include all commits: <input type=checkbox name=include_all_commits > 
					<br>Count private: <input type=checkbox name=count_private > 
					<br>Line height: <input type=number name=line_height > 
					<br>Custom title: <input type=text name=custom_title > 
					<br>Disable animations: <input type=checkbox name=disable_animations > 
					`
					break;
				case "/pin/":
					exl_html = `
						Repository: <input type=text name=repo value=KrazyHackerTypingGame >
					`
					break;
				case "/top-langs/":
					exl_html = `
					Hide languages: <input type=text name=hide >
					<br>Hide title: <input type=checkbox name=hide_title >
					<br>Layout:
					<select id="card_type">
						<option name="default" >Default</option>
						<option name="compact" >Compact</option>
					</select>
					<br>Card width: <input type=text name=card_width >
					<br>Languages count: <input type=number name=langs_count value=5 min=1 max=10 step=1>
					<br>Exclude repositories: <input type=text name=exclude_repo >
					<br>Custom title: <input type=text name=custom_title >
					`
					break;
			}
			document.getElementById("exclusive_options").innerHTML = exl_html
	}

	function updatePreview() {
		var params = [];
		var type = document.getElementById("card_type").value
        document.querySelectorAll("input").forEach(e => {
            if (e.getAttribute("changed") != "false")
                switch (e.getAttribute("type")) {
                    case "color":
                        params.push(`${e.getAttribute("name")}=${e.value.replace("#", "")}`);
                        break;
                    case "checkbox":
                        params.push(`${e.name}=${e.checked ? "true" : "false"}`);
                        break;
                    case "text":
                        if (e.value.length > 0)
                            params.push(`${e.name}=${escape(e.value)}`);
                        break;
                    default:
                        params.push(`${e.name}=${escape(e.value)}`);
                        break;
                }
		});
		console.log("updated")
        preview.setAttribute("src", link + type + "?" + params.join("&"));
    }

    function registerSaveCheck() {
        window.onbeforeunload = (e) => {
            e = e || window.event;
            var message = null;
            if (e) {
                e.returnValue = message;
            }
            return message;
        };
    }
};
