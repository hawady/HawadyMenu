const defaultMenuData = {
  "categories": [
    {
      "id": "appetizers",
      "name": "Appetizers",
      "items": [
        { "id": "garlic-bread", "name": "Garlic Bread", "description": "", "price": 6.50, "active": true },
        { "id": "wedges-potato", "name": "Wedges Potato", "description": "Served with cocktail dip", "price": 6.50, "active": true },
        { "id": "breaded-chicken-strips", "name": "Breaded Chicken Strips", "description": "5 pcs, served with our special BBQ dip", "price": 12.00, "active": true },
        { "id": "mozzarella-sticks", "name": "Mozzarella Sticks", "description": "6 pcs, served with cocktail dip", "price": 7.00, "active": true },
        { "id": "nachos", "name": "Nachos", "description": "Served with salsa dip", "price": 9.00, "active": true },
        { "id": "baked-potatoes-cheese", "name": "Baked Potatoes & Cheese", "description": "Served with sour cream", "price": 12.00, "active": true },
        { "id": "sauteed-mushroom", "name": "Sauteed Mushroom", "description": "Marinated with garlic & coriander", "price": 12.00, "active": true },
        { "id": "smoked-salmon-app", "name": "Smoked Salmon", "description": "2 pcs, served with toast & butter aside", "price": 16.00, "active": true }
      ]
    },
    {
      "id": "fries",
      "name": "Fries",
      "items": [
        { "id": "french-fries", "name": "French Fries", "description": "", "price": 5.00, "active": true },
        { "id": "french-fries-large", "name": "French Fries Large", "description": "", "price": 7.00, "active": true },
        { "id": "fries-and-cheese", "name": "Fries and Cheese", "description": "Served with sour cream", "price": 12.00, "active": true },
        { "id": "hawady-fries", "name": "Hawady Fries", "description": "Melted mozzarella & cheddar, chorizo, hotdogs, olives & mushrooms", "price": 15.00, "active": true }
      ]
    },
    {
      "id": "platters",
      "name": "Platters",
      "items": [
        { "id": "halloumi-sandwich", "name": "Halloumi Sandwich", "description": "Halloumi cheese, tomatoes, cucumbers, thyme", "price": 6.00, "active": true },
        { "id": "chicken-sub", "name": "Chicken Sub", "description": "Chicken Cheese, Avocado, Garlic, Mayo, tomato, lettuce, pickles", "price": 12.00, "active": true },
        { "id": "fajita-chicken-sandwich", "name": "Fajita Chicken Sandwich", "description": "Served with fries & sour cream", "price": 10.00, "active": true },
        { "id": "fajita-beef-sandwich", "name": "Fajita Beef Sandwich", "description": "Served with fries & sour cream", "price": 12.00, "active": true },
        { "id": "crispy-chicken-wrap", "name": "Crispy Chicken Wrap", "description": "Crispy chicken, melted cheddar, iceberg & fries", "price": 10.00, "active": true }
      ]
    },
    {
      "id": "main-course",
      "name": "Main Course",
      "items": [
        { "id": "grilled-fish-filet", "name": "Grilled Fish Filet", "description": "Served with grilled vegetables and baked potatoe", "price": 14.00, "active": true },
        { "id": "grilled-salmon", "name": "Grilled Salmon", "description": "Served with grilled vegetables", "price": 32.00, "active": true },
        { "id": "chicken-escalope", "name": "Chicken Escalope", "description": "Served with fries & vegetables", "price": 18.00, "active": true },
        { "id": "grilled-chicken-breast", "name": "Grilled Chicken Breast", "description": "Served with vegetables and baked potatoe", "price": 18.00, "active": true },
        { "id": "fajita-sizzling-chicken", "name": "Fajita Sizzling Chicken", "description": "2 pers - Served with guacamole salsa, sour cream and shredded cheddar cheese", "price": 32.00, "active": true },
        { "id": "fajita-sizzling-beef", "name": "Fajita Sizzling Beef", "description": "2 pers - Served with guacamole salsa, sour cream and shredded cheddar cheese", "price": 32.00, "active": true },
        { "id": "beef-steak", "name": "Beef Steak (350 grs)", "description": "Served with mushrooms, ginger, broccoli, baked potatoe and our special sauce", "price": 28.00, "active": true },
        { "id": "steak-and-fries", "name": "Steak and Fries (350 grs)", "description": "Served with vegetables, fries and sauce (mushrooms or pepper)", "price": 28.00, "active": true }
      ]
    },
    {
      "id": "pizzas",
      "name": "Pizzas",
      "items": [
        { "id": "marguerita", "name": "Marguerita", "description": "Tomato sauce and mozzarella cheese", "price": 8.00, "active": true },
        { "id": "funghi", "name": "Funghi", "description": "Mozzarella, mushrooms, olives", "price": 10.00, "active": true },
        { "id": "normal", "name": "Normal", "description": "Mozzarella, ham, mushrooms, olives", "price": 10.00, "active": true },
        { "id": "dindoni", "name": "Dindoni", "description": "Tomato sauce, mozzarella, mushrooms, olives, thyme, Dinde", "price": 12.00, "active": true },
        { "id": "quattro-fromaggi", "name": "Quattro Fromaggi", "description": "Mozzarella, Roquefort, parmesan, emmental", "price": 11.00, "active": true },
        { "id": "poivron", "name": "Poivron", "description": "Mozzarella, ham, mushrooms, olives, pepperoni, peppers", "price": 12.00, "active": true },
        { "id": "verde", "name": "Verde", "description": "Mozzarella, mushrooms, olives, artichokes, thyme, peppers", "price": 11.00, "active": true },
        { "id": "con-corn", "name": "Con Corn", "description": "Mozzarella, ham, mushrooms, olives, artichoke, corn", "price": 11.00, "active": true },
        { "id": "con-pollo", "name": "Con Pollo", "description": "Tomato sauce, mozzarella, mushrooms, olives, chicken", "price": 14.00, "active": true },
        { "id": "sujuk-pizza", "name": "Sujuk Pizza", "description": "Mozzarella, sujuk, mushrooms, tomatoes, olives", "price": 11.00, "active": true },
        { "id": "pepperoni", "name": "Pepperoni", "description": "Mozzarella, ham, mushrooms, chorizo, olives", "price": 11.00, "active": true },
        { "id": "speciale", "name": "Speciale", "description": "Mozzarella, ham, mushrooms, olives, pepperoni, hot dog", "price": 12.00, "active": true },
        { "id": "bacon-pizza", "name": "Bacon", "description": "Mozzarella, bacon, mushrooms, olives", "price": 11.00, "active": true },
        { "id": "tarantella", "name": "Tarantella", "description": "Mozzarella, ham, olives, pepperoni, tomatoes, onions, parmesan, basilica, virgin oil", "price": 12.00, "active": true },
        { "id": "vegetable-al-forno", "name": "Vegetable Al Forno", "description": "Mozzarella, mushrooms, melanzane, zucchini, olives, cherry tomatoes, clove of garlic, olive oil, broccoli", "price": 11.00, "active": true },
        { "id": "capri", "name": "Capri", "description": "Mozzarella, parma ham, mushrooms, olives, artichokes, thyme", "price": 14.00, "active": true },
        { "id": "ai-frutti-di-mare", "name": "Ai Frutti Di Mare", "description": "Mozzarella, mushrooms, tuna, shrimps, mussels, olives", "price": 16.50, "active": true }
      ]
    },
    {
      "id": "burgers",
      "name": "Burgers",
      "items": [
        { "id": "hamburger", "name": "Hamburger", "description": "Grilled beef patty, grilled onions, tomatoes, iceberg, ketchup & mayo", "price": 10.50, "active": true },
        { "id": "cheese-burger", "name": "Cheese Burger", "description": "Grilled beef patty, melted cheddar cheese, grilled onions, tomatoes, iceberg, ketchup & mayo", "price": 11.00, "active": true },
        { "id": "bbq-bacon", "name": "BBQ Bacon", "description": "Grilled beef patty, melted cheddar cheese, grilled onions, tomatoes, iceberg & our mayo BBQ sauce", "price": 11.00, "active": true },
        { "id": "mozzarella-beef-burger", "name": "Mozzarella Beef Burger", "description": "Grilled beef patty, breaded mozzarella patty, tomatoes, iceberg & cocktail sauce", "price": 14.00, "active": true },
        { "id": "hawady-special-burger", "name": "Hawady Special Burger", "description": "Grilled beef Patty, melted cheese, crispy bacon, ham, chorizo, hotdog, grilled onions, tomatoes, iceberg & our mayo BBQ sauce", "price": 16.00, "active": true },
        { "id": "mozzarella-burger", "name": "Mozzarella Burger", "description": "Breaded mozzarella patty, tomatoes, iceberg & cocktail sauce", "price": 8.50, "active": true },
        { "id": "chicken-burger", "name": "Chicken Burger", "description": "Grilled chicken breast, melted cheddar cheese, iceberg & mayo or aioli sauce", "price": 9.00, "active": true },
        { "id": "mozzarella-chicken-burger", "name": "Mozzarella Chicken Burger", "description": "Grilled chicken breast, breaded mozzarella patty, iceberg, mayo or aioli sauce", "price": 12.00, "active": true }
      ]
    },
    {
      "id": "pasta",
      "name": "Pasta",
      "items": [
        { "id": "penne-arrabiata", "name": "Penne Arrabiata", "description": "", "price": 10.00, "active": true },
        { "id": "penne-4-cheese", "name": "Penne 4 Cheese", "description": "", "price": 12.00, "active": true },
        { "id": "tagliatelle-con-pollo", "name": "Tagliatelle con Pollo", "description": "", "price": 14.00, "active": true }
      ]
    },
    {
      "id": "salads",
      "name": "Salads",
      "items": [
        { "id": "greek-salad", "name": "Greek", "description": "Lettuce, tomatoes, cucumbers, fetta, mint, thyme, olives", "price": 12.00, "active": true },
        { "id": "chicken-caesar", "name": "Chicken Caesar", "description": "Chicken, iceberg, parmesan, croutons, cherry tomatoes", "price": 12.00, "active": true },
        { "id": "rocca-cheese", "name": "Rocca Cheese", "description": "Rocca, fresh mushrooms, parmesan", "price": 14.00, "active": true },
        { "id": "chef-salad", "name": "Chef", "description": "Iceberg, ham, cheese, corn, chicken, olives, cucumbers, tomatoes", "price": 16.00, "active": true },
        { "id": "smoked-salmon-salad", "name": "Smoked Salmon Salad", "description": "Iceberg, rocca, avocado, smoked salmon, capres", "price": 22.00, "active": true },
        { "id": "crab-salad", "name": "Crab", "description": "Iceberg, avocado, rocca, crab, pickled ginger", "price": 16.00, "active": true },
        { "id": "pasta-salad", "name": "Pasta Salad", "description": "Iceberg, corn, pasta, shredded cheese, tuna", "price": 12.00, "active": true },
        { "id": "tuna-salad", "name": "Tuna Salad", "description": "Tuna, corn, iceberg, olives, radish, thyme", "price": 12.00, "active": true },
        { "id": "hawady-salad", "name": "Hawady Salad", "description": "Iceberg, tomatoes, cucumbers, avocado, asparagus, corn, palmito, fresh mushrooms", "price": 19.00, "active": true }
      ]
    },
    {
      "id": "lebanese-corner",
      "name": "Lebanese Corner",
      "items": [
        { "id": "tawouk-platter", "name": "Sahan Tawouk (2 skewers)", "description": "Served with fries and grilled vegetables", "price": 14.00, "active": true },
        { "id": "kabab-platter", "name": "Sahan Kabab (3 skewers)", "description": "Served with fries and grilled vegetables", "price": 14.00, "active": true },
        { "id": "meat-platter", "name": "Sahan Lahme (2 skewers)", "description": "Served with fries and grilled vegetables", "price": 19.00, "active": true },
        { "id": "farrouj-mosahhab", "name": "Farrouj Mosahhab", "description": "Grilled boneless chicken with fries and vegetables", "price": 20.00, "active": true },
        { "id": "mixed-grill-1", "name": "Sahan Meshwi (1 meat, 1 kabab, 1 tawouk)", "description": "Served with fries and vegetables", "price": 20.00, "active": true },
        { "id": "mixed-grill-2", "name": "Sahan Meshwi (2 meat, 3 kabab, 2 tawouk)", "description": "Served with fries and vegetables", "price": 38.00, "active": true }
      ]
    },
    {
      "id": "lebanese-mezze",
      "name": "Lebanese Mezze",
      "items": [
        { "id": "tabbouleh-fattoush", "name": "Tabbouleh or Fattoush", "description": "", "price": 10.00, "active": true },
        { "id": "raqaqat", "name": "Raqaqat Cheese (5 pcs)", "description": "", "price": 9.00, "active": true },
        { "id": "hommos", "name": "Hommos", "description": "", "price": 5.00, "active": true },
        { "id": "hommos-meat", "name": "Hommos with Meat", "description": "", "price": 10.00, "active": true },
        { "id": "mouhamara", "name": "Mouhamara", "description": "", "price": 7.00, "active": true },
        { "id": "warak-enab", "name": "Warak Enab", "description": "", "price": 7.00, "active": true }
      ]
    },
    {
      "id": "dessert",
      "name": "Dessert",
      "items": [
        { "id": "ice-cream-1-scoop", "name": "Ice Cream 1 Scoop", "description": "", "price": 1.50, "active": true },
        { "id": "chocolate-fondant", "name": "Chocolate Fondant", "description": "", "price": 9.00, "active": true },
        { "id": "banana-split", "name": "Banana Split", "description": "", "price": 7.00, "active": true },
        { "id": "pain-perdu", "name": "Pain Perdu", "description": "Served with vanilla ice cream", "price": 12.00, "active": true },
        { "id": "achta-fruits", "name": "Achta Fruits", "description": "", "price": 14.00, "active": true }
      ]
    },
    {
      "id": "drinks",
      "name": "Drinks",
      "items": [
        { "id": "small-water", "name": "Small Water", "description": "", "price": 0.50, "active": true },
        { "id": "soft-drink", "name": "Soft Drink", "description": "", "price": 2.50, "active": true },
        { "id": "local-beer", "name": "Local Beer", "description": "", "price": 4.00, "active": true },
        { "id": "espresso", "name": "Espresso", "description": "", "price": 3.00, "active": true },
        { "id": "arak-glass", "name": "Arak (Glass)", "description": "", "price": 2.00, "active": true }
      ]
    }
  ]
};

let menuData = JSON.parse(localStorage.getItem('menuData')) || defaultMenuData;

const defaultFooterData = {
    name: "HAWADY",
    hours: "10am to 1am",
    address: "",
    phone: "03/947484 - 03/682100",
    whatsapp: "",
    instagram: ""
};

let footerData = JSON.parse(localStorage.getItem('footerData')) || defaultFooterData;

let selection = JSON.parse(sessionStorage.getItem('selection')) || [];

// Admin security data
let adminSecurity = JSON.parse(localStorage.getItem('adminSecurity')) || {
    passwordHash: null,
    sessions: [],
    attempts: { count: 0, lockUntil: 0 },
    deviceHash: null,
    enabled: true
};

function saveData() {
    localStorage.setItem('menuData', JSON.stringify(menuData));
}

function saveFooterData() {
    localStorage.setItem('footerData', JSON.stringify(footerData));
}

function saveSelection() {
    sessionStorage.setItem('selection', JSON.stringify(selection));
}

function saveAdminSecurity() {
    localStorage.setItem('adminSecurity', JSON.stringify(adminSecurity));
}

window.menuData = menuData;
window.saveData = saveData;
window.footerData = footerData;
window.saveFooterData = saveFooterData;
window.selection = selection;
window.saveSelection = saveSelection;
window.adminSecurity = adminSecurity;
window.saveAdminSecurity = saveAdminSecurity;
