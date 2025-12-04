class ProjectCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // The template is defined in index.html.
    const template = document.getElementById('project-card-template');
    if (template) {
      const content = template.content.cloneNode(true);
      this.shadowRoot.appendChild(content);
    } else {
      console.error('Project Card Template not found!');
    }
  }

  set data(project) {
    requestAnimationFrame(() => {
      const shadow = this.shadowRoot;

      shadow.querySelector('.card__title').textContent = project.title;
      shadow.querySelector('.card__description').textContent = project.description;
      shadow.querySelector('.card__link').href = project.link;

      const picture = shadow.querySelector('picture');
      const image = shadow.querySelector('.card__image');
      image.src = project.imageUrl;
      image.alt = project.imageAlt;

      picture.querySelectorAll('source').forEach(source => source.remove());

      if (project.imageSources) {
        project.imageSources.forEach(sourceData => {
          const source = document.createElement('source');
          source.srcset = sourceData.srcset;
          if (sourceData.media) {
            source.media = sourceData.media;
          }
          if (sourceData.type) {
            source.type = sourceData.type;
          }
          // Prepend to ensure <source> comes before <img>
          picture.prepend(source);
        });
      }
    });
  }
}

customElements.define('project-card', ProjectCard);


function loadProjects() {
  const projects = [
    {
      title: 'Nightly - Sleep Tracking App',
      description: 'A progressive web application designed to help users track their sleep patterns and improve sleep quality. Built with React and Tailwind.',
      link: 'https://github.com/kishenrex/nightly',
      imageUrl: '../assets/images/nightly_sample.png',
      imageAlt: 'A preview of the Nightly sleep tracking application dashboard.',
      imageSources: [
        { srcset: '../assets/images/nightly_sample.png', type: 'image/png' }
      ]
    },
    {
      title: 'AME at UCSD website',
      description: 'The main club website for the Anime and Manga Enthusiasts at UC San Diego. It contains the link to their Discord and historical facts about the club.',
      link: 'https://ameatucsd.org/',
      imageUrl: '/assets/images/ame_website.png', 
      imageAlt: 'Screenshot of the AME website homepage',
      imageSources: [
        { srcset: '/assets/images/ame_website.png', type: 'image/png' }
      ]
    },
    {
      title: 'Animefest UCSD Convention website',
      description: 'The website for the annual convention hosted by AME at UC San Diego. It is currently under the process of being updated for 2026. Stay tuned for more updates!',
      link: '#',
      imageUrl: '/assets/images/af_website.png',
      imageAlt: 'A screenshot of the Animefest covention main website homepage.',
      imageSources: [
        { srcset: '/assets/images/af_website.png', type: 'image/png' }
      ]
    }
  ];

  const container = document.getElementById('project-card-container');
  if (!container) {
    console.error('Project card container not found!');
    return;
  }

  projects.forEach(projectData => {
    const card = document.createElement('project-card');
    card.data = projectData;
    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', loadProjects);