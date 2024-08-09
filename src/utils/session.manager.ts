export function isTokenExpired() {
  const tokenData = JSON.parse(localStorage.getItem("sessionTokenData") as any);
  if (!tokenData) return true; // No token stored

  const currentTime = Date.now();
  const sixHoursInMillis = 6 * 60 * 60 * 1000;

  return currentTime - tokenData.timestamp >= sixHoursInMillis;
}

export async function refreshSessionToken() {
  try {
    const response = await fetch(
      "https://opentdb.com/api_token.php?command=request",
      {
        method: "POST",
      }
    );
    const data = await response.json();
    const newTokenData = {
      token: data.token,
      timestamp: Date.now(),
    };
    localStorage.setItem("sessionTokenData", JSON.stringify(newTokenData));
    return data.token;
  } catch (err) {
    console.error(err);
  }
}

// Example usage before making an API call:
