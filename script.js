// ========== ОСНОВНА ЧАСТИНА ЗАВДАННЯ ==========

// Отримуємо елементи DOM за допомогою querySelector()
const textInput = document.querySelector('#textInput');
const addButton = document.querySelector('#addButton');
const itemsList = document.querySelector('#itemsList');
const listContainer = document.querySelector('#listContainer');
const emptyState = document.querySelector('#emptyState');

// Додаємо обробник події на кнопку за допомогою addEventListener()
addButton.addEventListener('click', addItemToList);

// Також додаємо можливість додавати елемент при натисканні Enter
textInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addItemToList();
    }
});

// Функція для додавання елементу в список
function addItemToList() {
    const inputText = textInput.value.trim();
    
    // Перевіряємо, чи введено текст
    if (inputText === '') {
        alert('Будь ласка, введіть текст!');
        return;
    }
    
    // Створюємо новий елемент списку за допомогою createElement()
    const listItem = document.createElement('li');
    listItem.className = 'list-item';
    
    // Створюємо span для тексту
    const textSpan = document.createElement('span');
    textSpan.textContent = inputText;
    
    // Створюємо кнопку видалення
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Видалити';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', () => {
        listItem.remove();
        checkEmptyState();
    });
    
    // Додаємо елементи в список за допомогою appendChild()
    listItem.appendChild(textSpan);
    listItem.appendChild(deleteBtn);
    itemsList.appendChild(listItem);
    
    // Очищаємо поле введення
    textInput.value = '';
    textInput.focus();
    
    // Перевіряємо стан списку
    checkEmptyState();
}

// Функція для перевірки, чи список порожній
function checkEmptyState() {
    if (itemsList.children.length === 0) {
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
    }
}

// Викликаємо при завантаженні сторінки
checkEmptyState();


// ========== БОНУСНА ЧАСТИНА: РОБОТА З API (HOI4 Theme) ==========

const loadCharactersBtn = document.querySelector('#loadCharactersBtn');
const clearCharactersBtn = document.querySelector('#clearCharactersBtn');
const charactersContainer = document.querySelector('#charactersContainer');

// Додаємо обробники подій для кнопок API
loadCharactersBtn.addEventListener('click', loadCharacters);
clearCharactersBtn.addEventListener('click', clearCharacters);

// Дані про лідерів країн Hearts of Iron 4 (1936)
// Портрети шукаються в папці portraits/
const hoi4Leaders = [
    // Німеччина
    {
        name: 'Adolf Hitler',
        country: 'Німеччина',
        countryCode: 'GER',
        ideology: 'Фашизм',
        title: 'Фюрер Німеччини',
        portraitFile: '89px-Portrait_GER_adolf_hitler.png',
        description: 'Лідер нацистської Німеччини'
    },
    // СРСР
    {
        name: 'Joseph Stalin',
        country: 'Радянський Союз',
        countryCode: 'SOV',
        ideology: 'Комунізм',
        title: 'Генеральний секретар',
        portraitFile: 'Portrait_soviet_joseph_stalin.webp',
        description: 'Лідер Радянського Союзу'
    },
    // Італія
    {
        name: 'Benito Mussolini',
        country: 'Італія',
        countryCode: 'ITA',
        ideology: 'Фашизм',
        title: 'Дуче',
        portraitFile: 'Portrait_italy_benito_mussolini.webp',
        description: 'Лідер фашистської Італії'
    },
    // Японія
    {
        name: 'Hirohito',
        country: 'Японія',
        countryCode: 'JAP',
        ideology: 'Фашизм',
        title: 'Імператор',
        portraitFile: '89px-Portrait_Japan_Hirohito.png',
        description: 'Імператор Японії'
    },
    {
        name: 'Tetsu Katayama',
        country: 'Японія',
        countryCode: 'JAP',
        ideology: 'Демократія',
        title: 'Прем\'єр-міністр',
        portraitFile: '89px-Portrait_jap_tetsu_katayama.png',
        description: 'Демократичний лідер Японії'
    },
    {
        name: 'Kyuichi Tokuda',
        country: 'Японія',
        countryCode: 'JAP',
        ideology: 'Комунізм',
        title: 'Голова',
        portraitFile: '89px-Portrait_jap_kyuichi_tokuda.png',
        description: 'Комуністичний лідер Японії'
    },
    // Китай
    {
        name: 'Mao Zedong',
        country: 'Комуністичний Китай',
        countryCode: 'PRC',
        ideology: 'Комунізм',
        title: 'Голова',
        portraitFile: '89px-Portrait_prc_mao_zedong.png',
        description: 'Лідер комуністичного Китаю'
    },
    {
        name: 'Chiang Kai-shek',
        country: 'Китай',
        countryCode: 'CHI',
        ideology: 'Нейтралітет',
        title: 'Генералісимус',
        portraitFile: '89px-Portrait_China_Chiang_Kai_Shek.png',
        description: 'Лідер національного Китаю'
    },
    {
        name: 'Wang Jingwei',
        country: 'Китай',
        countryCode: 'CHI',
        ideology: 'Фашизм',
        title: 'Президент',
        portraitFile: '89px-Portrait_chi_wang_jingwei.png',
        description: 'Лідер маріонеткового Китаю'
    },
    // Румунія
    {
        name: 'Carol II',
        country: 'Румунія',
        countryCode: 'ROM',
        ideology: 'Нейтралітет',
        title: 'Король Румунії',
        portraitFile: '89px-Portrait_romania_Carol_II.png',
        description: 'Король Румунії'
    },
    {
        name: 'Ion Antonescu',
        country: 'Румунія',
        countryCode: 'ROM',
        ideology: 'Фашизм',
        title: 'Кондукетор',
        portraitFile: '89px-Portrait_Romania_Ion_Antonescu.png',
        description: 'Військовий диктатор Румунії'
    },
    {
        name: 'Armand Călinescu',
        country: 'Румунія',
        countryCode: 'ROM',
        ideology: 'Демократія',
        title: 'Прем\'єр-міністр',
        portraitFile: '89px-Portrait_Romania_Armand_Calinescu.png',
        description: 'Демократичний лідер Румунії'
    },
    {
        name: 'Constantin Parhon',
        country: 'Румунія',
        countryCode: 'ROM',
        ideology: 'Комунізм',
        title: 'Президент',
        portraitFile: '89px-Portrait_Romania_Constantin_Parhon.png',
        description: 'Комуністичний лідер Румунії'
    },
    {
        name: 'Octavian Goga',
        country: 'Румунія',
        countryCode: 'ROM',
        ideology: 'Фашизм',
        title: 'Прем\'єр-міністр',
        portraitFile: '89px-Portrait_Romania_Octavian_Goga.png',
        description: 'Фашистський лідер Румунії'
    },
    {
        name: 'Corneliu Zelea Codreanu',
        country: 'Румунія',
        countryCode: 'ROM',
        ideology: 'Фашизм',
        title: 'Капітан',
        portraitFile: '89px-Portrait_corneliu_zelea_codreanu.png',
        description: 'Лідер Залізної Гвардії'
    },
    // Фінляндія
    {
        name: 'Kyösti Kallio',
        country: 'Фінляндія',
        countryCode: 'FIN',
        ideology: 'Демократія',
        title: 'Президент',
        portraitFile: '89px-Portrait_Finland_Kyosti_Kallio.png',
        description: 'Президент Фінляндії'
    },
    {
        name: 'Risto Ryti',
        country: 'Фінляндія',
        countryCode: 'FIN',
        ideology: 'Демократія',
        title: 'Президент',
        portraitFile: '89px-Portrait_FIN_risto_ryti.png',
        description: 'Воєнний президент Фінляндії'
    },
    {
        name: 'Carl Gustaf Emil Mannerheim',
        country: 'Фінляндія',
        countryCode: 'FIN',
        ideology: 'Нейтралітет',
        title: 'Маршал',
        portraitFile: '89px-Portrait_fin_carl_mannerheim.png',
        description: 'Військовий лідер Фінляндії'
    },
    {
        name: 'Juho Kusti Paasikivi',
        country: 'Фінляндія',
        countryCode: 'FIN',
        ideology: 'Демократія',
        title: 'Прем\'єр-міністр',
        portraitFile: '89px-Portrait_FIN_juho_kusti_paasikivi.png',
        description: 'Демократичний лідер Фінляндії'
    },
    {
        name: 'Pehr Evind Svinhufvud',
        country: 'Фінляндія',
        countryCode: 'FIN',
        ideology: 'Нейтралітет',
        title: 'Президент',
        portraitFile: '89px-Portrait_FIN_pehr_evind_svinhufvud.png',
        description: 'Колишній президент Фінляндії'
    },
    {
        name: 'Vilho Annala',
        country: 'Фінляндія',
        countryCode: 'FIN',
        ideology: 'Фашизм',
        title: 'Лідер',
        portraitFile: '89px-Portrait_FIN_vilho_annala.png',
        description: 'Фашистський лідер Фінляндії'
    },
    {
        name: 'Aimo Aaltonen',
        country: 'Фінляндія',
        countryCode: 'FIN',
        ideology: 'Комунізм',
        title: 'Голова',
        portraitFile: '89px-Portrait_FIN_aimo_aaltonen.png',
        description: 'Комуністичний лідер Фінляндії'
    },
    // Канада
    {
        name: 'William Lyon Mackenzie King',
        country: 'Канада',
        countryCode: 'CAN',
        ideology: 'Демократія',
        title: 'Прем\'єр-міністр',
        portraitFile: '89px-Portrait_Canada_Mackenzie_King.png',
        description: 'Прем\'єр-міністр Канади'
    },
    {
        name: 'Tim Buck',
        country: 'Канада',
        countryCode: 'CAN',
        ideology: 'Комунізм',
        title: 'Генеральний секретар',
        portraitFile: '89px-Portrait_Canada_Tim_Buck.png',
        description: 'Комуністичний лідер Канади'
    },
    {
        name: 'Adrien Arcand',
        country: 'Канада',
        countryCode: 'CAN',
        ideology: 'Фашизм',
        title: 'Фюрер',
        portraitFile: '89px-Portrait_Canada_Adrien_Arcand.png',
        description: 'Фашистський лідер Канади'
    },
    // Австралія
    {
        name: 'Eric Campbell',
        country: 'Австралія',
        countryCode: 'AST',
        ideology: 'Фашизм',
        title: 'Лідер',
        portraitFile: '89px-Portrait_Australia_Eric_Campbell.png',
        description: 'Фашистський лідер Австралії'
    },
    // Австрія
    {
        name: 'Kurt Schuschnigg',
        country: 'Австрія',
        countryCode: 'AUS',
        ideology: 'Нейтралітет',
        title: 'Канцлер',
        portraitFile: '89px-Portrait_Austria_Kurt_Schuschnigg.png',
        description: 'Останній канцлер Австрії'
    },
    {
        name: 'Kurt Schuschnigg',
        country: 'Австрія',
        countryCode: 'AUS',
        ideology: 'Демократія',
        title: 'Канцлер',
        portraitFile: '89px-Portrait_AUS_kurt_schuschnigg.png',
        description: 'Демократичний канцлер Австрії'
    },
    {
        name: 'Arthur Seyss-Inquart',
        country: 'Австрія',
        countryCode: 'AUS',
        ideology: 'Фашизм',
        title: 'Канцлер',
        portraitFile: '89px-Portrait_AUS_arthur_seyss_inquart.png',
        description: 'Нацистський канцлер Австрії'
    },
    {
        name: 'Alfred Klahr',
        country: 'Австрія',
        countryCode: 'AUS',
        ideology: 'Комунізм',
        title: 'Секретар',
        portraitFile: '89px-Portrait_AUS_alfred_klahr.png',
        description: 'Комуністичний лідер Австрії'
    },
    // Бельгія
    {
        name: 'Hubert Pierlot',
        country: 'Бельгія',
        countryCode: 'BEL',
        ideology: 'Демократія',
        title: 'Прем\'єр-міністр',
        portraitFile: '89px-Portrait_Belgium_Hubert_Pierlot.png',
        description: 'Прем\'єр-міністр Бельгії'
    },
    {
        name: 'Hubert Pierlot',
        country: 'Бельгія',
        countryCode: 'BEL',
        ideology: 'Демократія',
        title: 'Прем\'єр-міністр',
        portraitFile: '89px-Portrait_BEL_hubert_pierlot.png',
        description: 'Воєнний прем\'єр Бельгії'
    },
    {
        name: 'Émile Vandervelde',
        country: 'Бельгія',
        countryCode: 'BEL',
        ideology: 'Комунізм',
        title: 'Голова',
        portraitFile: '89px-Portrait_BEL_emile_vanderveld.png',
        description: 'Соціалістичний лідер Бельгії'
    },
    {
        name: 'Léon Degrelle',
        country: 'Бельгія',
        countryCode: 'BEL',
        ideology: 'Фашизм',
        title: 'Шеф',
        portraitFile: '89px-Portrait_BEL_leon_degrelle.png',
        description: 'Фашистський лідер Бельгії'
    },
    // Данія
    {
        name: 'Thorvald Stauning',
        country: 'Данія',
        countryCode: 'DEN',
        ideology: 'Демократія',
        title: 'Прем\'єр-міністр',
        portraitFile: '89px-Portrait_Denmark_Thorvald_Stauning.png',
        description: 'Прем\'єр-міністр Данії'
    },
    {
        name: 'Christian X',
        country: 'Данія',
        countryCode: 'DEN',
        ideology: 'Нейтралітет',
        title: 'Король',
        portraitFile: '89px-Portrait_DEN_christian_x.png',
        description: 'Король Данії'
    },
    {
        name: 'Aksel Larsen',
        country: 'Данія',
        countryCode: 'DEN',
        ideology: 'Комунізм',
        title: 'Голова',
        portraitFile: '89px-Portrait_DEN_aksel_larsen.png',
        description: 'Комуністичний лідер Данії'
    },
    // Латвія
    {
        name: 'Augusts Kirhenšteins',
        country: 'Латвія',
        countryCode: 'LAT',
        ideology: 'Комунізм',
        title: 'Прем\'єр-міністр',
        portraitFile: '89px-Portrait_LAT_augusts_kirhensteins.png',
        description: 'Лідер радянської Латвії'
    },
    // Люксембург
    {
        name: 'Pierre Dupong',
        country: 'Люксембург',
        countryCode: 'LUX',
        ideology: 'Демократія',
        title: 'Прем\'єр-міністр',
        portraitFile: '89px-Portrait_LUX_pierre_dupong.png',
        description: 'Прем\'єр-міністр Люксембургу'
    },
    {
        name: 'Joseph Bech',
        country: 'Люксембург',
        countryCode: 'LUX',
        ideology: 'Демократія',
        title: 'Міністр закордонних справ',
        portraitFile: '89px-Portrait_lux_joseph_bech.png',
        description: 'Демократичний лідер Люксембургу'
    },
    {
        name: 'Charles Marx',
        country: 'Люксембург',
        countryCode: 'LUX',
        ideology: 'Комунізм',
        title: 'Голова',
        portraitFile: '89px-Portrait_LUX_charles_marx.png',
        description: 'Комуністичний лідер Люксембургу'
    }
];

// Функція для завантаження лідерів за допомогою fetch() (симуляція API)
async function loadCharacters() {
    // Показуємо індикатор завантаження
    charactersContainer.innerHTML = '<p class="loading">⏳ Завантаження лідерів країн...</p>';
    
    try {
        // Симулюємо затримку API запиту
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Очищаємо контейнер
        charactersContainer.innerHTML = '';
        
        // Відображаємо кожного лідера
        hoi4Leaders.forEach(leader => {
            createLeaderCard(leader);
        });
        
        if (charactersContainer.children.length === 0) {
            charactersContainer.innerHTML = '<p class="empty-state">Лідери не знайдені</p>';
        }
        
    } catch (error) {
        console.error('Помилка:', error);
        charactersContainer.innerHTML = `<p class="error">❌ Помилка при завантаженні: ${error.message}</p>`;
    }
}

// Функція для створення картки лідера
function createLeaderCard(leader) {
    // Створюємо картку лідера за допомогою createElement()
    const card = document.createElement('div');
    card.className = 'character-card';
    
    // Створюємо бейдж ідеології
    const ideologyBadge = document.createElement('div');
    ideologyBadge.className = 'ideology-badge';
    ideologyBadge.textContent = leader.ideology;
    ideologyBadge.style.background = getIdeologyColor(leader.ideology);
    
    // Створюємо контейнер для портрету
    const portrait = document.createElement('div');
    portrait.className = 'leader-portrait';
    
    // Додаємо зображення портрету з локальної папки
    const img = document.createElement('img');
    img.src = `portraits/${leader.portraitFile}`;
    img.alt = leader.name;
    img.onerror = function() {
        // Якщо зображення не завантажилося, показуємо placeholder з емодзі
        const emoji = getCountryEmoji(leader.countryCode);
        this.parentElement.innerHTML = `<div style="font-size: 50px; line-height: 140px;">${emoji}</div>`;
    };
    
    portrait.appendChild(img);
    
    // Створюємо елементи тексту
    const name = document.createElement('h3');
    name.textContent = leader.name;
    
    const country = document.createElement('p');
    country.textContent = `${leader.country} (${leader.countryCode})`;
    country.style.fontWeight = 'bold';
    
    const title = document.createElement('p');
    title.textContent = leader.title;
    title.style.fontSize = '12px';
    title.style.fontStyle = 'italic';
    
    // Додаємо елементи в картку за допомогою appendChild()
    card.appendChild(ideologyBadge);
    card.appendChild(portrait);
    card.appendChild(name);
    card.appendChild(country);
    card.appendChild(title);
    
    // Додаємо обробник кліку для показу більше інформації
    card.addEventListener('click', () => {
        showLeaderInfo(leader);
    });
    
    // Додаємо картку в контейнер
    charactersContainer.appendChild(card);
}

// Функція для визначення кольору ідеології
function getIdeologyColor(ideology) {
    const colors = {
        'Фашизм': 'rgba(139, 69, 19, 0.9)',
        'Комунізм': 'rgba(220, 20, 60, 0.9)',
        'Демократія': 'rgba(30, 144, 255, 0.9)',
        'Нейтралітет': 'rgba(128, 128, 128, 0.9)'
    };
    return colors[ideology] || 'rgba(0, 0, 0, 0.7)';
}

// Функція для отримання emoji країни (fallback)
function getCountryEmoji(countryCode) {
    const emojis = {
        'GER': '🇩🇪',
        'SOV': '🚩',
        'ENG': '🇬🇧',
        'USA': '🇺🇸',
        'ITA': '🇮🇹',
        'JAP': '🇯🇵',
        'FRA': '🇫🇷',
        'PRC': '🚩',
        'CHI': '🇨🇳',
        'ROM': '🇷🇴',
        'FIN': '��',
        'CAN': '🇨🇦',
        'AST': '🇦🇺',
        'AUS': '�🇹',
        'BEL': '🇧🇪',
        'DEN': '🇩🇰',
        'LAT': '🇱🇻',
        'LUX': '��'
    };
    return emojis[countryCode] || '🎖️';
}

// Функція для показу інформації про лідера
function showLeaderInfo(leader) {
    const info = `
🎖️ Ім'я: ${leader.name}
🌍 Країна: ${leader.country} (${leader.countryCode})
👑 Титул: ${leader.title}
⚡ Ідеологія: ${leader.ideology}
📝 Опис: ${leader.description}
    `.trim();
    
    alert(info);
}

// Функція для очищення контейнера з лідерами
function clearCharacters() {
    charactersContainer.innerHTML = '<p class="empty-state">Натисніть "Завантажити лідерів" для показу даних</p>';
}

// Встановлюємо початковий стан
clearCharacters();

// ========== СЕКЦІЯ З ДОКТРИНАМИ ==========

const loadDoctrinesBtn = document.querySelector('#loadDoctrinesBtn');
const clearDoctrinesBtn = document.querySelector('#clearDoctrinesBtn');
const doctrinesContainer = document.querySelector('#doctrinesContainer');

// Додаємо обробники подій для кнопок доктрин
loadDoctrinesBtn.addEventListener('click', loadDoctrines);
clearDoctrinesBtn.addEventListener('click', clearDoctrines);

// Дані про військові доктрини HOI4
const hoi4Doctrines = [
    {
        name: 'Доктрина маневреної війни',
        nameEn: 'Mobile Warfare',
        type: 'Сухопутні війська',
        imageFile: 'Tech_tree_infantry_doctrine.png',
        description: 'Маневрена війна наголошує на швидкості і маневреності, щоб відрізати противника від основних сил і засмутити його бойові порядки.',
        mainEffects: [
            '⚡ Швидкість дивізії: +10%',
            '📉 Втрата організації під час руху: -10%',
            '📋 Швидкість планування: +50%',
            '💪 Прорив бронетехніки: +20%'
        ],
        keyTechnologies: [
            {
                name: 'Бліцкриг',
                description: 'Стратегія використання швидких танкових частин за підтримки моторизованої піхоти та авіації, щоб прорватися крізь оборонні порядки супротивника, дезорганізувати та оточити його.'
            },
            {
                name: 'Механізований наступ',
                description: 'Моторизована піхота всім хороша, але очолювати наступ має піхота, яка переміщується бронетранспортерами, оснащеними важким озброєнням.'
            },
            {
                name: 'Сучасний бліцкриг',
                description: 'Вінець маневреної війни, який включає всі останні технологічні досягнення і уроки, витягнуті з попередніх доктрин. Дає +20% до швидкості відновлення та прориву бронетехніки.'
            }
        ]
    },
    {
        name: 'Доктрина переваги вогневої могутності',
        nameEn: 'Superior Firepower',
        type: 'Сухопутні війська',
        imageFile: 'Tech_tree_infantry_doctrine.png',
        description: 'Ця доктрина наголошує на закиданні ворога снарядами, а не гарматним м\'ясом. Наші люди – на вагу золота, а кулі – ні.',
        mainEffects: [
            '🎯 Протипіхотна атака: +10%',
            '🔥 Координація: +5%',
            '✈️ Перевага у повітрі: +15%',
            '🎖️ Розмір бригади: +1'
        ],
        keyTechnologies: [
            {
                name: 'Централізований контроль артилерії',
                description: 'Система централізованого контролю артилерії дозволяє опрацьовувати всі запити на ведення артилерійського вогню в єдиному командному пункті. При необхідності вся вогнева міць дивізій може бути зосереджена на одній меті.'
            },
            {
                name: 'Шок та трепет',
                description: 'Величезне зосередження вогневої сили, що завдає противнику потужний удар негайно або досить своєчасно, щоб позбавити його здатності до подальших дій. Дає +5% до протипіхотної атаки всім підрозділам.'
            },
            {
                name: 'Повітряно-наземний бій',
                description: 'Інтеграція авіації передбачає ретельну координацію дій між наземними та повітряними військами, що дозволяє об\'єднати сушу та повітря в єдине поле бою.'
            }
        ]
    },
    {
        name: 'Доктрина великомасштабного планування',
        nameEn: 'Grand Battleplan',
        type: 'Сухопутні війська',
        imageFile: 'Tech_tree_infantry_doctrine.png',
        description: 'Ретельне планування та підготовка перед початком бою – запорука успіху. Лопата часом є найкращою зброєю піхоти.',
        mainEffects: [
            '🏗️ Швидкість створення укріплень: +25%',
            '🛡️ Максимальна укріпленість: +15%',
            '📋 Максимум планування: +20%',
            '👥 Організація піхоти: +20'
        ],
        keyTechnologies: [
            {
                name: 'Підготовлена оборона',
                description: 'Більш масштабна система польових укріплень помітно покращує обороноздатність бойової частини. Дає +10% до захисту та +10 до організації піхоти.'
            },
            {
                name: 'Проникаючий штурм',
                description: 'На початку атаки піхота має знайти слабкі місця у ворожій обороні, щоб ізолювати та обійти більш укріплені секції. Зменшує витрату запасів на 10%.'
            },
            {
                name: 'Командування, управління, зв\'язок та розвідка',
                description: 'Ефективні дії штабних офіцерів забезпечують регулярний обмін наказами, інформацією та розвідданими між командувачем та його бойовими частинами.'
            }
        ]
    },
    {
        name: 'Доктрина масованого штурму',
        nameEn: 'Mass Assault',
        type: 'Сухопутні війська',
        imageFile: 'Tech_tree_infantry_doctrine.png',
        description: 'Не варто ганятися за «ідеальною» зброєю; багато «досить гарної» зброї – ось шлях до перемоги! Концепція народної армії передбачає перевагу людини над зброєю.',
        mainEffects: [
            '🔄 Швидкість поповнення: +20%',
            '📚 Мінімальний рівень навчання: -10%',
            '� Військовообов\'язковий наступ: +5%',
            '🎖️ Втрати від виснаження: -10%'
        ],
        keyTechnologies: [
            {
                name: 'Масований бій',
                description: 'Тактика піхотних військ, в ході якої атакуючі частини ведуть прямий наступ на ворожу лінію оборони щільно зосередженими загонами піхоти, щоб зім\'яти її і вступити в рукопашний бій.'
            },
            {
                name: 'Партизанська війна',
                description: 'Використання партизанської тактики на окупованих територіях. Дає -30% до нестачі постачання та +25% до швидкості зростання опору.'
            },
            {
                name: 'Безперервний наступ',
                description: 'При достатній кількості резервів і правильної організації наступ можна зробити набагато глибшим. Дає -25% до втрати організації під час руху та +5% до швидкості поповнення.'
            }
        ]
    }
];

// Функція для завантаження доктрин
async function loadDoctrines() {
    // Показуємо індикатор завантаження
    doctrinesContainer.innerHTML = '<p class="loading">⏳ Завантаження доктрин...</p>';
    
    try {
        // Симулюємо затримку
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Очищаємо контейнер
        doctrinesContainer.innerHTML = '';
        
        // Відображаємо кожну доктрину
        hoi4Doctrines.forEach(doctrine => {
            createDoctrineCard(doctrine);
        });
        
        if (doctrinesContainer.children.length === 0) {
            doctrinesContainer.innerHTML = '<p class="empty-state">Доктрини не знайдені</p>';
        }
        
    } catch (error) {
        console.error('Помилка:', error);
        doctrinesContainer.innerHTML = `<p class="error">❌ Помилка при завантаженні: ${error.message}</p>`;
    }
}

// Функція для створення картки доктрини
function createDoctrineCard(doctrine) {
    // Створюємо картку доктрини за допомогою createElement()
    const card = document.createElement('div');
    card.className = 'doctrine-card';
    
    // Створюємо заголовок
    const title = document.createElement('h3');
    title.textContent = `${doctrine.name} (${doctrine.nameEn})`;
    
    // Створюємо зображення
    const img = document.createElement('img');
    img.src = `doctrines/${doctrine.imageFile}`;
    img.alt = doctrine.name;
    img.className = 'doctrine-image';
    img.onerror = function() {
        this.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400"><rect width="800" height="400" fill="%23555"/><text x="50%25" y="50%25" fill="white" text-anchor="middle" font-size="24">Доктрина: ' + doctrine.name + '</text></svg>';
    };
    
    // Створюємо опис
    const description = document.createElement('div');
    description.className = 'doctrine-description';
    
    const descText = document.createElement('p');
    descText.textContent = doctrine.description;
    descText.style.marginBottom = '15px';
    descText.style.fontStyle = 'italic';
    
    // Основні ефекти
    const effectsTitle = document.createElement('h4');
    effectsTitle.textContent = '⚡ Основні ефекти:';
    effectsTitle.style.color = '#f39c12';
    effectsTitle.style.marginTop = '15px';
    effectsTitle.style.marginBottom = '10px';
    
    const effectsList = document.createElement('ul');
    effectsList.style.listStyle = 'none';
    effectsList.style.padding = '0';
    
    doctrine.mainEffects.forEach(effect => {
        const li = document.createElement('li');
        li.textContent = effect;
        li.style.padding = '5px 0';
        li.style.paddingLeft = '10px';
        li.style.borderLeft = '3px solid #f39c12';
        li.style.marginBottom = '5px';
        effectsList.appendChild(li);
    });
    
    // Ключові технології
    const techTitle = document.createElement('h4');
    techTitle.textContent = '🔬 Ключові технології:';
    techTitle.style.color = '#3498db';
    techTitle.style.marginTop = '20px';
    techTitle.style.marginBottom = '10px';
    
    const techList = document.createElement('div');
    
    doctrine.keyTechnologies.forEach(tech => {
        const techItem = document.createElement('div');
        techItem.style.marginBottom = '12px';
        techItem.style.padding = '10px';
        techItem.style.background = 'rgba(52, 152, 219, 0.1)';
        techItem.style.borderRadius = '5px';
        techItem.style.borderLeft = '3px solid #3498db';
        
        const techName = document.createElement('strong');
        techName.textContent = tech.name;
        techName.style.color = '#3498db';
        techName.style.display = 'block';
        techName.style.marginBottom = '5px';
        
        const techDesc = document.createElement('span');
        techDesc.textContent = tech.description;
        techDesc.style.fontSize = '14px';
        
        techItem.appendChild(techName);
        techItem.appendChild(techDesc);
        techList.appendChild(techItem);
    });
    
    description.appendChild(descText);
    description.appendChild(effectsTitle);
    description.appendChild(effectsList);
    description.appendChild(techTitle);
    description.appendChild(techList);
    
    // Додаємо елементи в картку за допомогою appendChild()
    card.appendChild(title);
    card.appendChild(img);
    card.appendChild(description);
    
    // Додаємо обробник кліку
    card.addEventListener('click', () => {
        showDoctrineInfo(doctrine);
    });
    
    // Додаємо картку в контейнер
    doctrinesContainer.appendChild(card);
}

// Функція для показу інформації про доктрину
function showDoctrineInfo(doctrine) {
    const effectsText = doctrine.mainEffects.join('\n');
    const techText = doctrine.keyTechnologies.map(t => `• ${t.name}: ${t.description}`).join('\n\n');
    
    const info = `
📚 Доктрина: ${doctrine.name}
🌍 Тип: ${doctrine.type}
📖 Англійською: ${doctrine.nameEn}

📝 Опис:
${doctrine.description}

⚡ Основні ефекти:
${effectsText}

🔬 Ключові технології:
${techText}
    `.trim();
    
    alert(info);
}

// Функція для очищення контейнера з доктринами
function clearDoctrines() {
    doctrinesContainer.innerHTML = '<p class="empty-state">Натисніть "Показати доктрини" для перегляду</p>';
}

// Встановлюємо початковий стан
clearDoctrines();


// ========== ДОДАТКОВА ІНФОРМАЦІЯ ==========
console.log('✅ Script.js завантажено успішно!');
console.log('📚 Використані методи DOM:');
console.log('- querySelector() - для вибору елементів');
console.log('- addEventListener() - для обробки подій');
console.log('- createElement() - для створення нових елементів');
console.log('- appendChild() - для додавання елементів в DOM');
console.log('- fetch() - для роботи з API');
console.log('🎖️ Тема: Hearts of Iron 4 - Лідери країн Другої світової війни');
console.log('📚 Доктрини: Піхотні доктрини HOI4');
