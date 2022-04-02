const card_type_suffix = {
	"stats": "",
	"pin": "/pin/",
	"top-langs": "/top-langs/"
}

const exclusive_options = {
	"stats": [
		wrapInput("text", "hide", "Hide items:"),
		wrapInput("checkbox", "hide_title", "Hide title:"),
		wrapInput("checkbox", "hide_rank", "Hide rank:"),
		wrapInput("checkbox", "show_icons", "Show icons:"),
		wrapInput("checkbox", "include_all_commits", "Include all comits:"),
		wrapInput("checkbox", "count_private", "Count private:"),
		wrapInput("number", "line_height", "Line height:"),
		wrapInput("text", "custom_title", "Custom title:"),
		wrapInput("checkbox", "disable_animations", "Disable animations:")
	],	
	"pin": [
		wrapInput("text", "repo", "Repository:", "github-readme-stats")
	],
	"top-langs": [
		wrapInput("text", "hide", "Hide languages:"),
		wrapSelect("layout","Layout:",[["default","Default"],["compact","Compact"]]),
		wrapInput("number", "card_width", "Card width:"),
		wrapInput("number", "langs_count", "Languages count:",5,"min=1 max=10 step=1"),
		wrapInput("text", "exclude_repo", "Exclude repositories:"),
		wrapInput("text", "custom_title", "Custom title:")
	]
}


const domain = "https://github-readme-stats.vercel.app/api"


window.onload = () => {
	var gen_data = {}
	var exl_data = {}


	//input containers
	const link_container = document.getElementById("link")
	const card_type_container = document.getElementById("card_type")
	const username_container = document.getElementById("username")
	const excl_opt_container = document.getElementById("exl_opt_container")
	const auto_update_container = document.getElementById("auto-update")
	//other stuff
	const preview_img = document.getElementById("preview")
	const copy_button = document.getElementById("copy_button")
	const update_button = document.getElementById("update_button")

	auto_update_container.onchange = () => {
		console.log("test", update_button.parentElement.hidden, auto_update_container.checked)
		update_button.parentElement.hidden = auto_update_container.checked
	}
	update_button.onclick = () => {
		updatePreview()
	}


	card_type_container.onchange = () => {
		preview_img.className = card_type_container.value
		updateExtraOptions()
		if (auto_update_container.checked) updatePreview()
	}

	username_container.onchange = () => updatePreview()
	document.querySelectorAll("input").forEach(i => {
		if (!["username","repository","auto-update"].includes(i.name)) {
			i.onchange = () => {
				gen_data[i.name] = formatValue(i)
				if (auto_update_container.checked) updatePreview()
			}
		}
	})
	copy_button.onclick = () => {
		link_container.select()
		document.execCommand('copy')
	}
	link_container.onchange = () => preview_img.src = link_container.value
	
	init()






	function init() {
		updatePreview()
		updateExtraOptions()
		preview_img.className = card_type_container.value
	}
	function updatePreview() {
		var args = ""
		for (var key in gen_data) args += "&"+key+"="+encodeURIComponent(gen_data[key])
		for (var key in exl_data) args += "&"+key+"="+encodeURIComponent(exl_data[key])
		link_container.value =
			domain
			+ card_type_suffix[card_type_container.value]
			+ "?username="
			+ username_container.value
			+ args
		preview_img.src = link_container.value
	}
	function updateExtraOptions() {
		excl_opt_container.innerHTML = exclusive_options[card_type_container.value].join("")
		exl_data = {}
		if (card_type_container.value === "pin") exl_data["repo"] = "github-readme-stats"
		excl_opt_container.querySelectorAll("input,select").forEach(i => {
			i.onchange = () => {
				exl_data[i.name] = formatValue(i)
				if (auto_update_container.checked) updatePreview()
			}
		})
	}
	function formatValue(elem) {
		if (elem.type === "color") return elem.value.replace("#", "")
		else if (elem.type === "checkbox") return elem.checked
		else return elem.value
	}
}

function wrapInput(type, name, label, defaultvalue, options) {
	return `
		<div>
		<label for=${name}>${label}</label>
		<input type=${type} id=${name} name=${name} 
		${defaultvalue !== undefined ? "value=" + defaultvalue : ""} 
		${options !== undefined ? options : ""}
		>
	</div>
	`
}
function wrapSelect(name, label, values) {
	var options = ""
	values.forEach(v => {
		options += `<option value=${v[0]}>${v[1]}</option>`
	})
	return `<div>
		<label for=${name}>${label}</label><select name=${name} id=${name}>
			${options}
		</select>
	</div>`
}