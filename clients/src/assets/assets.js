import logo from './logo.png';
import headerImg from './header-illustration.svg';
import solarImg from './solar-water.png';
import mobileImg from './mobile-health.png';
import droneImg from './drone.png';
import elearnImg from './e-learn.png';
import plasticImg from './plastic.png';
import smartImg from './smart_irrigation.jpeg';
import blog1 from './startup_teamwork.jpeg';
import blog2 from './e-learn.png';
import blog3 from './success.jpeg';

export const assets = {
   logo,
   headerImg,
   blog1,
   blog2,
   blog3
};

// featured projects
export const projects = [
   {
      id: 1,
      title: 'Solar-Powered Water System',
      creator: 'Kwame Mensah',
      image: solarImg,
      category: 'Clean Energy',
      funded: 75,
      goal: 10000,
      raised: 7500,
      daysLeft: 15,
      overview: 'This project aims to provide clean, sustainable drinking water to remote communities using solar-powered pumps and filtration systems. The goal is to reduce waterborne diseases and improve health outcomes.',
      bio: 'Kwame is a renewable energy advocate with 7+ years of experience designing sustainable solutions for rural Africa.'
   },
   {
      id: 2,
      title: 'Mobile Health Diagnostics',
      creator: 'Ama Serwaa',
      image: mobileImg,
      category: 'Health Tech',
      funded: 60,
      goal: 15000,
      raised: 9000,
      daysLeft: 10,
      overview: 'A mobile health solution that brings diagnostics to rural and underserved areas. The unit includes tools for checking vital signs, basic lab testing, and digital health record syncing.',
      bio: 'Ama is a public health innovator passionate about mobile-first healthcare delivery in developing communities.'
   },
   {
      id: 3,
      title: 'AgriTech Drone Solution',
      creator: 'Yaw Owusu',
      image: droneImg,
      category: 'Agriculture',
      funded: 92,
      goal: 12000,
      raised: 11040,
      daysLeft: 5,
      overview: 'Utilizing drones to monitor crops, identify pest infestations early, and optimize irrigation. This tech enables farmers to improve yields while reducing environmental impact.',
      bio: 'Yaw is an agricultural engineer using drone tech to help farmers adopt smart and sustainable practices.'
   },
   {
      id: 4,
      title: 'E-learning for Rural Kids',
      creator: 'Esi Dede',
      image: elearnImg,
      category: 'Education',
      funded: 48,
      goal: 8000,
      raised: 3840,
      daysLeft: 20,
      overview: 'Creating offline-friendly educational content and distributing solar-powered learning tablets to students in remote villages. The mission is to bridge the digital divide and empower the next generation.',
      bio: 'Esi is an edtech champion creating tools that empower children in underserved areas to learn and thrive.'
   },
   {
      id: 5,
      title: 'Recycled Plastic Homes',
      creator: 'Kojo Baffour',
      image: plasticImg,
      category: 'Sustainable Living',
      funded: 85,
      goal: 20000,
      raised: 17000,
      daysLeft: 7,
      overview: 'Transforming plastic waste into affordable housing. This innovative approach provides shelter for the underserved while tackling pollution through sustainable building practices.',
      bio: 'Kojo is a civil engineer dedicated to building eco-friendly homes and reducing plastic waste in Africa.'
   },
   {
      id: 6,
      title: 'Smart Irrigation Tech',
      creator: 'Naana Abena',
      image: smartImg,
      category: 'AgriTech',
      funded: 67,
      goal: 10000,
      raised: 6700,
      daysLeft: 12,
      overview: 'An IoT-powered irrigation system that monitors soil moisture and weather to deliver water precisely when and where it’s needed. Helps conserve water and boost productivity for small-scale farmers.',
      bio: 'Naana is a tech-savvy agripreneur focused on using smart farming tools to transform agriculture in West Africa.'
   }, {
      id: 7,
      title: 'Smart Plough Tech',
      creator: 'Naana Abena',
      image: smartImg,
      category: 'AgriTech',
      funded: 67,
      goal: 10000,
      raised: 6700,
      daysLeft: 12,
      overview: 'An IoT-powered irrigation system that monitors soil moisture and weather to deliver water precisely when and where it’s needed. Helps conserve water and boost productivity for small-scale farmers.',
      bio: 'Naana is a tech-savvy agripreneur focused on using smart farming tools to transform agriculture in West Africa.'
   },
];

//Team members
export const teamMembers = [
   {
      name: 'Ama Owusu',
      role: 'Founder & CEO',
      img: 'https://randomuser.me/api/portraits/women/65.jpg',
      socials: {
         twitter: '#',
         linkedin: '#',
         github: '#',
      },
   },
   {
      name: 'Kwame Mensah',
      role: 'Lead Developer',
      img: 'https://randomuser.me/api/portraits/men/32.jpg',
      socials: {
         twitter: '#',
         linkedin: '#',
         github: '#',
      },
   },
   {
      name: 'Nana Adjei',
      role: 'Product Designer',
      img: 'https://randomuser.me/api/portraits/men/45.jpg',
      socials: {
         twitter: '#',
         linkedin: '#',
         github: '#',
      },
   },
   {
      name: 'Efua Asare',
      role: 'Community Manager',
      img: 'https://randomuser.me/api/portraits/women/52.jpg',
      socials: {
         twitter: '#',
         linkedin: '#',
         github: '#',
      },
   },
   {
      name: 'Yaw Antwi',
      role: 'Marketing Strategist',
      img: 'https://randomuser.me/api/portraits/men/76.jpg',
      socials: {
         twitter: '#',
         linkedin: '#',
         github: '#',
      },
   },
   {
      name: 'Akosua Dapaah',
      role: 'Investor Relations',
      img: 'https://randomuser.me/api/portraits/women/33.jpg',
      socials: {
         twitter: '#',
         linkedin: '#',
         github: '#',
      },
   },
];

//Blog Post
export const blogPosts = [
   {
      id: 1,
      title: '5 Tips to Make Your Crowdfunding Project Stand Out',
      content: `Crowdfunding is not just about raising money—it's about telling a story. 
      A compelling story with the right visuals and strategy can elevate your campaign and connect you with the right audience.

      ✅ Tip 1: Clear Title and Summary
      ✅ Tip 2: Use Engaging Media
      ✅ Tip 3: Offer Realistic Rewards
      ✅ Tip 4: Leverage Social Media
      ✅ Tip 5: Update Frequently

      These strategies have helped thousands of creators hit their funding goals. You can too!
    `,
      summary: 'Learn how to create a compelling pitch, tell your story, and attract the right investors.',
      date: 'April 2025',
      image: blog1,
      tags: ['Crowdfunding', 'Tips'],

   },
   {
      id: 2,
      title: 'Why Profund Uses Milestone-Based Funding',
      content: `Milestone-based funding is a safer, smarter approach. It ensures that project owners stay accountable and investors feel confident.

      💡 Funds are released in stages, aligned with project goals.
      💡 Admin verification ensures legitimacy.
      💡 Transparency increases trust.

      Profund believes in trust-driven innovation—and milestone funding delivers just that.
    `,
      summary: 'Discover the benefits of milestone-based disbursement and how it protects investors and creators.',
      date: 'March 2025',
      image: blog2,
      tags: ['Security', 'Funding'],
   },
   {
      id: 3,
      title: 'Meet the Most Funded Project of This Month',
      content: `
      This month, the spotlight is on a groundbreaking health-tech project that raised over $100K in just 3 weeks.

      🚀 Built by a passionate team
      🤝 Backed by over 500 investors
      📈 Rapid growth and traction

      It’s proof that with the right idea and platform—anything is possible.
    `,
      summary:
         'Check out the story behind this month’s most successful campaign and how they reached their goal.',
      date: 'March 2025',
      image: blog3,
      tags: ['Success Story', 'Highlight'],
   },
];