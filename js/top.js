import { supabase } from "./supabase.js"

export async function loadTop() {
  const container = document.getElementById("top-users")

  const { data, error } = await supabase
    .from("top_users")
    .select("id, name, score")
    .order("score", { ascending: false })
    .limit(15)

  if (error) {
    container.textContent = error.message
    return
  }

  container.innerHTML = ""

  data.forEach(u => {
    const row = document.createElement("div")
    row.className = "top-row"

    row.innerHTML = `
      <span class="top-name">${u.name}</span>
      <span class="top-count">${u.score}</span>
    `

    container.appendChild(row)
  })
}
