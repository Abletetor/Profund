// Animation
export const fadeIn = {
   hidden: { opacity: 0, y: 30 },
   visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
         delay: i * 0.1,
         duration: 0.5,
         ease: 'easeOut'
      }
   }),
};

// Helper to calculate days left
export const calculateDaysLeft = (createdAt, duration) => {
   const createdDate = new Date(createdAt);
   const expiryDate = new Date(createdDate.getTime() + duration * 24 * 60 * 60 * 1000);
   const now = new Date();
   const diff = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));
   return diff > 0 ? diff : 0;
};