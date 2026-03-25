const header = document.createElement("div")
header.id = "globalHeader"

header.innerHTML = `
  <div id="userBar"></div>
`

document.body.prepend(header)