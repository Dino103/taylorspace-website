const panels = document.querySelectorAll('.panel');
  const indicator = document.getElementById('navIndicator');
  const navlinksBtns = document.querySelectorAll('.navlinks button');
  const navTabButtons = document.querySelectorAll('.navlinks button, .nav-right [data-tab], .hero-cta [data-tab]');

  function positionIndicator(btn){
    if(!btn){ indicator.style.opacity = 0; return; }
    indicator.style.opacity = 1;
    indicator.style.width = btn.offsetWidth + 'px';
    indicator.style.transform = `translateX(${btn.offsetLeft - 5}px)`;
  }

  function showPanel(id){
    panels.forEach(p => p.classList.toggle('active', p.id === id));
    window.scrollTo({top:0, behavior:'smooth'});
  }

  function setActive(tab){
    showPanel('panel-' + tab);
    navlinksBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    positionIndicator(document.querySelector(`.navlinks button[data-tab="${tab}"]`));
  }

  document.querySelectorAll('[data-tab]').forEach(btn => btn.addEventListener('click', () => setActive(btn.dataset.tab)));

  document.querySelectorAll('[data-detail]').forEach(btn => {
    btn.addEventListener('click', () => {
      navlinksBtns.forEach(b => b.classList.remove('active'));
      indicator.style.opacity = 0;
      showPanel('panel-detail-' + btn.dataset.detail);
    });
  });

  document.querySelectorAll('[data-back]').forEach(btn => {
    btn.addEventListener('click', () => setActive(btn.dataset.back));
  });

  positionIndicator(document.querySelector('.navlinks button.active'));

  // Slideshows on detail pages
  document.querySelectorAll('[data-slideshow]').forEach(show => {
    const slides = show.querySelectorAll('.slide');
    const dotsWrap = show.querySelector('.slide-dots');
    let current = 0;

    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
    const dots = dotsWrap.querySelectorAll('.dot');

    function goTo(i){
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (i + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    }

    show.querySelector('[data-slide-prev]').addEventListener('click', () => goTo(current - 1));
    show.querySelector('[data-slide-next]').addEventListener('click', () => goTo(current + 1));
  });

// Contact form — builds a pre-filled mailto: link and opens it
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cf-name').value;
    const email = document.getElementById('cf-email').value;
    const message = document.getElementById('cf-message').value;

    const yourEmail = "josh.w.taylor@usu.edu"; // <-- change this to whichever address you want messages sent to
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);

    window.location.href = `mailto:${yourEmail}?subject=${subject}&body=${body}`;
  });
}