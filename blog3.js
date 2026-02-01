
let state = {
  posts: JSON.parse(localStorage.getItem("posts")) || [],
  dark: true
};

function setState(newState) {
  state = { ...state, ...newState };
  localStorage.setItem("posts", JSON.stringify(state.posts));
  render();
}

function App() {
  return `
    <h1>⚡ Neon Blog</h1>

    <div class="toggle">
      <button onclick="toggleTheme()">🌙 / ☀️</button>
    </div>

    <input id="title" placeholder="Post title">
    <textarea id="content" placeholder="Write something cyberpunk..."></textarea>
    <button class="add-btn" onclick="addPost()">Publish</button>

    ${state.posts.map(post => Post(post)).join("")}
  `;
}

function Post(post) {
  return `
    <div class="post">
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <button onclick="deletePost(${post.id})">Delete</button>
    </div>
  `;
}

function addPost() {
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();
  if (!title || !content) return;

  setState({
    posts: [...state.posts, { id: Date.now(), title, content }]
  });

  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
}

function deletePost(id) {
  setState({
    posts: state.posts.filter(p => p.id !== id)
  });
}

function toggleTheme() {
  state.dark = !state.dark;
  document.body.classList.toggle("light", !state.dark);
}

function render() {
  document.getElementById("app").innerHTML = App();
}

render();
