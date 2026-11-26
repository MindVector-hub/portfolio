document.addEventListener("DOMContentLoaded", () => {

    loadPortfolioData();

    setupTheme();

    setupProjectFilter();

    document.getElementById("year").textContent =
        new Date().getFullYear();

});


/* =========================================
   LOAD JSON DATA
========================================= */

async function loadPortfolioData() {

    try {

        const response = await fetch("data.json");

        if (!response.ok) {
            throw new Error("Unable to load data.json");
        }

        const data = await response.json();

        renderAbout(data.about);

        renderSkills(data.skills);

        renderProjects(data.projects);

        renderEducation(data.education);

        renderContact(data.contact);

    }

    catch (error) {

        console.error(error);

        document.getElementById("skillsContainer").innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger">
                    Portfolio data could not be loaded.
                </div>
            </div>
        `;

    }

}


/* =========================================
   ABOUT
========================================= */

function renderAbout(about) {

    document.getElementById("aboutText").textContent =
        about.text1;

    document.getElementById("aboutText2").textContent =
        about.text2;

}


/* =========================================
   SKILLS
========================================= */

function renderSkills(skills) {

    const container =
        document.getElementById("skillsContainer");

    container.innerHTML = "";

    skills.forEach(skill => {

        const tags = skill.tags
            .map(tag => `<span>${tag}</span>`)
            .join("");

        container.innerHTML += `

            <div class="col-md-6 col-lg-4">

                <div class="skill-card">

                    <div class="skill-icon">
                        <i class="bi ${skill.icon}"></i>
                    </div>

                    <h4>${skill.title}</h4>

                    <p>
                        ${skill.description}
                    </p>

                    <div class="skill-tags">
                        ${tags}
                    </div>

                </div>

            </div>

        `;

    });

}


/* =========================================
   PROJECTS
========================================= */

function renderProjects(projects, filter = "all") {

    const container =
        document.getElementById("projectsContainer");

    container.innerHTML = "";

    const filteredProjects =
        filter === "all"
            ? projects
            : projects.filter(
                project => project.category === filter
            );


    filteredProjects.forEach(project => {

        const technologies =
            project.technologies
                .map(tech => `<span>${tech}</span>`)
                .join("");


        container.innerHTML += `

            <div class="col-md-6 col-lg-4 project-item"
                 data-category="${project.category}">

                <div class="project-card">

                    <div class="project-top">

                        <i class="bi ${project.icon}"></i>

                    </div>

                    <div class="project-body">

                        <h4>
                            ${project.title}
                        </h4>

                        <p>
                            ${project.description}
                        </p>

                        <div class="project-tech">
                            ${technologies}
                        </div>

                        <a
                            href="${project.link}"
                            class="project-link"
                            target="_blank"
                        >
                            View Project
                            <i class="bi bi-arrow-up-right"></i>
                        </a>

                    </div>

                </div>

            </div>

        `;

    });

}


/* =========================================
   EDUCATION
========================================= */

function renderEducation(education) {

    const container =
        document.getElementById("educationContainer");

    container.innerHTML = "";

    education.forEach(item => {

        container.innerHTML += `

            <div class="timeline-item">

                <span class="timeline-year">
                    ${item.year}
                </span>

                <h4>
                    ${item.title}
                </h4>

                <strong>
                    ${item.institution}
                </strong>

                <p>
                    ${item.description}
                </p>

            </div>

        `;

    });

}


/* =========================================
   CONTACT
========================================= */

function renderContact(contact) {

    document.getElementById("githubLink").href =
        contact.github;

    document.getElementById("linkedinLink").href =
        contact.linkedin;

    document.getElementById("emailLink").href =
        `mailto:${contact.email}`;

}


/* =========================================
   PROJECT FILTER
========================================= */

function setupProjectFilter() {

    document
        .querySelectorAll(".filter-btn")
        .forEach(button => {

            button.addEventListener("click", async () => {

                document
                    .querySelectorAll(".filter-btn")
                    .forEach(btn =>
                        btn.classList.remove("active")
                    );

                button.classList.add("active");

                const filter =
                    button.dataset.filter;

                const response =
                    await fetch("data.json");

                const data =
                    await response.json();

                renderProjects(
                    data.projects,
                    filter
                );

            });

        });

}


/* =========================================
   DARK / LIGHT MODE
========================================= */

function setupTheme() {

    const button =
        document.getElementById("themeBtn");

    const savedTheme =
        localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {

        document.body.classList.add("light");

        button.innerHTML =
            `<i class="bi bi-sun"></i>`;

    }


    button.addEventListener("click", () => {

        document.body.classList.toggle("light");

        const light =
            document.body.classList.contains("light");


        localStorage.setItem(
            "portfolio-theme",
            light ? "light" : "dark"
        );


        button.innerHTML = light
            ? `<i class="bi bi-sun"></i>`
            : `<i class="bi bi-moon-stars"></i>`;

    });

}