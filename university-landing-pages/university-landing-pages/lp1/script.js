// Load fees from fees.json and show in modal
const feesBtn = document.getElementById('feesBtn');
const modal = document.getElementById('feesModal');
const closeBtn = document.querySelector('.close');
const feesList = document.getElementById('feesList');
const responseMsg = document.getElementById('responseMsg');

feesBtn && feesBtn.addEventListener('click', async () => {
    try{
        const res = await fetch('fees.json');
        const data = await res.json();
        feesList.innerHTML = '';
        data.courses.forEach(c => {
            const li = document.createElement('li');
            li.textContent = `${c.name} — ₹${c.min.toLocaleString()} to ₹${c.max.toLocaleString()}`;
            feesList.appendChild(li);
        });
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden','false');
    }catch(err){
        alert('Failed to load fees data.');
    }
});

closeBtn && closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden','true');
});

window.addEventListener('click', e => {
    if(e.target === modal){
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden','true');
    }
});


const form = document.getElementById('leadForm');
form && form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        state: document.getElementById('state').value.trim(),
        course: document.getElementById('course').value.trim(),
        year: document.getElementById('year').value.trim(),
        consent: document.getElementById('consent').checked,
        submittedAt: new Date().toISOString()
    };

   
    const PIPEDREAM_URL = "https://eoaducvbore11mi.m.pipedream.net";

    try{
        const res = await fetch(PIPEDREAM_URL, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(payload)
        });

        responseMsg.style.color = 'green';
        responseMsg.textContent = '✔ Lead submitted successfully (check Pipedream).';
        form.reset();
    }catch(err){
        responseMsg.style.color = 'red';
        responseMsg.textContent = '❌ Submission failed — replace webhook or check network.';
    }
});
