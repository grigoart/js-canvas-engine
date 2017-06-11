const SELECTED_MENU_ITEM_CLASS = "sideBarSelected"
const SIDEBAR_SELECTOR = ".sideBar"
const SIDEBAR_ELEMENT_CLASSNAME = "sideBarElement"
const MENU_PATH = "leftMenu.html"

addEventListener("load", () => {
	loadMenuFile().then(
		menuHtml => initializeMenu(menuHtml),
		errorMsg => document.body.innerHTML = errorMsg
	)
	.then(
		() => selectMenuItem()
	)
})

function initializeMenu(contentHtml) {
	document.querySelector(SIDEBAR_SELECTOR).innerHTML = contentHtml
}

function selectMenuItem() {
	let page = /\/([\.A-Za-z]+)$/gi.exec(location.href)
	if (page == null) page = ["", "index.html"]
	if (!page[1]) return
	let navItem = document.querySelector(`[href*='${page[1]}']`)
	if (!navItem) return
	let navItemParent = navItem.parentElement
	if (navItemParent && navItemParent.classList.contains(SIDEBAR_ELEMENT_CLASSNAME)) navItemParent.classList.add(SELECTED_MENU_ITEM_CLASS)
}

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