import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, FileText, Shield, Cloud, Brain, GraduationCap, Award, ExternalLink, Plus, Edit3, Trash2, Save, Mail, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface Project {
  id: string;
  title: string;
  description: string;
  link?: string;
  category: 'ai' | 'cybersecurity' | 'cloud';
}

interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  link?: string;
}

const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Performance evaluation of transformer models for sentiment analysis',
    description: 'Comprehensive analysis of transformer models for sentiment classification tasks.',
    link: 'https://github.com/iamissifu/performance-evaluation-of-transformer-models.git',
    category: 'ai'
  },
  {
    id: '2',
    title: 'Performance Evaluation of Haulage Truck Production in a Mine Based On RF-BOA, AdaBoost-BOA, Gradient Boost-BOA and ERT-BOA',
    description: 'Advanced machine learning models for mining production optimization.',
    link: 'https://github.com/iamissifu/mined-tonnes-predictor-Hybrid-models.git',
    category: 'ai'
  },
  {
    id: '3',
    title: 'Transformers for Movie Review Sentiment Analysis',
    description: 'Implementation of transformer architectures for movie review sentiment classification.',
    link: 'https://github.com/iamissifu/transformer-models.git',
    category: 'ai'
  },
  {
    id: '4',
    title: 'Use a Pre-trained Image Classifier to Identify Dog Breeds',
    description: 'Computer vision project using pre-trained models for dog breed classification.',
    link: 'https://github.com/iamissifu/Use-a-Pre-trained-Image-Classifier-to-Identify-Dog-Breeds.git',
    category: 'ai'
  },
  {
    id: '5',
    title: 'Responding to a Nation-State Cyber Attack',
    description: 'Detected malicious payloads using ClamAV and uncovered stealth malware via static analysis and Yara rule creation.',
    link: 'https://github.com/iamissifu/Responding-to-a-Nation-State-Cyber-Attack.git',
    category: 'cybersecurity'
  },
  {
    id: '6',
    title: 'Custom vulnerability scanner for CTFs',
    description: 'The tool uses Nmap for network scanning and searchsploit to match identified services and versions with known vulnerabilities.',
    link: 'https://github.com/iamissifu/vulnerability_scanner.git',
    category: 'cybersecurity'
  },
  {
    id: '7',
    title: 'A lightweight network monitor for CTFs',
    description: 'Network traffic monitor with packet-sniffing abilities designed for Linux environments.',
    link: 'https://github.com/iamissifu/network_traffic_monitor.git',
    category: 'cybersecurity'
  },
  {
    id: '8',
    title: 'Buffer Overflow Attack to Gain Access to a Remote System',
    description: 'Demonstration of buffer overflow exploitation techniques for educational purposes.',
    link: 'https://drive.google.com/file/d/16_chkqir1x8Dz7X4Yu0tWPpEpoLvVAyL/view?usp=sharing',
    category: 'cybersecurity'
  },
  {
    id: '9',
    title: 'DDoS Attack using botnet',
    description: 'Educational demonstration of distributed denial-of-service attack methodologies.',
    link: 'https://drive.google.com/file/d/103gczTckAEYQYqNW1XGETqrkUK3CMt1n/view?usp=sharing',
    category: 'cybersecurity'
  },
  {
    id: '10',
    title: 'Containerized Deployment of ZOMATO Clone App on EC2',
    description: 'Deployed a ZOMATO Clone App inside Docker container on an AWS EC2 instance with CI/CD pipeline.',
    link: 'https://github.com/iamissifu/Containerized-Deployment-of-ZOMATO-Clone-App-on-EC2.git',
    category: 'cloud'
  },
  {
    id: '11',
    title: 'Kubernetes Deployment and Monitoring of ZOMATO Clone App on AWS EKS',
    description: 'Production-grade Kubernetes deployment with GitOps using ArgoCD and monitoring with Prometheus/Grafana.',
    link: 'https://github.com/iamissifu/Kubernetes-Deployment-and-Monitoring-of-ZOMATO-Clone-App-on-AWS-EKS.git',
    category: 'cloud'
  },
  {
    id: '12',
    title: 'Real-Time Threat Detection in Kubernetes with Falco Runtime Security',
    description: 'Deployed Kubernetes cluster with Falco for real-time runtime security monitoring and threat detection.',
    link: '#',
    category: 'cloud'
  },
  {
    id: '13',
    title: 'Automated Ubuntu Hardening & Kubernetes Setup (Ansible)',
    description: 'Ansible playbook for secure Ubuntu configurations and automated Kubernetes installation.',
    link: 'https://github.com/iamissifu/ubuntu-server-hardening-for-k8s.git',
    category: 'cloud'
  },
  {
    id: '14',
    title: 'AWS ECR and ECS Exploitation with the Cloud Container Attack Tool (CCAT)',
    description: 'Security testing of AWS container services and exploitation techniques.',
    link: '#',
    category: 'cloud'
  },
  {
    id: '15',
    title: 'Grand Scripts Auto',
    description: 'Automation scripts for various cloud and security operations.',
    link: 'https://github.com/iamissifu/grand-scripts-auto.git',
    category: 'cloud'
  }
];

const initialCertifications: Certification[] = [
  {
    id: '1',
    title: 'EC-Council Certified Ethical Hacker (CEH v13)',
    issuer: 'EC-Council',
    date: 'March 2025',
    link: 'https://drive.google.com/file/d/1naktp6dVoDPxByvwJCDb_anugWwYk9fb/view?usp=sharing'
  },
  {
    id: '2',
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: 'January 2025',
    link: 'https://drive.google.com/file/d/1zWWFtYLQCFE2dzMZ--mVsocU8xziIAex/view?usp=sharing'
  },
  {
    id: '3',
    title: 'Kubernetes and Cloud Native Associate (KCNA)',
    issuer: 'Cloud Native Computing Foundation',
    date: 'May 2025',
    link: 'https://drive.google.com/file/d/1JsqNLjKlweVnjCgVsKPUDHWVUgXRypJw/view?usp=sharing'
  },
  {
    id: '4',
    title: 'ALX Certified Virtual Assistant',
    issuer: 'ALX',
    date: 'November 2024',
    link: 'https://drive.google.com/file/d/181IRtEpmaTUqKXEbJAoS-MOfndmLBdUO/view?usp=sharing'
  },
  {
    id: '5',
    title: 'Google Cybersecurity Professional Certificate',
    issuer: 'Google',
    date: 'June 2024',
    link: 'https://drive.google.com/file/d/1-FPNSqSO9ccKUoblhlHgCff_9ddNktSr/view?usp=sharing'
  }
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [certifications, setCertifications] = useState<Certification[]>(initialCertifications);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingCertification, setEditingCertification] = useState<Certification | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init('9UFl8kXRlyeHhtjmz');

    const savedProjects = localStorage.getItem('portfolioProjects');
    const savedCertifications = localStorage.getItem('portfolioCertifications');
    
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
    if (savedCertifications) {
      setCertifications(JSON.parse(savedCertifications));
    }

    // Check for admin mode in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
      setIsAdminMode(true);
    }
  }, []);

  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem('portfolioProjects', JSON.stringify(newProjects));
  };

  const saveCertifications = (newCertifications: Certification[]) => {
    setCertifications(newCertifications);
    localStorage.setItem('portfolioCertifications', JSON.stringify(newCertifications));
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: '',
      description: '',
      link: '',
      category: 'ai'
    };
    setEditingProject(newProject);
  };

  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      title: '',
      issuer: '',
      date: '',
      link: ''
    };
    setEditingCertification(newCertification);
  };

  const saveProject = (project: Project) => {
    if (projects.find(p => p.id === project.id)) {
      saveProjects(projects.map(p => p.id === project.id ? project : p));
    } else {
      saveProjects([...projects, project]);
    }
    setEditingProject(null);
  };

  const saveCertification = (certification: Certification) => {
    if (certifications.find(c => c.id === certification.id)) {
      saveCertifications(certifications.map(c => c.id === certification.id ? certification : c));
    } else {
      saveCertifications([...certifications, certification]);
    }
    setEditingCertification(null);
  };

  const deleteProject = (id: string) => {
    saveProjects(projects.filter(p => p.id !== id));
  };

  const deleteCertification = (id: string) => {
    saveCertifications(certifications.filter(c => c.id !== id));
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const getProjectsByCategory = (category: 'ai' | 'cybersecurity' | 'cloud') => {
    return projects.filter(project => project.category === category);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // EmailJS configuration
      const templateParams = {
        from_name: contactForm.name,
        from_email: contactForm.email,
        subject: contactForm.subject || 'Portfolio Contact',
        message: contactForm.message,
        to_email: 'sibdooissifu@gmail.com'
      };

      // Send email using EmailJS
      const result = await emailjs.send(
        'service_0l6y6mn',
        'template_eblo6wm',
        templateParams,
        '9UFl8kXRlyeHhtjmz'
      );

      if (result.status === 200) {
        setSubmitMessage('Message sent successfully! I\'ll get back to you soon.');
        setContactForm({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitMessage('Failed to send message. Please email me directly at sibdooissifu@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    { title: 'Ethical Hacking', icon: Shield, description: 'Penetration testing and vulnerability assessments' },
    { title: 'Research & Development', icon: Brain, description: 'Innovative solutions and technical research' },
    { title: 'Cloud & DevSecOps Engineering', icon: Cloud, description: 'Secure cloud infrastructure and automation' },
    { title: 'Artificial Intelligence', icon: Brain, description: 'ML/AI model development and implementation' },
    { title: 'Training & Tutoring', icon: GraduationCap, description: 'Technical education and mentorship' }
  ];

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/iamissifu', icon: Github },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sibdou-issifu', icon: Linkedin },
    { name: 'Medium', url: 'https://medium.com/@sibdooissifu', icon: FileText },
    { name: 'TryHackMe', url: 'https://tryhackme.com/p/iamsibdou', icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-cyan-400">Sibdou Ibrahim Issifu</div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('about')} className="hover:text-cyan-400 transition-colors">About</button>
              <button onClick={() => scrollToSection('services')} className="hover:text-cyan-400 transition-colors">Services</button>
              <button onClick={() => scrollToSection('projects')} className="hover:text-cyan-400 transition-colors">Projects</button>
              <button onClick={() => scrollToSection('certifications')} className="hover:text-cyan-400 transition-colors">Certifications</button>
              <button onClick={() => scrollToSection('education')} className="hover:text-cyan-400 transition-colors">Education</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-cyan-400 transition-colors">Contact</button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900 border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button onClick={() => scrollToSection('about')} className="block px-3 py-2 hover:text-cyan-400 transition-colors">About</button>
              <button onClick={() => scrollToSection('services')} className="block px-3 py-2 hover:text-cyan-400 transition-colors">Services</button>
              <button onClick={() => scrollToSection('projects')} className="block px-3 py-2 hover:text-cyan-400 transition-colors">Projects</button>
              <button onClick={() => scrollToSection('certifications')} className="block px-3 py-2 hover:text-cyan-400 transition-colors">Certifications</button>
              <button onClick={() => scrollToSection('education')} className="block px-3 py-2 hover:text-cyan-400 transition-colors">Education</button>
              <button onClick={() => scrollToSection('contact')} className="block px-3 py-2 hover:text-cyan-400 transition-colors">Contact</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-20 min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Sibdou Ibrahim</span>{' '}
              <span className="text-cyan-400">Issifu</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Security Researcher | Cloud Engineer | AI Researcher
            </p>
            <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
              Passionate about securing digital infrastructure, developing intelligent systems, and advancing cybersecurity through research and ethical hacking.
            </p>
            <div className="flex justify-center space-x-6 mb-12">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 rounded-full hover:bg-cyan-600 transition-colors"
                >
                  <link.icon size={24} />
                </a>
              ))}
            </div>
            <button 
              onClick={() => scrollToSection('about')}
              className="bg-cyan-600 hover:bg-cyan-700 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <div className="w-24 h-1 bg-cyan-400 mx-auto"></div>
          </div>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm a continous learner of  cybersecurity and cloud engineering with a passion for protecting digital infrastructure and developing innovative solutions. Currently pursuing my BSc in Computer Science and Engineering at the University of Mines and Technology, I combine academic excellence with practical expertise in ethical hacking, cloud security, and artificial intelligence.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mt-6">
              My expertise spans across multiple domains including penetration testing, vulnerability assessment, cloud architecture, DevSecOps practices, and machine learning model development. I'm committed to advancing cybersecurity through research, practical implementation, and knowledge sharing.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Services</h2>
            <div className="w-24 h-1 bg-cyan-400 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors">
                <service.icon size={48} className="text-cyan-400 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-16">
            <div className="text-center flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
              <div className="w-24 h-1 bg-cyan-400 mx-auto"></div>
            </div>
            {isAdminMode && (
              <button
                onClick={addProject}
                className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Plus size={20} />
                <span>Add Project</span>
              </button>
            )}
          </div>

          {/* AI Projects */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-cyan-400">Artificial Intelligence</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getProjectsByCategory('ai').map((project) => (
                <div key={project.id} className="bg-gray-900 p-6 rounded-lg hover:bg-gray-700 transition-colors group">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-semibold group-hover:text-cyan-400 transition-colors">{project.title}</h4>
                    {isAdminMode && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingProject(project)}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => deleteProject(project.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <span>View Project</span>
                      <ExternalLink size={16} className="ml-1" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Cybersecurity Projects */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-cyan-400">Cybersecurity</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getProjectsByCategory('cybersecurity').map((project) => (
                <div key={project.id} className="bg-gray-900 p-6 rounded-lg hover:bg-gray-700 transition-colors group">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-semibold group-hover:text-cyan-400 transition-colors">{project.title}</h4>
                    {isAdminMode && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingProject(project)}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => deleteProject(project.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <span>View Project</span>
                      <ExternalLink size={16} className="ml-1" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Cloud/DevSecOps Projects */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-cyan-400">Cloud & DevSecOps</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getProjectsByCategory('cloud').map((project) => (
                <div key={project.id} className="bg-gray-900 p-6 rounded-lg hover:bg-gray-700 transition-colors group">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-semibold group-hover:text-cyan-400 transition-colors">{project.title}</h4>
                    {isAdminMode && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingProject(project)}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => deleteProject(project.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <span>View Project</span>
                      <ExternalLink size={16} className="ml-1" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Write-ups */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-cyan-400">Technical Write-ups</h3>
            <div className="bg-gray-900 p-6 rounded-lg">
              <p className="text-gray-400 mb-4">
                I regularly publish technical articles and cybersecurity write-ups on Medium, covering topics from Kerberos exploitation to Jenkins penetration testing.
              </p>
              <a
                href="https://medium.com/@sibdooissifu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <span>Read My Articles on Medium</span>
                <ExternalLink size={16} className="ml-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-16">
            <div className="text-center flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Certifications</h2>
              <div className="w-24 h-1 bg-cyan-400 mx-auto"></div>
            </div>
            {isAdminMode && (
              <button
                onClick={addCertification}
                className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Plus size={20} />
                <span>Add Certification</span>
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <div key={cert.id} className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <Award size={32} className="text-cyan-400" />
                  {isAdminMode && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingCertification(cert)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => deleteCertification(cert.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-semibold mb-2">{cert.title}</h3>
                <p className="text-gray-400 mb-2">{cert.issuer}</p>
                <p className="text-sm text-gray-500 mb-4">{cert.date}</p>
                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>Verify Certificate</span>
                    <ExternalLink size={16} className="ml-1" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Education</h2>
            <div className="w-24 h-1 bg-cyan-400 mx-auto"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900 p-8 rounded-lg">
              <div className="flex items-start space-x-6">
                <GraduationCap size={48} className="text-cyan-400 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">BSc. Computer Science and Engineering</h3>
                  <p className="text-cyan-400 text-lg mb-2">University of Mines and Technology (UMaT)</p>
                  <p className="text-gray-400 mb-4">Tarkwa, Ghana</p>
                  <p className="text-gray-300">January 2022 - September 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <div className="w-24 h-1 bg-cyan-400 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-800 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Mail className="mr-3 text-cyan-400" size={24} />
                Send Me a Message
              </h3>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-colors"
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-colors resize-vertical"
                    placeholder="Tell me about your project or inquiry..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
                {submitMessage && (
                  <div className={`p-4 rounded-lg ${submitMessage.includes('Error') ? 'bg-red-900 text-red-300' : 'bg-green-900 text-green-300'}`}>
                    {submitMessage}
                  </div>
                )}
              </form>
            </div>

            {/* Contact Info & Social Links */}
            <div className="space-y-8">
              <div className="bg-gray-800 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
                <p className="text-gray-300 mb-6">
                  Interested in collaborating on cybersecurity projects, cloud architecture, or AI research? 
                  Let's connect and explore opportunities together.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="text-cyan-400" size={20} />
                    <span className="text-gray-300">sibdooissifu@gmail.com</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-8 rounded-lg">
                <h3 className="text-xl font-bold mb-6">Follow Me</h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg hover:bg-cyan-600 transition-colors"
                    >
                      <link.icon size={20} />
                      <span>{link.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 Sibdou Ibrahim Issifu. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Admin Modals */}
      {editingProject && (
        <ProjectEditModal
          project={editingProject}
          onSave={saveProject}
          onCancel={() => setEditingProject(null)}
        />
      )}

      {editingCertification && (
        <CertificationEditModal
          certification={editingCertification}
          onSave={saveCertification}
          onCancel={() => setEditingCertification(null)}
        />
      )}
    </div>
  );
}

// Project Edit Modal Component
function ProjectEditModal({ 
  project, 
  onSave, 
  onCancel 
}: { 
  project: Project; 
  onSave: (project: Project) => void; 
  onCancel: () => void; 
}) {
  const [formData, setFormData] = useState(project);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">
          {project.title ? 'Edit Project' : 'Add New Project'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Link (optional)</label>
            <input
              type="url"
              value={formData.link || ''}
              onChange={(e) => setFormData({...formData, link: e.target.value})}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value as Project['category']})}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg"
            >
              <option value="ai">Artificial Intelligence</option>
              <option value="cybersecurity">Cybersecurity</option>
              <option value="cloud">Cloud & DevSecOps</option>
            </select>
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg flex items-center justify-center space-x-2"
            >
              <Save size={16} />
              <span>Save</span>
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Certification Edit Modal Component
function CertificationEditModal({ 
  certification, 
  onSave, 
  onCancel 
}: { 
  certification: Certification; 
  onSave: (certification: Certification) => void; 
  onCancel: () => void; 
}) {
  const [formData, setFormData] = useState(certification);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">
          {certification.title ? 'Edit Certification' : 'Add New Certification'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Issuer</label>
            <input
              type="text"
              value={formData.issuer}
              onChange={(e) => setFormData({...formData, issuer: e.target.value})}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Date</label>
            <input
              type="text"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Verification Link (optional)</label>
            <input
              type="url"
              value={formData.link || ''}
              onChange={(e) => setFormData({...formData, link: e.target.value})}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg flex items-center justify-center space-x-2"
            >
              <Save size={16} />
              <span>Save</span>
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;