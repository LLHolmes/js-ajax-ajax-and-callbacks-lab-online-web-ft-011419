$(document).ready(function (){
});

function displayError() {
  $("#errors").html("I'm sorry, there's been an error. Please try again.");
};

function displayRepositories(response) {
// Attempt 3
  // console.log(r)
  // console.log(r.owner)  // undefined - [Object] in console.log(r)
  // console.log(r.items.name)  // undefined -
  // return `
  //   <div>
  //     <h3><a href="${r.html_url}">${r.name}</a></h3>
  //     <p>${r.description}</p>
  //     <p><a href="#" data-repository="${r.name}" data-owner="${r.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
  //   </div>
  // `
// WHY DID I HAVE TO GO INTO RESPONSE.ITEMS???

// Attempt 2 & 4
  // response.items.forEach(function(r) {
  //   $('.results').append(
  //     `
  //     <div>
  //       <h3><a href="${r.html_url}">${r.name}</a></h3>
  //       <img src="${r.owner.avatar_url}" alt="avatar">
  //       <p><a href="${r.owner.url}">${r.owner.login}</a></p>
  //       <p>${r.description}</p>
  //       <p><a href="#" data-repo="${r.name}" data-owner="${r.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
  //     </div>
  //     `
  //   );
  // });
// WHY DIDN'T .append WORK???

// Attempt 1 & 5
  const repoList = response.items.map(r => {
    return `
      <div>
        <h3><a href="${r.html_url}">${r.name}</a></h3>
        <img src="${r.owner.avatar_url}" alt="avatar">
        <p><a href="${r.owner.url}">${r.owner.login}</a></p>
        <p>${r.description}</p>
        <p><a href="#" data-repository="${r.name}" data-owner="${r.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
      </div>
      `
  }).join('');

  return repoList;


// REFERENCE CODES:
// Dalia's Study Group Lesson
  // function addFollowersToDom(followersArray) {
  //   followersArray.forEach(function(follower) {
  //     $('.followers').append(`<li>${follower.login}</li>`)
  //   })
  // }

// Earlier Lab
  // function showRepositories() {
  //   var repos = JSON.parse(this.responseText);
  //   console.log(repos);
  //   const repoList = `<ul>${repos
  //     .map(
  //       r =>
  //         '<li>' +
  //         r.name +
  //         ' - <a href="#" data-repo="' +
  //         r.name +
  //         '" onclick="getCommits(this)">Get Commits</a></li>'
  //     )
  //     .join('')}</ul>`;
  //   document.getElementById('repositories').innerHTML = repoList;
  // }
  //

// Steven's Solution (handlebars in HTML)
  // {{#each items }}
  // <h2><a href="{{ html_url }}">{{ name }}</a></h2>
  // <p><a href="#" data-repository="{{ name }}" data-owner="{{ owner.login }}" onclick="showCommits(this)">Show Commits</a></p>
  // <p>{{ description }}</p>
  // <div>{{> userDetails owner }}</div>
  // <hr>
  // {{/each}}

// Solution
  // var renderSearchResult = (result) => {
  //   return `
  //       <div>
  //         <h2><a href="${result.html_url}">${result.name}</a></h2>
  //         <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
  //         <p>${result.description}</p>
  //       </div>
  //       <hr>
  //     `
  // }

};

function searchRepositories() {
  const searchTerm = $("#searchTerms").val();
  // console.log(`requested: ${searchTerm}`)
  $.get(`https://api.github.com/search/repositories?q=${searchTerm}`, response => {
    // displayRepositories(response)
    $("#results").html(displayRepositories(response));
  }).fail(displayError());
};

function displayCommits(response) {
  // list the SHA, the author, the author's login, and the author's avatar as an image
// console.log(response)
  const commitList = response.map(commit => {
    return `
      <div>
        <h3>${commit.sha}</h3>
        <img src="${commit.author.avatar_url}" alt="avatar">
        <p>${commit.author.login}</p>
        <p>${commit.commit.message}</p>
      </div>
      `
      // <li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>
  }).join('');

  return commitList;

};

function showCommits(repo) {
  const repository = repo.dataset.repository
  const owner = repo.dataset.owner

  $.get(`https://api.github.com/repos/${owner}/${repository}/commits`, response => {
    $("#details").html(displayCommits(response));
  }).fail(displayError());
};


$("#search").on('click', searchRepositories).fail(displayError());
