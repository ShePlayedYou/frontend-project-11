const createPostsCard = () => {

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
  
  return cardPosts;
};
  
export default createPostsCard;