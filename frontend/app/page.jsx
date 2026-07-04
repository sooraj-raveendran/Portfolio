"use client"
import Image from "next/image";
import { useState } from "react";
import { X, Menu } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiPhone, FiMail } from 'react-icons/fi'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
const projects = [
  {
    title: 'AGROFAM - Plant Disease Detection System',
    description: 'AGROFAM is a web application that utilizes machine learning to detect plant diseases from images. It provides farmers with accurate and timely information about the health of their crops, enabling them to take appropriate actions to prevent the spread of diseases and improve crop yield. Other features include Crop Recommendation, Fertilizer Recommendation, and a Crop Bidding System.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Python' , 'Yolov8', 'MySQL'],
    github: 'https://github.com/sooraj-raveendran/AgroFam',
    screenshots: [
      "/Agrofam-home.jpg",
      "/Agrofam.jpg",
      "/Disease-result.png",
    ],
  },
  {
    title: 'FundMeUp - Crowdfunding Platform',
    description: 'FundMeUp is a web application that allows users to donate and support persons in need. The platform provides users with options to donate to various causes using a secure payment gateway. Users can register and login to the platform, view the list of persons in need.',
    tags: ['React', 'Node.js', 'Express', 'Stripe', 'MongoDB', 'JavaScript','CSS'],
    screenshots: [
      "/Crowdfunding-home.png",
      "/funds.png",
    ],
    github: 'https://github.com/sooraj-raveendran/Mern-Project',
  },
  {
    title: 'AutoHealth - Car Service Booking Platform',
    description: 'AutoHealth is a web application that allows users to book car services online. The platform provides users with options to select the type of service they require, choose a convenient time slots and view their booking history. Users can register and login to the platform, view their booking history, and can manage their bookings.',
    tags: ['React', 'Express', 'Node.js', 'MongoDB', 'CSS', 'tailwind CSS'],
    github: 'https://github.com/sooraj-raveendran/Auto-Heal',
    screenshots: [
      "/Autoheal-home.png",
      "/Autoheal-booking.png",
      "/Autoheal-user.png",
      "/Autoheal-admin.png",
    ],
  },
   {
    title: 'ChatzKeep - Real-time Chat Application',
    description: 'ChatzKeep is a real-time chat application that allows users to communicate with each other instantly. The application provides a seamless chatting experience with features like message history, user status, and file transfer. users can register and login to the platform, view their chat history, and can manage their profiles.',
    tags: ['Next.js', 'Express', 'Node.js', 'MongoDB', 'tailwind CSS'],
    github: 'https://github.com/sooraj-raveendran/GeekStack',
    screenshots: [
      "/Chatzkeep-login.png",
      "/Chatzkeep-register.png",
      "/Chatzkeep-chat.png",
      "/Chatzkeep-settings.png",
    ],
  },
  {
    title: 'CookHire - Online Cook Service Platform',
    description: 'Cook Connect is a MERN Stack web application that allows professional cooks to register their profiles and apply for cooking opportunities. The application provides a clean registration interface, secure backend APIs, file upload support, email notifications, and stores data in MongoDB Atlas.',
    tags: ['React.js', 'Express', 'Node.js', 'MongoDB Atlas', 'tailwind CSS'],
    live: 'https://cook-hire-eight.vercel.app/',
    screenshots: [
      "/CookHire-home.png",
      "/Cookhire-reg1.png",
      "/Cookhire-reg2.png",
    ],
  },
]
const skills = {
  Frontend: [
    "React",
    "Next.js",
    "JavaScript",
    "HTML",
    "CSS",
    "Tailwind CSS",
  ],

  Backend: [
    "Node.js",
    "Express",
  ],

  Database: [
    "MongoDB",
    "MySQL",
  ],

  Tools: [
    "Git & GitHub",
    "Postman",
    "MongoDB Compass",
    "XAMPP",
  ],
};
export default function Home() {
  const [expandedProject, setExpandedProject] = useState(null);
  const [expandedAbout, setExpandedAbout] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    setIsSending(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          subject: contactSubject,
          message: contactMessage,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to send message.");
      }

      toast.success("Message sent successfully");
      setContactName("");
      setContactEmail("");
      setContactSubject("");
      setContactMessage("");
    } catch (error) {
      const message = error.message || "Unable to send message. Please try again later.";
      toast.error(message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    // main container
    <main className="min-h-screen bg-slate-950 text-slate-100">

      {/* navbar */}
      <nav className="sticky top-0 left-0 right-0 z-50 bg-slate-950/95 px-4 py-4 text-slate-300 shadow-lg shadow-slate-950/10 backdrop-blur-xl sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-purple-300 bg-clip-text text-xl font-semibold text-transparent sm:text-2xl">
            Sooraj R
          </span>

          <div className="hidden items-center gap-6 sm:flex">
            <a href="#about" className="navbar-link rounded px-2 py-1">About</a>
            <a href="#projects" className="navbar-link">Projects</a>
            <a href="#skills" className="navbar-link">Skills</a>
            <a href="#contact" className="navbar-link">Contact</a>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-full border border-slate-700 p-2 text-slate-200 sm:hidden"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="mt-3 flex flex-col gap-2 border-t border-slate-800 pt-3 sm:hidden">
            <a href="#about" className="navbar-link rounded px-2 py-2" onClick={() => setIsMenuOpen(false)}>About</a>
            <a href="#projects" className="navbar-link rounded px-2 py-2" onClick={() => setIsMenuOpen(false)}>Projects</a>
            <a href="#skills" className="navbar-link rounded px-2 py-2" onClick={() => setIsMenuOpen(false)}>Skills</a>
            <a href="#contact" className="navbar-link rounded px-2 py-2" onClick={() => setIsMenuOpen(false)}>Contact</a>
          </div>
        )}
      </nav>

      {/* landing section */}

      <section className="relative border-b border-slate-800/70">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-60 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.18),_transparent_45%)]" />
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

            {/* landing section content */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">

            {/* landing section content */}
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.25em] text-cyan-400 sm:text-sm sm:tracking-[0.35em] md:text-base">Full Stack Developer</p>
              <h3 className="text-2xl font-semibold leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
                Building fast, modern web experiences with a focus on design and performance.
              </h3>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                I specialize in developing responsive, user-friendly websites and applications using the latest frontend technologies. With a strong background in both design and development, I create seamless digital experiences that engage users and drive results.
              </p>
              <div className="mt-10 flex w-full flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href="#contact"
                  className="inline-flex w-full items-center justify-center rounded-full bg-cyan-500 px-7 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 sm:w-auto"
                >
                  Let&apos;s work together
                </a>
                <a
                  href="#projects"
                  className="inline-flex w-full items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 px-7 py-3 text-sm font-semibold text-slate-200 transition hover:border-purple-400 sm:w-auto"
                >
                  View projects
                </a>
              </div>
            </div>
            {/* landing section content 2 */}
            <div className="-mx-4 w-[100vw] max-w-none rounded-none border border-slate-800 bg-slate-900/90 p-4 shadow-2xl shadow-slate-950/40 backdrop-blur-xl sm:mx-0 sm:w-full sm:rounded-[2rem] sm:p-6 lg:p-8">
              {/* main profile section */}
              <div className="flex items-center flex-col gap-6">
                {/* <div className="flex items-center gap-6">
                  <img src="/profile.svg" alt="Sooraj R" className="h-28 w-28 rounded-full object-cover ring-1 ring-slate-700/70" />
                </div> */}

                {/* Education and Contact */}
                <div className="flex w-full flex-col gap-4 lg:flex-col lg:items-stretch lg:gap-4">
                  {/* Education */}
                  <div className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-left sm:min-w-0 sm:flex-1">
                    <p className="text-xs uppercase tracking-[0.35em] text-purple-400">Education</p>
                    <p className="mt-4 text-sm text-slate-200">B.Tech in Computer Science and Engineering — APJ Abdul Kalam Technological University, 2025</p>
                    <p className="mt-4 text-sm text-slate-200">Diploma in Computer Technology — Kerala Technical University, 2021</p>
                  </div>
                  {/* Contact */}
                  <div className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 p-4 sm:min-w-0 sm:flex-1">
                    <p className="text-xs uppercase tracking-[0.35em] text-purple-400">Contacts</p>
                    <div className="mt-3 grid gap-3 text-sm text-slate-200">
                      <div className="flex items-start gap-3 overflow-hidden rounded-2xl bg-slate-900/70 p-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-cyan-300">
                          <FiPhone className="h-5 w-5" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-slate-100">Phone</p>
                          <p className="mt-1 break-all">+91 7012436192</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 rounded-2xl bg-slate-900/70 p-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-cyan-300">
                          <FiMail className="h-5 w-5" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-slate-100">Email</p>
                          <p className="mt-1 break-all">soorajraveendranotkl@gmail.com</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 rounded-2xl bg-slate-900/70 p-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-cyan-300">
                          <FaLinkedin className="h-5 w-5" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-slate-100">LinkedIn</p>
                          <a href="http://www.linkedin.com/in/sooraj-raveendran-otkl" className="mt-1 block break-all text-blue-400 hover:text-blue-300">linkedin.com/in/sooraj-r</a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 rounded-2xl bg-slate-900/70 p-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-cyan-300">
                          <FaGithub className="h-5 w-5" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-slate-100">GitHub</p>
                          <a href="https://github.com/sooraj-raveendran" className="mt-1 block break-all text-blue-400 hover:text-blue-300">github.com/sooraj</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                  {/* experience and projects */}
                <div className="mt-2 flex flex-row gap-3 sm:grid sm:grid-cols-2 sm:gap-4">
                  {/* experience */}
                  <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-950/70 p-3 text-center sm:rounded-3xl sm:p-4">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-purple-400 sm:text-sm sm:tracking-[0.35em]">Experience</p>
                    <p className="mt-1 text-base font-semibold text-white sm:mt-2 sm:text-2xl lg:text-3xl">Fresher</p>
                  </div>
                  {/* projects */}
                  <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-950/70 p-3 text-center sm:rounded-3xl sm:p-4">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-purple-400 sm:text-sm sm:tracking-[0.35em]">Projects</p>
                    <p className="mt-1 text-base font-semibold text-white sm:mt-2 sm:text-2xl lg:text-3xl">{projects.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
{/* About Section */}
      <section id="about" className="border-b border-slate-800/70 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            <p className="mb-0 text-sm uppercase tracking-[0.35em] text-cyan-400">About</p>

            <div className="w-full rounded-none border-2 border-cyan-500/80 bg-slate-900/60 p-4 sm:rounded-2xl sm:p-6">
              <p className={`text-sm leading-7 text-slate-300 text-justify sm:text-base sm:leading-8 lg:text-lg sm:text-left ${expandedAbout ? "" : "line-clamp-6 sm:line-clamp-none"}`}>
                Hi, I&apos;m Sooraj R, a passionate MERN Stack Developer and a graduate with a B.Tech in Computer Science and Engineering from College of Engineering Pathanapuram.
                 As a fresher, I have gained hands-on experience in building responsive and user-friendly web applications through projects such as a personal portfolio website, a car service booking platform, a real-time chat application, a crowdfunding platform, and a plant disease detection system.
                  These projects have strengthened my skills in modern web technologies and full-stack development. I am continuously expanding my knowledge, exploring new technologies, and improving my problem-solving abilities.
                   I am currently seeking opportunities where I can contribute, learn from experienced professionals, and grow as a software developer.
                 </p>
              <button
                type="button"
                onClick={() => setExpandedAbout((prev) => !prev)}
                className="mt-3 text-sm font-medium text-cyan-400 hover:text-cyan-300 sm:hidden"
              >
                {expandedAbout ? "Read Less" : "Read More"}
              </button>
            </div>
          </div>
        </div>
      </section>
{/* Project Section */}
      <section id="projects" className="border-b border-slate-800/70 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Projects</p>
              <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">Recent work that delivers results.</h2>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <article key={project.title} className="-mx-4 w-[100vw] max-w-none rounded-none border border-slate-800 bg-slate-900/80 p-5 transition hover:border-cyan-400/50 hover:bg-slate-900 sm:mx-0 sm:w-full sm:rounded-[2rem] sm:p-8">
                <h3 className="text-lg font-semibold text-white sm:text-xl">{project.title}</h3>
                <div className="mt-4">
                    <p
                      className={`text-sm leading-7 text-slate-300 sm:text-base sm:leading-8 ${
                        expandedProject === project.title
                          ? ""
                          : "line-clamp-4"
                      }`}
                    >
                      {project.description}
                    </p>

                    {project.description.length > 180 && (
                      <button
                        onClick={() =>
                          setExpandedProject(
                            expandedProject === project.title
                              ? null
                              : project.title
                          )
                        }
                        className="mt-2 text-cyan-400 hover:text-cyan-300"
                      >
                        {expandedProject === project.title
                          ? "Read Less"
                          : "Read More"}
                      </button>
                    )}
                  </div>
                  <div className="relative mt-6">
  {/* Left Fade */}
                <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 bg-gradient-to-r from-slate-900 to-transparent" />

                {/* Right Fade */}
                <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 bg-gradient-to-l from-slate-900 to-transparent" />

                <div
                  className="
                    flex
                    gap-4
                    overflow-x-auto
                    scroll-smooth
                    snap-x
                    snap-mandatory
                    pb-3
                    scrollbar-hide
                  "
                >
                  {project.screenshots?.map((image, index) => (
                    <div
                      key={index}
                      className="
                        snap-center
                        flex-shrink-0
                        overflow-hidden
                        rounded-2xl
                        border
                        border-slate-700
                        bg-slate-800
                        transition
                        hover:border-cyan-400/50
                      "
                    >
                      <Image
                        src={image}
                        alt={`${project.title}-${index}`}
                        loading="lazy"
                        decoding="async"
                        width={640}
                        height={360}
                        sizes="(max-width: 640px) 280px, 288px"
                        onClick={() => setSelectedImage(image)}
                        className="
                          h-44
                          w-full
                          max-w-[280px]
                          cursor-pointer
                          object-cover
                          transition
                          duration-500
                          hover:scale-110
                          sm:w-72
                          sm:max-w-none
                        "
                      />
                    </div>
                  ))}
                </div>
              </div>
                <div className="mt-5 flex flex-wrap gap-2 text-xs  tracking-[0.35em] text-purple-600">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-slate-700 px-3 py-1">{tag}</span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="rounded-full border border-cyan-400 px-4 py-2 text-cyan-400 transition hover:bg-cyan-400 hover:text-slate-900">
                      GitHub
                    </button>
                  </a>
                )}

                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="rounded-full border border-emerald-400 px-4 py-2 text-emerald-400 transition hover:bg-emerald-400 hover:text-slate-900">
                      Live
                    </button>
                  </a>
                )}
              </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Achievement Section */}

      {/* <section id="achievements" className="border-b border-slate-800/70 py-20 bg-slate-950/95">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Achievements</p>
            <h2 className="mt-3 text-4xl font-semibold text-white">Milestones and highlights from my work.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {achievements.map((item) => (
              <div key={item.title} className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/20 transition hover:border-cyan-400/50 hover:bg-slate-900">
                <p className="text-lg font-semibold text-white">{item.title}</p>
                <p className="mt-4 text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Skills Section */}

            <section id="skills" className="border-b border-slate-800/70 bg-slate-950/95 py-16 sm:py-20">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                  <div className="mb-10">
                    <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
                      Skills
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
                      What I work with every day.
                    </h2>
                  </div>

                  <div className="grid gap-8 md:grid-cols-2">
                    {Object.entries(skills).map(([category, items]) => (
                      <div
                        key={category}
                        className="-mx-4 rounded-2xl w-[100vw] max-w-none border border-purple-500 bg-slate-900/80 p-6 sm:mx-0 sm:w-full sm:rounded-3xl"
                      >
                        <h3 className="mb-5 text-lg font-semibold text-cyan-400 sm:text-xl">
                          {category}
                        </h3>

                        <div className="flex flex-wrap gap-2 sm:grid sm:grid-cols-2 sm:gap-3">
                          {items.map((skill) => (
                            <div key={skill} className="rounded-lg border border-green-700 bg-slate-800 px-2.5 py-1.5 text-center text-xs text-slate-100 transition hover:border-cyan-400 hover:bg-slate-700 sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm">
                              {skill}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

      <section id="contact" className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="-mx-4 w-[100vw] max-w-none rounded-none border border-slate-800 bg-slate-900/90 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur-xl sm:mx-0 sm:w-full sm:rounded-[2rem] sm:p-8 lg:p-10">
            <div className="flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
              <div className="max-w-xl">
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Contact</p>
                <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">Ready to bring your next project to life?</h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
                  I&apos;m available for freelance projects and collaborations. Send your message using the form, and I&apos;ll reply as soon as possible.
                </p>
              </div>

              <form onSubmit={handleContactSubmit} className="grid w-full gap-4 rounded-none border border-slate-800 bg-slate-950/80 p-4 shadow-inner shadow-slate-950/20 sm:rounded-[1.75rem] sm:p-6">
                <label className="grid gap-2 text-sm text-slate-200 sm:text-base">
                  <span>Name</span>
                  <input
                    value={contactName}
                    onChange={(event) => setContactName(event.target.value)}
                    required
                    placeholder="Name"
                    className="rounded-2xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                  />
                </label>

                <label className="grid gap-2 text-sm text-slate-200 sm:text-base">
                  <span>Email</span>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(event) => setContactEmail(event.target.value)}
                    required
                    placeholder="Email"
                    className="rounded-2xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                  />
                </label>

                <label className="grid gap-2 text-sm text-slate-200 sm:text-base">
                  <span>Subject</span>
                  <input
                    value={contactSubject}
                    onChange={(event) => setContactSubject(event.target.value)}
                    required
                    placeholder="Subject"
                    className="rounded-2xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                  />
                </label>

                <label className="grid gap-2 text-sm text-slate-200 sm:text-base">
                  <span>Message</span>
                  <textarea
                    value={contactMessage}
                    onChange={(event) => setContactMessage(event.target.value)}
                    required
                    rows={5}
                    placeholder="Message"
                    className="min-h-[160px] resize-none rounded-2xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                  />
                </label>

                <button
                  type="submit"
                  disabled={isSending}
                  className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
                >
                  {isSending ? "Sending..." : "Send message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <footer className="border-t border-slate-800/80 bg-slate-950/95">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8 lg:py-14">
          <div className="max-w-md">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Sooraj R</p>
            <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">Building thoughtful digital experiences.</h3>
            <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
              Full-stack developer focused on creating responsive, polished, and high-performing websites for modern businesses and personal brands.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:min-w-[360px] lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Navigate</p>
              <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
                <a href="#about" className="transition hover:text-cyan-400">About</a>
                <a href="#projects" className="transition hover:text-cyan-400">Projects</a>
                <a href="#skills" className="transition hover:text-cyan-400">Skills</a>
                <a href="#contact" className="transition hover:text-cyan-400">Contact</a>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Reach</p>
              <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
                <a href="mailto:soorajraveendranotkl@gmail.com" className="transition hover:text-cyan-400">soorajraveendranotkl@gmail.com</a>
                <a href="https://www.linkedin.com/in/sooraj-raveendran-otkl" target="_blank" rel="noreferrer" className="transition hover:text-cyan-400">LinkedIn</a>
                <a href="https://github.com/sooraj-raveendran" target="_blank" rel="noreferrer" className="transition hover:text-cyan-400">GitHub</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/80 px-4 py-4 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
          © 2026 Sooraj R. All rights reserved.
        </div>
      </footer>

      <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      {selectedImage && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
    <div className="relative">
      <button
        onClick={() => setSelectedImage(null)}
        className="absolute -top-3 -right-3 rounded-full bg-red-500 p-2 text-white hover:bg-red-600"
      >
        <X size={18} />
      </button>

      <Image
        src={selectedImage}
        alt="Project Screenshot"
        loading="eager"
        decoding="async"
        width={1200}
        height={900}
        className="max-h-[80vh] w-full max-w-[min(900px,100%)] rounded-xl object-contain"
      />
    </div>
  </div>
)}
    </main>
  )
}   