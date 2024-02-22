const menuItems = [
    { title: 'Home', href: '/' },
    {
        title: 'Notes/Articles',
        subMenu: [
            {
                title: 'Linux',
                hxReq: '/category/linux',
                href: '/category',
                hxTarget: '#content',
                hxTrigger: 'click',
                name: 'linux',
            },
            {
                title: 'Programming',
                href: '#',
                hxReq: '/category/programming',
                hxTarget: '#content',
                hxTrigger: 'click',
                name: 'programming',
            },
            {
                title: 'Gaming',
                href: '#',
                hxReq: '/category/gaming',
                hxTarget: '#content',
                hxTrigger: 'click',
                name: 'gaming',
            },
        ],
    },
    { title: 'Tools', href: '#' },
    { title: 'Projects', href: '#' },
    { title: 'Live Wallpaper', href: '#' },
    { title: 'Editor', href: '/editor' },
    { title: 'Login', href: '/login' },
];

const createAnchor = (item) => {
    const anchor = document.createElement('a');
    anchor.textContent = item.title;
    anchor.href = item.href || '#';

    return anchor;
};

const createSubmenu = (subMenuItems) => {
    const subMenu = document.createElement('div');
    subMenu.classList.add('submenu');

    for (let i = 0; i < subMenuItems.length; i++) {
        const subMenuAnchor = createAnchor(subMenuItems[i]);
        console.log(subMenuItems[i].hxReq);
        subMenuAnchor.setAttribute('hx-get', subMenuItems[i].hxReq);
        subMenuAnchor.setAttribute('hx-target', subMenuItems[i].hxTarget);
        subMenuAnchor.setAttribute('hx-trigger', subMenuItems[i].hxTrigger);
        subMenuAnchor.setAttribute('hx-push-url', 'true');
        subMenu.appendChild(subMenuAnchor);
    }

    return subMenu;
};

const displayMenu = (menu) => {
    // create a menu div and append to the root
    const root = document.getElementById('root');
    const menuDiv = document.createElement('div');
    const profilePicture = document.createElement('img');
    const underline = document.createElement('div');
    underline.classList.add('underline');
    profilePicture.src = '../img/20230617_195550.jpg';
    profilePicture.classList.add('profile');
    menuDiv.appendChild(profilePicture);
    menuDiv.appendChild(underline);

    // Give menuDiv a class so it can be styled
    menuDiv.classList.add('menu');

    // Create the links from an object then append them to the menu div
    for (let i = 0; i < menu.length; i++) {
        const menuItemDiv = document.createElement('div');
        menuItemDiv.classList.add('menu-item');

        const anchor = createAnchor(menu[i]);
        menuItemDiv.appendChild(anchor);

        if (menu[i].subMenu) {
            const subMenu = createSubmenu(menu[i].subMenu);
            subMenu.classList.add('submenu-item');
            menuItemDiv.appendChild(subMenu);
            anchor.addEventListener('click', (event) => {
                event.preventDefault();
                subMenu.classList.toggle('submenu-show');
            });
        }

        menuDiv.appendChild(menuItemDiv);
    }

    root.appendChild(menuDiv);
};

displayMenu(menuItems);
