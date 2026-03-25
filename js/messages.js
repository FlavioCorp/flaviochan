import { supabase } from "./supabase.js"

document.getElementById("send-message").onclick = async () => {
  const content = document.getElementById("admin-message").value

  if (!content) return

  const { error } = await supabase
    .from("messages")
    .insert([{ content }])

  if (error) {
    document.getElementById("msg-status").textContent = "Error sending message"
  } else {
    document.getElementById("msg-status").textContent = "Message sent!"
    document.getElementById("admin-message").value = ""
  }
}
