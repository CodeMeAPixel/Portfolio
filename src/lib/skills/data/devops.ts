import { SkillCategory } from "@/types/skills";

const devopsSkills: SkillCategory = {
    name: "DevOps & Deployment",
    description: "Automating, deploying, and maintaining applications in production environments.",
    icon: "IoCloudUploadOutline",
    color: "text-purple-400",
    skills: [
        {
            name: "Docker",
            icon: "docker",
            level: 4,
            description: "Containerizing applications for consistent development and deployment."
        },
        {
            name: "Docker Compose",
            icon: "docker",
            level: 4,
            description: "Defining and running multi-container Docker applications."
        },
        {
            name: "Kubernetes",
            icon: "kubernetes",
            level: 3,
            description: "Orchestrating containerized applications for scaling and management."
        },
        {
            name: "AWS",
            icon: "aws",
            level: 3,
            description: "Cloud infrastructure including EC2, S3, Lambda, and more."
        },
        {
            name: "Vercel",
            icon: "vercel",
            level: 5,
            description: "Deploying and scaling frontend applications and serverless functions."
        },
        {
            name: "Netlify",
            icon: "netlify",
            level: 4,
            description: "Continuous deployment for static sites and serverless functions."
        },
        {
            name: "GitHub Actions",
            icon: "github",
            level: 4,
            description: "CI/CD workflows for automated testing and deployment."
        },
        {
            name: "Google Cloud",
            icon: "gcp",
            level: 3,
            description: "Cloud infrastructure and services for application hosting."
        },
        {
            name: "Terraform",
            icon: "terraform",
            level: 3,
            description: "Infrastructure as code for provisioning and managing cloud resources."
        },
        {
            name: "CI/CD",
            icon: "cicd",
            level: 4,
            description: "Implementing continuous integration and deployment pipelines."
        }
    ]
};

export default devopsSkills;
