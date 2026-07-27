document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const menuBtn = document.querySelector(".menu-btn");
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".navbar a");
  const sections = document.querySelectorAll("section");
  const statNumbers = document.querySelectorAll(".stat h2");
  const skillCards = document.querySelectorAll(".skill-card");
  const topLink = document.querySelector(".top-link");
  const hero = document.querySelector(".hero");

  if (menuBtn && navbar) {
    menuBtn.addEventListener("click", () => {
      navbar.classList.toggle("active");

      const icon = menuBtn.querySelector("i");

      if (navbar.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navbar.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      });
    });
  }

  function handleHeader() {
    if (window.scrollY > 60) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleHeader);

  handleHeader();

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const target = this.getAttribute("href");

      if (target.startsWith("#")) {
        e.preventDefault();

        document.querySelector(target).scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  function activateNav() {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;

      if (pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");

      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", activateNav);

  activateNav();

  const revealElements = document.querySelectorAll(
    ".skill-card, .timeline-item",
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  revealElements.forEach((el) => observer.observe(el));

  function animateCounter(counter) {
    const value = counter.innerText.replace("+", "");

    const target = parseInt(value);

    let current = 0;

    const increment = Math.max(1, Math.ceil(target / 60));

    const timer = setInterval(() => {
      current += increment;

      if (current >= target) {
        current = target;

        clearInterval(timer);
      }

      counter.innerText = current + "+";
    }, 25);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);

        statsObserver.unobserve(entry.target);
      }
    });
  });

  statNumbers.forEach((stat) => {
    statsObserver.observe(stat);
  });

  skillCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;

      const y = e.clientY - rect.top;

      const rotateY = (x / rect.width - 0.5) * 10;

      const rotateX = (y / rect.height - 0.5) * -10;

      card.style.transform = `perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  if (topLink) {
    topLink.addEventListener("click", (e) => {
      e.preventDefault();

      window.scrollTo({
        top: 0,

        behavior: "smooth",
      });
    });
  }

  const footer = document.querySelector(".footer p");

  if (footer) {
    const year = new Date().getFullYear();

    footer.innerHTML = `© ${year} eamoto. All Rights Reserved.`;
  }

  window.addEventListener("resize", () => {
    updateHeroBackground();
  });
  updateHeroBackground();

  function updateHeroBackground() {
    const heroWidth = hero.offsetWidth;
    const heroHeight = hero.offsetHeight;
    const height = heroHeight - header.offsetHeight;
    const width = heroWidth / 2;
    const excess = height / width - 1;

    const pxl = width * excess;
    if (excess > 1 && height < width) {
      hero.style.backgroundPosition = "calc(100% - " + pxl + "px) 100%";
    } else {
      hero.style.backgroundPosition = "calc(100% + " + pxl + "px) 100%";
    }
  }
});
