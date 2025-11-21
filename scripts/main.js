
document.addEventListener('DOMContentLoaded', ()=>{
  // nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  navToggle?.addEventListener('click', ()=>{
    if(nav.style.display === 'flex') nav.style.display = 'none'; else nav.style.display = 'flex';
  });

  // modal
  const donateNow = document.getElementById('donateNow');
  const donateTop = document.getElementById('donateTop');
  const modal = document.getElementById('donationModal');
  const modalCloseBtns = modal?.querySelectorAll('.modal-close');
  function openModal(){ if(modal) modal.setAttribute('aria-hidden','false'); }
  function closeModal(){ if(modal) modal.setAttribute('aria-hidden','true'); }
  donateNow?.addEventListener('click', openModal);
  donateTop?.addEventListener('click', openModal);
  modalCloseBtns?.forEach(b=>b.addEventListener('click', closeModal));

  // modal form
  const modalForm = document.getElementById('modalForm');
  modalForm?.addEventListener('submit', (e)=>{
    e.preventDefault();
    const formData = new FormData(modalForm);
    const name = formData.get('mname');
    const email = formData.get('memail');
    const amount = formData.get('mamount');
    const msg = document.getElementById('modalMsg');
    if(!name || !email || !amount){ msg.textContent = 'Preencha todos os campos.'; return; }
    msg.textContent = 'Obrigado! Doação simulada recebida.';
    setTimeout(()=>{ closeModal(); modalForm.reset(); msg.textContent = ''; }, 1300);
  });

  // donation form
  const donationForm = document.getElementById('donationForm');
  const formMsg = document.getElementById('formMsg');
  donationForm?.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = new FormData(donationForm);
    if(!data.get('name') || !data.get('email') || !data.get('type')){
      formMsg.textContent = 'Por favor, preencha os campos obrigatórios.'; return;
    }
    formMsg.textContent = 'Obrigado! Recebemos sua intenção de doação (simulada).';
    donationForm.reset();
  });

  // salvar rascunho
  const saveDraft = document.getElementById('saveDraft');
  saveDraft?.addEventListener('click', ()=>{
    const data = new FormData(donationForm);
    const draft = {};
    for(const [k,v] of data.entries()) draft[k]=v;
    localStorage.setItem('donationDraft', JSON.stringify(draft));
    formMsg.textContent = 'Rascunho salvo localmente.';
  });
  const draftRaw = localStorage.getItem('donationDraft');
  if(draftRaw && donationForm){ try{ const draft = JSON.parse(draftRaw); for(const k in draft){ const el = donationForm.elements[k]; if(el) el.value = draft[k]; } }catch(e){} }

  // contato simples
  const contactForm = document.getElementById('contactForm');
  contactForm?.addEventListener('submit', (e)=>{
    e.preventDefault();
    const msg = document.getElementById('contactMsg');
    msg.textContent = 'Mensagem enviada (simulada). Obrigado!';
    contactForm.reset();
  });


})
