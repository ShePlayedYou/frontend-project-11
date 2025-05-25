import createPostsCard from './createPostsCard'

export default function renderPosts(state) {
  const posts = document.querySelector('.posts')
  posts.innerHTML = ''
  const postsCard = createPostsCard()
  posts.append(postsCard)
  state.postData.forEach((post) => {
    const li = document.createElement('li')
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0')
    const a = document.createElement('a')
    a.href = post.link
    a.textContent = post.title
    if (state.viewedPostIds.has(post.id)) {
      a.classList.add('fw-normal', 'link-secondary')
    }
    else {
      a.classList.add('fw-bold')
    }
    a.setAttribute('data-id', post.id)
    a.setAttribute('target', '_blank')
    a.setAttribute('rel', 'noopener noreferrer')
    const button = document.createElement('button')
    button.type = 'button'
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm')
    button.textContent = 'Просмотр'
    button.setAttribute('data-id', post.id)
    button.setAttribute('data-bs-toggle', 'modal')
    button.setAttribute('data-bs-target', '#modal')
    li.appendChild(a)
    li.appendChild(button)
    const ulPosts = postsCard.querySelector('ul')
    ulPosts.prepend(li)
  })
};
