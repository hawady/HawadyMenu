// Pattern unlock: Tap sequence - top-left, bottom-right, top-right
let patternSequence = [];
const correctPattern = ['tl', 'br', 'tr'];

document.addEventListener('touchstart', (e) => {
    if (document.getElementById('admin-panel').style.display === 'block') return; // already unlocked

    const touch = e.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;
    const width = window.innerWidth;
    const height = window.innerHeight;

    let quadrant;
    if (x < width / 2 && y < height / 2) quadrant = 'tl';
    else if (x >= width / 2 && y < height / 2) quadrant = 'tr';
    else if (x < width / 2 && y >= height / 2) quadrant = 'bl';
    else quadrant = 'br';

    patternSequence.push(quadrant);

    if (patternSequence.length === correctPattern.length) {
        if (JSON.stringify(patternSequence) === JSON.stringify(correctPattern)) {
            document.getElementById('login').style.display = 'none';
            document.getElementById('admin-panel').style.display = 'block';
            renderAdmin();
        } else {
            patternSequence = [];
        }
    }
});

document.getElementById('add-category-btn').addEventListener('click', () => {
    showCategoryForm();
});

document.getElementById('add-item-btn').addEventListener('click', () => {
    showItemForm();
});

document.getElementById('edit-footer-btn').addEventListener('click', () => {
    showFooterForm();
});

document.getElementById('bulk-price-btn').addEventListener('click', () => {
    showBulkPriceForm();
});

document.getElementById('undo-bulk-btn').addEventListener('click', () => {
    if (window.previousData) {
        menuData = window.previousData;
        saveData();
        renderAdmin();
        delete window.previousData;
    } else {
        alert('No bulk operation to undo.');
    }
});

function renderAdmin() {
    const list = document.getElementById('categories-list');
    list.innerHTML = '';

    menuData.categories.forEach((cat, catIndex) => {
        const catDiv = document.createElement('div');
        catDiv.className = 'category-admin';
        catDiv.setAttribute('draggable', 'true');
        catDiv.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', catIndex);
        });

        const catHeader = document.createElement('h3');
        catHeader.innerHTML = `
            ${cat.name}
            <button class="edit-cat" data-index="${catIndex}">Edit</button>
            <button class="delete-cat" data-index="${catIndex}">Delete</button>
        `;
        catDiv.appendChild(catHeader);

        const itemsDiv = document.createElement('div');
        itemsDiv.className = 'items-list';

        cat.items.forEach((item, itemIndex) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item-admin';

            const detailsDiv = document.createElement('div');
            detailsDiv.className = 'details';
            detailsDiv.innerHTML = `
                <strong>${item.name}</strong> - $${item.price.toFixed(2)} ${item.active ? '' : '(Disabled)'}
                ${item.description ? `<br>${item.description}` : ''}
            `;

            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'actions';
            actionsDiv.innerHTML = `
                <button class="edit-item" data-cat="${catIndex}" data-item="${itemIndex}">Edit</button>
                <button class="duplicate-item" data-cat="${catIndex}" data-item="${itemIndex}">Duplicate</button>
                <button class="toggle-item" data-cat="${catIndex}" data-item="${itemIndex}">${item.active ? 'Disable' : 'Enable'}</button>
                <button class="delete-item" data-cat="${catIndex}" data-item="${itemIndex}">Delete</button>
            `;

            itemDiv.appendChild(detailsDiv);
            itemDiv.appendChild(actionsDiv);
            itemsDiv.appendChild(itemDiv);
        });

        catDiv.appendChild(itemsDiv);
        list.appendChild(catDiv);
    });

    // Add event listeners
    document.querySelectorAll('.edit-cat').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            showCategoryForm(menuData.categories[index], index);
        });
    });

    document.querySelectorAll('.delete-cat').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (confirm('Delete this category?')) {
                const index = parseInt(e.target.dataset.index);
                menuData.categories.splice(index, 1);
                saveData();
                renderAdmin();
            }
        });
    });

    document.querySelectorAll('.edit-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cat = parseInt(e.target.dataset.cat);
            const item = parseInt(e.target.dataset.item);
            showItemForm(menuData.categories[cat].items[item], cat, item);
        });
    });

    document.querySelectorAll('.delete-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (confirm('Delete this item?')) {
                const cat = parseInt(e.target.dataset.cat);
                const item = parseInt(e.target.dataset.item);
                menuData.categories[cat].items.splice(item, 1);
                saveData();
                renderAdmin();
            }
        });
    });

    document.querySelectorAll('.duplicate-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cat = parseInt(e.target.dataset.cat);
            const item = parseInt(e.target.dataset.item);
            const original = menuData.categories[cat].items[item];
            const copy = { ...original, id: original.id + '-copy', name: original.name + ' (Copy)' };
            menuData.categories[cat].items.push(copy);
            saveData();
            renderAdmin();
        });
    });

    document.querySelectorAll('.toggle-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cat = parseInt(e.target.dataset.cat);
            const item = parseInt(e.target.dataset.item);
            menuData.categories[cat].items[item].active = !menuData.categories[cat].items[item].active;
            saveData();
            renderAdmin();
        });
    });

    // Drag and drop for categories
    list.addEventListener('dragover', (e) => e.preventDefault());
    list.addEventListener('drop', (e) => {
        e.preventDefault();
        const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
        const targetIndex = Array.from(list.children).indexOf(e.target.closest('.category-admin'));
        if (draggedIndex !== targetIndex && targetIndex >= 0) {
            const [dragged] = menuData.categories.splice(draggedIndex, 1);
            menuData.categories.splice(targetIndex, 0, dragged);
            saveData();
            renderAdmin();
        }
    });

    renderFooter();
}

function showCategoryForm(cat = null, index = null) {
    const overlay = document.createElement('div');
    overlay.className = 'form-overlay';
    overlay.innerHTML = `
        <div class="form-container">
            <h3>${cat ? 'Edit' : 'Add'} Category</h3>
            <form id="category-form">
                <div class="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value="${cat ? cat.name : ''}" required>
                </div>
                <div class="form-actions">
                    <button type="button" id="cancel-cat">Cancel</button>
                    <button type="submit">${cat ? 'Update' : 'Add'}</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(overlay);

    document.getElementById('cancel-cat').addEventListener('click', () => overlay.remove());

    document.getElementById('category-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = e.target.name.value.trim();
        if (name) {
            if (cat) {
                menuData.categories[index].name = name;
            } else {
                const id = name.toLowerCase().replace(/\s+/g, '-');
                menuData.categories.push({ id, name, items: [] });
            }
            saveData();
            overlay.remove();
            renderAdmin();
        }
    });
}

function showFooterForm() {
    const overlay = document.createElement('div');
    overlay.className = 'form-overlay';
    overlay.innerHTML = `
        <div class="form-container">
            <h3>Edit Footer Information</h3>
            <form id="footer-form">
                <div class="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value="${footerData.name}">
                </div>
                <div class="form-group">
                    <label>Hours:</label>
                    <input type="text" name="hours" value="${footerData.hours}">
                </div>
                <div class="form-group">
                    <label>Address:</label>
                    <input type="text" name="address" value="${footerData.address}">
                </div>
                <div class="form-group">
                    <label>Phone:</label>
                    <input type="text" name="phone" value="${footerData.phone}">
                </div>
                <div class="form-group">
                    <label>WhatsApp (number only):</label>
                    <input type="text" name="whatsapp" value="${footerData.whatsapp}">
                </div>
                <div class="form-group">
                    <label>Instagram URL:</label>
                    <input type="text" name="instagram" value="${footerData.instagram}">
                </div>
                <div class="form-actions">
                    <button type="button" id="cancel-footer">Cancel</button>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(overlay);

    document.getElementById('cancel-footer').addEventListener('click', () => overlay.remove());

    document.getElementById('footer-form').addEventListener('submit', (e) => {
        e.preventDefault();
        footerData.name = e.target.name.value.trim();
        footerData.hours = e.target.hours.value.trim();
        footerData.address = e.target.address.value.trim();
        footerData.phone = e.target.phone.value.trim();
        footerData.whatsapp = e.target.whatsapp.value.trim();
        footerData.instagram = e.target.instagram.value.trim();
        saveFooterData();
        overlay.remove();
        renderFooter();
    });
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

function showBulkPriceForm() {
    const overlay = document.createElement('div');
    overlay.className = 'form-overlay';
    const catOptions = '<option value="all">All Categories</option>' + menuData.categories.map((c, i) => `<option value="${i}">${c.name}</option>`).join('');
    overlay.innerHTML = `
        <div class="form-container">
            <h3>Bulk Price Update</h3>
            <form id="bulk-form">
                <div class="form-group">
                    <label>Category:</label>
                    <select name="category">${catOptions}</select>
                </div>
                <div class="form-group">
                    <label>Type:</label>
                    <select name="type">
                        <option value="percentage">Percentage</option>
                        <option value="fixed">Fixed Amount</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Value (positive to increase, negative to decrease):</label>
                    <input type="number" name="value" step="0.01" required>
                </div>
                <div class="form-actions">
                    <button type="button" id="cancel-bulk">Cancel</button>
                    <button type="submit">Apply</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(overlay);

    document.getElementById('cancel-bulk').addEventListener('click', () => overlay.remove());

    document.getElementById('bulk-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const cat = e.target.category.value;
        const type = e.target.type.value;
        const val = parseFloat(e.target.value);
        if (isNaN(val)) return;
        // Keep previous for undo
        window.previousData = JSON.parse(JSON.stringify(menuData));
        const categories = cat === 'all' ? menuData.categories : [menuData.categories[parseInt(cat)]];
        categories.forEach(c => {
            c.items.forEach(item => {
                if (type === 'percentage') {
                    item.price *= (1 + val / 100);
                } else {
                    item.price += val;
                }
                item.price = Math.max(0, Math.round(item.price * 100) / 100);
            });
        });
        saveData();
        overlay.remove();
        renderAdmin();
    });
}

function showItemForm(item = null, catIndex = null, itemIndex = null) {
    const overlay = document.createElement('div');
    overlay.className = 'form-overlay';
    const catOptions = menuData.categories.map((c, i) => `<option value="${i}" ${i == catIndex ? 'selected' : ''}>${c.name}</option>`).join('');
    overlay.innerHTML = `
        <div class="form-container">
            <h3>${item ? 'Edit' : 'Add'} Item</h3>
            <form id="item-form">
                <div class="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value="${item ? item.name : ''}" required>
                </div>
                <div class="form-group">
                    <label>Description:</label>
                    <textarea name="description">${item ? item.description : ''}</textarea>
                </div>
                <div class="form-group">
                    <label>Price:</label>
                    <input type="number" name="price" step="0.01" value="${item ? item.price : ''}" required>
                </div>
                <div class="form-group">
                    <label>Category:</label>
                    <select name="category">${catOptions}</select>
                </div>
                <div class="form-actions">
                    <button type="button" id="cancel-item">Cancel</button>
                    <button type="submit">${item ? 'Update' : 'Add'}</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(overlay);

    document.getElementById('cancel-item').addEventListener('click', () => overlay.remove());

    document.getElementById('item-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = e.target.name.value.trim();
        const description = e.target.description.value.trim();
        const price = parseFloat(e.target.price.value);
        const catIdx = parseInt(e.target.category.value);
        if (name && !isNaN(price)) {
            const newItem = { id: name.toLowerCase().replace(/\s+/g, '-'), name, description, price, active: item ? item.active : true };
            if (item) {
                menuData.categories[catIndex].items[itemIndex] = { ...menuData.categories[catIndex].items[itemIndex], name, description, price };
                if (catIdx !== catIndex) {
                    menuData.categories[catIndex].items.splice(itemIndex, 1);
                    menuData.categories[catIdx].items.push(newItem);
                }
            } else {
                menuData.categories[catIdx].items.push(newItem);
            }
            saveData();
            overlay.remove();
            renderAdmin();
        }
    });
}
