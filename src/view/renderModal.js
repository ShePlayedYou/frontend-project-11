import { Modal } from 'bootstrap'

export default function renderModal(state) {
  const modalElement = document.getElementById('modal')
  if (!modalElement) return

  const modalTitle = modalElement.querySelector('.modal-title')
  const modalBody = modalElement.querySelector('.modal-body')
  const modalFooter = modalElement.querySelector('.modal-footer')
  const link = modalFooter?.querySelector('a')

  const post = state.postData.find(p => p.id === state.currentModalPostId)
  if (!post) return
  const postLink = document.querySelector((`a[data-id="${post.id}"]`))
  postLink.classList.remove('fw-bold')
  postLink.classList.add('fw-normal', 'link-secondary')

  modalTitle.textContent = post.title
  modalBody.textContent = post.description || 'Описание отсутствует'
  if (link) {
    link.href = post.link
    link.textContent = 'Читать статью'
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
  }
  const bsModal = Modal.getOrCreateInstance(modalElement)
  bsModal.show()
}
