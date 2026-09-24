// 点击截图放大 Lightbox
document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Screenshot preview');
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Close preview">✕</button>
    <img src="" alt="Enlarged screenshot">
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
      closeLightbox();
    }
  });

  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  document.querySelectorAll('.screenshot-grid figure img').forEach((img) => {
    // 包裹 trigger
    const parent = img.parentElement;
    if (!parent.classList.contains('screenshot-trigger')) {
      const trigger = document.createElement('a');
      trigger.className = 'screenshot-trigger';
      trigger.href = img.src;
      trigger.setAttribute('aria-label', '放大查看截图');
      parent.insertBefore(trigger, img);
      trigger.appendChild(img);

      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || 'Enlarged screenshot';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }
  });
});
