/* --- GLOBAL APPLICATION STATE & VARIABLES --- */
let shieldGroup, renderer, scene, camera;
let mouseX = 0, mouseY = 0;
let targetRotationX = 0, targetRotationY = 0;
let isDragging = false;
let previousPointerPosition = { x: 0, y: 0 };

/* --- DOCUMENT INITIALIZATION --- */
document.addEventListener("DOMContentLoaded", () => {
  initPreloader();
  initMouseGlow();
  initHeaderEffects();
  initMobileMenu();
  initParticleCanvas();
  init3DShieldLogo();
  initGSAPAnimations();
  initCardTiltEffect();
  initCourseFiltering();
  initSearchOverlay();
  initTypingEffect();
  initRevealObserver();
});

/* --- PRELOADER --- */
function initPreloader() {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("hidden");
    }, 200);
  });

  // Fallback timeout
  setTimeout(() => {
    preloader.classList.add("hidden");
  }, 1000);
}

/* --- TYPING EFFECT --- */
function initTypingEffect() {
  const target = document.getElementById("typedTarget");
  if (!target) return;

  const phrases = [
    "IT Certifications",
    "Cisco Networking",
    "Cyber Security",
    "Cloud Computing",
    "Ethical Hacking"
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      target.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      target.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500; // Pause before typing
    }

    setTimeout(type, typingSpeed);
  }

  setTimeout(type, 1500);
}

/* --- PARTICLE CANVAS BACKGROUND --- */
function initParticleCanvas() {
  const canvas = document.getElementById("particleCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let particles = [];
  const particleCount = 60;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.3 + 0.1;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 42, 42, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 42, 42, ${0.03 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    connectParticles();
    requestAnimationFrame(animateParticles);
  }

  animateParticles();
}

/* --- CUSTOM INTERACTIVE MOUSE GLOW --- */
function initMouseGlow() {
  const glow = document.getElementById("mouseGlow");
  if (!glow) return;

  document.addEventListener("mousemove", (e) => {
    glow.style.opacity = "1";
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });

  document.addEventListener("mouseleave", () => {
    glow.style.opacity = "0";
  });
}

/* --- SCROLLING & HEADER STYLING --- */
function initHeaderEffects() {
  const header = document.getElementById("mainHeader");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

/* --- MOBILE BURGER MENU INTERACTIONS --- */
function initMobileMenu() {
  const toggle = document.getElementById("mobileMenuToggle");
  const menu = document.getElementById("navMenu");
  const links = document.querySelectorAll(".nav-link");

  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    menu.classList.toggle("active");
  });

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      const parent = link.parentElement;
      if (parent.classList.contains("nav-dropdown") && window.innerWidth <= 768) {
        e.preventDefault();
        parent.classList.toggle("active");
      } else {
        toggle.classList.remove("active");
        menu.classList.remove("active");
      }
    });
  });
}

/* ============================================ */
/* THREE.JS 3D ANIMATED SHIELD LOGO            */
/* ============================================ */
function init3DShieldLogo() {
  const container = document.getElementById("heroVisual");
  const canvas = document.getElementById("logoCanvas3d");
  if (!container || !canvas) return;

  // 1. Scene, Camera & Renderer
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const width = container.clientWidth;
  const height = container.clientHeight;
  renderer.setSize(width, height);

  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.z = 350;

  // 2. Shield group
  shieldGroup = new THREE.Group();
  scene.add(shieldGroup);

  // 3. Create 3D Shield shape
  const shieldShape = new THREE.Shape();
  // Shield path – top center, arcs down to bottom point
  shieldShape.moveTo(0, 70);    // top center
  shieldShape.lineTo(55, 45);   // top right
  shieldShape.lineTo(55, -10);  // right side
  shieldShape.quadraticCurveTo(55, -55, 0, -75); // bottom right curve to point
  shieldShape.quadraticCurveTo(-55, -55, -55, -10); // bottom left curve
  shieldShape.lineTo(-55, 45);  // left side
  shieldShape.lineTo(0, 70);    // back to top

  // Extrude the shield for 3D depth
  const extrudeSettings = {
    depth: 12,
    bevelEnabled: true,
    bevelThickness: 3,
    bevelSize: 2,
    bevelSegments: 5,
    curveSegments: 32
  };

  const shieldGeometry = new THREE.ExtrudeGeometry(shieldShape, extrudeSettings);
  shieldGeometry.center();

  // Shield material – dark reflective with red edges
  const shieldMaterial = new THREE.MeshPhongMaterial({
    color: 0x1a0000,
    emissive: 0x330000,
    specular: 0xff2a2a,
    shininess: 80,
    transparent: true,
    opacity: 0.85,
    side: THREE.DoubleSide
  });

  const shieldMesh = new THREE.Mesh(shieldGeometry, shieldMaterial);
  shieldGroup.add(shieldMesh);

  // 4. Create the wireframe overlay for the shield
  const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0xff2a2a,
    wireframe: true,
    transparent: true,
    opacity: 0.15
  });
  const wireframeMesh = new THREE.Mesh(shieldGeometry.clone(), wireframeMaterial);
  wireframeMesh.scale.set(1.02, 1.02, 1.02);
  shieldGroup.add(wireframeMesh);

  // 5. Create glowing edge outline
  const edgesGeometry = new THREE.EdgesGeometry(shieldGeometry, 15);
  const edgesMaterial = new THREE.LineBasicMaterial({
    color: 0xff3333,
    transparent: true,
    opacity: 0.7,
    linewidth: 2
  });
  const edgesLine = new THREE.LineSegments(edgesGeometry, edgesMaterial);
  shieldGroup.add(edgesLine);

  // 6. Create checkmark inside shield
  const checkGeometry = createCheckmarkGeometry();
  const checkMaterial = new THREE.MeshPhongMaterial({
    color: 0xff3333,
    emissive: 0xff1111,
    emissiveIntensity: 0.5,
    transparent: true,
    opacity: 0.9
  });
  const checkMesh = new THREE.Mesh(checkGeometry, checkMaterial);
  checkMesh.position.z = 10;
  checkMesh.scale.set(0.8, 0.8, 0.8);
  shieldGroup.add(checkMesh);

  // 7. Add orbiting particles around the shield
  const orbitParticles = createOrbitParticles();
  shieldGroup.add(orbitParticles);

  // 8. Add floating data nodes
  const dataNodes = createDataNodes();
  shieldGroup.add(dataNodes);

  // 9. Lighting
  const ambientLight = new THREE.AmbientLight(0x222222, 1);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0xff2a2a, 2, 600);
  pointLight1.position.set(100, 100, 150);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0xff6666, 1.5, 500);
  pointLight2.position.set(-100, -50, 100);
  scene.add(pointLight2);

  const pointLight3 = new THREE.PointLight(0xcc0000, 1, 400);
  pointLight3.position.set(0, -100, -100);
  scene.add(pointLight3);

  // 10. Interaction handlers
  document.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  container.addEventListener("pointerdown", (e) => {
    isDragging = true;
    previousPointerPosition = { x: e.clientX, y: e.clientY };
  });

  document.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - previousPointerPosition.x;
    const deltaY = e.clientY - previousPointerPosition.y;
    targetRotationY += deltaX * 0.005;
    targetRotationX += deltaY * 0.005;
    previousPointerPosition = { x: e.clientX, y: e.clientY };
  });

  document.addEventListener("pointerup", () => {
    isDragging = false;
  });

  window.addEventListener("resize", () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  // 11. Animation loop
  let time = 0;
  function animate() {
    requestAnimationFrame(animate);
    time += 0.01;

    // Gentle floating animation
    shieldGroup.position.y = Math.sin(time * 0.5) * 5;

    // Continuous rotation
    if (!isDragging) {
      shieldGroup.rotation.y += 0.003;
    }

    // Interactive mouse tilt
    const tY = mouseX * 0.2 + targetRotationY;
    const tX = mouseY * 0.15 + targetRotationX;
    shieldGroup.rotation.y += (tY - shieldGroup.rotation.y) * 0.03;
    shieldGroup.rotation.x += (tX - shieldGroup.rotation.x) * 0.03;

    // Animate orbit particles
    if (orbitParticles.userData.update) {
      orbitParticles.userData.update(time);
    }

    // Animate data nodes
    if (dataNodes.userData.update) {
      dataNodes.userData.update(time);
    }

    // Pulsing glow on shield edges
    edgesMaterial.opacity = 0.5 + Math.sin(time * 2) * 0.2;
    wireframeMaterial.opacity = 0.1 + Math.sin(time * 1.5) * 0.05;

    // Checkmark pulse
    checkMesh.scale.set(
      0.8 + Math.sin(time * 2) * 0.03,
      0.8 + Math.sin(time * 2) * 0.03,
      0.8
    );

    // Light animation
    pointLight1.position.x = Math.sin(time * 0.7) * 120;
    pointLight1.position.y = Math.cos(time * 0.7) * 120;
    pointLight2.position.x = Math.cos(time * 0.5) * 100;
    pointLight2.position.z = Math.sin(time * 0.5) * 100;

    renderer.render(scene, camera);
  }

  animate();
}

/* Helper: Create checkmark 3D geometry */
function createCheckmarkGeometry() {
  const shape = new THREE.Shape();
  const w = 4; // line width

  // Checkmark path - starting from bottom-left of check
  shape.moveTo(-25, -5);
  shape.lineTo(-25 + w, -5 + w);
  shape.lineTo(-8, -22);
  shape.lineTo(25, 15);
  shape.lineTo(25 - w, 15 + w);
  shape.lineTo(-8, -12);
  shape.closePath();

  const extrudeSettings = {
    depth: 6,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 3
  };

  return new THREE.ExtrudeGeometry(shape, extrudeSettings);
}

/* Helper: Create orbiting particles */
function createOrbitParticles() {
  const group = new THREE.Group();
  const particleCount = 80;
  const vertices = [];
  const sizes = [];

  for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    const radius = 90 + Math.random() * 40;

    vertices.push(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi)
    );
    sizes.push(Math.random() * 3 + 1);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

  const texture = createGlowTexture(255, 42, 42);
  const material = new THREE.PointsMaterial({
    color: 0xff3333,
    size: 5,
    map: texture,
    transparent: true,
    alphaTest: 0.1,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const points = new THREE.Points(geometry, material);
  group.add(points);

  // Store original positions for animation
  const originalPositions = new Float32Array(vertices);

  group.userData.update = (time) => {
    const positions = geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      const offset = i / 3;
      positions[i] = originalPositions[i] + Math.sin(time + offset * 0.5) * 3;
      positions[i + 1] = originalPositions[i + 1] + Math.cos(time + offset * 0.3) * 3;
      positions[i + 2] = originalPositions[i + 2] + Math.sin(time * 0.7 + offset) * 2;
    }
    geometry.attributes.position.needsUpdate = true;
  };

  return group;
}

/* Helper: Create floating data node connections */
function createDataNodes() {
  const group = new THREE.Group();
  const nodeCount = 12;
  const nodePositions = [];

  for (let i = 0; i < nodeCount; i++) {
    const angle = (i / nodeCount) * Math.PI * 2;
    const radius = 100 + Math.random() * 30;
    const y = (Math.random() - 0.5) * 120;

    nodePositions.push({
      x: Math.cos(angle) * radius,
      y: y,
      z: Math.sin(angle) * radius,
      originalAngle: angle,
      radius: radius,
      speed: 0.2 + Math.random() * 0.3,
      yOffset: y
    });

    // Create node sphere
    const sphereGeo = new THREE.SphereGeometry(2, 8, 8);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0xff5555,
      transparent: true,
      opacity: 0.8
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    sphere.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
    group.add(sphere);
  }

  // Create connecting lines
  const lineGeometry = new THREE.BufferGeometry();
  const linePositions = [];

  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      const n1 = nodePositions[i];
      const n2 = nodePositions[j];
      const dx = n1.x - n2.x;
      const dy = n1.y - n2.y;
      const dz = n1.z - n2.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist < 160) {
        linePositions.push(n1.x, n1.y, n1.z);
        linePositions.push(n2.x, n2.y, n2.z);
      }
    }
  }

  lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xff2a2a,
    transparent: true,
    opacity: 0.12,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
  group.add(lines);

  group.userData.update = (time) => {
    const spheres = group.children.filter(c => c instanceof THREE.Mesh);
    spheres.forEach((sphere, i) => {
      if (i < nodePositions.length) {
        const node = nodePositions[i];
        const angle = node.originalAngle + time * node.speed;
        sphere.position.x = Math.cos(angle) * node.radius;
        sphere.position.z = Math.sin(angle) * node.radius;
        sphere.position.y = node.yOffset + Math.sin(time * 0.5 + i) * 8;

        // Pulse size
        const scale = 1 + Math.sin(time * 2 + i) * 0.3;
        sphere.scale.set(scale, scale, scale);
      }
    });
  };

  return group;
}

/* Helper: Creates a custom radial glow texture */
function createGlowTexture(r, g, b) {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, `rgba(255, 255, 255, 1)`);
  gradient.addColorStop(0.2, `rgba(${r}, ${g}, ${b}, 0.8)`);
  gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.3)`);
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 32, 32);

  return new THREE.CanvasTexture(canvas);
}


/* --- GSAP SCROLL & TRANSITION ANIMATIONS --- */
function initGSAPAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // 1. Hero Entries
  const heroTL = gsap.timeline({ defaults: { ease: "power4.out" } });

  heroTL.from("#heroPre", { opacity: 0, y: -20, duration: 0.8, delay: 0.2 })
        .from("#heroTitle", { opacity: 0, y: 30, duration: 1 }, "-=0.6")
        .from("#heroDesc", { opacity: 0, y: 20, duration: 0.8 }, "-=0.7")
        .from("#heroCtas", { opacity: 0, y: 20, duration: 0.8 }, "-=0.7")
        .from("#heroFeatures .hero-feat-item", { opacity: 0, y: 20, stagger: 0.15, duration: 0.8 }, "-=0.7")
        .from("#heroVisual", { opacity: 0, scale: 0.9, duration: 1.2 }, "-=1.2");

  // 2. Stats counter
  const statsSection = document.getElementById("stats");
  if (statsSection) {
    gsap.from("#statsGrid", {
      scrollTrigger: {
        trigger: "#statsGrid",
        start: "top 85%"
      },
      opacity: 0,
      y: 40,
      duration: 1,
      onComplete: () => {
        const stats = document.querySelectorAll(".stat-val");
        stats.forEach(stat => {
          const target = parseInt(stat.getAttribute("data-val"));
          const suffix = target >= 10000 ? "+" : (target === 100 ? "%" : "+");
          const counterObj = { val: 0 };

          gsap.to(counterObj, {
            val: target,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
              let formattedVal = Math.floor(counterObj.val);
              if (target >= 10000) {
                formattedVal = (formattedVal / 1000).toFixed(0) + "k";
              }
              stat.textContent = formattedVal + suffix;
            }
          });
        });
      }
    });
  }

  // 3. Pathway cards
  gsap.from("#pathwayCards .pathway-card", {
    scrollTrigger: {
      trigger: "#pathwayCards",
      start: "top 80%"
    },
    opacity: 0,
    y: 50,
    stagger: 0.15,
    duration: 1,
    ease: "power3.out"
  });

  // 4. Lab Rentals
  const labsTL = gsap.timeline({
    scrollTrigger: {
      trigger: "#labs",
      start: "top 75%"
    }
  });
  labsTL.from("#labsVisual", { opacity: 0, x: -50, duration: 1, ease: "power2.out" })
        .from("#labsContent > *", { opacity: 0, x: 30, stagger: 0.15, duration: 0.8 }, "-=0.8");

  // 5. Bootcamps
  const bootcampsTL = gsap.timeline({
    scrollTrigger: {
      trigger: "#bootcamps",
      start: "top 75%"
    }
  });
  bootcampsTL.from("#bootcampsVisual", { opacity: 0, x: 50, duration: 1, ease: "power2.out" })
             .from("#bootcampsContent > *", { opacity: 0, x: -30, stagger: 0.15, duration: 0.8 }, "-=0.8");

  // 6. Contact
  const contactTL = gsap.timeline({
    scrollTrigger: {
      trigger: "#contact",
      start: "top 75%"
    }
  });
  contactTL.from("#contactInfo", { opacity: 0, x: -40, duration: 0.8 })
           .from("#contactFormWrapper", { opacity: 0, x: 40, duration: 0.8 }, "-=0.8");
}


/* --- INTERACTIVE 3D CARD TILT EFFECT --- */
function initCardTiltEffect() {
  const cards = document.querySelectorAll("[data-tilt]");

  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const width = rect.width;
      const height = rect.height;

      const rotateX = ((y / height) - 0.5) * -12;
      const rotateY = ((x / width) - 0.5) * 12;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;

      // Spotlight effect
      const spotlight = card.querySelector('.card-spotlight');
      if (spotlight) {
        spotlight.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,42,42,0.06), transparent 40%)`;
        spotlight.style.opacity = '1';
      }
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
      const spotlight = card.querySelector('.card-spotlight');
      if (spotlight) {
        spotlight.style.opacity = '0';
      }
    });
  });
}


/* --- DYNAMIC COURSE CATALOG FILTERING --- */
function initCourseFiltering() {
  const filterBtns = document.querySelectorAll("#courseFilters .filter-btn");
  const grid = document.getElementById("coursesGrid");
  const cards = document.querySelectorAll("#coursesGrid .course-card");

  if (!grid || cards.length === 0) return;

  const dropdownItems = document.querySelectorAll(".nav-dropdown-item a");

  dropdownItems.forEach(item => {
    item.addEventListener("click", (e) => {
      const filter = item.getAttribute("data-filter");
      applyFilter(filter);

      filterBtns.forEach(btn => {
        if (btn.getAttribute("data-filter") === filter) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });
    });
  });

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      applyFilter(filter);
    });
  });

  function applyFilter(filter) {
    gsap.to(grid, {
      opacity: 0,
      y: 15,
      duration: 0.25,
      onComplete: () => {
        cards.forEach(card => {
          const category = card.getAttribute("data-category");
          if (filter === "all" || category === filter) {
            card.style.display = "flex";
          } else {
            card.style.display = "none";
          }
        });

        gsap.to(grid, {
          opacity: 1,
          y: 0,
          duration: 0.35,
          delay: 0.05
        });
      }
    });
  }
}


/* --- INTERSECTION OBSERVER FOR REVEAL CLASSES --- */
function initRevealObserver() {
  const revealElements = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right, .reveal-scale");
  
  if (revealElements.length === 0) return;

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: "0px",
    threshold: 0.15
  });

  revealElements.forEach(el => revealObserver.observe(el));
}


/* --- SEARCH OVERLAY DIALOG CONTROLS --- */
function initSearchOverlay() {
  const openBtn = document.getElementById("openSearch");
  const closeBtn = document.getElementById("closeSearch");
  const overlay = document.getElementById("searchOverlay");
  const input = document.getElementById("searchInput");

  if (!openBtn || !closeBtn || !overlay) return;

  openBtn.addEventListener("click", () => {
    overlay.classList.add("active");
    setTimeout(() => input.focus(), 150);
  });

  closeBtn.addEventListener("click", () => {
    overlay.classList.remove("active");
    input.value = "";
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("active")) {
      overlay.classList.remove("active");
      input.value = "";
    }
  });
}


/* --- INQUIRY SUBMISSION MOCK INTEGRATION --- */
function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("formName").value;
  const email = document.getElementById("formEmail").value;
  const phone = document.getElementById("formPhone").value;
  const course = document.getElementById("formCourse").value;
  const message = document.getElementById("formMessage").value;
  const alertBox = document.getElementById("formSuccessAlert");
  const submitBtn = document.getElementById("submitBtn");

  if (!name || !email || !phone || !course || !message) return;

  submitBtn.disabled = true;
  submitBtn.innerHTML = `Sending inquiry <i class="fa fa-circle-notch fa-spin"></i>`;

  setTimeout(() => {
    document.getElementById("inquiryForm").reset();

    if (alertBox) {
      alertBox.style.display = "flex";
      gsap.from(alertBox, { opacity: 0, y: -10, duration: 0.4 });

      setTimeout(() => {
        gsap.to(alertBox, {
          opacity: 0,
          y: -10,
          duration: 0.4,
          onComplete: () => {
            alertBox.style.display = "none";
          }
        });
      }, 7000);
    }

    submitBtn.disabled = false;
    submitBtn.innerHTML = `Submit Inquiry <i class="fa fa-paper-plane"></i>`;
  }, 1500);
}

// Utility: Smooth anchor scroller function
function scrollToContact() {
  const target = document.getElementById("contact");
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  }
}
