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
   },
   {
      id: 2,
      title: 'Mobile Health Diagnostics',
      creator: 'Ama Serwaa',
      image: mobileImg,
      category: 'Health Tech',
      funded: 60,
   },
   {
      id: 3,
      title: 'AgriTech Drone Solution',
      creator: 'Yaw Owusu',
      image: droneImg,
      category: 'Agriculture',
      funded: 92,
   },
   {
      id: 4,
      title: 'E-learning for Rural Kids',
      creator: 'Esi Dede',
      image: elearnImg,
      category: 'Education',
      funded: 48,
   },
   {
      id: 5,
      title: 'Recycled Plastic Homes',
      creator: 'Kojo Baffour',
      image: plasticImg,
      category: 'Sustainable Living',
      funded: 85,
   },
   {
      id: 6,
      title: 'Smart Irrigation Tech',
      creator: 'Naana Abena',
      image: smartImg,
      category: 'AgriTech',
      funded: 67,
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