// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const knob = themeToggle.querySelector('.knob');
function setTheme(dark){
  document.body.classList.toggle('dark', dark);
  knob.textContent = dark ? '☾' : '☀';
}
themeToggle.addEventListener('click', () => setTheme(!document.body.classList.contains('dark')));
themeToggle.addEventListener('keydown', (e) => {
  if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); setTheme(!document.body.classList.contains('dark')); }
});

// Mobile nav
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
mobileToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Scroll spy - highlight the nav link for the section currently in view
const navLinkEls = document.querySelectorAll('nav.links a[data-section]');
const sectionEls = Array.from(navLinkEls).map(a => document.getElementById(a.dataset.section)).filter(Boolean);
const spy = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      navLinkEls.forEach(a => a.classList.toggle('active', a.dataset.section === entry.target.id));
    }
  });
}, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
sectionEls.forEach(sec => spy.observe(sec));

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// Form validation helper
function validateField(fieldId, inputEl, validatorFn){
  const field = document.getElementById(fieldId);
  const valid = validatorFn(inputEl.value.trim());
  field.classList.toggle('invalid', !valid);
  return valid;
}
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Contact form
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e){
  e.preventDefault();
  const name = document.getElementById('c-name');
  const email = document.getElementById('c-email');
  const message = document.getElementById('c-message');

  const validName = validateField('c-name-field', name, v => v.length > 0);
  const validEmail = validateField('c-email-field', email, v => emailRegex.test(v));
  const validMessage = validateField('c-message-field', message, v => v.length > 0);

  if(validName && validEmail && validMessage){
    alert('Thanks, ' + name.value.trim() + '! Your message has been sent. We will get back to you soon.');
    contactForm.reset();
  } else {
    alert('Please fix the highlighted fields before submitting.');
  }
});

// Booking form
const bookingForm = document.getElementById('bookingForm');
bookingForm.addEventListener('submit', function(e){
  e.preventDefault();
  const name = document.getElementById('b-name');
  const email = document.getElementById('b-email');
  const message = document.getElementById('b-message');

  const validName = validateField('b-name-field', name, v => v.length > 0);
  const validEmail = validateField('b-email-field', email, v => emailRegex.test(v));
  const validMessage = validateField('b-message-field', message, v => v.length > 0);

  if(validName && validEmail && validMessage){
    alert('Thanks, ' + name.value.trim() + '! Your booking inquiry has been sent. We will be in touch shortly.');
    bookingForm.reset();
  } else {
    alert('Please fix the highlighted fields before submitting.');
  }
});
