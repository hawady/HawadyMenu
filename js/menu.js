document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    setupOrderModalListeners();
});

function setupOrderModalListeners() {
    const panel = document.getElementById('selection-panel');
    const modal = document.getElementById('order-modal');
    const closeBtn = document.querySelector('.order-modal-close');
    const clearBtn = document.querySelector('.order-btn-clear');
    const whatsappBtn = document.querySelector('.order-btn-whatsapp');

    // Click on badge to open modal
    panel.addEventListener('click', openOrderModal);

    // Close modal when clicking X
    closeBtn.addEventListener('click', closeOrderModal);

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeOrderModal();
        }
    });

    // Clear all button
    clearBtn.addEventListener('click', () => {
        selection = [];
        saveSelection();
        renderMenu();
        renderSelectionPanel();
        renderOrderModal();
    });

    // WhatsApp order button
    whatsappBtn.addEventListener('click', () => {
        if (selection.length === 0) return;
        
        const total = selection.reduce((sum, item) => sum + item.price * item.quantity, 0);
        let message = '📋 *HAWADY Order*\n\n';
        selection.forEach(item => {
            message += `• ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;
        });
        message += `\n💰 *Total: $${total.toFixed(2)}*`;
        
        const phone = footerData.whatsapp || footerData.phone;
        if (phone) {
            const cleanPhone = phone.replace(/[^0-9]/g, '');
            window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
        } else {
            alert('WhatsApp number not configured. Please contact the restaurant.');
        }
    });
}

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
            itemDiv.dataset.itemId = item.id;

            // Check if item has sizes (cocktails) or regular price
            const hasSizes = item.sizes && typeof item.sizes === 'object';
            
            // For regular items, check if in selection
            // For cocktails, check if any size is in selection
            let existing = null;
            let existingSizes = [];
            
            if (hasSizes) {
                existingSizes = selection.filter(s => s.id.startsWith(item.id + '-'));
                if (existingSizes.length > 0) {
                    itemDiv.classList.add('in-selection');
                }
            } else {
                existing = selection.find(s => s.id === item.id);
                if (existing) {
                    itemDiv.classList.add('in-selection');
                }
            }

            // Create header with name
            const itemHeader = document.createElement('div');
            itemHeader.className = 'item-header';

            const itemName = document.createElement('h3');
            itemName.textContent = item.name;
            
            // Add quantity badge if in selection
            if (existing) {
                const badge = document.createElement('span');
                badge.className = 'quantity-badge';
                badge.textContent = existing.quantity;
                itemName.appendChild(badge);
            } else if (existingSizes.length > 0) {
                const totalQty = existingSizes.reduce((sum, s) => sum + s.quantity, 0);
                const badge = document.createElement('span');
                badge.className = 'quantity-badge';
                badge.textContent = totalQty;
                itemName.appendChild(badge);
            }

            itemHeader.appendChild(itemName);

            // For regular items, show price on the right
            if (!hasSizes) {
                const itemPrice = document.createElement('div');
                itemPrice.className = 'price';
                itemPrice.textContent = `$${item.price.toFixed(2)}`;
                itemHeader.appendChild(itemPrice);
            }

            itemDiv.appendChild(itemHeader);

            if (item.description) {
                const itemDesc = document.createElement('p');
                itemDesc.textContent = item.description;
                itemDiv.appendChild(itemDesc);
            }

            // For cocktails with sizes, display inline size options
            if (hasSizes) {
                const sizesRow = document.createElement('div');
                sizesRow.className = 'sizes-row';
                
                Object.entries(item.sizes).forEach(([size, price]) => {
                    const sizeId = `${item.id}-${size}`;
                    const sizeSelection = selection.find(s => s.id === sizeId);
                    
                    const sizeOption = document.createElement('span');
                    sizeOption.className = 'size-option';
                    if (sizeSelection) {
                        sizeOption.classList.add('selected');
                    }
                    sizeOption.innerHTML = `
                        <span class="size-label">${size}:</span>
                        <span class="size-price">$${price.toFixed(price % 1 === 0 ? 0 : 2)}</span>
                    `;
                    
                    // Stop propagation to prevent triggering parent click
                    sizeOption.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const existingSize = selection.find(s => s.id === sizeId);
                        if (existingSize) {
                            existingSize.quantity++;
                        } else {
                            selection.push({ 
                                id: sizeId, 
                                name: `${item.name} (${size})`, 
                                price: price, 
                                quantity: 1 
                            });
                        }
                        saveSelection();
                        renderMenu();
                        renderSelectionPanel();
                    });
                    
                    sizesRow.appendChild(sizeOption);
                });
                
                itemDiv.appendChild(sizesRow);
            } else {
                // Make entire item clickable for regular items
                itemDiv.addEventListener('click', () => {
                    const existingItem = selection.find(s => s.id === item.id);
                    if (existingItem) {
                        existingItem.quantity++;
                    } else {
                        selection.push({ id: item.id, name: item.name, price: item.price, quantity: 1 });
                    }
                    saveSelection();
                    renderMenu();
                    renderSelectionPanel();
                });
            }

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
        panel.innerHTML = '';
        return;
    }
    panel.classList.add('show');

    const totalQty = selection.reduce((sum, item) => sum + item.quantity, 0);
    const total = selection.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Show compact badge
    panel.innerHTML = `
        <span class="cart-icon">🛒</span>
        <span>${totalQty} item${totalQty > 1 ? 's' : ''} - $${total.toFixed(2)}</span>
    `;
}

// Open order modal
function openOrderModal() {
    const modal = document.getElementById('order-modal');
    renderOrderModal();
    modal.classList.add('show');
}

// Close order modal
function closeOrderModal() {
    const modal = document.getElementById('order-modal');
    modal.classList.remove('show');
}

// Render order modal content
function renderOrderModal() {
    const modalItems = document.querySelector('.order-items');
    const modalTotal = document.querySelector('.order-total');
    
    if (selection.length === 0) {
        modalItems.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Your order is empty</p>';
        modalTotal.textContent = 'Total: $0.00';
        return;
    }

    const total = selection.reduce((sum, item) => sum + item.price * item.quantity, 0);

    modalItems.innerHTML = selection.map((item, index) => `
        <div class="order-item">
            <div class="order-item-info">
                <div class="order-item-name">${item.name}</div>
                <div class="order-item-price">$${item.price.toFixed(2)} each</div>
            </div>
            <div class="order-item-controls">
                <button class="order-item-btn-minus" data-index="${index}">−</button>
                <span class="order-item-qty">${item.quantity}</span>
                <button class="order-item-btn-plus" data-index="${index}">+</button>
                <button class="order-item-btn-remove" data-index="${index}">×</button>
            </div>
        </div>
    `).join('');

    modalTotal.textContent = `Total: $${total.toFixed(2)}`;

    // Add event listeners
    modalItems.querySelectorAll('.order-item-btn-plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            selection[index].quantity++;
            saveSelection();
            renderMenu();
            renderSelectionPanel();
            renderOrderModal();
        });
    });

    modalItems.querySelectorAll('.order-item-btn-minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            if (selection[index].quantity > 1) {
                selection[index].quantity--;
            } else {
                selection.splice(index, 1);
            }
            saveSelection();
            renderMenu();
            renderSelectionPanel();
            renderOrderModal();
        });
    });

    modalItems.querySelectorAll('.order-item-btn-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            selection.splice(index, 1);
            saveSelection();
            renderMenu();
            renderSelectionPanel();
            renderOrderModal();
        });
    });
}

