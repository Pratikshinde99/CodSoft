const { useState, useEffect, useContext, createContext } = React;

// Sample data
const sampleJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    salary: "$120,000 - $150,000",
    type: "Full-time",
    posted: "2 days ago",
    description: "We are seeking a Senior Frontend Developer to join our innovative team. You will be responsible for developing high-quality web applications using modern JavaScript frameworks, particularly React.js. The ideal candidate will have experience with responsive design, state management, and modern development tools.",
    requirements: ["5+ years React experience", "TypeScript proficiency", "CSS/SCSS expertise", "REST API integration", "Git version control"],
    benefits: ["Health insurance", "401k matching", "Remote work options", "Professional development budget", "Flexible hours"],
    companyInfo: {
      name: "TechCorp Solutions",
      size: "200-500 employees",
      industry: "Technology",
      description: "Leading technology company focused on innovative web solutions."
    }
  },
  {
    id: 2,
    title: "Marketing Manager",
    company: "BrandForce Inc",
    location: "New York, NY",
    salary: "$80,000 - $100,000", 
    type: "Full-time",
    posted: "1 day ago",
    description: "Join our dynamic marketing team as a Marketing Manager. You will develop and execute comprehensive marketing strategies, manage campaigns across multiple channels, and analyze performance metrics to drive business growth.",
    requirements: ["3+ years marketing experience", "Digital marketing expertise", "Analytics tools proficiency", "Content creation skills", "Project management"],
    benefits: ["Comprehensive health coverage", "Performance bonuses", "Career advancement opportunities", "Team building events", "Learning stipend"],
    companyInfo: {
      name: "BrandForce Inc",
      size: "50-100 employees", 
      industry: "Marketing & Advertising",
      description: "Creative marketing agency helping brands tell their stories."
    }
  },
  {
    id: 3,
    title: "Product Designer",
    company: "Design Studio Pro",
    location: "Remote",
    salary: "$90,000 - $120,000",
    type: "Full-time", 
    posted: "3 days ago",
    description: "We're looking for a talented Product Designer to create exceptional user experiences. You'll work closely with product managers and developers to design intuitive interfaces and conduct user research to inform design decisions.",
    requirements: ["UX/UI design experience", "Figma/Sketch proficiency", "User research skills", "Prototyping abilities", "Design systems knowledge"],
    benefits: ["Fully remote work", "Design tools budget", "Health & dental insurance", "Unlimited PTO", "Professional conferences"],
    companyInfo: {
      name: "Design Studio Pro",
      size: "20-50 employees",
      industry: "Design Services", 
      description: "Award-winning design studio creating beautiful digital experiences."
    }
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "Analytics Corp",
    location: "Austin, TX",
    salary: "$110,000 - $140,000",
    type: "Full-time",
    posted: "4 days ago", 
    description: "Join our data science team to extract insights from complex datasets. You'll build predictive models, create data visualizations, and collaborate with cross-functional teams to drive data-driven decisions.",
    requirements: ["Python/R programming", "Machine learning expertise", "SQL proficiency", "Statistics background", "Data visualization"],
    benefits: ["Stock options", "Flexible schedule", "Learning budget", "Gym membership", "Catered meals"],
    companyInfo: {
      name: "Analytics Corp",
      size: "100-200 employees",
      industry: "Data & Analytics",
      description: "Data analytics company helping businesses make smarter decisions."
    }
  },
  {
    id: 5,
    title: "DevOps Engineer", 
    company: "CloudTech Systems",
    location: "Seattle, WA",
    salary: "$100,000 - $130,000",
    type: "Full-time",
    posted: "1 week ago",
    description: "We need a DevOps Engineer to manage our cloud infrastructure and deployment pipelines. You'll work with containerization, CI/CD systems, and monitoring tools to ensure reliable and scalable applications.",
    requirements: ["AWS/Azure experience", "Docker & Kubernetes", "CI/CD pipeline setup", "Infrastructure as Code", "Monitoring tools"],
    benefits: ["Remote work flexibility", "Tech equipment budget", "Professional certifications", "Health benefits", "Team retreats"],
    companyInfo: {
      name: "CloudTech Systems",
      size: "300-500 employees",
      industry: "Cloud Services",
      description: "Cloud infrastructure company providing scalable solutions."
    }
  },
  {
    id: 6,
    title: "Content Writer",
    company: "Content Creators LLC",
    location: "Chicago, IL", 
    salary: "$55,000 - $70,000",
    type: "Full-time",
    posted: "5 days ago",
    description: "Create engaging content across multiple platforms and formats. You'll research topics, write articles, manage content calendars, and collaborate with marketing teams to develop compelling brand narratives.",
    requirements: ["Excellent writing skills", "SEO knowledge", "Content management systems", "Social media experience", "Research abilities"],
    benefits: ["Creative freedom", "Work-life balance", "Professional development", "Health insurance", "Collaborative environment"],
    companyInfo: {
      name: "Content Creators LLC",
      size: "10-50 employees",
      industry: "Content & Media",
      description: "Content creation agency specializing in digital storytelling."
    }
  },
  {
    id: 7,
    title: "Sales Representative",
    company: "SalesForce Pro",
    location: "Miami, FL",
    salary: "$60,000 - $90,000 + Commission",
    type: "Full-time", 
    posted: "1 week ago",
    description: "Drive revenue growth as a Sales Representative. You'll prospect new clients, manage existing relationships, and close deals while working with our innovative sales tools and processes.",
    requirements: ["Sales experience", "CRM software knowledge", "Communication skills", "Negotiation abilities", "Goal-oriented mindset"],
    benefits: ["Commission structure", "Sales incentives", "Travel opportunities", "Training programs", "Career progression"],
    companyInfo: {
      name: "SalesForce Pro", 
      size: "100-200 employees",
      industry: "Sales & Business Development",
      description: "Sales consulting firm helping businesses grow their revenue."
    }
  },
  {
    id: 8,
    title: "Customer Success Manager",
    company: "Service Excellence Inc",
    location: "Denver, CO",
    salary: "$70,000 - $85,000",
    type: "Full-time",
    posted: "3 days ago",
    description: "Ensure customer satisfaction and retention as a Customer Success Manager. You'll onboard new clients, provide ongoing support, and identify opportunities for account growth and expansion.",
    requirements: ["Customer service experience", "Account management", "Communication skills", "Problem-solving abilities", "CRM proficiency"],
    benefits: ["Performance bonuses", "Professional development", "Flexible hours", "Health benefits", "Team building"],
    companyInfo: {
      name: "Service Excellence Inc",
      size: "50-100 employees", 
      industry: "Customer Service",
      description: "Customer success consultancy focused on client satisfaction."
    }
  }
];

const sampleCompanies = [
  {name: "TechCorp Solutions", logo: "TC", industry: "Technology"},
  {name: "BrandForce Inc", logo: "BF", industry: "Marketing"},
  {name: "Design Studio Pro", logo: "DS", industry: "Design"},
  {name: "Analytics Corp", logo: "AC", industry: "Analytics"},
  {name: "CloudTech Systems", logo: "CT", industry: "Cloud Services"},
  {name: "Content Creators LLC", logo: "CC", industry: "Content"},
  {name: "SalesForce Pro", logo: "SP", industry: "Sales"},
  {name: "Service Excellence Inc", logo: "SE", industry: "Customer Service"}
];

const jobCategories = ["Technology", "Marketing", "Design", "Data Science", "DevOps", "Content", "Sales", "Customer Service", "Engineering", "Finance", "HR", "Operations"];
const locations = ["San Francisco, CA", "New York, NY", "Remote", "Austin, TX", "Seattle, WA", "Chicago, IL", "Miami, FL", "Denver, CO", "Los Angeles, CA", "Boston, MA"];
const jobTypes = ["Full-time", "Part-time", "Contract", "Internship", "Remote", "Hybrid"];
const experienceLevels = ["Entry Level", "Mid Level", "Senior Level", "Executive"];
const salaryRanges = ["Under $50k", "$50k - $75k", "$75k - $100k", "$100k - $125k", "$125k - $150k", "Over $150k"];

// Safe localStorage wrapper
const safeLocalStorage = {
  getItem: (key) => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn('localStorage getItem failed:', error);
      return null;
    }
  },
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn('localStorage setItem failed:', error);
    }
  },
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('localStorage removeItem failed:', error);
    }
  }
};

// Auth Context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const savedUser = safeLocalStorage.getItem('user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.warn('Failed to parse saved user:', error);
      setError('Failed to load user data');
    }
  }, []);

  const login = (userData) => {
    try {
      setUser(userData);
      safeLocalStorage.setItem('user', JSON.stringify(userData));
      setError(null);
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed');
    }
  };

  const logout = () => {
    try {
      setUser(null);
      safeLocalStorage.removeItem('user');
      setError(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const value = {
    user,
    login,
    logout,
    loading,
    error
  };

  return React.createElement(AuthContext.Provider, { value }, children);
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return React.createElement('div', { 
        style: { 
          padding: '48px 24px', 
          textAlign: 'center',
          backgroundColor: 'var(--color-background)',
          color: 'var(--color-text)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        } 
      },
        React.createElement('h1', { style: { marginBottom: '16px' } }, 'Something went wrong'),
        React.createElement('p', { style: { marginBottom: '24px' } }, 'Please refresh the page to try again.'),
        React.createElement('button', {
          className: 'btn btn--primary',
          onClick: () => window.location.reload()
        }, 'Refresh Page')
      );
    }

    return this.props.children;
  }
}

// Components
const Header = ({ onAuthClick, currentView, setCurrentView }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleNavClick = (view, e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Navigating to:', view);
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  return React.createElement('header', { className: 'header' },
    React.createElement('nav', { className: 'nav' },
      React.createElement('a', { 
        href: '#', 
        className: 'logo',
        onClick: (e) => handleNavClick('home', e)
      }, 'JobBoard Pro'),
      React.createElement('button', {
        className: 'mobile-menu-toggle',
        onClick: () => setMobileMenuOpen(!mobileMenuOpen)
      }, '☰'),
      React.createElement('ul', { 
        className: `nav-links ${mobileMenuOpen ? 'show' : ''}` 
      },
        React.createElement('li', null, 
          React.createElement('a', { 
            href: '#home', 
            className: currentView === 'home' ? 'active' : '',
            onClick: (e) => handleNavClick('home', e)
          }, 'Home')
        ),
        React.createElement('li', null,
          React.createElement('a', { 
            href: '#jobs',
            className: currentView === 'jobs' ? 'active' : '',
            onClick: (e) => handleNavClick('jobs', e)
          }, 'Jobs')
        ),
        React.createElement('li', null,
          React.createElement('a', { 
            href: '#companies',
            className: currentView === 'companies' ? 'active' : '',
            onClick: (e) => handleNavClick('companies', e)
          }, 'Companies')
        ),
        user ? [
          React.createElement('li', { key: 'dashboard' },
            React.createElement('a', { 
              href: '#dashboard',
              className: currentView === 'dashboard' ? 'active' : '',
              onClick: (e) => handleNavClick('dashboard', e)
            }, 'Dashboard')
          ),
          React.createElement('li', { key: 'logout' },
            React.createElement('button', {
              className: 'btn btn--secondary btn--sm',
              onClick: (e) => {
                e.preventDefault();
                e.stopPropagation();
                logout();
              }
            }, 'Logout')
          )
        ] : React.createElement('li', { key: 'login' },
          React.createElement('button', {
            className: 'btn btn--primary btn--sm',
            onClick: (e) => {
              e.preventDefault();
              e.stopPropagation();
              onAuthClick();
            }
          }, 'Login / Register')
        )
      )
    )
  );
};

const Hero = ({ onSearch, setCurrentView }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Searching for:', searchTerm, location);
    onSearch(searchTerm, location);
  };

  return React.createElement('section', { className: 'hero' },
    React.createElement('div', { className: 'hero-content' },
      React.createElement('h1', null, 'Find Your Dream Job Today'),
      React.createElement('p', null, 'Discover thousands of job opportunities from top companies worldwide'),
      React.createElement('form', { className: 'search-form', onSubmit: handleSearch },
        React.createElement('input', {
          type: 'text',
          placeholder: 'Job title, keywords, or company',
          className: 'search-input',
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value)
        }),
        React.createElement('input', {
          type: 'text',
          placeholder: 'Location',
          className: 'search-input',
          value: location,
          onChange: (e) => setLocation(e.target.value)
        }),
        React.createElement('button', {
          type: 'submit',
          className: 'btn btn--primary'
        }, 'Search Jobs')
      ),
      React.createElement('div', { className: 'hero-actions' },
        React.createElement('button', { 
          className: 'btn btn--secondary',
          onClick: (e) => {
            e.preventDefault();
            e.stopPropagation();
            setCurrentView('post-job');
          }
        }, 'Post a Job'),
        React.createElement('button', { 
          className: 'btn btn--outline',
          onClick: (e) => {
            e.preventDefault();
            e.stopPropagation();
            setCurrentView('companies');
          }
        }, 'Browse Companies')
      )
    )
  );
};

const Stats = () => {
  return React.createElement('section', { className: 'stats' },
    React.createElement('div', { className: 'stat-card' },
      React.createElement('h3', null, '10,000+'),
      React.createElement('p', null, 'Active Jobs')
    ),
    React.createElement('div', { className: 'stat-card' },
      React.createElement('h3', null, '500+'),
      React.createElement('p', null, 'Companies')
    ),
    React.createElement('div', { className: 'stat-card' },
      React.createElement('h3', null, '50,000+'),
      React.createElement('p', null, 'Job Seekers')
    ),
    React.createElement('div', { className: 'stat-card' },
      React.createElement('h3', null, '95%'),
      React.createElement('p', null, 'Success Rate')
    )
  );
};

const JobCard = ({ job, onClick, onSave, saved = false }) => {
  const companyLogo = sampleCompanies.find(c => c.name === job.company)?.logo || 'JB';

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Job card clicked:', job.title);
    onClick(job);
  };

  return React.createElement('div', {
    className: 'job-card',
    onClick: handleClick
  },
    React.createElement('div', { className: 'job-card-header' },
      React.createElement('div', { className: 'company-logo' }, companyLogo),
      React.createElement('div', { className: 'job-info' },
        React.createElement('h3', null, job.title),
        React.createElement('p', { className: 'company' }, job.company)
      )
    ),
    React.createElement('div', { className: 'job-details' },
      React.createElement('div', { className: 'job-detail' },
        React.createElement('span', null, '📍 '), job.location
      ),
      React.createElement('div', { className: 'job-detail' },
        React.createElement('span', null, '💰 '), job.salary
      ),
      React.createElement('div', { className: 'job-detail' },
        React.createElement('span', null, '⏰ '), job.type
      ),
      React.createElement('div', { className: 'job-detail' },
        React.createElement('span', null, '📅 '), job.posted
      )
    ),
    React.createElement('div', { className: 'job-tags' },
      React.createElement('span', { className: 'job-tag' }, job.type),
      React.createElement('span', { className: 'job-tag' }, job.companyInfo?.industry || 'Technology')
    ),
    onSave && React.createElement('button', {
      className: `btn ${saved ? 'btn--primary' : 'btn--outline'} btn--sm`,
      style: { marginTop: '12px' },
      onClick: (e) => {
        e.stopPropagation();
        e.preventDefault();
        onSave(job.id);
      }
    }, saved ? '❤️ Saved' : '🤍 Save')
  );
};

const CompanyCard = ({ company }) => {
  return React.createElement('div', { className: 'card' },
    React.createElement('div', { className: 'card__body' },
      React.createElement('div', { className: 'job-card-header' },
        React.createElement('div', { className: 'company-logo' }, company.logo),
        React.createElement('div', { className: 'job-info' },
          React.createElement('h3', null, company.name),
          React.createElement('p', { className: 'company' }, company.industry)
        )
      ),
      React.createElement('p', null, `View open positions at ${company.name}`),
      React.createElement('button', { className: 'btn btn--outline btn--sm' }, 'View Jobs')
    )
  );
};

const FilterSidebar = ({ filters, onFilterChange }) => {
  return React.createElement('aside', { className: 'filters-sidebar' },
    React.createElement('h3', null, 'Filters'),
    
    React.createElement('div', { className: 'filter-group' },
      React.createElement('h4', null, 'Job Type'),
      React.createElement('div', { className: 'filter-options' },
        jobTypes.map(type =>
          React.createElement('div', { key: type, className: 'filter-option' },
            React.createElement('input', {
              type: 'checkbox',
              id: `type-${type}`,
              checked: filters.types?.includes(type) || false,
              onChange: (e) => onFilterChange('types', type, e.target.checked)
            }),
            React.createElement('label', { htmlFor: `type-${type}` }, type)
          )
        )
      )
    ),

    React.createElement('div', { className: 'filter-group' },
      React.createElement('h4', null, 'Location'),
      React.createElement('div', { className: 'filter-options' },
        locations.slice(0, 6).map(location =>
          React.createElement('div', { key: location, className: 'filter-option' },
            React.createElement('input', {
              type: 'checkbox',
              id: `loc-${location}`,
              checked: filters.locations?.includes(location) || false,
              onChange: (e) => onFilterChange('locations', location, e.target.checked)
            }),
            React.createElement('label', { htmlFor: `loc-${location}` }, location)
          )
        )
      )
    ),

    React.createElement('div', { className: 'filter-group' },
      React.createElement('h4', null, 'Experience Level'),
      React.createElement('div', { className: 'filter-options' },
        experienceLevels.map(level =>
          React.createElement('div', { key: level, className: 'filter-option' },
            React.createElement('input', {
              type: 'checkbox',
              id: `exp-${level}`,
              checked: filters.experienceLevels?.includes(level) || false,
              onChange: (e) => onFilterChange('experienceLevels', level, e.target.checked)
            }),
            React.createElement('label', { htmlFor: `exp-${level}` }, level)
          )
        )
      )
    )
  );
};

const JobDetail = ({ job, onBack, onApply }) => {
  const companyLogo = sampleCompanies.find(c => c.name === job.company)?.logo || 'JB';

  return React.createElement('div', { className: 'job-detail' },
    React.createElement('button', {
      className: 'btn btn--outline btn--sm',
      onClick: (e) => {
        e.preventDefault();
        e.stopPropagation();
        onBack();
      },
      style: { marginBottom: '24px' }
    }, '← Back to Jobs'),

    React.createElement('div', { className: 'card' },
      React.createElement('div', { className: 'card__body' },
        React.createElement('div', { className: 'job-card-header' },
          React.createElement('div', { className: 'company-logo' }, companyLogo),
          React.createElement('div', { className: 'job-info' },
            React.createElement('h1', null, job.title),
            React.createElement('p', { className: 'company' }, job.company)
          )
        ),

        React.createElement('div', { className: 'job-details', style: { marginBottom: '24px' } },
          React.createElement('div', { className: 'job-detail' },
            React.createElement('span', null, '📍 '), job.location
          ),
          React.createElement('div', { className: 'job-detail' },
            React.createElement('span', null, '💰 '), job.salary
          ),
          React.createElement('div', { className: 'job-detail' },
            React.createElement('span', null, '⏰ '), job.type
          ),
          React.createElement('div', { className: 'job-detail' },
            React.createElement('span', null, '📅 '), job.posted
          )
        ),

        React.createElement('button', {
          className: 'btn btn--primary btn--lg',
          onClick: (e) => {
            e.preventDefault();
            e.stopPropagation();
            onApply(job);
          },
          style: { marginBottom: '32px' }
        }, 'Apply Now'),

        React.createElement('div', { style: { marginBottom: '32px' } },
          React.createElement('h3', null, 'Job Description'),
          React.createElement('p', null, job.description)
        ),

        React.createElement('div', { style: { marginBottom: '32px' } },
          React.createElement('h3', null, 'Requirements'),
          React.createElement('ul', null,
            job.requirements.map((req, index) =>
              React.createElement('li', { key: index }, req)
            )
          )
        ),

        React.createElement('div', { style: { marginBottom: '32px' } },
          React.createElement('h3', null, 'Benefits'),
          React.createElement('ul', null,
            job.benefits.map((benefit, index) =>
              React.createElement('li', { key: index }, benefit)
            )
          )
        ),

        React.createElement('div', { className: 'card', style: { background: 'var(--color-bg-2)' } },
          React.createElement('div', { className: 'card__body' },
            React.createElement('h3', null, 'About ', job.company),
            React.createElement('p', null, job.companyInfo.description),
            React.createElement('div', { className: 'job-details' },
              React.createElement('div', { className: 'job-detail' },
                React.createElement('span', null, '👥 '), job.companyInfo.size
              ),
              React.createElement('div', { className: 'job-detail' },
                React.createElement('span', null, '🏢 '), job.companyInfo.industry
              )
            )
          )
        )
      )
    )
  );
};

const AuthModal = ({ isOpen, onClose, onAuth }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('candidate');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    company: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      id: Date.now(),
      email: formData.email,
      name: formData.name,
      type: userType,
      company: userType === 'employer' ? formData.company : null
    };
    onAuth(userData);
    onClose();
    setFormData({ email: '', password: '', name: '', company: '' });
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return React.createElement('div', { className: 'modal' },
    React.createElement('div', { className: 'modal-content' },
      React.createElement('div', { className: 'modal-header' },
        React.createElement('h2', { className: 'modal-title' }, 
          isLogin ? 'Login' : 'Create Account'
        ),
        React.createElement('button', {
          className: 'modal-close',
          onClick: (e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }
        }, '×')
      ),

      React.createElement('form', { onSubmit: handleSubmit },
        !isLogin && React.createElement('div', { className: 'form-group' },
          React.createElement('label', { className: 'form-label' }, 'I am a:'),
          React.createElement('div', { style: { display: 'flex', gap: '16px' } },
            React.createElement('label', null,
              React.createElement('input', {
                type: 'radio',
                name: 'userType',
                value: 'candidate',
                checked: userType === 'candidate',
                onChange: (e) => setUserType(e.target.value)
              }),
              ' Job Seeker'
            ),
            React.createElement('label', null,
              React.createElement('input', {
                type: 'radio',
                name: 'userType', 
                value: 'employer',
                checked: userType === 'employer',
                onChange: (e) => setUserType(e.target.value)
              }),
              ' Employer'
            )
          )
        ),

        !isLogin && React.createElement('div', { className: 'form-group' },
          React.createElement('label', { className: 'form-label' }, 'Full Name'),
          React.createElement('input', {
            type: 'text',
            className: 'form-control',
            value: formData.name,
            onChange: (e) => handleChange('name', e.target.value),
            required: true
          })
        ),

        !isLogin && userType === 'employer' && React.createElement('div', { className: 'form-group' },
          React.createElement('label', { className: 'form-label' }, 'Company Name'),
          React.createElement('input', {
            type: 'text',
            className: 'form-control',
            value: formData.company,
            onChange: (e) => handleChange('company', e.target.value),
            required: true
          })
        ),

        React.createElement('div', { className: 'form-group' },
          React.createElement('label', { className: 'form-label' }, 'Email'),
          React.createElement('input', {
            type: 'email',
            className: 'form-control',
            value: formData.email,
            onChange: (e) => handleChange('email', e.target.value),
            required: true
          })
        ),

        React.createElement('div', { className: 'form-group' },
          React.createElement('label', { className: 'form-label' }, 'Password'),
          React.createElement('input', {
            type: 'password',
            className: 'form-control',
            value: formData.password,
            onChange: (e) => handleChange('password', e.target.value),
            required: true
          })
        ),

        React.createElement('button', {
          type: 'submit',
          className: 'btn btn--primary btn--full-width',
          style: { marginBottom: '16px' }
        }, isLogin ? 'Login' : 'Create Account'),

        React.createElement('p', { style: { textAlign: 'center' } },
          isLogin ? "Don't have an account? " : "Already have an account? ",
          React.createElement('button', {
            type: 'button',
            style: { background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer' },
            onClick: (e) => {
              e.preventDefault();
              setIsLogin(!isLogin);
            }
          }, isLogin ? 'Sign up' : 'Login')
        )
      )
    )
  );
};

const ApplicationModal = ({ isOpen, job, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    coverLetter: '',
    resume: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      jobId: job.id,
      appliedAt: new Date().toISOString()
    });
    onClose();
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      coverLetter: '',
      resume: null
    });
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen || !job) return null;

  return React.createElement('div', { className: 'modal' },
    React.createElement('div', { className: 'modal-content' },
      React.createElement('div', { className: 'modal-header' },
        React.createElement('h2', { className: 'modal-title' }, 
          'Apply for ', job.title
        ),
        React.createElement('button', {
          className: 'modal-close',
          onClick: (e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }
        }, '×')
      ),

      React.createElement('form', { onSubmit: handleSubmit },
        React.createElement('div', { className: 'form-row' },
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { className: 'form-label' }, 'First Name'),
            React.createElement('input', {
              type: 'text',
              className: 'form-control',
              value: formData.firstName,
              onChange: (e) => handleChange('firstName', e.target.value),
              required: true
            })
          ),
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { className: 'form-label' }, 'Last Name'),
            React.createElement('input', {
              type: 'text',
              className: 'form-control',
              value: formData.lastName,
              onChange: (e) => handleChange('lastName', e.target.value),
              required: true
            })
          )
        ),

        React.createElement('div', { className: 'form-row' },
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { className: 'form-label' }, 'Email'),
            React.createElement('input', {
              type: 'email',
              className: 'form-control',
              value: formData.email,
              onChange: (e) => handleChange('email', e.target.value),
              required: true
            })
          ),
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { className: 'form-label' }, 'Phone'),
            React.createElement('input', {
              type: 'tel',
              className: 'form-control',
              value: formData.phone,
              onChange: (e) => handleChange('phone', e.target.value),
              required: true
            })
          )
        ),

        React.createElement('div', { className: 'form-group' },
          React.createElement('label', { className: 'form-label' }, 'Resume'),
          React.createElement('div', { className: 'file-upload' },
            React.createElement('input', {
              type: 'file',
              accept: '.pdf,.doc,.docx',
              onChange: (e) => handleChange('resume', e.target.files[0])
            }),
            React.createElement('div', { className: 'file-upload-label' },
              React.createElement('span', null, '📄 '),
              formData.resume ? formData.resume.name : 'Choose resume file (PDF, DOC, DOCX)'
            )
          )
        ),

        React.createElement('div', { className: 'form-group' },
          React.createElement('label', { className: 'form-label' }, 'Cover Letter'),
          React.createElement('textarea', {
            className: 'form-control',
            rows: 6,
            placeholder: 'Tell us why you\'re perfect for this role...',
            value: formData.coverLetter,
            onChange: (e) => handleChange('coverLetter', e.target.value)
          })
        ),

        React.createElement('div', { style: { display: 'flex', gap: '12px' } },
          React.createElement('button', {
            type: 'button',
            className: 'btn btn--outline',
            onClick: (e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }
          }, 'Cancel'),
          React.createElement('button', {
            type: 'submit',
            className: 'btn btn--primary'
          }, 'Submit Application')
        )
      )
    )
  );
};

const Dashboard = ({ userType }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [postedJobs, setPostedJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    try {
      const savedPostedJobs = safeLocalStorage.getItem('postedJobs');
      const savedApplications = safeLocalStorage.getItem('applications');
      const savedSavedJobs = safeLocalStorage.getItem('savedJobs');
      
      if (savedPostedJobs) setPostedJobs(JSON.parse(savedPostedJobs));
      if (savedApplications) setApplications(JSON.parse(savedApplications));
      if (savedSavedJobs) setSavedJobs(JSON.parse(savedSavedJobs));
    } catch (error) {
      console.warn('Failed to load dashboard data:', error);
    }
  }, []);

  const employerTabs = [
    { id: 'overview', label: '📊 Overview' },
    { id: 'post-job', label: '➕ Post Job' },
    { id: 'manage-jobs', label: '📋 Manage Jobs' },
    { id: 'applications', label: '📄 Applications' },
    { id: 'profile', label: '👤 Profile' }
  ];

  const candidateTabs = [
    { id: 'overview', label: '📊 Overview' },
    { id: 'profile', label: '👤 Profile' },
    { id: 'applications', label: '📄 My Applications' },
    { id: 'saved-jobs', label: '❤️ Saved Jobs' },
    { id: 'job-alerts', label: '🔔 Job Alerts' }
  ];

  const tabs = userType === 'employer' ? employerTabs : candidateTabs;

  const PostJobForm = () => {
    const [jobData, setJobData] = useState({
      title: '',
      company: user?.company || '',
      location: '',
      salary: '',
      type: 'Full-time',
      description: '',
      requirements: '',
      benefits: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      const newJob = {
        ...jobData,
        id: Date.now(),
        posted: 'Just now',
        requirements: jobData.requirements.split('\n').filter(r => r.trim()),
        benefits: jobData.benefits.split('\n').filter(b => b.trim()),
        companyInfo: {
          name: jobData.company,
          size: '50-100 employees',
          industry: 'Technology',
          description: 'Innovative company focused on growth.'
        }
      };
      
      const updatedJobs = [...postedJobs, newJob];
      setPostedJobs(updatedJobs);
      safeLocalStorage.setItem('postedJobs', JSON.stringify(updatedJobs));
      
      setJobData({
        title: '',
        company: user?.company || '',
        location: '',
        salary: '',
        type: 'Full-time',
        description: '',
        requirements: '',
        benefits: ''
      });
      
      alert('Job posted successfully!');
    };

    return React.createElement('form', { onSubmit: handleSubmit },
      React.createElement('h3', null, 'Post a New Job'),
      React.createElement('div', { className: 'form-row' },
        React.createElement('div', { className: 'form-group' },
          React.createElement('label', { className: 'form-label' }, 'Job Title'),
          React.createElement('input', {
            type: 'text',
            className: 'form-control',
            value: jobData.title,
            onChange: (e) => setJobData({...jobData, title: e.target.value}),
            required: true
          })
        ),
        React.createElement('div', { className: 'form-group' },
          React.createElement('label', { className: 'form-label' }, 'Company'),
          React.createElement('input', {
            type: 'text',
            className: 'form-control',
            value: jobData.company,
            onChange: (e) => setJobData({...jobData, company: e.target.value}),
            required: true
          })
        )
      ),
      React.createElement('div', { className: 'form-row' },
        React.createElement('div', { className: 'form-group' },
          React.createElement('label', { className: 'form-label' }, 'Location'),
          React.createElement('input', {
            type: 'text',
            className: 'form-control',
            value: jobData.location,
            onChange: (e) => setJobData({...jobData, location: e.target.value}),
            required: true
          })
        ),
        React.createElement('div', { className: 'form-group' },
          React.createElement('label', { className: 'form-label' }, 'Salary Range'),
          React.createElement('input', {
            type: 'text',
            className: 'form-control',
            placeholder: '$80,000 - $120,000',
            value: jobData.salary,
            onChange: (e) => setJobData({...jobData, salary: e.target.value}),
            required: true
          })
        )
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('label', { className: 'form-label' }, 'Job Type'),
        React.createElement('select', {
          className: 'form-control',
          value: jobData.type,
          onChange: (e) => setJobData({...jobData, type: e.target.value})
        },
          jobTypes.map(type =>
            React.createElement('option', { key: type, value: type }, type)
          )
        )
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('label', { className: 'form-label' }, 'Job Description'),
        React.createElement('textarea', {
          className: 'form-control',
          rows: 6,
          value: jobData.description,
          onChange: (e) => setJobData({...jobData, description: e.target.value}),
          required: true
        })
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('label', { className: 'form-label' }, 'Requirements (one per line)'),
        React.createElement('textarea', {
          className: 'form-control',
          rows: 4,
          placeholder: '5+ years experience\nBachelor\'s degree\nReact expertise',
          value: jobData.requirements,
          onChange: (e) => setJobData({...jobData, requirements: e.target.value})
        })
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('label', { className: 'form-label' }, 'Benefits (one per line)'),
        React.createElement('textarea', {
          className: 'form-control',
          rows: 4,
          placeholder: 'Health insurance\n401k matching\nRemote work options',
          value: jobData.benefits,
          onChange: (e) => setJobData({...jobData, benefits: e.target.value})
        })
      ),
      React.createElement('button', {
        type: 'submit',
        className: 'btn btn--primary btn--lg'
      }, 'Post Job')
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        if (userType === 'employer') {
          return React.createElement('div', null,
            React.createElement('h3', null, 'Employer Overview'),
            React.createElement('div', { className: 'stats' },
              React.createElement('div', { className: 'stat-card' },
                React.createElement('h3', null, postedJobs.length),
                React.createElement('p', null, 'Jobs Posted')
              ),
              React.createElement('div', { className: 'stat-card' },
                React.createElement('h3', null, applications.length),
                React.createElement('p', null, 'Applications Received')
              ),
              React.createElement('div', { className: 'stat-card' },
                React.createElement('h3', null, '12'),
                React.createElement('p', null, 'Active Jobs')
              )
            )
          );
        } else {
          return React.createElement('div', null,
            React.createElement('h3', null, 'Candidate Overview'),
            React.createElement('div', { className: 'stats' },
              React.createElement('div', { className: 'stat-card' },
                React.createElement('h3', null, applications.length),
                React.createElement('p', null, 'Applications Sent')
              ),
              React.createElement('div', { className: 'stat-card' },
                React.createElement('h3', null, savedJobs.length),
                React.createElement('p', null, 'Saved Jobs')
              ),
              React.createElement('div', { className: 'stat-card' },
                React.createElement('h3', null, '85%'),
                React.createElement('p', null, 'Profile Complete')
              )
            )
          );
        }
      
      case 'post-job':
        return React.createElement(PostJobForm);
      
      case 'manage-jobs':
        return React.createElement('div', null,
          React.createElement('h3', null, 'Manage Jobs'),
          postedJobs.length === 0 ? 
            React.createElement('div', { className: 'empty-state' },
              React.createElement('h3', null, 'No jobs posted yet'),
              React.createElement('p', null, 'Start by posting your first job!')
            ) :
            React.createElement('div', { className: 'jobs-grid' },
              postedJobs.map(job =>
                React.createElement(JobCard, {
                  key: job.id,
                  job: job,
                  onClick: () => {},
                })
              )
            )
        );
      
      case 'applications':
        if (userType === 'employer') {
          return React.createElement('div', null,
            React.createElement('h3', null, 'Received Applications'),
            applications.length === 0 ?
              React.createElement('div', { className: 'empty-state' },
                React.createElement('h3', null, 'No applications yet'),
                React.createElement('p', null, 'Applications will appear here when candidates apply to your jobs.')
              ) :
              React.createElement('div', null,
                applications.map((app, index) =>
                  React.createElement('div', { key: index, className: 'card', style: { marginBottom: '16px' } },
                    React.createElement('div', { className: 'card__body' },
                      React.createElement('h4', null, `${app.firstName} ${app.lastName}`),
                      React.createElement('p', null, 'Applied for: ', app.jobTitle),
                      React.createElement('p', null, 'Email: ', app.email),
                      React.createElement('p', null, 'Phone: ', app.phone),
                      React.createElement('div', { style: { display: 'flex', gap: '12px' } },
                        React.createElement('button', { className: 'btn btn--primary btn--sm' }, 'View Resume'),
                        React.createElement('button', { className: 'btn btn--secondary btn--sm' }, 'Contact'),
                        React.createElement('button', { className: 'btn btn--outline btn--sm' }, 'Reject')
                      )
                    )
                  )
                )
              )
          );
        } else {
          return React.createElement('div', null,
            React.createElement('h3', null, 'My Applications'),
            applications.length === 0 ?
              React.createElement('div', { className: 'empty-state' },
                React.createElement('h3', null, 'No applications yet'),
                React.createElement('p', null, 'Start applying to jobs to see your applications here.')
              ) :
              React.createElement('div', null,
                applications.map((app, index) =>
                  React.createElement('div', { key: index, className: 'card', style: { marginBottom: '16px' } },
                    React.createElement('div', { className: 'card__body' },
                      React.createElement('h4', null, app.jobTitle),
                      React.createElement('p', null, 'Company: ', app.company),
                      React.createElement('p', null, 'Applied: ', new Date(app.appliedAt).toLocaleDateString()),
                      React.createElement('span', { className: 'status status--info' }, 'Under Review')
                    )
                  )
                )
              )
          );
        }
      
      case 'saved-jobs':
        return React.createElement('div', null,
          React.createElement('h3', null, 'Saved Jobs'),
          savedJobs.length === 0 ?
            React.createElement('div', { className: 'empty-state' },
              React.createElement('h3', null, 'No saved jobs'),
              React.createElement('p', null, 'Save jobs you\'re interested in to view them here.')
            ) :
            React.createElement('div', { className: 'jobs-grid' },
              savedJobs.map(jobId => {
                const job = sampleJobs.find(j => j.id === jobId);
                return job ? React.createElement(JobCard, {
                  key: job.id,
                  job: job,
                  onClick: () => {},
                  saved: true
                }) : null;
              })
            )
        );
      
      case 'profile':
        return React.createElement('div', null,
          React.createElement('h3', null, 'Profile Settings'),
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { className: 'form-label' }, 'Name'),
            React.createElement('input', {
              type: 'text',
              className: 'form-control',
              value: user?.name || '',
              readOnly: true
            })
          ),
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { className: 'form-label' }, 'Email'),
            React.createElement('input', {
              type: 'email',
              className: 'form-control',
              value: user?.email || '',
              readOnly: true
            })
          ),
          userType === 'employer' && React.createElement('div', { className: 'form-group' },
            React.createElement('label', { className: 'form-label' }, 'Company'),
            React.createElement('input', {
              type: 'text',
              className: 'form-control',
              value: user?.company || '',
              readOnly: true
            })
          )
        );
      
      case 'job-alerts':
        return React.createElement('div', null,
          React.createElement('h3', null, 'Job Alerts'),
          React.createElement('p', null, 'Get notified when new jobs match your preferences.'),
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { className: 'form-label' }, 'Keywords'),
            React.createElement('input', {
              type: 'text',
              className: 'form-control',
              placeholder: 'React, Frontend, JavaScript'
            })
          ),
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { className: 'form-label' }, 'Location'),
            React.createElement('input', {
              type: 'text',
              className: 'form-control',
              placeholder: 'San Francisco, Remote'
            })
          ),
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { className: 'form-label' }, 'Frequency'),
            React.createElement('select', { className: 'form-control' },
              React.createElement('option', null, 'Daily'),
              React.createElement('option', null, 'Weekly'),
              React.createElement('option', null, 'Monthly')
            )
          ),
          React.createElement('button', { className: 'btn btn--primary' }, 'Save Alert')
        );
      
      default:
        return React.createElement('div', null, 'Tab content not found');
    }
  };

  return React.createElement('div', { className: 'dashboard' },
    React.createElement('aside', { className: 'dashboard-sidebar' },
      React.createElement('h3', null, userType === 'employer' ? 'Employer Dashboard' : 'Candidate Dashboard'),
      React.createElement('nav', null,
        React.createElement('ul', { className: 'dashboard-nav' },
          tabs.map(tab =>
            React.createElement('li', { key: tab.id },
              React.createElement('a', {
                href: '#',
                className: activeTab === tab.id ? 'active' : '',
                onClick: (e) => {
                  e.preventDefault();
                  setActiveTab(tab.id);
                }
              }, tab.label)
            )
          )
        )
      )
    ),
    React.createElement('div', { className: 'dashboard-content' },
      renderTabContent()
    )
  );
};

const Footer = () => {
  return React.createElement('footer', { className: 'footer' },
    React.createElement('div', { className: 'footer-content' },
      React.createElement('div', { className: 'footer-section' },
        React.createElement('h4', null, 'For Job Seekers'),
        React.createElement('ul', null,
          React.createElement('li', null, React.createElement('a', { href: '#' }, 'Browse Jobs')),
          React.createElement('li', null, React.createElement('a', { href: '#' }, 'Career Advice')),
          React.createElement('li', null, React.createElement('a', { href: '#' }, 'Resume Builder')),
          React.createElement('li', null, React.createElement('a', { href: '#' }, 'Salary Guide'))
        )
      ),
      React.createElement('div', { className: 'footer-section' },
        React.createElement('h4', null, 'For Employers'),
        React.createElement('ul', null,
          React.createElement('li', null, React.createElement('a', { href: '#' }, 'Post Jobs')),
          React.createElement('li', null, React.createElement('a', { href: '#' }, 'Search Resumes')),
          React.createElement('li', null, React.createElement('a', { href: '#' }, 'Pricing')),
          React.createElement('li', null, React.createElement('a', { href: '#' }, 'Hiring Solutions'))
        )
      ),
      React.createElement('div', { className: 'footer-section' },
        React.createElement('h4', null, 'Company'),
        React.createElement('ul', null,
          React.createElement('li', null, React.createElement('a', { href: '#' }, 'About Us')),
          React.createElement('li', null, React.createElement('a', { href: '#' }, 'Contact')),
          React.createElement('li', null, React.createElement('a', { href: '#' }, 'Privacy Policy')),
          React.createElement('li', null, React.createElement('a', { href: '#' }, 'Terms of Service'))
        )
      )
    ),
    React.createElement('div', { className: 'footer-bottom' },
      React.createElement('p', null, '© 2025 JobBoard Pro. All rights reserved.')
    )
  );
};

// Main App Component
const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [filters, setFilters] = useState({});
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [applicationJob, setApplicationJob] = useState(null);
  const [filteredJobs, setFilteredJobs] = useState(sampleJobs);
  const [savedJobs, setSavedJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const { user, login, loading } = useAuth();

  useEffect(() => {
    try {
      const saved = safeLocalStorage.getItem('savedJobs');
      const apps = safeLocalStorage.getItem('applications');
      if (saved) setSavedJobs(JSON.parse(saved));
      if (apps) setApplications(JSON.parse(apps));
    } catch (error) {
      console.warn('Failed to load saved data:', error);
    }
  }, []);

  useEffect(() => {
    let jobs = sampleJobs;

    // Apply search filter
    if (searchTerm) {
      jobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply location filter
    if (locationFilter) {
      jobs = jobs.filter(job =>
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    // Apply other filters
    if (filters.types?.length > 0) {
      jobs = jobs.filter(job => filters.types.includes(job.type));
    }

    if (filters.locations?.length > 0) {
      jobs = jobs.filter(job => 
        filters.locations.some(loc => job.location.includes(loc))
      );
    }

    setFilteredJobs(jobs);
  }, [searchTerm, locationFilter, filters]);

  const handleSearch = (term, location) => {
    console.log('Handling search:', term, location);
    setSearchTerm(term);
    setLocationFilter(location);
    setCurrentView('jobs');
  };

  const handleFilterChange = (filterType, value, checked) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      if (!newFilters[filterType]) {
        newFilters[filterType] = [];
      }
      
      if (checked) {
        newFilters[filterType] = [...newFilters[filterType], value];
      } else {
        newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
      }
      
      return newFilters;
    });
  };

  const handleJobClick = (job) => {
    console.log('Handling job click:', job.title);
    setSelectedJob(job);
    setCurrentView('job-detail');
  };

  const handleApply = (job) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    setApplicationJob(job);
    setIsApplicationModalOpen(true);
  };

  const handleApplicationSubmit = (applicationData) => {
    const newApplication = {
      ...applicationData,
      jobTitle: applicationJob.title,
      company: applicationJob.company,
      status: 'Under Review'
    };
    
    const updatedApplications = [...applications, newApplication];
    setApplications(updatedApplications);
    safeLocalStorage.setItem('applications', JSON.stringify(updatedApplications));
    
    alert('Application submitted successfully!');
  };

  const handleSaveJob = (jobId) => {
    const newSavedJobs = savedJobs.includes(jobId) 
      ? savedJobs.filter(id => id !== jobId)
      : [...savedJobs, jobId];
    
    setSavedJobs(newSavedJobs);
    safeLocalStorage.setItem('savedJobs', JSON.stringify(newSavedJobs));
  };

  const handleAuth = (userData) => {
    login(userData);
    setIsAuthModalOpen(false);
  };

  const renderCurrentView = () => {
    if (loading) {
      return React.createElement('div', { className: 'loading' },
        React.createElement('div', { className: 'spinner' })
      );
    }

    if (user && currentView === 'dashboard') {
      return React.createElement(Dashboard, { userType: user.type });
    }

    switch (currentView) {
      case 'home':
        return React.createElement('div', null,
          React.createElement(Hero, { onSearch: handleSearch, setCurrentView }),
          React.createElement(Stats),
          React.createElement('section', { style: { padding: '48px 24px' } },
            React.createElement('div', { style: { maxWidth: '1200px', margin: '0 auto' } },
              React.createElement('h2', { style: { textAlign: 'center', marginBottom: '32px' } }, 'Featured Jobs'),
              React.createElement('div', { className: 'jobs-grid' },
                sampleJobs.slice(0, 6).map(job =>
                  React.createElement(JobCard, {
                    key: job.id,
                    job: job,
                    onClick: handleJobClick,
                    onSave: user?.type === 'candidate' ? handleSaveJob : null,
                    saved: savedJobs.includes(job.id)
                  })
                )
              )
            )
          )
        );

      case 'jobs':
        return React.createElement('div', { className: 'jobs-layout' },
          React.createElement(FilterSidebar, {
            filters: filters,
            onFilterChange: handleFilterChange
          }),
          React.createElement('div', null,
            React.createElement('div', { style: { marginBottom: '24px' } },
              React.createElement('h2', null, `${filteredJobs.length} Jobs Found`),
              React.createElement('div', { className: 'search-form', style: { marginTop: '16px' } },
                React.createElement('input', {
                  type: 'text',
                  placeholder: 'Search jobs...',
                  className: 'search-input',
                  value: searchTerm,
                  onChange: (e) => setSearchTerm(e.target.value)
                }),
                React.createElement('input', {
                  type: 'text',
                  placeholder: 'Location...',
                  className: 'search-input',
                  value: locationFilter,
                  onChange: (e) => setLocationFilter(e.target.value)
                })
              )
            ),
            filteredJobs.length === 0 ?
              React.createElement('div', { className: 'empty-state' },
                React.createElement('h3', null, 'No jobs found'),
                React.createElement('p', null, 'Try adjusting your search criteria.')
              ) :
              React.createElement('div', { className: 'jobs-grid' },
                filteredJobs.map(job =>
                  React.createElement(JobCard, {
                    key: job.id,
                    job: job,
                    onClick: handleJobClick,
                    onSave: user?.type === 'candidate' ? handleSaveJob : null,
                    saved: savedJobs.includes(job.id)
                  })
                )
              )
          )
        );

      case 'companies':
        return React.createElement('div', { style: { maxWidth: '1200px', margin: '0 auto', padding: '48px 24px' } },
          React.createElement('h2', { style: { textAlign: 'center', marginBottom: '32px' } }, 'Browse Companies'),
          React.createElement('div', { className: 'jobs-grid' },
            sampleCompanies.map(company =>
              React.createElement(CompanyCard, {
                key: company.name,
                company: company
              })
            )
          )
        );

      case 'post-job':
        if (!user || user.type !== 'employer') {
          return React.createElement('div', { className: 'container', style: { padding: '48px 24px', textAlign: 'center' } },
            React.createElement('h2', null, 'Employer Access Required'),
            React.createElement('p', null, 'Please log in as an employer to post jobs.'),
            React.createElement('button', {
              className: 'btn btn--primary',
              onClick: () => setIsAuthModalOpen(true)
            }, 'Login as Employer')
          );
        }
        return React.createElement('div', { style: { maxWidth: '800px', margin: '0 auto', padding: '48px 24px' } },
          React.createElement('h2', { style: { marginBottom: '32px' } }, 'Post a New Job'),
          React.createElement(Dashboard, { userType: 'employer' })
        );

      case 'job-detail':
        return selectedJob ? React.createElement(JobDetail, {
          job: selectedJob,
          onBack: () => setCurrentView('jobs'),
          onApply: handleApply
        }) : null;

      default:
        return React.createElement('div', { className: 'container', style: { padding: '48px 24px' } },
          React.createElement('h1', null, 'Page Not Found')
        );
    }
  };

  return React.createElement('div', { className: 'app' },
    React.createElement(Header, { 
      onAuthClick: () => setIsAuthModalOpen(true),
      currentView: currentView,
      setCurrentView: setCurrentView
    }),
    React.createElement('main', null, renderCurrentView()),
    React.createElement(Footer),
    React.createElement(AuthModal, {
      isOpen: isAuthModalOpen,
      onClose: () => setIsAuthModalOpen(false),
      onAuth: handleAuth
    }),
    React.createElement(ApplicationModal, {
      isOpen: isApplicationModalOpen,
      job: applicationJob,
      onClose: () => setIsApplicationModalOpen(false),
      onSubmit: handleApplicationSubmit
    })
  );
};

// Render the app with proper error handling
const AppWithAuth = () => {
  return React.createElement(ErrorBoundary, null,
    React.createElement(AuthProvider, null,
      React.createElement(App)
    )
  );
};

// Ensure DOM is ready before rendering
const initializeApp = () => {
  const root = document.getElementById('root');
  if (root) {
    try {
      ReactDOM.render(React.createElement(AppWithAuth), root);
      console.log('App initialized successfully');
    } catch (error) {
      console.error('Failed to initialize app:', error);
      root.innerHTML = `
        <div style="padding: 48px 24px; text-align: center; color: var(--color-text);">
          <h1>Failed to Load Application</h1>
          <p>Please refresh the page to try again.</p>
          <button onclick="window.location.reload()" style="padding: 12px 24px; background: var(--color-primary); color: white; border: none; border-radius: 8px; cursor: pointer;">
            Refresh Page
          </button>
        </div>
      `;
    }
  } else {
    console.error('Root element not found');
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}