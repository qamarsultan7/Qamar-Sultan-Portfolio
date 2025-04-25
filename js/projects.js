// Project data model
const projectsData = [
  {
    id: 'DesiresApp',
    title: 'Desires App',
    category: 'mobile apps',
    image: 'images/Desires.png',
    description: `Desires is my all-time favorite project — a modern music streaming app that lets users stream songs from the internet and local storage 🎶. It includes the ability to add tracks to favorites 💖, get personalized song suggestions based on what's currently playing 🎧, and search globally for any music 🔍. Users can even download songs for offline playback so they can enjoy music anytime, anywhere 📥. Designed with a cool and simple UI 😎, the app uses Bloc for efficient and scalable state management ⚙️.`,
    technologies: ['Flutter', 'Dart', 'Flutter Bloc', 'RESTful API', 'Notifications'],
    link: 'images/Desires.png'
  },
  {
    id: 'ARSketch&DrawingApp',
    title: 'AR Sketch & Drawing App',
    category: 'mobile apps',
    image: 'images/Desires.png',
    description: `The AR Sketch and Drawing app is built to inspire creativity and help users bring their art to life 🎨. Users can turn any image from their gallery into a sketch instantly 🖼️, and then switch to Paper Drawing Mode to sketch in real-time using their mobile camera ✏️📷. While sketching, they can also take pictures or record videos to capture their creative process 🎥. This app blends augmented reality with hands-on drawing for a fun and artistic experience ✨.`,
    technologies: ['Flutter', 'Dart', 'Flutter Bloc', ],
    link: 'images/Desires.png'
  },
  // {
  //   id: 'houseman',
  //   title: 'Houseman',
  //   category: 'ai/ml',
  //   image: 'images/houseman.png',
  //   description: 'A real estate management application UI design with features for property listing, tenant management, and maintenance requests.',
  //   technologies: ['Python', 'Langchain', 'OpenAI API'],
  //   link: './assets/projects/houseman.png'
  // }
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
    button.addEventListener('click', function () {
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
    item.addEventListener('click', function () {
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
