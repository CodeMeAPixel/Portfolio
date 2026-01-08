"use client";

import { cvData } from "@/data/cvData";
import { IoLocationOutline, IoMailOutline, IoGlobeOutline, IoLogoGithub, IoBriefcaseOutline, IoSchoolOutline, IoCodeSlashOutline, IoRocketOutline } from "react-icons/io5";

export default function CVDocument() {
    return (
        <div id="cv-document" className="bg-white text-gray-900 max-w-4xl mx-auto print:max-w-none print:mx-0">
            {/* Header */}
            <header className="bg-gradient-to-r from-purple-600 to-purple-500 text-white p-8 print:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-bold mb-2 print:text-3xl">{cvData.personal.name}</h1>
                        <p className="text-xl text-purple-100 print:text-lg">{cvData.personal.title}</p>
                    </div>
                    <div className="flex flex-col gap-2 text-sm text-purple-100">
                        <div className="flex items-center gap-2">
                            <IoLocationOutline className="w-4 h-4" />
                            <span>{cvData.personal.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <IoMailOutline className="w-4 h-4" />
                            <span>{cvData.personal.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <IoGlobeOutline className="w-4 h-4" />
                            <span>{cvData.personal.website.replace('https://', '')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <IoLogoGithub className="w-4 h-4" />
                            <span>{cvData.personal.github.replace('https://github.com/', '@')}</span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="p-8 print:p-6 space-y-8">
                {/* Summary */}
                <section>
                    <p className="text-gray-700 leading-relaxed">{cvData.personal.summary}</p>
                </section>

                {/* Experience */}
                <section>
                    <div className="flex items-center gap-3 mb-4 border-b-2 border-purple-500 pb-2">
                        <IoBriefcaseOutline className="w-5 h-5 text-purple-600" />
                        <h2 className="text-xl font-bold text-gray-900">Professional Experience</h2>
                    </div>
                    <div className="space-y-6">
                        {cvData.experience.map((job, index) => (
                            <div key={index} className="relative pl-4 border-l-2 border-purple-200">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500"></div>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                                    <h3 className="font-bold text-gray-900">{job.title}</h3>
                                    <span className="text-sm text-purple-600 font-medium">{job.period}</span>
                                </div>
                                <p className="text-purple-600 font-medium text-sm mb-2">{job.company} • {job.location}</p>
                                <p className="text-gray-600 text-sm mb-2">{job.description}</p>
                                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                    {job.highlights.map((highlight, i) => (
                                        <li key={i}>{highlight}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Skills */}
                <section>
                    <div className="flex items-center gap-3 mb-4 border-b-2 border-purple-500 pb-2">
                        <IoCodeSlashOutline className="w-5 h-5 text-purple-600" />
                        <h2 className="text-xl font-bold text-gray-900">Technical Skills</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Frontend</h3>
                            <p className="text-sm text-gray-600">{cvData.skills.frontend.join(" • ")}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Backend</h3>
                            <p className="text-sm text-gray-600">{cvData.skills.backend.join(" • ")}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Database & Storage</h3>
                            <p className="text-sm text-gray-600">{cvData.skills.database.join(" • ")}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">DevOps & Tools</h3>
                            <p className="text-sm text-gray-600">{[...cvData.skills.devops, ...cvData.skills.tools].join(" • ")}</p>
                        </div>
                    </div>
                </section>

                {/* Projects */}
                <section>
                    <div className="flex items-center gap-3 mb-4 border-b-2 border-purple-500 pb-2">
                        <IoRocketOutline className="w-5 h-5 text-purple-600" />
                        <h2 className="text-xl font-bold text-gray-900">Notable Projects</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {cvData.projects.map((project, index) => (
                            <div key={index} className="p-4 bg-purple-50 rounded-lg print:bg-gray-50">
                                <h3 className="font-bold text-gray-900 mb-1">{project.name}</h3>
                                <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                                <div className="flex flex-wrap gap-1">
                                    {project.technologies.map((tech, i) => (
                                        <span key={i} className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded print:bg-gray-200 print:text-gray-700">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Certifications */}
                <section>
                    <div className="flex items-center gap-3 mb-4 border-b-2 border-purple-500 pb-2">
                        <IoSchoolOutline className="w-5 h-5 text-purple-600" />
                        <h2 className="text-xl font-bold text-gray-900">Certifications</h2>
                    </div>
                    <div className="space-y-3">
                        {cvData.certifications.map((cert, index) => (
                            <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h3 className="font-semibold text-gray-900">{cert.title}</h3>
                                    <p className="text-sm text-gray-600">{cert.issuer}</p>
                                </div>
                                <span className="text-sm text-purple-600 font-medium">{cert.period}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Footer */}
            <footer className="px-8 pb-8 print:px-6 print:pb-6">
                <p className="text-center text-sm text-gray-400">
                    References available upon request • Full portfolio at {cvData.personal.website.replace('https://', '')}
                </p>
            </footer>
        </div>
    );
}
