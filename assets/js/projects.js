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

    $(document).on('click', '.gallery-image', function (e) {
        e.stopPropagation();
        let imageSrc = $(this).attr('src');
        openImageLightbox(imageSrc);
    });

    $(document).on('click', '.lightbox-overlay, .lightbox-close', function () {
        closeLightbox();
    });

    $(document).on('click', '.lightbox-content', function (e) {
        e.stopPropagation();
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
                        ${project.demo ? `<a href="${project.demo}" class="modal-button demo-button" target="_blank">View Work</a>` : ''}
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

let openImageLightbox = (imageSrc) => {
    let lightbox = $(`
        <div class="lightbox-overlay" id="imageLightbox">
            <div class="lightbox-content">
                <button class="lightbox-close">&times;</button>
                <img src="${imageSrc}" alt="Gallery image" class="lightbox-image">
            </div>
        </div>
    `);

    $('body').append(lightbox);
    lightbox.fadeIn(300);
}

let closeLightbox = () => {
    $('#imageLightbox').fadeOut(300, function () {
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
            categories: ['flyersPosts']
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
            demo: 'https://drive.google.com/file/d/1Qsxwfdix0SUynV_NPdLGttQs92rN_qEi/view?usp=sharing',
            technologies: ['DSLRs', 'Premiere', 'Microphones'],
            description: "Used DSLR Cameras to take product photos and promotional video, edited them in photoshop and premiere pro to be uploaded on BHE Facebook.",
            extendedDescription: "Above is a picture of my setup for taking product photos, as well as my setup for an interview shoot with Bob Harris himself! If you want to see my video work, click below to see a collection of advirtisements I made at BHE using Premiere Pro.",
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
            categories: ['webDesign']
        },
        {
            //This portfolio
            image: 'assets/images/portfolio-screenshot.png',
            link: false,
            title: 'This Portfolio',
            demo: false,
            technologies: ['Javascript', 'HTML', 'CSS'],
            description: "Took my old portfolio website and completely redid it from a Jekyll theme using Javascript, HTML, and CSS.",
            extendedDescription: "I chose to remake this portfolio site from my wix site at stahrp04.wixsite.com/peterstahr because I wanted more control over the design, functionality, and upload formats. Using Javascript, HTML, and CSS, I was able to create a custom site that better showcases my skills and projects.",
            gallery: ['assets/images/portfolio-screenshot.png'],
            categories: ['webDesign']
        },
        {
            //3D Modeling
            image: 'assets/images/parthenon.png',
            link: false,
            title: '3D Modeling',
            demo: 'https://drive.google.com/file/d/18y0Kp2w0FLYiEdSknGCErd_3N6vPThpl/view?usp=sharing',
            technologies: ['Blender'],
            description: "Work from 3D Modeling (EMDA 353) at Southern Oregon University. Used Blender to create assets and environments",
            extendedDescription: "This is one of my favorite classes, and it made me realize my love for 3D modeling work.  First is a dungeon which highlights my work with creating custom environments using multiple tools to create a natural look. And secondly is a project I spent many hours on, making a ‘sun temple’ which brought together my skills in the class. First is an image of the assets, and second is a snapshot of the final render. Below is a render of a flythrough of the Sun Temple environment.",
            gallery: ['assets/images/dungeon-image.png', 'assets/images/sun-temple-assets.png', 'assets/images/sun-temple-render2.jpg'],
            categories: ['featured', 'animationModeling']
        },
        {
            //3D & 2D Animation
            image: 'assets/images/2D-animation-snapshot.png',
            link: false,
            title: '3D & 2D Animation',
            demo: 'https://drive.google.com/file/d/1yIo6rBy44leqwCmoO3YuptIkcEZlr3aw/view?usp=drive_link',
            technologies: ['Blender', 'Photoshop', 'After Effects'],
            description: "Here are some examples of my animation work, from my time throughout college at UNI and SOU",
            extendedDescription: "Below is a link to my final reel from EMDA 353, where we focused on 3D animating in blender. This greatly accelerated my interest and experience with the program and I hope to work more with Blender in the future! The other two images are snapshots of After Effects projects I had from Animation, Video and Sound (ART 2061) at UNI. The first is a stop motion project, and the second is a storyboard from my final! Contact me if you want more info/project reels from that!",
            gallery: ['assets/images/3D-animation-poses.png', 'assets/images/avs-stopmo.png', 'assets/images/avs-storyboard.png'],
            categories: ['featured', 'animationModeling', 'photoVideo']
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