import { supabase } from "./supabase.js"

let currentUser = null
let currentProfile = null

// Obtener usuario actual
export async function initAuth() {

  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    return null
  }

  currentUser = data.user

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", currentUser.id)
    .single()

  if (error) {
    console.error("Profile error:", error)
    return null
  }

  currentProfile = profile

  // Si está baneado
  if (profile.is_banned) {
    await supabase.auth.signOut()
    alert("You are banned.")
    location.reload()
    return null
  }

  return {
    user: currentUser,
    profile: currentProfile
  }
}

// Saber si hay usuario logueado
export function isLoggedIn() {
  return currentUser !== null
}

// Obtener username
export function getUsername() {
  if (!currentProfile) return "Anonymous"
  return currentProfile.username
}

// Saber si es admin
export function isAdmin() {
  if (!currentProfile) return false
  return currentProfile.is_admin === true
}

// Logout
export async function logout() {
  await supabase.auth.signOut()
  location.reload()
}