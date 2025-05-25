export default function renderViewedPostsLinks(viewedPostIds) {
  viewedPostIds.forEach((id) => {
    const link = document.querySelector(`a[data-id="${id}"]`)
    if (link) {
      link.classList.remove('fw-bold')
      link.classList.add('fw-normal', 'link-secondary')
    }
  })
}
