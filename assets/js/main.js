/**
* Template Name: Medilab - v4.9.1
* Template URL: https://bootstrapmade.com/medilab-free-medical-bootstrap-theme/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  let selectTopbar = select('#topbar')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
        if (selectTopbar) {
          selectTopbar.classList.add('topbar-scrolled')
        }
      } else {
        selectHeader.classList.remove('header-scrolled')
        if (selectTopbar) {
          selectTopbar.classList.remove('topbar-scrolled')
        }
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Tabs (Scope + Documentation) - plain JS, no framework
   */
  select('.nav-tabs', true).forEach(list => {
    const links = [...list.querySelectorAll('.nav-link')]
    const panes = links.map(l => select(l.hash))
    links.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault()
        links.forEach(l => l.classList.remove('active', 'show'))
        panes.forEach(p => p && p.classList.remove('active', 'show'))
        link.classList.add('active', 'show')
        const pane = select(link.hash)
        if (pane) pane.classList.add('active', 'show')
      })
    })
  })

  /**
   * Milestones drop-down
   */
  const milestones = {
    proposal: {
      title: 'Project Proposal', icon: 'fa-file-powerpoint',
      desc: 'Proposal presentation and the proposal report submission.',
      date: '16th March 2026', marks: '12%',
      link: '#documents', linkText: 'View proposal documents'
    },
    pp1: {
      title: 'Progress Presentation 1', icon: 'fa-file-powerpoint',
      desc: '50% progress presentation of the research project.',
      date: '11th May 2026', marks: '15%',
      link: 'assets/docs/Progress_Presentation_1.pptx', linkText: 'Download presentation'
    },
    pp2: {
      title: 'Progress Presentation 2', icon: 'fa-file-powerpoint',
      desc: '90% progress presentation of the research project.',
      date: '31st August 2026', marks: '18%',
      link: 'assets/docs/Progress_Presentation_2.pptx', linkText: 'Download presentation'
    },
    demo: {
      title: 'Demonstration', icon: 'fa-file-powerpoint',
      desc: 'Submission and presentation of the camera-ready research poster.',
      date: '19th October 2026', marks: '10%',
      note: 'Rescheduled from 31st August 2026.',
      link: '#banner', linkText: 'View research poster'
    },
    final: {
      title: 'Final Assessment', icon: 'fa-file-powerpoint',
      desc: 'Submission of final reports and the final presentation of the research.',
      date: '19th October 2026', marks: '10%',
      link: '#presentations', linkText: 'View presentations'
    },
    viva: {
      title: 'Viva', icon: 'fa-users',
      desc: 'Final viva of the research, including the commercialization video with user testing and the research team members.',
      date: '19th October 2026', marks: '10%'
    }
  }
  const msSelect = select('#milestone-select')
  if (msSelect) {
    const render = () => {
      const m = milestones[msSelect.value]
      select('#ms-title').textContent = m.title
      select('#ms-desc').textContent = m.desc
      select('#ms-date').textContent = m.date
      select('#ms-marks').textContent = m.marks
      select('#ms-icon').className = 'fas ' + m.icon
      const note = select('#ms-note')
      note.textContent = m.note || ''
      note.style.display = m.note ? 'block' : 'none'
      const link = select('#ms-link')
      if (m.link) {
        link.href = m.link
        link.textContent = m.linkText
        link.style.display = 'inline-block'
        link.target = m.link.startsWith('#') ? '_self' : '_blank'
      } else {
        link.style.display = 'none'
      }
    }
    msSelect.addEventListener('change', render)
    render()
  }

})()