// Client-side search over the JSON index that Hugo renders from layouts/home.json.
const script = document.currentScript;
const input = document.getElementById("search-input");
const status = document.getElementById("search-status");
const results = document.getElementById("search-results");

const escape = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

function card(post) {
  const image = post.image
    ? `<img class="card__image" src="${post.image}" width="720" height="450" alt="" loading="lazy">`
    : "";
  const tag = post.tags.length ? `<span class="card__tag">${escape(post.tags[0])}</span>` : "";
  return `<article class="card">${image}
    <div class="card__body">${tag}
      <h2 class="card__title"><a href="${post.url}">${escape(post.title)}</a></h2>
      <p class="card__summary">${escape(post.summary)}</p>
    </div>
    <footer class="card__footer">
      <span class="card__more" aria-hidden="true">Read more</span>
      <time datetime="${post.datetime}">${post.date}</time>
    </footer>
  </article>`;
}

function matches(post, terms) {
  const text = [post.title, post.summary, ...post.tags].join(" ").toLowerCase();
  return terms.every((term) => text.includes(term));
}

fetch(script.dataset.index)
  .then((response) => response.json())
  .then((posts) => {
    const run = () => {
      const terms = input.value.toLowerCase().split(/\s+/).filter(Boolean);
      if (!terms.length) {
        results.innerHTML = "";
        status.textContent = "";
        return;
      }
      const found = posts.filter((post) => matches(post, terms));
      results.innerHTML = found.map(card).join("");
      status.textContent = found.length === 1 ? "1 post found" : `${found.length} posts found`;
    };
    input.addEventListener("input", run);
    const query = new URLSearchParams(location.search).get("q");
    if (query) input.value = query;
    run();
  })
  .catch(() => {
    status.textContent = "Search is unavailable right now.";
  });
