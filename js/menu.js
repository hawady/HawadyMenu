document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
});

function renderMenu() {
    const menuEl = document.getElementById('menu');
    menuEl.innerHTML = '';

    menuData.categories.forEach(cat => {
        const activeItems = cat.items.filter(item => item.active);
        if (activeItems.length === 0) return;

        const catDiv = document.createElement('div');
        catDiv.className = 'category';
        catDiv.id = cat.id;

        const catHeader = document.createElement('h2');
        catHeader.textContent = cat.name;
        catDiv.appendChild(catHeader);

        const itemsDiv = document.createElement('div');
        itemsDiv.className = 'menu-items';

        activeItems.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'menu-item';

            const itemName = document.createElement('h3');
            itemName.textContent = item.name;

            const itemPrice = document.createElement('div');
            itemPrice.className = 'price';
            itemPrice.textContent = `$${item.price.toFixed(2)}`;

            const addBtn = document.createElement('button');
            addBtn.className = 'add-to-selection';
            addBtn.textContent = '➕ Add';
            addBtn.addEventListener('click', () => {
                const existing = selection.find(s => s.id === item.id);
                if (existing) {
                    existing.quantity++;
                } else {
                    selection.push({ id: item.id, name: item.name, price: item.price, quantity: 1 });
                }
                saveSelection();
                renderSelectionPanel();
            });

            itemDiv.appendChild(itemName);
            itemDiv.appendChild(itemPrice);

            if (item.description) {
                const itemDesc = document.createElement('p');
                itemDesc.textContent = item.description;
                itemDiv.appendChild(itemDesc);
            }

            itemDiv.appendChild(addBtn);

            itemsDiv.appendChild(itemDiv);
        });

        catDiv.appendChild(itemsDiv);
        menuEl.appendChild(catDiv);
    });

    renderCategoryNav();
    renderFooter();
}

function renderCategoryNav() {
    const nav = document.getElementById('category-nav');
    nav.innerHTML = '';

    const navList = document.createElement('div');
    navList.className = 'category-nav-list';

    menuData.categories.forEach(cat => {
        const activeItems = cat.items.filter(item => item.active);
        if (activeItems.length === 0) return;

        const btn = document.createElement('button');
        btn.textContent = cat.name;
        btn.dataset.target = cat.id;
        btn.addEventListener('click', () => {
            const target = document.getElementById(cat.id);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
        navList.appendChild(btn);
    });

    nav.appendChild(navList);
}

function renderFooter() {
    const footer = document.getElementById('footer');
    footer.innerHTML = '';

    const content = document.createElement('div');
    content.className = 'footer-content';

    if (footerData.name) {
        const nameP = document.createElement('p');
        nameP.innerHTML = `<strong>${footerData.name}</strong>`;
        content.appendChild(nameP);
    }

    if (footerData.hours) {
        const hoursP = document.createElement('p');
        hoursP.textContent = `Hours: ${footerData.hours}`;
        content.appendChild(hoursP);
    }

    if (footerData.address) {
        const addressP = document.createElement('p');
        addressP.textContent = footerData.address;
        content.appendChild(addressP);
    }

    if (footerData.phone) {
        const phoneP = document.createElement('p');
        phoneP.innerHTML = `Phone: <a href="tel:${footerData.phone}">${footerData.phone}</a>`;
        content.appendChild(phoneP);
    }

    if (footerData.whatsapp) {
        const whatsappP = document.createElement('p');
        whatsappP.innerHTML = `WhatsApp: <a href="https://wa.me/${footerData.whatsapp}" target="_blank">Contact</a>`;
        content.appendChild(whatsappP);
    }

    if (footerData.instagram) {
        const igP = document.createElement('p');
        igP.innerHTML = `Instagram: <a href="${footerData.instagram}" target="_blank">@${footerData.instagram.split('/').pop()}</a>`;
        content.appendChild(igP);
    }

    footer.appendChild(content);
}

function renderSelectionPanel() {
    const panel = document.getElementById('selection-panel');
    if (selection.length === 0) {
        panel.classList.remove('show');
        return;
    }
    panel.classList.add('show');

    const total = selection.reduce((sum, item) => sum + item.price * item.quantity, 0);

    panel.innerHTML = `
        <div class="selection-header">Selection (${selection.length} items)</div>
        <div class="selection-items">
            ${selection.map((item, index) => `
                <div class="selection-item">
                    <span>${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="increase" data-index="${index}">+</button>
                    <button class="decrease" data-index="${index}">-</button>
                    <button class="remove" data-index="${index}">x</button>
                </div>
            `).join('')}
        </div>
        <div class="selection-total">Total: $${total.toFixed(2)}</div>
        <button class="clear-selection">Clear All</button>
    `;

    panel.querySelectorAll('.increase').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            selection[index].quantity++;
            saveSelection();
            renderSelectionPanel();
        });
    });

    panel.querySelectorAll('.decrease').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            if (selection[index].quantity > 1) {
                selection[index].quantity--;
            } else {
                selection.splice(index, 1);
            }
            saveSelection();
            renderSelectionPanel();
        });
    });

    panel.querySelectorAll('.remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            selection.splice(index, 1);
            saveSelection();
            renderSelectionPanel();
        });
    });

    panel.querySelector('.clear-selection').addEventListener('click', () => {
        selection = [];
        saveSelection();
        renderSelectionPanel();
    });
}
