$(document).ready(() => {
    render_projects('featured');
    setupModalListeners();
})

let setupModalListeners = () => {
    $(document).on('click', '.project-card', function(e) {
        if (!$(e.target).is('a')) {
            let projectData = $(this).data('project');
            openProjectModal(projectData);
        }
    });

    $(document).on('click', '.modal-close, .modal-overlay', function() {
        closeProjectModal();
    });

    $(document).on('click', '.modal-content', function(e) {
        e.stopPropagation();
    });

    $(document).on('click', '.gallery-prev', function(e) {
        e.preventDefault();
        navigateGallery(-1);
    });

    $(document).on('click', '.gallery-next', function(e) {
        e.preventDefault();
        navigateGallery(1);
    });

    $(document).on('click', '.gallery-thumbnail', function(e) {
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
    $('#projectModal').fadeOut(300, function() {
        $(this).remove();
    });
}


let render_projects = (slug) => {
    let projects_area = $('.projects-wrapper');

    $('.white-button').removeClass('white-button-hover');
    $(`#${slug}`).addClass('white-button-hover');

    let projects_obj = [
        {
            image: 'assets/images/BHE-product-photo-post.png',
            link: false,
            title: 'BHE Posts',
            demo: false,
            technologies: ['Cameras', 'Photoshop', 'Illustrator'],
            description: "Used DSLR Cameras to take product photos, edited them in photoshop, and finished making product posts in illustrator. They were then uploaded to BHE’s facebook page.",
                extendedDescription: "Posts included promotional photos and videos for the Harris Clash, product photos for new releases in their online store, reminders for event sign ups, and more!",
            gallery: ['assets/images/BHE-product-photos-2.png', 'assets/images/BHE-Harris-Clash-promo.png', 'assets/images/RTI-promo.png'],
            categories: ['featured', 'flyersPosts', 'photoVideo']

        },
        {
            image: 'assets/images/mobile-landscape.jpg',
            link: 'https://github.com/abhn/Wall-E',
            title: 'Wall-E',
            demo: 'http://wall-e-jekyll.github.io/',
            technologies: ['Semantic UI', 'Jekyll'],
            description: "A modern Jekyll theme with grid frontpage, beautiful typography, mobile responsive, made with Semantic UI.",
            extendedDescription: "Wall-E is a comprehensive Jekyll theme designed for professionals and developers. It features a responsive grid-based layout built with Semantic UI components, ensuring optimal display across all devices. The theme includes extensive customization options, pre-built sections for projects and skills, and SEO optimization built-in. Perfect for creating a modern, professional portfolio website with minimal setup.",
            gallery: ['assets/images/whiteSandDuneBG.jpg', 'assets/images/whiteSandDuneBG.jpg', 'assets/images/whiteSandDuneBG.jpg'],
            categories: ['featured', 'webdev']
        },
        {
            image: 'assets/images/collage.jpg',
            link: 'https://github.com/abhn/Marvel',
            title: 'Marvel',
            demo: false,
            technologies: ['Android', 'OpenCV'],
            description: "Attendance marking tool that uses face recognition for marking attendance and firebase for tracking and analytics.",
            extendedDescription: "Marvel revolutionizes classroom attendance with facial recognition technology. The Android application uses OpenCV to identify students in real-time and automatically logs their attendance to Firebase. Teachers can view attendance reports, generate analytics, and identify trends. This eliminates traditional paper-based or manual rollcall systems and reduces administrative overhead.",
            gallery: ['assets/images/whiteSandDuneBG.jpg', 'assets/images/whiteSandDuneBG.jpg', 'assets/images/whiteSandDuneBG.jpg'],
            categories: ['featured', 'native']
        },
        {
            image: 'assets/images/mpw.jpg',
            link: 'https://github.com/abhn/mpw',
            title: 'Master Password',
            demo: 'https://www.nagekar.com/mpw',
            technologies: ['Semantic UI', 'CSS3'],
            description: "Master Password is an ingenious password solution that makes your passwords truly impossible to lose.",
            extendedDescription: "Master Password uses cryptographic algorithms to generate unique passwords on-the-fly from a single master password. Unlike traditional password managers that store encrypted databases, this approach means there's nothing to back up, sync, or lose. Every password is mathematically derived from your master password, making recovery simple and security foolproof.",
            gallery: ['assets/images/whiteSandDuneBG.jpg', 'assets/images/whiteSandDuneBG.jpg', 'assets/images/whiteSandDuneBG.jpg'],
            categories: ['featured', 'security']
        },
        {
            image: 'assets/images/social-share-count.jpeg',
            link: 'https://github.com/abhn/Social-Share-Counts',
            title: 'Social Share Count',
            demo: false,
            technologies: ['Python'],
            description: "Ever wondered how many times a URL has been shared on popular social networks?",
            extendedDescription: "This Python utility provides a simple interface to query social media platforms and retrieve sharing statistics for any given URL. It aggregates data from Twitter, Facebook, LinkedIn, and other major platforms to give you a comprehensive view of your content's social reach. Perfect for content creators and marketers analyzing content performance.",
            gallery: ['assets/images/whiteSandDuneBG.jpg', 'assets/images/whiteSandDuneBG.jpg'],
            categories: ['native']
        },
        {
            image: 'assets/images/data-destroyer.png',
            link: 'https://github.com/abhn/data-destroyer-gui',
            title: 'Data Destroyer',
            demo: false,
            technologies: ['C++', 'Qt'],
            description: "Native GUI wrapper for GNU coreutils tool 'dd'",
            extendedDescription: "Data Destroyer provides a user-friendly graphical interface for the powerful 'dd' command-line tool. Built with Qt, it simplifies disk imaging, cloning, and formatting operations that would otherwise require command-line expertise. The GUI includes progress tracking, error handling, and safety confirmations to prevent accidental data loss.",
            gallery: ['assets/images/whiteSandDuneBG.jpg', 'assets/images/whiteSandDuneBG.jpg'],
            categories: ['native']
        },
        {
            image: 'assets/images/raspberry-pi-monitor.png',
            link: 'https://github.com/abhn/RPi-Status-Monitor',
            title: 'Raspberry Pi Monitor',
            demo: false,
            technologies: ['python', 'flask'],
            description: "Web based status monitor/smart mirror, displays system stats, weather and more.",
            extendedDescription: "Transform your Raspberry Pi into an intelligent information display using this Flask-based web application. Monitor CPU usage, memory, disk space, and system temperature in real-time. Integrate weather data, display time and date, and customize the dashboard layout. Ideal for creating a smart mirror or status board in your home or office.",
            categories: ['webdev', 'diy']
        },
        {
            image: 'assets/images/s3scan.png',
            link: 'https://github.com/abhn/S3Scan',
            title: 'S3Scan',
            demo: false,
            technologies: ['python'],
            description: "Automate crawling of a website and find publicly open S3 buckets for takeover.",
            extendedDescription: "S3Scan is a security auditing tool that automatically crawls websites and identifies publicly accessible AWS S3 buckets that may pose a security risk. The tool extracts S3 bucket references from web pages and tests their accessibility levels. It's an essential utility for security researchers and organizations looking to identify and remediate S3 bucket misconfigurations.",
            categories: ['native', 'security']
        },
        {
            image: 'assets/images/elementary.png',
            link: 'https://github.com/abhn/Elementary',
            title: 'Elementary',
            demo: 'https://elementary-jekyll.github.io/',
            technologies: ['Jekyll', 'CSS3'],
            description: "Elementary is a zero Javascript and minimal CSS ultra lightweight Jekyll theme for those of you who love simplicity.",
            extendedDescription: "Elementary embraces minimalism with a zero-JavaScript approach and lightweight CSS styling. Optimized for fast loading times and excellent performance, this Jekyll theme is perfect for blogs and simple portfolio sites. The clean, elegant design focuses on content readability while maintaining full responsiveness across all devices.",
            categories: ['webdev']
        },
        {
            image: 'assets/images/soot-spirits.png',
            link: 'https://github.com/abhn/Soot-Spirits',
            title: 'Soot Spirits',
            demo: 'https://sootspirits.github.io',
            technologies: ['Jekyll', 'CSS3'],
            description: "A simple responsive two column Jekyll theme. Great for personal blog and basic portfolio website.",
            extendedDescription: "Soot Spirits is an elegant two-column Jekyll theme ideal for bloggers and portfolio sites. Features include a sidebar for navigation and widgets, a clean main content area for blog posts, and responsive design that adapts beautifully to mobile devices. The theme includes support for categories, tags, and social media integration.",
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
    if(slug == 'all') {
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