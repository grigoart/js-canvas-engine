const SELECTED_MENU_ITEM_CLASS = "sideBarSelected"
const SIDEBAR_SELECTOR = ".sideBar"
const SIDEBAR_ELEMENT_CLASSNAME = "sideBarElement"
const MENU_PATH = "leftMenu.html"

//add menu after page loaded
addEventListener("load", () => {
	loadMenuFile().then(
		menuHtml => initializeMenu(menuHtml),
		errorMsg => document.body.innerHTML = errorMsg
	)
	.then(
		() => selectMenuItem()
	)
})

//put content html to menu block
function initializeMenu(contentHtml) {
	document.querySelector(SIDEBAR_SELECTOR).innerHTML = contentHtml
}

//find menu element with same href as in windows location and add SELECTED_MENU_ITEM_CLASS class
function selectMenuItem() {
	let page = /\/([\.A-Za-z]+)$/gi.exec(location.href)
	if (page == null) page = ["", "index.html"]
	if (!page[1]) return
	let navItem = document.querySelector(`[href*='${page[1]}'] div`)
	if (!navItem) return
	if (navItem.classList.contains(SIDEBAR_ELEMENT_CLASSNAME)) navItem.classList.add(SELECTED_MENU_ITEM_CLASS)
}

//AJAX request to get html menu content
function loadMenuFile() {
	return new Promise(function(resolve, reject) {
		var xhr = new XMLHttpRequest()
		xhr.addEventListener("load", ()=>{
			if (xhr.status == 200) {
				resolve(xhr.response)
			}
			else {
				reject(xhr.statusText)
			}
		})
		xhr.addEventListener("error", ()=>{
			reject(xhr.statusText)
		})
		xhr.open('GET', MENU_PATH, true)
		xhr.send()
	});
}