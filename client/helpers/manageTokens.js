// module for saving tokens to local storage
const TOKEN_KEY = "stampTokens";

const tokensValid = (tokens) => {
    if (tokens && tokens.accessToken && typeof tokens.accessToken === 'string') {
        return true;
    } else {
        return false;
    }
}
// tokens = { accessToken: "xyz" }
export function saveTokens(tokens) {
  if (tokensValid(tokens)) {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
  }
}

// Because we return the accessToken as a header, if it is malformed this can cause server errors that will persist until the client updates their localStorate.
// We check for this issue to frontrun this kind of failure.
export function getTokens() {
  const tokens = JSON.parse(localStorage.getItem(TOKEN_KEY));

  if (tokensValid(tokens)) {
    return tokens;
  }
}

export function deleteTokens() {
  localStorage.removeItem(TOKEN_KEY);
}

