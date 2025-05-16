const searchBtn = document.getElementById("searchBtn");
const profile = document.getElementById("profile");

const fetchGitHubProfile = async () => {
  const username = document.getElementById("username").value.trim();

  if (!username) {
    profile.innerHTML = "<p>Please enter a GitHub username.</p>";
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();

    if (data.message === "Not Found") {
      profile.innerHTML = "<p>User not found. Try again.</p>";
      return;
    }

    const { avatar_url, name, bio, public_repos, html_url } = data;

    profile.innerHTML = `
      <div class="profile-card">
        <img src="${avatar_url}" alt="Avatar">
        <h2>${name || "No Name Provided"}</h2>
        <p>${bio || "No bio available."}</p>
        <p><strong>Repos:</strong> ${public_repos}</p>
        <a href="${html_url}" target="_blank">View Profile</a>
      </div>
    `;
  } catch (error) {
    profile.innerHTML = "<p>Something went wrong. Try again later.</p>";
    console.error(error);
  }
};

searchBtn.addEventListener("click", fetchGitHubProfile);
