export type CourseLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export interface Course {
  id: string;
  title: string;
  vendor: string;
  vendorColor: string;
  level: CourseLevel;
  duration: string;
  description: string;
  certCode?: string;
  featured?: boolean;
}

export interface Trainer {
  name: string;
  title: string;
  specialization: string;
  certifications: string[];
  experience: string;
}

export interface CareerOutcome {
  name: string;
  before: { role: string; salary: string };
  after: { role: string; salary: string; certs: string[] };
  program: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
}

export const courses: Course[] = [
  {
    id: "ccna",
    title: "CCNA",
    vendor: "Cisco",
    vendorColor: "#049FD9",
    level: "Beginner",
    duration: "40 Hours",
    description: "Build a strong foundation in networking — IP connectivity, security fundamentals, automation, and programmability.",
    certCode: "200-301",
    featured: true,
  },
  {
    id: "ceh-v12",
    title: "CEH v12",
    vendor: "EC-Council",
    vendorColor: "#D42027",
    level: "Intermediate",
    duration: "40 Hours",
    description: "Master 340+ attack technologies with AI-driven tools. The world's most advanced ethical hacking certification.",
    certCode: "312-50",
    featured: true,
  },
  {
    id: "security-plus",
    title: "Security+",
    vendor: "CompTIA",
    vendorColor: "#C8202F",
    level: "Beginner",
    duration: "40 Hours",
    description: "The globally recognized baseline certification for foundational cybersecurity knowledge and skills.",
    certCode: "SY0-701",
    featured: true,
  },
  {
    id: "az-500",
    title: "AZ-500",
    vendor: "Microsoft",
    vendorColor: "#00A4EF",
    level: "Advanced",
    duration: "32 Hours",
    description: "Implement security controls, maintain security posture, and manage identity and access in Azure environments.",
    certCode: "AZ-500",
    featured: true,
  },
  {
    id: "encor",
    title: "ENCOR",
    vendor: "Cisco",
    vendorColor: "#049FD9",
    level: "Advanced",
    duration: "40 Hours",
    description: "Master dual-stack architecture, virtualization, infrastructure, network assurance, and enterprise security.",
    certCode: "350-401",
  },
  {
    id: "scor",
    title: "SCOR",
    vendor: "Cisco",
    vendorColor: "#049FD9",
    level: "Advanced",
    duration: "40 Hours",
    description: "Implement and operate core security technologies — network security, cloud security, and endpoint protection.",
    certCode: "350-701",
  },
  {
    id: "chfi",
    title: "CHFI",
    vendor: "EC-Council",
    vendorColor: "#D42027",
    level: "Advanced",
    duration: "40 Hours",
    description: "Master digital forensics to detect hacking attacks, extract evidence, and report cybercrime.",
    certCode: "312-49",
  },
  {
    id: "cpent",
    title: "CPENT",
    vendor: "EC-Council",
    vendorColor: "#D42027",
    level: "Expert",
    duration: "40 Hours",
    description: "Pen test enterprise network environments — IoT, OT/SCADA, and binary analysis at the highest level.",
  },
  {
    id: "cysa-plus",
    title: "CySA+",
    vendor: "CompTIA",
    vendorColor: "#C8202F",
    level: "Intermediate",
    duration: "40 Hours",
    description: "Apply behavioral analytics to detect, prevent, and combat cybersecurity threats at scale.",
    certCode: "CS0-003",
  },
  {
    id: "network-plus",
    title: "Network+",
    vendor: "CompTIA",
    vendorColor: "#C8202F",
    level: "Beginner",
    duration: "40 Hours",
    description: "Design, configure, manage, and troubleshoot wired and wireless enterprise networks.",
    certCode: "N10-009",
  },
  {
    id: "az-104",
    title: "AZ-104",
    vendor: "Microsoft",
    vendorColor: "#00A4EF",
    level: "Intermediate",
    duration: "32 Hours",
    description: "Implement, manage, and monitor Azure environments — virtual networks, storage, compute, and identity.",
    certCode: "AZ-104",
  },
  {
    id: "aws-saa",
    title: "AWS Solutions Architect",
    vendor: "AWS",
    vendorColor: "#FF9900",
    level: "Intermediate",
    duration: "40 Hours",
    description: "Design distributed systems and architectures on AWS — compute, networking, storage, and security.",
    certCode: "SAA-C03",
  },
  {
    id: "fortigate",
    title: "FortiGate Security",
    vendor: "Fortinet",
    vendorColor: "#EE3124",
    level: "Intermediate",
    duration: "24 Hours",
    description: "Deploy, configure, and manage FortiGate firewalls — policies, authentication, SSL and IPsec VPN.",
    certCode: "NSE 4",
  },
  {
    id: "pcnsa",
    title: "PCNSA",
    vendor: "Palo Alto",
    vendorColor: "#FA582D",
    level: "Intermediate",
    duration: "32 Hours",
    description: "Configure and manage Palo Alto next-generation firewalls — App-ID, threat prevention, URL filtering.",
    certCode: "PCNSA",
  },
];

export const featuredCourses = courses.filter((c) => c.featured);

export const trainers: Trainer[] = [
  {
    name: "Aravind Krishnan",
    title: "Lead Network Security Instructor",
    specialization: "Enterprise Networking & Security Architecture",
    certifications: ["CCIE Security", "CCIE Enterprise", "CCNP", "PCNSE"],
    experience: "18 years",
  },
  {
    name: "Meera Subramaniam",
    title: "Senior Cybersecurity Instructor",
    specialization: "Offensive Security & Ethical Hacking",
    certifications: ["CEH Master", "CPENT", "OSCP", "CHFI"],
    experience: "14 years",
  },
  {
    name: "Rohan Deshmukh",
    title: "Cloud Security Architect",
    specialization: "Cloud Infrastructure & DevSecOps",
    certifications: ["AWS Security Specialty", "AZ-500", "CKS", "CCSP"],
    experience: "12 years",
  },
  {
    name: "Kavitha Rajan",
    title: "SOC & Forensics Lead",
    specialization: "Incident Response & Digital Forensics",
    certifications: ["GCFA", "GCIH", "CSA", "CySA+"],
    experience: "15 years",
  },
];

export const careerOutcomes: CareerOutcome[] = [
  {
    name: "Rajesh Kumar",
    before: { role: "IT Support Engineer", salary: "₹4.5 LPA" },
    after: { role: "Security Analyst", salary: "₹14 LPA", certs: ["CEH", "CCNA"] },
    program: "Cybersecurity Master Program",
  },
  {
    name: "Priya Nair",
    before: { role: "Network Technician", salary: "₹3.8 LPA" },
    after: { role: "Network Security Engineer", salary: "₹18 LPA", certs: ["CCNP Security", "PCNSA"] },
    program: "CCNP Security Track",
  },
  {
    name: "Amit Sharma",
    before: { role: "Junior Developer", salary: "₹5 LPA" },
    after: { role: "Cloud Security Architect", salary: "₹22 LPA", certs: ["AZ-500", "AWS Security"] },
    program: "Cloud Security Program",
  },
];

export const faqs: FAQ[] = [
  {
    question: "What certifications do you offer?",
    answer: "We offer authorized training for Cisco (CCNA, CCNP, CCIE tracks), EC-Council (CEH, CHFI, CPENT), CompTIA (Security+, Network+, CySA+), Microsoft Azure (AZ-900, AZ-104, AZ-500), AWS, Fortinet, Palo Alto, and more — over 200 programs total.",
  },
  {
    question: "Do you provide placement support?",
    answer: "Yes. Our career services include resume building, interview preparation, and direct placement assistance with our network of hiring partners across India's top IT and security firms.",
  },
  {
    question: "What is the class format?",
    answer: "All courses are instructor-led with guaranteed-to-run schedules. We offer both classroom (at our Bangalore center) and virtual instructor-led training (VILT) options, with weekday, weekend, and fast-track batches.",
  },
  {
    question: "How do virtual labs work?",
    answer: "Our labs provide 24/7 remote access to industry-standard hardware and software environments via VPN. You get hands-on experience with real Cisco routers, firewalls, and security tools — not simulations.",
  },
  {
    question: "Do you offer corporate training?",
    answer: "Absolutely. We design custom training programs tailored to your organization's technology stack and security requirements. Flexible delivery options include on-site, virtual, and hybrid formats.",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of AI-Driven Cybersecurity: What Professionals Need to Know",
    slug: "ai-driven-cybersecurity",
    excerpt: "As AI transforms the threat landscape, cybersecurity professionals must evolve. The skills and certifications that matter most in the age of AI-powered attacks.",
    category: "Industry Trends",
    date: "2026-05-28",
    readTime: "8 min",
  },
  {
    id: "2",
    title: "CCNA vs Security+: Which Certification Should You Get First?",
    slug: "ccna-vs-security-plus",
    excerpt: "Two of the most popular entry-level certifications. We break down the career paths, salary expectations, and learning curves.",
    category: "Career Guides",
    date: "2026-05-20",
    readTime: "6 min",
  },
  {
    id: "3",
    title: "Building a Home Lab for Ethical Hacking",
    slug: "home-lab-ethical-hacking",
    excerpt: "Set up your own penetration testing lab with virtual machines, vulnerable targets, and professional tools.",
    category: "Tutorials",
    date: "2026-05-15",
    readTime: "12 min",
  },
];

export const vendors = ["Cisco", "EC-Council", "CompTIA", "Microsoft", "AWS", "Fortinet", "Palo Alto", "Red Hat"];

export const labEnvironments = [
  { name: "SOC Environment", description: "SIEM deployment, log analysis, incident triage, and threat hunting in a simulated Security Operations Center.", commands: ["$ sudo systemctl start splunk", "$ ./threat-hunter --mode=live", "analyst@soc:~$ tail -f /var/log/alerts", "[ALERT] Suspicious lateral movement detected", "[ACTION] Initiating containment protocol..."] },
  { name: "Penetration Testing", description: "Full-scope penetration testing against enterprise networks with real vulnerabilities and defense systems.", commands: ["$ nmap -sV -sC 10.10.10.1", "$ gobuster dir -u http://target -w common.txt", "$ python3 exploit.py --target 10.10.10.1", "[+] Shell obtained on 10.10.10.1:4444", "meterpreter > sysinfo"] },
  { name: "Cloud Security", description: "AWS, Azure, and GCP security configurations, IAM policies, and cloud-native threat detection.", commands: ["$ aws iam list-users --output table", "$ az security assessment list", "$ gcloud scc findings list", "[FINDING] Public S3 bucket detected", "$ aws s3api put-bucket-policy --bucket prod..."] },
  { name: "Network Defense", description: "Cisco routers, Palo Alto firewalls, and Fortinet appliances in enterprise network topologies.", commands: ["Router# show ip route", "Router# configure terminal", "Router(config)# access-list 101 deny tcp any", "FortiGate # diagnose sniffer packet any", "PA-VM> show running security-policy"] },
  { name: "Malware Analysis", description: "Static and dynamic malware analysis in isolated sandbox environments with professional RE tools.", commands: ["$ file suspicious.exe", "$ strings suspicious.exe | grep -i 'http'", "$ volatility -f memory.dmp --profile=Win10", "[*] Injected DLL found: C:\\\\Temp\\\\payload.dll", "$ yara -r rules/ suspicious.exe"] },
];

export const navLinks = [
  {
    label: "Training",
    href: "/training",
    children: [
      { label: "Cisco", href: "/training?vendor=cisco", description: "CCNA, CCNP, CCIE tracks" },
      { label: "EC-Council", href: "/training?vendor=ec-council", description: "CEH, CHFI, CPENT" },
      { label: "CompTIA", href: "/training?vendor=comptia", description: "Security+, Network+, CySA+" },
      { label: "Microsoft", href: "/training?vendor=microsoft", description: "AZ-900, AZ-104, AZ-500" },
      { label: "AWS", href: "/training?vendor=aws", description: "Solutions Architect, Security" },
      { label: "Fortinet", href: "/training?vendor=fortinet", description: "NSE 4, NSE 7" },
      { label: "Palo Alto", href: "/training?vendor=palo-alto", description: "PCNSA, PCNSE" },
    ],
  },
  { label: "Certifications", href: "/certifications" },
  { label: "Virtual Labs", href: "/labs" },
  { label: "Corporate", href: "/corporate" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
