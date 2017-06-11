const hintStyle = (backColor="#000000")=>`
    .hint {
		cursor: pointer;
		position: absolute;
		left: -15.5em;
		top: 2%;
		transition: 0.25s;
		padding: 1em 0.25em;
	}
	.hint {
		visibility: visible;
		opacity: 1;
		transition: opacity 2s linear;
		width: 12em;
		color: #FFFFFF;
		background: ${backColor};
		height: 30px;
		line-height: 30px;
		text-align: center;
	}
	.hint:after {
		content: '';
		position: absolute;
		top: 50%;
		left: 100%;
		margin-top: -1em;
		width: 0; height: 0;
		border-left: 1em solid ${backColor};
		border-top: 1em solid transparent;
		border-bottom: 1em solid transparent;
	}
	.hint.hide {
		visibility: hidden;
		opacity: 0;
		transition: visibility 0s 1s, opacity 1s linear;
	}
	.bounce {
		animation: bounce 2s infinite;
		-webkit-animation: bounce 2s infinite;
		-moz-animation: bounce 2s infinite;
		-o-animation: bounce 2s infinite;
	}
	@-webkit-keyframes bounce {
		0%, 20%, 50%, 80%, 100% {-webkit-transform: translateX(0);} 
		40% {-webkit-transform: translateX(-30px);}
		60% {-webkit-transform: translateX(-15px);}
	}
	@-moz-keyframes bounce {
		0%, 20%, 50%, 80%, 100% {-moz-transform: translateX(0);}
		40% {-moz-transform: translateX(-30px);}
		60% {-moz-transform: translateX(-15px);}
	}
	@-o-keyframes bounce {
		0%, 20%, 50%, 80%, 100% {-o-transform: translateX(0);}
		40% {-o-transform: translateX(-30px);}
		60% {-o-transform: translateX(-15px);}
	}
	@keyframes bounce {
		0%, 20%, 50%, 80%, 100% {transform: translateX(0);}
		40% {transform: translateX(-30px);}
		60% {transform: translateX(-15px);}
	}
`

function showHint(text, backColor="#000000", dontShowAgain) {
	let style = document.createElement("style")
	style.innerHTML = hintStyle(backColor)
	document.head.appendChild(style)
	let element = document.createElement("div")
	element.innerHTML = text
	element.className = "hint bounce"
	element.addEventListener("click", ()=>closeHint(element, dontShowAgain))
	document.querySelector(".infoPanelClose").addEventListener("click", ()=>element.classList.add("hide"))
	document.querySelector(".infoPanel").insertBefore(element, document.querySelector(".infoPanelClose"))
}

if (localStorage.getItem("hintNeeded") != "false") showHint("Click for more info", "#000000", true)

function closeHint(element, dontShowAgain) {
	if (dontShowAgain) localStorage.setItem("hintNeeded", false)
	element.classList.add("hide")
	document.querySelector(".infoPanelClose").click()
}