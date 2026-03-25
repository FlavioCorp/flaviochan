import { supabase } from "./supabase.js"

export async function loadBoards() {
  const { data, error } = await supabase
    .from("boards")
    .select("*")
    .order("slug")

  if (error) {
    console.error(error)
    return
  }

  const list = document.getElementById("boards-list")
  list.innerHTML = ""

  data.forEach(board => {
    const link = document.createElement("a")
    link.href = `/board.html?b=${board.slug}`
    link.textContent = `/${board.slug}/ - ${board.name}`
    list.appendChild(link)
    list.appendChild(document.createElement("br"))
  })
}
