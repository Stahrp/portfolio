$(document).ready(() => {
    render_projects('featured');
    setupModalListeners();
})

let setupModalListeners = () => {
    $(document).on('click', '.project-card', function (e) {
        if (!$(e.target).is('a')) {
            let projectData = $(this).data('project');
            openProjectModal(projectData);
        }
    });

    $(document).on('click', '.modal-close, .modal-overlay', function () {
        closeProjectModal();
    });

    $(document).on('click', '.modal-content', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', '.gallery-prev', function (e) {
        e.preventDefault();
        navigateGallery(-1);
    });

    $(document).on('click', '.gallery-next', function (e) {
        e.preventDefault();
        navigateGallery(1);
    });

    $(document).on('click', '.gallery-thumbnail', function (e) {
        e.preventDefault();
        let index = $(this).data('index');
        showGalleryImage(index);
    });
}

let currentGalleryIndex = 0;

let navigateGallery = (direction) => {
    let galleryItems = $('.gallery-item');
    currentGalleryIndex = (currentGalleryIndex + direction + galleryItems.length) % galleryItems.length;
    showGalleryImage(currentGalleryIndex);
}

let showGalleryImage = (index) => {
    currentGalleryIndex = index;
    $('.gallery-item').removeClass('active');
    $('.gallery-item').eq(index).addClass('active');

    $('.gallery-thumbnail').removeClass('active');
    $('.gallery-thumbnail').eq(index).addClass('active');

    let totalItems = $('.gallery-item').length;
    $('.gallery-counter').text((index + 1) + ' / ' + totalItems);
}

let openProjectModal = (project) => {
    let modal = $(`
        <div class="modal-overlay" id="projectModal">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="modal-body">
                    ${project.image ? `<img src="${project.image}" alt="${project.title}" class="modal-image">` : ''}
                    
                    ${project.gallery && project.gallery.length > 0 ? `
                        <div class="modal-gallery-section">
                            <h3 class="gallery-section-title">Gallery</h3>
                            <div class="gallery-main">
                                ${project.gallery.map((img, idx) => `
                                    <div class="gallery-item ${idx === 0 ? 'active' : ''}">
                                        <img src="${img}" alt="Gallery image ${idx + 1}" class="gallery-image">
                                    </div>
                                `).join('')}
                                <button class="gallery-prev">&#10094;</button>
                                <button class="gallery-next">&#10095;</button>
                                <div class="gallery-counter">${project.gallery.length > 0 ? '1' : '0'} / ${project.gallery.length}</div>
                            </div>
                            <div class="gallery-thumbnails">
                                ${project.gallery.map((img, idx) => `
                                    <img src="${img}" alt="Thumbnail ${idx + 1}" class="gallery-thumbnail ${idx === 0 ? 'active' : ''}" data-index="${idx}">
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    <h2 class="modal-title">${project.title}</h2>
                    <p class="modal-description">${project.description}</p>
                    
                    ${project.extendedDescription ? `
                        <div class="modal-extended-section">
                            <h3 class="extended-title">About This Project</h3>
                            <div class="extended-content">
                                ${project.extendedDescription}
                            </div>
                        </div>
                    ` : ''}
                    
                    <div class="modal-technologies">
                        <strong>Technologies:</strong>
                        <div class="tech-list">
                            ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                        </div>
                    </div>
                    <div class="modal-links">
                        ${project.link ? `<a href="${project.link}" class="modal-button github-button" target="_blank">View on GitHub</a>` : ''}
                        ${project.demo ? `<a href="${project.demo}" class="modal-button demo-button" target="_blank">Live Demo</a>` : ''}
                    </div>
                </div>
            </div>
        </div>
    `);

    $('body').append(modal);
    modal.fadeIn(300);
}

let closeProjectModal = () => {
    $('#projectModal').fadeOut(300, function () {
        $(this).remove();
    });
}


let render_projects = (slug) => {
    let projects_area = $('.projects-wrapper');

    $('.white-button').removeClass('white-button-hover');
    $(`#${slug}`).addClass('white-button-hover');

    let projects_obj = [
        {
            //BHE Flyers 
            image: 'assets/images/BHE-shop-poster.png',
            link: false,
            title: 'BHE Flyers',
            demo: false,
            technologies: ['Photoshop', 'Illustrator', 'InDesign'],
            description: "Created flyers and posters using the Adobe Suite for BHE hosted events, shop promotionals, handouts, and advertisements.",
            extendedDescription: "Featured in the gallery above include multiple flyers and posters that I created using Illustrator and Photoshop. First are three posters that are hung in the BHE shop, then a flyer for new car shocks, and finally a flyer for new car springs.",
            gallery: ['assets/images/BHE-shop-posters.jpeg', 'assets/images/Shock-flyer.png', 'assets/images/Spring-flyer.png'],
            categories: ['featured', 'flyersPosts']
        },
        {
            //BHE Posts
            image: 'assets/images/BHE-product-photo-post.png',
            link: false,
            title: 'BHE Posts',
            demo: false,
            technologies: ['Photoshop', 'Illustrator'],
            description: "Used company and stock assets to create promotional posts that were uploaded to BHE social accounts.",
            extendedDescription: "Posts included advertisements for new product photos, company events, reminders for event sign ups, and more!",
            gallery: ['assets/images/BHE-product-photos-2.png', 'assets/images/BHE-Harris-Clash-promo.png', 'assets/images/RTI-promo.png'],
            categories: ['featured', 'flyersPosts', 'photoVideo']
        },
        {
            //BHE Photo & Video
            image: 'assets/images/BHE-shop-outside.jpeg',
            link: false,
            title: 'BHE Photo & Video',
            demo: false,
            technologies: ['Digital Camera', 'Premiere Pro', 'Microphones'],
            description: "Used DSLR Cameras to take product photos and promotional video, edited them in photoshop and premiere pro to be uploaded on BHE Facebook.",
            extendedDescription: "Above is a picture of my setup for taking product photos, as well as my setup for an interview shoot with Bob Harris himself! If you want to see my video work, email me and I’ll send you some examples!",
            gallery: ['assets/images/BHE-product-photos-2.png', 'assets/images/BHE-Bob-interview.png', 'BHE-HarrisClash-promo.mp4'],
            categories: ['featured', 'photoVideo']
        },
        {
            //BHE Web Design
            image: 'assets/images/BHE-FB-banner.jpg',
            link: false,
            title: 'BHE Web Design',
            demo: false,
            technologies: ['Wix'],
            description: "Created two brand new websites for BHE (Bob Harris Enterprises) and RTI (Race Tech Info, using the web builder Wix and assets from BHE.",
            extendedDescription: "Unfortunately, BHE has since updated both of these sites, but above show a snapshot as to what my work used to look like!",
            gallery: ['assets/images/BHE-website.png', 'assets/images/RTI-website.png',],
            categories: ['featured', 'webDesign']
        },
        {
            image: 'assets/images/soot-spirits.png',
            link: 'https://github.com/abhn/Soot-Spirits',
            title: 'Soot Spirits',
            demo: 'https://sootspirits.github.io',
            technologies: ['Jekyll', 'CSS3'],
            description: "A simple responsive two column Jekyll theme. Great for personal blog and basic portfolio website.",
            extendedDescription: "",
            categories: ['webdev']
        },
        {
            image: 'assets/images/python-chat.png',
            link: 'https://www.nagekar.com/2014/12/lan-group-messenger-in-python.html',
            title: 'Terminal Group Chat',
            demo: false,
            technologies: ['Python', 'Sockets'],
            description: "Simple terminal group chat based on native sockets using Python.",
            categories: ['native']
        },
        {
            image: 'assets/images/old-lcd.jpg',
            link: 'https://www.nagekar.com/2018/05/reusing-old-laptop-lcd-panel.html',
            title: 'Reusing Old LCD Panel',
            demo: false,
            technologies: ['DIY'],
            description: "Reusing a dead laptop's LCD panel as a secondary monitor.",
            categories: ['diy']
        },
        {
            image: 'assets/images/nextcloud-enc.png',
            link: 'https://www.nagekar.com/2017/08/private-cloud-part-2.html',
            title: 'Encrypted Self-Hosted Cloud',
            demo: false,
            technologies: ['NextCloud', 'GnuPG'],
            description: "Self hosted encrypted cloud setup with Nextcloud and GnuPG.",
            categories: ['diy', 'security']
        },
        {
            image: 'assets/images/google-cloud-backup.png',
            link: 'https://www.nagekar.com/2018/05/encrypted-backup-with-duplicity.html',
            title: 'Encrypted Backups - Google Cloud',
            demo: false,
            technologies: ['NextCloud', 'Duplicity'],
            description: "Create automated encrypted incremental backups of data. Sync everything securely to Google Cloud.",
            categories: ['diy', 'security']
        },
        {
            image: 'assets/images/pi-cloud.jpg',
            link: 'https://www.nagekar.com/2016/01/how-to-private-local-cloud-using-raspberrypi.html',
            title: 'Local Cloud - Raspberry Pi',
            demo: false,
            technologies: ['FTP', 'DIY'],
            description: "Host a local cloud server with a Raspberry Pi and a spare hard disk. Access data instantaneously on any device on the network.",
            categories: ['diy']
        },
        {
            image: 'assets/images/koalamate.png',
            link: 'https://github.com/abhn/koalamate',
            title: 'Koalamate',
            demo: false,
            technologies: ['Electron', 'Javascript'],
            description: "A cross-platform desktop application that serves as a Wolfram Alpha query place and notes taker.",
            categories: ['native']
        },
    ]

    let projects = [];
    if (slug == 'all') {
        projects = projects_obj.map(project_mapper);
    }
    else {
        projects = projects_obj.filter(project => project.categories.includes(slug)).map(project_mapper);
    }
    projects_area.hide().html(projects).fadeIn();
}

let project_mapper = project => {
    return `
        <div class="wrapper">
                
            <div class="card radius shadowDepth1 project-card" data-project='${JSON.stringify(project)}'>

                ${project.image ?
            `<div class="card__image border-tlr-radius">
                        <img src="${project.image}" alt="image" id="project-image" class="border-tlr-radius">
                    </div>`
            : ''}

        
                <div class="card__content card__padding">
        
                    <article class="card__article">
                        <h2>${project.title}</h2>
        
                        <p class="paragraph-text-normal">${project.description} ${project.demo ? `<a href="${project.demo}" target="_blank">Demo</a>` : ''}</p>
                    </article>

                                
                    <div class="card__meta">
                        ${project.technologies.map(tech =>
                `<span class="project-technology paragraph-text-normal">${tech}</span>`
            ).join('')}
                    </div>

                </div>
            </div>
        </div>
    `
}

let selected = (slug) => {
    render_projects(slug);
}