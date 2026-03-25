import { supabase } from "./supabase.js"

console.log("USERBAR LOADED")

async function loadUserBar(){

const bar = document.getElementById("userBar")
if(!bar) return

const { data:{ session } } = await supabase.auth.getSession()

/* USER NOT LOGGED */

if(!session){

bar.innerHTML = `<a class="userbar-btn" href="login.html">Login</a> <a class="userbar-btn" href="register.html">Register</a>`
return
}

const user = session.user

/* LOAD PROFILE */

const { data, error } = await supabase
.from("profiles")
.select("username, avatar_url, role")
.eq("id", user.id)
.single()

if(error){

console.log(error)

bar.innerHTML = `<span>Lo siento broder no cargo nada xdxd</span> <button id="logoutBtn" class="userbar-btn">Salir,,</button>`

return
}

/* ROLE BADGE */

let badge=""

if(data.role==="admin"){
badge=`<span class="rank-admin">ADMIN</span>`
}else if(data.role==="mod"){
badge=`<span class="rank-mod">MOD</span>`
}else{
badge=`<span class="rank-user">USUARIO</span>`
}

/* USERBAR HTML */

bar.innerHTML = `

<div id="notifIcon">

<svg width="20" height="20" viewBox="0 0 24 24" fill="white">
<path d="M12 22a2 2 0 002-2h-4a2 2 0 002 2zm6-6V11a6 6 0 10-12 0v5l-2 2v1h16v-1l-2-2z"/>
</svg>

<span id="notifBadge"></span>

</div>

<div id="notifPanel"></div>

<img class="userbar-avatar" src="${data.avatar_url || "img/avatar1.png"}">

<span class="userbar-name">${data.username}</span>

${badge}

<a class="userbar-btn" href="profile.html">Perfil!!</a>

<button class="userbar-btn" id="logoutBtn">Salir,,</button>

`

/* LOGOUT */

document.getElementById("logoutBtn").onclick = async () => {
await supabase.auth.signOut()
location.reload()
}

/* ELEMENTS */

const notifIcon = document.getElementById("notifIcon")
const notifBadge = document.getElementById("notifBadge")
const notifPanel = document.getElementById("notifPanel")

notifPanel.style.display="none"

/* LOAD NOTIFICATIONS */

async function loadNotifications(){

const { data:notifications } = await supabase
.from("notifications")
.select("*")
.eq("user_id",user.id)
.order("created_at",{ascending:false})
.limit(20)

notifPanel.innerHTML=""

let unread=0

if(!notifications || notifications.length===0){

notifPanel.innerHTML=`

<div style="padding:10px;text-align:center;color:#356;">
No notifications
</div>
`

notifBadge.style.display="none"
return
}

for(const n of notifications){

if(!n.is_read) unread++

const { data:sender } = await supabase
.from("profiles")
.select("username,user_tag")
.eq("id",n.sender_id)
.single()

const name=sender?.username || "User"
const tag=sender?.user_tag || ""

const div=document.createElement("div")

div.style.padding="6px"
div.style.borderBottom="1px solid #b8dcff"
div.style.cursor="pointer"

div.innerHTML=`<b>${name}</b> comentó tu post`

div.onclick=async()=>{

await supabase
.from("notifications")
.update({is_read:true})
.eq("id",n.id)

window.location.href=`profile.html?user=${tag}`

}

notifPanel.appendChild(div)

}

notifBadge.textContent=unread
notifBadge.style.display = unread>0 ? "block" : "none"

}

/* TOGGLE PANEL */

notifIcon.onclick = async ()=>{

if(notifPanel.style.display==="block"){

notifPanel.style.display="none"

}else{

notifPanel.style.display="block"

/* MARK ALL AS READ */

await supabase
.from("notifications")
.update({is_read:true})
.eq("user_id",user.id)

/* HIDE RED BADGE */

notifBadge.style.display="none"

loadNotifications()

}

}

/* INITIAL LOAD */

loadNotifications()

}

loadUserBar()
