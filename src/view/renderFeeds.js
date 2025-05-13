/* global document, console */

export default function renderFeeds(state) {

  const posts = document.querySelector('.posts');
  const feeds = document.querySelector('.feeds');
  posts.innerHTML = '';
  feeds.innerHTML = '';

     //feeds top
     const cardFeeds = document.createElement('div');
     cardFeeds.classList.add('card', 'border-0');
   
     const cardBodyFeeds = document.createElement('div');
     cardBodyFeeds.classList.add('card-body');
   
     const cardTitleFeeds = document.createElement('h2');
     cardTitleFeeds.classList.add('card-title', 'h4');
     cardTitleFeeds.textContent = 'Фиды';
   
     const cardUlFeeds = document.createElement('ul');
     cardUlFeeds.classList.add('list-group', 'border-0', 'rounded-0');
   
   
     cardBodyFeeds.appendChild(cardTitleFeeds);
     cardBodyFeeds.appendChild(cardUlFeeds);
     cardFeeds.appendChild(cardBodyFeeds);
     feeds.appendChild(cardFeeds);
   
     //posts 
     const cardPosts = document.createElement('div');
     cardPosts.classList.add('card', 'border-0');
   
     const cardBodyPosts = document.createElement('div');
     cardBodyPosts.classList.add('card-body');
   
     const cardTitlePosts = document.createElement('h2');
     cardTitlePosts.classList.add('card-title', 'h4');
     cardTitlePosts.textContent = 'Посты';
   
     const cardUlPosts = document.createElement('ul');
     cardUlPosts.classList.add('list-group', 'border-0', 'rounded-0');
   
     cardBodyPosts.appendChild(cardTitlePosts);
     cardBodyPosts.appendChild(cardUlPosts);
     cardPosts.appendChild(cardBodyPosts);
     posts.appendChild(cardPosts);

  

  // all li


  state.feedData.forEach((el) => {
    console.log(el.feedTitle);


    const liFeed = document.createElement('li');
    liFeed.classList.add('list-group-item', 'border-0', 'border-end-0');

    const h3Feed = document.createElement('h3');
    h3Feed.classList.add('h6', 'm-0');
    h3Feed.textContent = el.feedTitle;

    const pFeed = document.createElement('p');
    pFeed.classList.add('m-0', 'small', 'text-black-50');
    pFeed.textContent = el.feedDescription;

    liFeed.appendChild(h3Feed);
    liFeed.appendChild(pFeed);
    cardUlFeeds.prepend(liFeed);

    const relatedPosts = state.postData.filter((post) => post.feedId === el.id);

    console.log(relatedPosts, 'relatedPosts')

    relatedPosts.forEach((post) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
      
        const a = document.createElement('a');
        a.href = post.link;
        a.textContent = post.title;
        a.classList.add('fw-bold');
        a.setAttribute('data-id', post.id);
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
      
        const button = document.createElement('button');
        button.type = 'button';
        button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
        button.textContent = 'Просмотр';
        button.setAttribute('data-id', post.id);
        button.setAttribute('data-bs-toggle', 'modal');
        button.setAttribute('data-bs-target', '#modal');
      
        button.addEventListener('click', () => {
          console.log('Открываем пост с id =', post.id);
        });
      
        li.appendChild(a);
        li.appendChild(button);
        cardUlPosts.prepend(li);
    })
    
  });
};