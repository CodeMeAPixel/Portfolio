import Link from "next/link";
import { IoLogoDiscord, IoLogoGithub, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io5";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-bg relative z-10">
      <div className="container-section text-center">
        <h2 className="heading-primary">Get In Touch</h2>

        <div className="max-w-xl mx-auto card">
          <p className="text-color-text-muted mb-8">
            I&apos;m always open to new opportunities and collaborations. Let&apos;s create something amazing together!
          </p>

          <div className="flex justify-center">
            <Link href="mailto:hey@codemeapixel.dev" className="btn-primary">
              Send me a Email
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-color-border">
            <div className="flex justify-center space-x-6">
              <Link href="https://github.com/CodeMeAPixel" className="btn-icon" aria-label="GitHub Profile">
                <IoLogoGithub className="w-5 h-5" />
              </Link>
              <Link href="https://linkedin.com/in/codemeapixel" className="btn-icon" aria-label="LinkedIn Profile">
                <IoLogoLinkedin className="w-5 h-5" />
              </Link>
              <Link href="https://twitter.com/codemeapixel" className="btn-icon" aria-label="Twitter Profile">
                <IoLogoTwitter className="w-5 h-5" />
              </Link>
              <Link href="https://discord.gg/Vv2bdC44Ge" className="btn-icon" aria-label="Twitter Profile">
                <IoLogoDiscord className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
