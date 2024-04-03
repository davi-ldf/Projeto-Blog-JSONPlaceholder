// https://jsonplaceholder.typicode.com/posts

async function readPosts() {
    let postArea = document.querySelector('.posts');
    postArea.innerHTML = 'Loading...';

    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    let json = await response.json();

    if(json.length > 0) { //se houverem posts
        postArea.innerHTML = ''; //o 'Loading...' será limpo

        for( let i in json) {
        //será dado um loop em cada um dos posts
            let postHtml = `<div><h1>${json[i].title}</h1>${json[i].body}</hr></div>`;
            //serão chamados os títulos e o corpos de cada um dos posts
            postArea.innerHTML += postHtml;
        }
    } else { //senão
        postArea.innerHTML = 'No posts to show'
    }
}

async function addNewPost(title, body) {
    await fetch( //faz a requisição POST
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                body,
                userId: 2
            })
        }
        //Envia título e corpo digitados para a requisição POST
    );

    document.querySelector('#titleField').value = '';
    document.querySelector('#bodyField').value = '';
    //Limpo os campos
    
    readPosts();
    //Lê os posts

}

document.querySelector('#insertButton').addEventListener('click', () => {
    let title = document.querySelector('#titleField').value;
    let body = document.querySelector('#bodyField').value;
    //pega os valores do título e do corpo do post

    if(title && body) { //se houverem título e corpo digitados
        addNewPost(title, body); //pode postar

    } else { //senão
        alert('Fill in all fields.')
        //alerta para o usuário
    }

})

async function listPosts() {
    const url = "https://jsonplaceholder.typicode.com/posts";
    return fetch(url).then((response) => response.json());
  }
  
  async function addPost(title, body) {
    const url = "https://jsonplaceholder.typicode.com/posts";
    const request = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    };
  
    return fetch(url, request).then((response) => response.json());
  }
  
  function renderPostList(list, posts) {
    list.innerHTML = posts
      .map(({ id, title, body }) => {
        return `
        <article id="post-${id}">
          <h2>${title}</h2>
          ${body}
        </article>
      `;
      })
      .join("");
  }
  
  //readPosts();
  //A seguir temos a função usada para mostrar os novos posts na tela:

  async function app() {
    const [postList, titleField, bodyField, addButton] = [
      ".posts",
      "#titleField",
      "#bodyField",
      "#insertButton",
    ].map((selector) => document.querySelector(selector));
  
    const posts = await listPosts();
    addButton.addEventListener("click", async () => {
      posts.unshift(await addPost(titleField.value, bodyField.value));
      titleField.value = "";
      bodyField.value = "";
  
      renderPostList(postList, posts);
    });
  
    renderPostList(postList, posts);
  }
  
  app();