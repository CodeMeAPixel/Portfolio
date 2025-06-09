import { SkillCategory } from "@/types/skills";

const emailSkills: SkillCategory = {
    name: "Email & Communications",
    description: "Tools and services for handling email and communication functionalities.",
    icon: "IoMailOutline",
    color: "text-cyan-400",
    skills: [
        {
            name: "Resend",
            icon: "resend",
            level: 4,
            description: "Email API service for developers to send transactional emails."
        },
        {
            name: "Postmark",
            icon: "postmark",
            level: 4,
            description: "Reliable email delivery service for transactional emails."
        },
        {
            name: "Sendgrid",
            icon: "sendgrid",
            level: 3,
            description: "Cloud-based email service for transactional and marketing emails."
        },
        {
            name: "Mailchimp",
            icon: "mailchimp",
            level: 3,
            description: "Marketing automation platform specializing in email marketing."
        },
        {
            name: "Microsoft 365",
            icon: "microsoft",
            level: 4,
            description: "Cloud-based suite of productivity and collaboration tools."
        },
        {
            name: "Twilio",
            icon: "twilio",
            level: 3,
            description: "Cloud communications platform for building SMS, voice, and messaging applications."
        }
    ]
};

export default emailSkills;
