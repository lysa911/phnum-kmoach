import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// Images
const IMG_1 = 'https://raw.githubusercontent.com/StephenMen/webforfuns/main/DSC07512.JPG';
const IMG_2 = 'https://raw.githubusercontent.com/StephenMen/webforfuns/main/DSC00722.JPG';
const IMG_3 = 'https://raw.githubusercontent.com/StephenMen/webforfuns/main/Master-for-Web-6.jpg';
const IMG_4 = 'https://raw.githubusercontent.com/StephenMen/webforfuns/main/798985908_1088092280301823_3849388321751906669_n%20(1).jpg';
const IMG_5 = 'https://raw.githubusercontent.com/StephenMen/webforfuns/main/DSC05464.JPG';
const IMG_6 = 'https://raw.githubusercontent.com/StephenMen/webforfuns/main/DSC07500.JPG';
const LAUREL = 'https://raw.githubusercontent.com/StephenMen/webforfuns/main/Sundance_Laurel-removebg-preview.png';
const SOMBER_BOY = 'https://raw.githubusercontent.com/StephenMen/webforfuns/main/Somber%20Boy%20in%20Worn%20Shirt.png';
const GM_EXTRA_IMG = 'https://raw.githubusercontent.com/StephenMen/webforfuns/main/images%20(2).jpg';
const QUOTE_BG = 'https://raw.githubusercontent.com/StephenMen/webforfuns/main/1016(6).png';
const KM_IMG = 'https://raw.githubusercontent.com/StephenMen/webforfuns/main/ghost-mountain.jpg?v=' + Date.now();
const ACTOR_IMG = 'https://raw.githubusercontent.com/StephenMen/webforfuns/main/1016(7).png?v=' + Date.now();
const GM_BG_IMG = 'https://raw.githubusercontent.com/StephenMen/webforfuns/main/The-Tuol-Sleng-Museum-documents-Pol-Pot-Regime-Phnom-Penh-Cambodia.png';
const BASE_URL = import.meta.env.BASE_URL;
const LD_LOGO = `${BASE_URL}ld-shard-emblem.png`;
const MESSAGE_BG = 'https://raw.githubusercontent.com/StephenMen/webforfuns/main/Timeline%201_01_00_02_05.jpg';

// Navigation
function Navigation() {
  const [isHidden, setIsHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={`nav-bar ${isHidden ? 'hidden' : ''}`}>
        <button className="nav-burger" aria-label="Menu" onClick={toggleMenu}>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
        </button>
        <div className="nav-about">
          <a href="#about">About Us</a>
        </div>
      </nav>
      
      <div className={`menu-overlay ${isMenuOpen ? 'active' : ''}`} onClick={closeMenu}>
        <div className="menu-content" onClick={(e) => e.stopPropagation()}>
          <ul className="menu-links">
            <li><a href="#ghost-mountain" onClick={closeMenu}>Ghost Mountain</a></li>
            <li><a href="#making-of" onClick={closeMenu}>Making Of</a></li>
            <li><a href="#festivals" onClick={closeMenu}>Festivals</a></li>
            <li><a href="#about" onClick={closeMenu}>About & Contact</a></li>
          </ul>
          <div className="menu-close-hint">Click anywhere to close</div>
        </div>
      </div>
    </>
  );
}

// Hero
function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const tl = gsap.timeline();
    tl.from('.hero-title', { opacity: 0, y: 100, duration: 1.5, ease: 'power4.out' })
      .from('.hero-sub', { opacity: 0, y: 50, duration: 1, ease: 'power3.out' }, '-=1')
      .from('.hero-year', { opacity: 0, scale: 0.8, duration: 1, ease: 'power3.out' }, '-=0.5');
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <img src={IMG_1} alt="" className="hero-bg" />
      <div className="hero-content">
        <h1 className="hero-title">BLOOD BORDER</h1>
        <p className="hero-sub">Cambodia's Second Killing Field</p>
        <div className="hero-year">A Documentary Film</div>
      </div>
    </section>
  );
}

// Trailer
function Trailer() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [overlayClicked, setOverlayClicked] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.trailer-title',
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', end: 'top 30%', scrub: 1 }
        }
      );
      gsap.fromTo('.trailer-container',
        { opacity: 0, scale: 0.9, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', end: 'top 20%', scrub: 1 }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="trailer-section" ref={sectionRef}>
      <h2 className="trailer-title">Official Trailer</h2>
      <div className="trailer-container">
        <div 
          className={`trailer-overlay ${overlayClicked ? 'clicked' : ''}`}
          onClick={() => setOverlayClicked(true)}
        ></div>
        <iframe 
          src="https://www.youtube.com/embed/54PskZgTbgg?rel=0&modestbranding=1" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen>
        </iframe>
      </div>
    </section>
  );
}

// Ghost Mountain
function GhostMountain() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const goToPage = (pageIndex: number) => {
    const tl = gsap.timeline();
    const currentPageIndex = currentPage;
    
    ScrollTrigger.getAll().forEach((trigger: any) => {
      if (trigger.vars.trigger === sectionRef.current) {
        trigger.disable();
      }
    });
    
    tl.to(`.gm-page-${currentPageIndex + 1}`, {
      opacity: 0,
      x: pageIndex > currentPageIndex ? '-100%' : '100%',
      duration: 0.8,
      ease: 'power3.inOut',
      onComplete: () => {
        document.querySelector(`.gm-page-${currentPageIndex + 1}`)?.setAttribute('style', 'visibility: hidden');
      }
    });
    
    tl.set(`.gm-page-${pageIndex + 1}`, { visibility: 'visible' })
      .fromTo(`.gm-page-${pageIndex + 1}`,
        { opacity: 0, x: pageIndex > currentPageIndex ? '100%' : '-100%' },
        { opacity: 1, x: '0%', duration: 0.8, ease: 'power3.out' }
      );
    
    if (pageIndex === 0) {
      tl.fromTo('.gm-boy-wrap',
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo('.gm-boy',
        { opacity: 0, scale: 1.1, filter: 'grayscale(0.3) contrast(1.1) brightness(0.92) blur(10px)' },
        { opacity: 1, scale: 1, filter: 'grayscale(0.3) contrast(1.1) brightness(0.92) blur(0px)', duration: 1.2, ease: 'power2.out', clearProps: 'filter' },
        '-=0.8'
      )
      .fromTo('.gm-boy-bg img',
        { opacity: 0, scale: 1.2 },
        { opacity: 0.6, scale: 1, duration: 1.5, ease: 'power2.out' },
        '-=1'
      )
      .fromTo('.page-1-content .gm-text > *',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
        '-=0.8'
      );
    } else if (pageIndex === 1) {
      tl.fromTo('.gm-archival-frame',
        { opacity: 0, scale: 0.95, y: 30, rotation: -6 },
        { opacity: 1, scale: 1, y: 0, rotation: -3, duration: 1, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo('.gm-page-bg img',
        { opacity: 0, scale: 1.2 },
        { opacity: 0.6, scale: 1, duration: 1.5, ease: 'power2.out' },
        '-=0.8'
      )
      .fromTo('.page-2-content .gm-text > *',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
        '-=0.8'
      );
    } else if (pageIndex === 2) {
      tl.fromTo('.km-image',
        { opacity: 0, x: 100, scale: 1.1 },
        { opacity: 1, x: 0, scale: 1, duration: 1.2, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo('.page-3-content .gm-text > *',
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 1, stagger: 0.15, ease: 'power3.out' },
        '-=0.8'
      );
    }
    
    tl.call(() => {
      setTimeout(() => {
        ScrollTrigger.getAll().forEach((trigger: any) => {
          if (trigger.vars.trigger === sectionRef.current) {
            trigger.enable();
          }
        });
        ScrollTrigger.refresh();
      }, 50);
    });
    
    setCurrentPage(pageIndex);
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo('.page-1-content > *',
        { opacity: 0, y: 50 },
        { 
          opacity: 1, y: 0, 
          duration: 1, 
          stagger: 0.15, 
          ease: 'power3.out',
          scrollTrigger: { 
            trigger: sectionRef.current, 
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="gm-section" id="ghost-mountain" ref={sectionRef}>
      <div className="gm-stage">
        <div className="gm-page gm-page-1">
          <div className="editorial-inner page-1-content">
            <div className="editorial-left">
              <div className="gm-text">
                <div className="section-label">Film Synopsis</div>
                <h2 className="section-title">Blood Border</h2>
                <div className="section-body">
                  <p>In the shadow of the Thai-Cambodian border lies Phnum Khmoch — Ghost Mountain — where the earth still holds secrets buried for decades. <em>Blood Border</em> is a harrowing documentary that unearths the untold story of a second killing field, hidden from the world's gaze.</p>
                  <p>Through intimate survivor testimonies, archaeological discoveries, and haunting archival footage, the film follows investigators as they excavate mass graves and piece together evidence of systematic atrocities committed during the final days of the Khmer Rouge regime.</p>
                  <p>As bones emerge from the jungle floor and witnesses break decades of silence, the documentary reveals not just a historical tragedy, but an ongoing quest for justice that continues to shape Cambodia's fragile present.</p>
                </div>
              </div>
            </div>
            <div className="editorial-right">
              <div className="gm-boy-wrap">
                <div className="gm-boy-bg">
                  <img src={IMG_6} alt="" />
                </div>
                <img src={SOMBER_BOY} alt="Somber Boy" className="gm-boy" />
              </div>
            </div>
          </div>
        </div>

        <div className="gm-page gm-page-2" style={{ visibility: 'hidden' }}>
          <div className="editorial-inner page-2-content">
            <div className="editorial-left">
              <div className="gm-text">
                <div className="section-label">The History</div>
                <h2 className="section-title">Ghost Mountain</h2>
                <div className="section-body">
                  <p>Phnum Khmoch, known as "Ghost Mountain," sits along the Thai-Cambodian border — a place where history and horror converge. During the Khmer Rouge regime (1975-1979), this remote region became a site of systematic violence.</p>
                  <p>The mountain's dense jungles concealed mass graves, execution sites, and forced labor camps. Thousands were brought here from across the country, their fates sealed by a regime that sought to erase an entire generation.</p>
                  <p>Today, the land still yields bones during the rainy season. The trees grow from burial sites. The earth remembers what the world tried to forget.</p>
                </div>
              </div>
            </div>
            <div className="editorial-right">
              <div className="gm-page-bg">
                <img src={GM_BG_IMG} alt="" />
              </div>
              <div className="gm-archival-frame">
                <img src={GM_EXTRA_IMG} alt="Ghost Mountain" />
                <div className="gm-archival-label">Phnum Khmoch · 1979</div>
              </div>
            </div>
          </div>
        </div>

        <div className="gm-page gm-page-3" style={{ visibility: 'hidden' }}>
          <div className="editorial-inner page-3-content">
            <div className="editorial-left">
              <div className="gm-text">
                <div className="section-label">The Storyteller</div>
                <h2 className="section-title">Kuoch Mengly</h2>
                <blockquote className="editorial-quote">
                  "They took us in the night. We walked for days through the jungle. Many did not return."
                </blockquote>
                <div className="section-body">
                  <p>Kuoch Mengly was just nineteen when the Khmer Rouge seized his village in Battambang province. Separated from his family, he was marched hundreds of kilometers to labor camps near the Thai border.</p>
                  <p>For three years, he endured forced labor, starvation, and the constant threat of execution. He witnessed massacres that haunt him to this day.</p>
                  <p>Against all odds, Mengly survived. He escaped across the border into Thailand in 1979, carrying with him the weight of memory and the responsibility to bear witness.</p>
                </div>
              </div>
            </div>
            <div className="editorial-right">
              <div className="km-image">
                <img src={KM_IMG} alt="Kuoch Mengly" className="framed-image" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="gm-nav">
        <button className={`gm-nav-dot ${currentPage === 0 ? 'active' : ''}`} onClick={() => goToPage(0)} />
        <button className={`gm-nav-dot ${currentPage === 1 ? 'active' : ''}`} onClick={() => goToPage(1)} />
        <button className={`gm-nav-dot ${currentPage === 2 ? 'active' : ''}`} onClick={() => goToPage(2)} />
      </div>

      <button className="gm-arrow-btn" onClick={() => {
        if (currentPage === 0) goToPage(1);
        else if (currentPage === 1) goToPage(2);
        else goToPage(0);
      }}>
        {currentPage === 0 ? 'Read History' : currentPage === 1 ? 'Meet Kuoch Mengly' : 'Back to Synopsis'}
      </button>
    </section>
  );
}

// Quote Section
function QuoteSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    const ctx = gsap.context(() => {
      const words = sectionRef.current!.querySelectorAll('.quote-word');
      
      gsap.to(words, {
        opacity: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        }
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  const quoteText = "Today, the land still yields bones during the rainy season. The trees grow from burial sites. The earth remembers what the world tried to forget.";

  return (
    <section className="quote-section" ref={sectionRef}>
      <div className="quote-bg">
        <img src={QUOTE_BG} alt="" />
      </div>
      <div className="quote-inner">
        <blockquote className="quote-text">
          {quoteText.split(' ').map((word, i) => (
            <span key={i} className="quote-word">{word} </span>
          ))}
        </blockquote>
      </div>
    </section>
  );
}

// Making Of
function MakingOf() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [videoPlaying, setVideoPlaying] = useState<number | null>(null);

  const steps = [
    {
      title: 'Director Vision',
      description: 'A harrowing journey into the heart of darkness. Our director spent three years immersed in the stories of survivors, archaeologists, and historians, piecing together the untold history of Cambodia\'s second killing field through meticulous research and personal interviews.',
      image: IMG_4,
      align: 'left'
    },
    {
      title: 'Team Dedications',
      description: 'A dedicated team of filmmakers, researchers, and survivors worked tirelessly to bring this story to light. Their unwavering commitment to historical accuracy and emotional truth drives every single frame of this powerful documentary.',
      image: IMG_5,
      align: 'right'
    },
    {
      title: 'Actor & Actress',
      description: 'Powerful performances by survivors and actors who carried the weight of these stories with grace and authenticity. Their voices give life to the memories of those who suffered, bridging the gap between past and present.',
      image: ACTOR_IMG,
      align: 'left'
    },
    {
      title: 'Post Production',
      description: 'Meticulous editing, color grading, and sound design crafted over six months of intensive work. Every frame carefully composed to honor both the historical record and the survivors who entrusted us with their stories.',
      image: IMG_6,
      align: 'right'
    }
  ];

  const videos = [
    {
      title: 'Full Documentary',
      description: 'Experience the complete story of Blood Border. A comprehensive 95-minute journey through Cambodia\'s second killing field, featuring powerful survivor testimonies, groundbreaking archaeological discoveries, and the ongoing quest for justice and reconciliation.',
      videoUrl: 'https://www.youtube.com/embed/54PskZgTbgg',
      align: 'right'
    },
    {
      title: 'The Team',
      description: 'Follow our dedicated crew as they navigate treacherous terrain and conduct deeply emotional interviews. From dawn to dusk, witness the relentless commitment and passion that ultimately brought this important story to light.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      align: 'left'
    },
    {
      title: 'The Cast & Survivors',
      description: 'Intimate and powerful moments between our actors and real survivors who lived through the horror. Watch as stories passed down through generations find new life on screen, creating a bridge between past and present.',
      videoUrl: 'https://www.youtube.com/embed/9bZkp7q19f0',
      align: 'right'
    },
    {
      title: 'The Editing Room',
      description: 'From over 200 hours of raw footage to a cohesive 95-minute narrative. See how our talented editors, colorists, and sound designers meticulously crafted every single frame to honor the truth and respect the survivors.',
      videoUrl: 'https://www.youtube.com/embed/kJQP7kiw5Fk',
      align: 'left'
    }
  ];

  const goToPage = (pageIndex: number) => {
    const tl = gsap.timeline();
    
    if (pageIndex === 2) {
      // Make page 1 absolute during animation
      tl.set('.mo-page-1', { position: 'absolute' });
      
      // Prepare page 2 off-screen to the right
      tl.set('.mo-page-2', { display: 'block', position: 'relative', xPercent: 100, opacity: 1, force3D: true });
      
      // Animate both pages simultaneously with GPU acceleration
      tl.to('.mo-page-1', {
        xPercent: -100,
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut',
        force3D: true
      })
      .to('.mo-page-2', {
        xPercent: 0,
        duration: 1,
        ease: 'power2.inOut',
        force3D: true
      }, '<')
      .call(() => {
        // Hide page 1 after animation completes
        document.querySelector('.mo-page-1')?.setAttribute('style', 'display: none');
        ScrollTrigger.refresh();
      });
    } else {
      // Make page 2 absolute during animation
      tl.set('.mo-page-2', { position: 'absolute' });
      
      // Prepare page 1 off-screen to the left
      tl.set('.mo-page-1', { display: 'block', position: 'relative', xPercent: -100, opacity: 1, force3D: true });
      
      // Animate both pages simultaneously with GPU acceleration
      tl.to('.mo-page-2', {
        xPercent: 100,
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut',
        force3D: true
      })
      .to('.mo-page-1', {
        xPercent: 0,
        duration: 1,
        ease: 'power2.inOut',
        force3D: true
      }, '<')
      .call(() => {
        // Hide page 2 after animation completes
        document.querySelector('.mo-page-2')?.setAttribute('style', 'display: none');
        ScrollTrigger.refresh();
      });
    }
    
    setCurrentPage(pageIndex);
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    
    const ctx = gsap.context(() => {
      const stepElements = sectionRef.current!.querySelectorAll('.mo-page-1 .mo-step');
      stepElements.forEach((step) => {
        gsap.fromTo(step.querySelectorAll('.mo-step-content > *'),
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 80%',
              end: 'top 30%',
              scrub: 1
            }
          }
        );
      });
    });
    
    return () => ctx.revert();
  }, []);

  return (
    <section className="mo-section" id="making-of" ref={sectionRef}>
      <div className="mo-header">
        <div className="section-label">Behind the Camera</div>
        <h2 className="section-title">The Making Of</h2>
      </div>
      
      <div className="mo-pages-container">
        <div className="mo-page mo-page-1">
          <div className="mo-steps">
            {steps.map((step, i) => (
              <div className={`mo-step mo-step-${step.align}`} key={i}>
                <div className="mo-step-image">
                  <img src={step.image} alt={step.title} />
                </div>
                <div className="mo-step-content">
                  <h3 className="mo-step-title">{step.title}</h3>
                  <p className="mo-step-description">{step.description}</p>
                </div>
              </div>
            ))}
            <div className="mo-watch-full-container">
              <button 
                className="mo-watch-full-btn" 
                onClick={() => {
                  goToPage(2);
                  // Wait for page transition to complete, then scroll
                  setTimeout(() => {
                    const page2 = document.querySelector('.mo-page-2');
                    const moSection = document.querySelector('.mo-section');
                    if (page2 && moSection) {
                      // Scroll to the Making Of section first
                      const sectionTop = moSection.getBoundingClientRect().top + window.pageYOffset;
                      window.scrollTo({
                        top: sectionTop,
                        behavior: 'smooth'
                      });
                    }
                  }, 1200);
                }}
              >
                Watch Full Video →
              </button>
            </div>
          </div>
        </div>

        <div className="mo-page mo-page-2" style={{ display: 'none' }}>
          <div className="mo-steps">
            {videos.map((video, i) => (
              <div className={`mo-step mo-step-${video.align}`} key={i}>
                {video.align === 'left' ? (
                  <>
                    <div className="mo-step-video">
                      {videoPlaying !== i ? (
                        <div className="mo-video-overlay" onClick={() => setVideoPlaying(i)}>
                          <div className="mo-play-button">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>
                      ) : (
                        <iframe 
                          src={video.videoUrl + '?autoplay=1'}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                          allowFullScreen>
                        </iframe>
                      )}
                    </div>
                    <div className="mo-step-content">
                      <h3 className="mo-step-title">{video.title}</h3>
                      <p className="mo-step-description">{video.description}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mo-step-content">
                      <h3 className="mo-step-title">{video.title}</h3>
                      <p className="mo-step-description">{video.description}</p>
                    </div>
                    <div className="mo-step-video">
                      {videoPlaying !== i ? (
                        <div className="mo-video-overlay" onClick={() => setVideoPlaying(i)}>
                          <div className="mo-play-button">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>
                      ) : (
                        <iframe 
                          src={video.videoUrl + '?autoplay=1'}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                          allowFullScreen>
                        </iframe>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
            <div className="mo-back-full-container">
              <button 
                className="mo-back-full-btn" 
                onClick={() => {
                  goToPage(1);
                }}
              >
                ← Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Festivals
function Festivals() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.fest-item',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', end: 'top 30%', scrub: 1 }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="festivals-section" id="festivals" ref={sectionRef}>
      <div className="festivals-header">Official Selections & Awards</div>
      <div className="laurels-grid">
        <div className="laurel-item fest-item">
          <img src={LAUREL} alt="Cannes" className="laurel-img" />
        </div>
        <div className="laurel-item fest-item">
          <img src={LAUREL} alt="Berlinale" className="laurel-img" />
        </div>
        <div className="laurel-item fest-item">
          <img src={LAUREL} alt="Sundance" className="laurel-img" />
        </div>
        <div className="laurel-item fest-item">
          <img src={LAUREL} alt="IDFA" className="laurel-img" />
        </div>
      </div>
      <blockquote className="press-quote fest-item">
        "A masterwork of tension and visual poetry."
      </blockquote>
      <div className="press-source fest-item">— Variety Magazine</div>
    </section>
  );
}

// About Us & Contact
function AboutContact() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Animate left side
      gsap.fromTo('.contact-section > *',
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-section', start: 'top 70%', end: 'top 30%', scrub: 1 }
        }
      );
      
      // Animate right side
      gsap.fromTo('.production-section > *',
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.production-section', start: 'top 70%', end: 'top 30%', scrub: 1 }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="about-section" id="about" ref={sectionRef}>
      <div className="about-container">
        {/* Left Side - Contact Form */}
        <div className="contact-section">
          <div className="contact-bg">
            <img src={MESSAGE_BG} alt="" />
          </div>
          
          <div className="contact-top-nav">
            <div className="double-line-menu" aria-label="Menu">
              <span className="line"></span>
              <span className="line"></span>
            </div>
          </div>

          <div className="contact-content">
            <div className="section-label serif-label">GET IN TOUCH</div>
            <h2 className="contact-title serif-title">MESSAGE TO THE VICTIM</h2>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <input type="text" id="name" name="name" placeholder="Name" required />
              </div>
              <div className="form-group">
                <input type="email" id="email" name="email" placeholder="Email" required />
              </div>
              <div className="form-group">
                <textarea id="message" name="message" placeholder="Message" rows={5} required></textarea>
              </div>
              <div className="form-group captcha-group">
                <div className="captcha-box">
                  <div className="captcha-left">
                    <input type="checkbox" id="captcha" name="captcha" required />
                    <label htmlFor="captcha">I’m not a robot</label>
                  </div>
                  <div className="captcha-brand">
                    <svg viewBox="0 0 24 24" className="recaptcha-icon" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16" />
                    </svg>
                    <span className="re-text">reCAPTCHA</span>
                    <span className="re-terms">Privacy - Terms</span>
                  </div>
                </div>
              </div>
              <button type="submit" className="submit-btn outline-glow">SUBMIT</button>
            </form>
          </div>
        </div>

        {/* Right Side - Production Info */}
        <div className="production-section">
          <div className="production-top-bar">
            <div className="section-label gold-label">PRODUCED BY</div>
            <a href="#about" className="about-us-nav">ABOUT US</a>
          </div>

          <div className="production-center">
            <div className="production-shard-logo">
              <img src={LD_LOGO} alt="LD Entertainment Co., Ltd." className="ld-shard-img" />
              <div className="ld-logo-title">LD ENTERTAINMENT CO., LTD.</div>
              <div className="ld-logo-slogan">ENTERTAIN YOUR LIFE!</div>
            </div>

            <div className="production-text">
              <p className="production-lead">A documentary from LD Entertainment</p>
              <p className="production-quote"><em>Preserving memory, seeking justice.</em></p>
            </div>
          </div>

          <div className="production-bottom">
            <div className="production-social">
              <a href="#" className="social-icon gold-social" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="social-icon gold-social" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="social-icon gold-social" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>

            <div className="cinematic-billing-block">
              <div className="billing-row">CINEMATIG DIGITAL CREDIT • BILLED CREDIT • LD ENTERTAINMENT • BILLING CREDIT</div>
              <div className="billing-row">BILLINGS SCREEN • SON GENETRESODE • BULON TVPANCUTES • JANCE ADNEGNOTES • ROCWAY BOCISER</div>
              <div className="billing-row">DIRECTOR OF PHOTOGRAPHY • ALVA CORTAGEY • PRODUCTION DESIGNER • BARHA BETCRER • EDITED BY CFSENY BIROSTON</div>
              <div className="billing-row">EXECUTIVE PRODUCERS • REDLIAND DIRECTSON • JOSOHIN SIOMPSON • DIRECTED BY MARK BACONS</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="site-footer">
      <p>© 2025 BLOOD BORDER PROJECT. ALL RIGHTS RESERVED.</p>
      <p>SOURCES: NATIONAL ARCHIVES OF CAMBODIA / ECCC RECORDS / DC-CAM</p>
    </footer>
  );
}

// Main App
export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Navigation />
      <Hero />
      <Trailer />
      <GhostMountain />
      <QuoteSection />
      <MakingOf />
      <Festivals />
      <AboutContact />
      <Footer />
    </>
  );
}
