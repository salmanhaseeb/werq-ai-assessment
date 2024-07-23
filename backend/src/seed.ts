import mongoose from 'mongoose';
import { Job } from './models/job';
import { config } from './config';

// Sample job data
const jobs = [
  {
    title: 'Software Engineer',
    description: 'Develop and maintain web applications using modern technologies.',
    company: 'Tech Innovations',
    location: 'San Francisco, CA',
  },
  {
    title: 'Product Manager',
    description: 'Lead the product development team to deliver high-quality software products.',
    company: 'Innovate Ltd.',
    location: 'New York, NY',
  },
  {
    title: 'UX Designer',
    description: 'Design user interfaces that are intuitive and engaging.',
    company: 'Creative Solutions',
    location: 'Austin, TX',
  },
  {
    title: 'Data Scientist',
    description: 'Analyze and interpret complex data to help guide business decisions.',
    company: 'Data Analytics Inc.',
    location: 'Boston, MA',
  },
  {
    title: 'Marketing Specialist',
    description: 'Develop and execute marketing strategies to drive brand awareness and sales.',
    company: 'Market Leaders',
    location: 'Chicago, IL',
  },
  {
    title: 'Front-End Developer',
    description: 'Build and optimize user-facing features and interfaces using JavaScript frameworks.',
    company: 'Web Creations',
    location: 'Seattle, WA',
  },
  {
    title: 'Backend Developer',
    description: 'Create and maintain server-side logic, database interactions, and APIs.',
    company: 'Code Masters',
    location: 'Denver, CO',
  },
  {
    title: 'DevOps Engineer',
    description: 'Implement and manage deployment pipelines and automate operations.',
    company: 'Cloud Services Co.',
    location: 'San Jose, CA',
  },
  {
    title: 'Systems Analyst',
    description: 'Evaluate and improve IT systems and business processes.',
    company: 'Systems Consulting',
    location: 'Philadelphia, PA',
  },
  {
    title: 'Content Writer',
    description: 'Create compelling and informative content for various platforms and audiences.',
    company: 'Content Creators',
    location: 'Los Angeles, CA',
  },
  {
    title: 'QA Engineer',
    description: 'Ensure the quality and functionality of software products through rigorous testing.',
    company: 'Quality Assurance Pros',
    location: 'Atlanta, GA',
  },
  {
    title: 'Customer Support Specialist',
    description: 'Provide exceptional support to customers and resolve issues effectively.',
    company: 'Support Services Inc.',
    location: 'Dallas, TX',
  },
  {
    title: 'Network Engineer',
    description: 'Design, implement, and manage network infrastructure and security.',
    company: 'Network Solutions',
    location: 'San Diego, CA',
  },
  {
    title: 'Sales Executive',
    description: 'Drive sales growth by building relationships and closing deals with clients.',
    company: 'Sales Ventures',
    location: 'Miami, FL',
  },
  {
    title: 'Business Analyst',
    description: 'Analyze business needs and provide insights to drive strategic decisions.',
    company: 'Business Insights Ltd.',
    location: 'Washington, DC',
  },
];

const seedDatabase = async () => {
  try {

    await mongoose.connect(config.DATABSE_URI!);
    await Job.deleteMany();
    await Job.insertMany(jobs);
    console.log('Database seeding completed with meaningful jobs.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
  }
};

// Run the seed function
seedDatabase();
