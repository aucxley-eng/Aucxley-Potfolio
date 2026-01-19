const projects = [
  {
    id: 1,
    title: "Creative Agency Website",
    description: "A modern, responsive website for a creative agency with animations and interactive elements.",
    imageUrl: "https://picsum.photos/seed/project1/600/400.jpg",
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
    projectUrl: "https://example.com/project1",
    date: "2023-05-15"
  },
  {
    id: 2,
    title: "E-commerce Mobile App",
    description: "A full-featured mobile application for online shopping with payment integration.",
    imageUrl: "https://picsum.photos/seed/project2/600/400.jpg",
    technologies: ["React Native", "Node.js", "MongoDB"],
    projectUrl: "https://example.com/project2",
    date: "2023-04-20"
  },
  {
    id: 3,
    title: "Data Visualization Dashboard",
    description: "An interactive dashboard for visualizing complex data sets with real-time updates.",
    imageUrl: "https://picsum.photos/seed/project3/600/400.jpg",
    technologies: ["Vue.js", "D3.js", "Firebase"],
    projectUrl: "https://example.com/project3",
    date: "2023-03-10"
  },
  {
    id: 4,
    title: "Social Media Platform",
    description: "A social networking platform with real-time messaging and content sharing features.",
    imageUrl: "https://picsum.photos/seed/project4/600/400.jpg",
    technologies: ["Next.js", "GraphQL", "PostgreSQL"],
    projectUrl: "https://example.com/project4",
    date: "2023-02-28"
  },
  {
    id: 5,
    title: "AI Content Generator",
    description: "A web application that uses AI to generate creative content based on user inputs.",
    imageUrl: "https://picsum.photos/seed/project5/600/400.jpg",
    technologies: ["Python", "TensorFlow", "React"],
    projectUrl: "https://example.com/project5",
    date: "2023-01-15"
  }
];

export const getProjects = () => {
  return projects;
};