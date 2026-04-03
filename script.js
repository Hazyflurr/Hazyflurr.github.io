const menu = [
  { name: 'Espresso', category: 'Coffee', price: 3.5, description: 'Single shot, crafted with fresh beans.', tags: [] },
  { name: 'Cappuccino', category: 'Coffee', price: 4.75, description: 'Velvety milk foam, espresso base.', tags: [] },
  { name: 'Cold Brew', category: 'Coffee', price: 5.25, description: 'Smooth, slow steeped for 16 hours.', tags: ['vegan', 'gluten-free'] },
  { name: 'Avocado Toast', category: 'Brunch', price: 10, description: 'Multigrain bread, radish, chili oil.', tags: ['vegan'] },
  { name: 'Chickpea Scramble', category: 'Brunch', price: 11.5, description: 'Herb chickpeas, roasted tomato, greens.', tags: ['vegan', 'gluten-free'] },
  { name: 'Sourdough Breakfast Sandwich', category: 'Brunch', price: 12.5, description: 'Egg, cheddar, house aioli.', tags: [] },
  { name: 'Matcha Smoothie Bowl', category: 'Bites', price: 9, description: 'Plant milk, granola, berries.', tags: ['vegan', 'gluten-free'] },
  { name: 'Walnut Cardamom Muffin', category: 'Desserts', price: 4.5, description: 'Warm, aromatic, freshly baked.', tags: ['vegetarian'] },
  { name: 'Chocolate Hazelnut Tart', category: 'Desserts', price: 7.25, description: 'Rich ganache with toasted hazelnuts.', tags: ['vegetarian'] },
];

const menuItems = document.getElementById('menuItems');
const filters = Array.from(document.querySelectorAll('.menu-filters button'));
const bookingForm = document.getElementById('bookingForm');
const bookingMessage = document.getElementById('bookingMessage');

function renderMenu(items) {
  menuItems.innerHTML = items.map(item => {
    const tagElements = item.tags.map(t => `<span class="tag">${t}</span>`).join('');
    return `
      <article class="menu-card">
        <h4>${item.name} <span class="price">$${item.price.toFixed(2)}</span></h4>
        <p>${item.description}</p>
        <div class="tags">${tagElements}</div>
      </article>
    `;
  }).join('');
}

function applyFilter(type) {
  let filtered = menu;
  if (type === 'vegan') filtered = menu.filter(it => it.tags.includes('vegan'));
  if (type === 'gluten-free') filtered = menu.filter(it => it.tags.includes('gluten-free'));
  if (type === 'under10') filtered = menu.filter(it => it.price < 10);
  renderMenu(filtered);
}

filters.forEach(button => {
  button.addEventListener('click', () => {
    filters.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    applyFilter(button.dataset.filter);
  });
});

bookingForm.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(bookingForm);
  const customer = formData.get('name');
  bookingMessage.textContent = `Thanks ${customer}! We got your booking request and will confirm soon.`;
  bookingForm.reset();
});

renderMenu(menu);
