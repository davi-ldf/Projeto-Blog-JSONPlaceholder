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
            //serão chamados os títulos e o bodies de cada um dos posts
            postArea.innerHTML += postHtml;
        }
    } else { //senão
        postArea.innerHTML = 'No posts to show'
    }
}


readPosts();