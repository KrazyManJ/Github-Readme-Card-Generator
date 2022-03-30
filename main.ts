const domain: string = "https://github-readme-stats.vercel.app/api"
var link: string = domain

var gen_opt_meta:any = {}
var exl_opt_meta: any = {}

const options:any = {
	"stats":`
	Hide items: <input type=text name=hide >  
	<br>Hide title: <input type=checkbox name=hide_title >  
	<br>Hide rank: <input type=checkbox name=hide_rank >  
	<br>Show icons: <input type=checkbox name=show_icons >  
	<br>Include all commits: <input type=checkbox name=include_all_commits > 
	<br>Count private: <input type=checkbox name=count_private > 
	<br>Line height: <input type=number name=line_height > 
	<br>Custom title: <input type=text name=custom_title > 
	<br>Disable animations: <input type=checkbox name=disable_animations > 
	`,
	"pin": `
	There are no extra options!
	`,
	"top-langs":`
	Hide languages: <input type=text name=hide >
	<br>Hide title: <input type=checkbox name=hide_title >
	<br>Layout:
	<select id="layout" name="layout">
		<option value="default" >Default</option>
		<option value="compact" >Compact</option>
	</select>
	<br>Card width: <input type=text name=card_width >
	<br>Languages count: <input type=number name=langs_count value=5 min=1 max=10 step=1>
	<br>Exclude repositories: <input type=text name=exclude_repo >
	<br>Custom title: <input type=text name=custom_title >
	`,
}

window.onload = () => {
	const repo_name_sel = <HTMLInputElement>document.querySelector("input#repo")
	var repo_name = repo_name_sel.value
	repo_name_sel.addEventListener("change", () => {
		repo_name = repo_name_sel.value
		updatePreview()
	})

	const card_type_sel = <HTMLSelectElement> document.querySelector("select#card_type")
	var card_type = card_type_sel.value
	card_type_sel.addEventListener("change", () => {
		exl_opt_meta = {}
		if (selectValueName(card_type_sel) == "pin") repo_name_sel.disabled = false
		else {
			repo_name_sel.disabled = true;	
		}
		updateOptions()
		card_type = card_type_sel.value
		updatePreview()
	})
	const username_sel = <HTMLInputElement> document.querySelector("input#username")
	var username = username_sel.value
	username_sel.addEventListener("change", () => {
		username = username_sel.value
		updatePreview()
	})
	

	const gen_options = document.querySelectorAll(`
		form#general_options input,
		form#general_options select
	`)
	
	
	const preview = <HTMLImageElement> document.getElementById("preview")

	gen_options.forEach(e => e.addEventListener("change", () => {
		if (e instanceof HTMLInputElement) gen_opt_meta[e.name] = formatValue(e)
		else if (e instanceof HTMLSelectElement) gen_opt_meta[e.name] = e.value
		updatePreview()
	}))


	const link_win:HTMLTextAreaElement = <HTMLTextAreaElement> document.querySelector("textarea#link")
	updatePreview()
	updateOptions()



	function updatePreview() {
		var args:string = repo_name_sel.disabled ? "" : "&repo="+repo_name
		for (var key in gen_opt_meta) args += "&" + key + "=" + gen_opt_meta[key]
		for (var key in exl_opt_meta) args += "&" + key + "=" + exl_opt_meta[key]
		var l_link = link + card_type + "?username=" + username + args
		preview.setAttribute("src", l_link)
		link_win.value = l_link
	}
	
	function formatValue(e: HTMLInputElement) {
		switch (e.type) {
			case "color": return e.value.replace("#", "")
			case "checkbox": return e.checked;
			default: return e.value
		}
	}

	function selectValueName(e: HTMLSelectElement): string {
		var val = e.selectedOptions[0].getAttribute("name")
		return val !== null ? val : ""
	}

	function updateOptions() {
		(<Element>document.getElementById("exclusive_options")).innerHTML =  options[selectValueName(card_type_sel)]
		const exl_options = document.querySelectorAll(`
			form#exclusive_options input,
			form#exclusive_options select
		`)
		console.log(exl_options)
		exl_options.forEach(e => e.addEventListener("change", () => {
			console.log("skadu")
			if (e instanceof HTMLInputElement) exl_opt_meta[e.name] = formatValue(e)
			else if (e instanceof HTMLSelectElement) exl_opt_meta[e.name] = e.value
			updatePreview()
		}))
	}
}