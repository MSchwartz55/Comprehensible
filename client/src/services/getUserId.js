const getUserId = async () => {
  const response = await fetch("/api/v1/user-sessions/current", {
    headers: new Headers({
      "Content-Type": "application/json",
    })
  })
  if (!response.ok) {
    return null;
  }
  const userData = await response.json()

  return userData.id
}

export default getUserId;