const privateKey = '1e82ba38fb19626b9902d97847b68cc0e122996d',
      publicKey = '510bdbc1a0bed64bf073cee7eced0f1a',
      content = document.getElementById('content'),
      search = document.getElementById('search');


const getConnection = () => {
    const ts = Date.now(),
          hash = md5(ts + privateKey + publicKey),
          URL = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    fetch(URL)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            response.data.results.forEach(e => {
                drawHero(e);
            });
        })
        .catch(e => console.log(e))
    ;

};

const drawHero = e => {
    const image = `${e.thumbnail.path}/portrait_uncanny.${e.thumbnail.extension}`;
    const hero = `
        <div class="hero ed-item l-1-3">
            <h3>${e.name}</h3>
            <div class="hero-img" >
                <img class="thumbnail" src="${image}"/>
                <p class="description">${e.description}</p>
            </div>
        </div>
    `;
    content.insertAdjacentHTML('beforeEnd', hero);   
}

const searchHero = name => {
    const ts = Date.now(),
    hash = md5(ts + privateKey + publicKey),
    hero = encodeURIComponent(name),
    URL = `http://gateway.marvel.com/v1/public/characters?name=${hero}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    fetch(URL)
        .then(response => response.json())
        .then(response=> {
            console.log(response);
            response.data.results.forEach(e => {
                drawHero(e);
            });
        })
        .catch(e => console.log(e));
};

search.addEventListener('keyup', e => {
    if (e.keyCode === 13) {
        content.innerHTML = '';
        searchHero(e.target.value.trim());
    }
})

getConnection();