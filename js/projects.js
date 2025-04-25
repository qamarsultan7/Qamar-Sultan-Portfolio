// Project data model
const projectsData = [
  {
    id: 'nagarikapp',
    title: 'Nagarik App',
    category: 'mobile apps',
    image: 'images/nagarikapp.png',
    description: 'A comprehensive Flutter mobile application that serves as a digital identity platform for citizens. Features include digital ID, government services access, and secure user authentication.',
    technologies: ['Flutter', 'Dart', 'Firebase', 'RESTful API'],
    link: 'https://nagarikapp.gov.np/'
  },
  {
    id: 'ambitionguru',
    title: 'Ambition Guru',
    category: 'mobile apps',
    image: 'images/ambitionguru.png',
    description: 'An educational Flutter app designed to help students prepare for competitive exams. Includes features like practice tests, study materials, and performance tracking.',
    technologies: ['Flutter', 'Firebase', 'Django REST API'],
    link: 'https://www.ambition.guru/'
  },
  {
    id: 'sociair',
    title: 'Sociair',
    category: 'mobile apps',
    image: 'images/sociair.png',
    description: 'A social networking app built with Flutter that helps users connect with like-minded individuals. Features image sharing, real-time chat, and personalized feeds.',
    technologies: ['Flutter', 'Firebase', 'Cloud Functions'],
    link: 'https://play.google.com/store/apps/details?id=com.onewinme.sociair'
  },
  {
    id: 'tokma',
    title: 'Tokma',
    category: 'mobile apps',
    image: 'images/tokma.png',
    description: 'An AI-powered chat application that provides intelligent responses to user queries. Built with Flutter and integrated with advanced NLP systems.',
    technologies: ['Flutter', 'AI/ML', 'Django Backend'],
    link: 'https://tokma.ai/'
  },
  {
    id: 'saara',
    title: 'Saara',
    category: 'mobile apps',
    image: 'images/saara.png',
    description: 'A fashion e-commerce application with features like product browsing, cart management, wishlist, and secure payment processing.',
    technologies: ['Flutter', 'Firebase', 'Payment Gateway Integration'],
    link: 'https://play.google.com/store/apps/details?id=com.inflancer.saara'
  },
  {
    id: 'ifood',
    title: 'iFood',
    category: 'mobile apps',
    image: 'images/ifood.png',
    description: 'A food delivery app with features for ordering food from local restaurants, tracking delivery, and payment processing. Includes both customer and restaurant management interfaces.',
    technologies: ['Flutter', 'Firebase', 'Google Maps API'],
    link: './assets/projects/ifood.png'
  },
  {
    id: 'merodate',
    title: 'MeroDate',
    category: 'mobile apps',
    image: 'images/merodate.png',
    description: 'A dating application with features like user matching, chat, profile customization, and location-based matching.',
    technologies: ['Flutter', 'Firebase', 'Geolocation API'],
    link: './assets/projects/merodate.png'
  },
  {
    id: 'weatherapp',
    title: 'Weather App',
    category: 'mobile apps',
    image: 'images/weatherapp.png',
    description: 'A weather forecasting app that provides current weather conditions and forecasts for multiple locations. Features include weather alerts and detailed meteorological data.',
    technologies: ['Flutter', 'Weather API', 'Geolocation'],
    link: './assets/projects/weatherapp.png'
  },
  {
    id: 'musicapp',
    title: 'Music App',
    category: 'mobile apps',
    image: 'images/music.png',
    description: 'A music streaming application with features like playlists, favorite tracks, music discovery, and offline playback.',
    technologies: ['Flutter', 'Audio Processing', 'Firebase'],
    link: './assets/projects/music.png'
  },
  {
    id: 'movieapp',
    title: 'Movie App',
    category: 'mobile apps',
    image: 'images/movieapp.png',
    description: 'A movie browsing and recommendation app with features like movie details, trailers, ratings, and personalized recommendations.',
    technologies: ['Flutter', 'TMDb API', 'Firebase'],
    link: './assets/projects/movieapp.png'
  },
  {
    id: 'houseman',
    title: 'Houseman',
    category: 'ai/ml',
    image: 'images/houseman.png',
    description: 'A real estate management application UI design with features for property listing, tenant management, and maintenance requests.',
    technologies: ['Python', 'Langchain', 'OpenAI API'],
    link: './assets/projects/houseman.png'
  }
];

// Function to handle project filtering
function setupProjectFilters() {
  const filterButtons = document.querySelectorAll('[data-filter-btn]');
  const selectItems = document.querySelectorAll('[data-select-item]');
  
  // Function to filter projects by category
  function filterProjects(category) {
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
      // Get the category from the data attribute (case-insensitive comparison)
      let itemCategory = item.getAttribute('data-category');
      
      if (!itemCategory) return;
      
      // Make comparison case-insensitive
      itemCategory = itemCategory.toLowerCase();
      const filterCategory = category.toLowerCase();
      
      // Show all items if "All" is selected, otherwise filter by category
      if (filterCategory === 'all' || itemCategory === filterCategory) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
    
    // Check if any projects are visible and show/hide "no projects" message
    checkVisibleProjects();
  }
  
  // Set up filter button click handlers
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Get the text content of the button as the category
      const category = this.textContent.trim();
      
      // Update active state on buttons
      document.querySelector('[data-filter-btn].active')?.classList.remove('active');
      this.classList.add('active');
      
      // Update the select value for mobile dropdown
      const selectValue = document.querySelector('[data-selecct-value]');
      if (selectValue) {
        selectValue.textContent = category;
      }
      
      // Filter the projects
      filterProjects(category);
    });
  });
  
  // Set up select item handlers for mobile dropdown
  selectItems.forEach(item => {
    item.addEventListener('click', function() {
      // Get the text content of the button as the category
      const category = this.textContent.trim();
      
      // Update the select value
      const selectValue = document.querySelector('[data-selecct-value]');
      if (selectValue) {
        selectValue.textContent = category;
      }
      
      // Find and trigger the corresponding filter button
      filterButtons.forEach(btn => {
        if (btn.textContent.trim().toLowerCase() === category.toLowerCase()) {
          btn.click();
        }
      });
    });
  });
}

// Function to normalize category for consistent filtering
function normalizeCategory(category) {
  if (category.toLowerCase() === 'ai/ml') {
    return 'ai/ml';
  }
  return category.toLowerCase();
}

// Modify generateProjectItems function to use normalized categories
function generateProjectItems() {
  const projectList = document.getElementById('dynamic-project-list');
  
  // Clear existing items
  if (projectList) {
    projectList.innerHTML = '';
    
    // Generate items from projectsData
    projectsData.forEach((project) => {
      const listItem = document.createElement('li');
      listItem.className = 'project-item active';
      listItem.setAttribute('data-filter-item', '');
      
      // Normalize category for consistent filtering
      const normalizedCategory = normalizeCategory(project.category);
      listItem.setAttribute('data-category', normalizedCategory);
      listItem.setAttribute('data-project-id', project.id);
      
      // Create project item HTML
      listItem.innerHTML = `
        <a href="${project.link}" target="_blank">
          <figure class="project-img">
            <div class="project-item-icon-box">
              <ion-icon name="eye-outline"></ion-icon>
            </div>
            <img src="${project.image}" alt="${project.title}" loading="lazy">
          </figure>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-category">${project.category.charAt(0).toUpperCase() + project.category.slice(1)}</p>
        </a>
      `;
      
      projectList.appendChild(listItem);
    });
    
    // Setup event listeners for the newly created items
    setupProjectItems();
  }
}

// Create and initialize the project modal functionality
document.addEventListener('DOMContentLoaded', () => {
  // Create modal container if it doesn't exist
  if (!document.querySelector('.project-modal-container')) {
    // Create modal elements properly using DOM methods instead of innerHTML
    const modalContainer = document.createElement('div');
    modalContainer.className = 'project-modal-container';

    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'project-modal-overlay';

    const modalDiv = document.createElement('div');
    modalDiv.className = 'project-modal';

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'project-modal-close-btn';
    closeBtn.innerHTML = '<ion-icon name="close-outline"></ion-icon>';

    // Modal content container
    const modalContent = document.createElement('div');
    modalContent.className = 'project-modal-content';

    // Image section
    const modalImage = document.createElement('div');
    modalImage.className = 'project-modal-image';
    const img = document.createElement('img');
    img.id = 'project-modal-img';
    img.alt = 'Project Image';
    modalImage.appendChild(img);

    // Details section
    const modalDetails = document.createElement('div');
    modalDetails.className = 'project-modal-details';

    // Title
    const modalTitle = document.createElement('h3');
    modalTitle.className = 'h3 project-modal-title';

    // Description
    const modalDescription = document.createElement('p');
    modalDescription.className = 'project-modal-description';

    // Technologies section
    const techSection = document.createElement('div');
    techSection.className = 'project-modal-technologies';

    const techTitle = document.createElement('h4');
    techTitle.className = 'h4';
    techTitle.textContent = 'Technologies';

    const techList = document.createElement('ul');
    techList.className = 'project-modal-tech-list';

    techSection.appendChild(techTitle);
    techSection.appendChild(techList);

    // Link button
    const linkButton = document.createElement('a');
    linkButton.className = 'project-modal-link form-btn';
    linkButton.target = '_blank';
    linkButton.innerHTML = '<ion-icon name="link-outline"></ion-icon><span>Visit Project</span>';

    // Append all elements in proper hierarchy
    modalDetails.appendChild(modalTitle);
    modalDetails.appendChild(modalDescription);
    modalDetails.appendChild(techSection);
    modalDetails.appendChild(linkButton);

    modalContent.appendChild(modalImage);
    modalContent.appendChild(modalDetails);

    modalDiv.appendChild(closeBtn);
    modalDiv.appendChild(modalContent);

    modalContainer.appendChild(modalOverlay);
    modalContainer.appendChild(modalDiv);

    document.body.appendChild(modalContainer);

    // Add event listeners for modal close
    modalOverlay.addEventListener('click', closeProjectModal);
    closeBtn.addEventListener('click', closeProjectModal);

    // Add keyboard listener for ESC key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeProjectModal();
      }
    });
  }

  // Generate project items
  generateProjectItems();
  
  // Set up project filters
  setupProjectFilters();
  
  // Add "no projects" message element if it doesn't exist
  if (!document.querySelector('.no-projects-message')) {
    const portfolioSection = document.querySelector('.projects');
    const noProjectsMsg = document.createElement('div');
    noProjectsMsg.className = 'no-projects-message';
    noProjectsMsg.textContent = 'Projects will be added soon';
    noProjectsMsg.style.display = 'none';
    noProjectsMsg.style.textAlign = 'center';
    noProjectsMsg.style.padding = '50px 0';
    noProjectsMsg.style.fontSize = '18px';
    noProjectsMsg.style.color = 'var(--light-gray)';
    noProjectsMsg.style.fontWeight = '500';
    
    // Insert after the filter list
    const projectList = document.querySelector('.project-list');
    if (projectList && portfolioSection) {
      portfolioSection.insertBefore(noProjectsMsg, projectList.nextSibling);
    }
  }
});

// Modify the existing setupProjectItems function to work with dynamically created items
function setupProjectItems() {
  const projectItems = document.querySelectorAll('.project-item');

  projectItems.forEach((item) => {
    const projectId = item.getAttribute('data-project-id');
    if (!projectId) return;
    
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;

    // Find the project link and add event listener
    const projectLink = item.querySelector('a');
    if (projectLink) {
      // Remove any existing event listeners first (to prevent duplicates)
      const newProjectLink = projectLink.cloneNode(true);
      projectLink.parentNode.replaceChild(newProjectLink, projectLink);

      // Add click and touch events
      newProjectLink.addEventListener('click', function (e) {
        e.preventDefault();
        openProjectModal(projectId);
      });

      // Ensure mobile touch events work properly
      newProjectLink.addEventListener('touchend', function (e) {
        e.preventDefault();
        openProjectModal(projectId);
      });

      // Add aria attributes for accessibility
      newProjectLink.setAttribute('aria-label', `View details of ${project.title} project`);
      newProjectLink.setAttribute('role', 'button');
    }
  });
}

// Open project modal with specific project data
function openProjectModal(projectId) {
  const project = projectsData.find(p => p.id === projectId);
  if (!project) return;

  const modalContainer = document.querySelector('.project-modal-container');
  const modalTitle = document.querySelector('.project-modal-title');
  const modalDescription = document.querySelector('.project-modal-description');
  const modalImage = document.querySelector('#project-modal-img');
  const modalTechList = document.querySelector('.project-modal-tech-list');
  const modalLink = document.querySelector('.project-modal-link');

  // Safely update modal content (with text nodes to prevent HTML injection)
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;

  // Set image source
  modalImage.src = project.image;
  modalImage.alt = project.title;

  // Set link
  modalLink.href = project.link;

  // Update technologies list
  modalTechList.innerHTML = '';
  project.technologies.forEach(tech => {
    const li = document.createElement('li');
    li.textContent = tech;
    modalTechList.appendChild(li);
  });

  // Show modal with animation
  requestAnimationFrame(() => {
    modalContainer.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  });
}

// Close project modal
function closeProjectModal() {
  const modalContainer = document.querySelector('.project-modal-container');
  if (!modalContainer) return;

  modalContainer.classList.remove('active');
  document.body.style.overflow = ''; // Enable scrolling
}

// Function to check if any projects are visible and show/hide "no projects" message
function checkVisibleProjects() {
  const projectItems = document.querySelectorAll('.project-item.active');
  const noProjectsMsg = document.querySelector('.no-projects-message');
  
  if (!noProjectsMsg) return;
  
  if (projectItems.length === 0) {
    noProjectsMsg.style.display = 'block';
  } else {
    noProjectsMsg.style.display = 'none';
  }
}

// Export functions so they can be accessed in script.js if needed
window.generateProjectItems = generateProjectItems;
window.checkVisibleProjects = checkVisibleProjects;
