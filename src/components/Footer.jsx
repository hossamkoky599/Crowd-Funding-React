import React from 'react'
import { Link } from 'react-router-dom';
import '../assets/css/footer.css';
import hossam from"../assets/images/team/hossam.png";
import mohamed from"../assets/images/team/mohamed.jpg";
import ahmed from"../assets/images/team/Ahmed.png";
import hazem from"../assets/images/team/hazem.png";
function Footer() {
  return (
         <footer className="bg-gradient-to-r from-[#ff4b2b] to-[#ff416c] text-white w-full">
      <div className="max-w-6xl mx-auto py-8 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h3 className="text-xl font-bold mb-2">🎯 CrowdFund</h3>
          <p className="text-sm text-white/80">
            Empowering ideas through community funding. Start, support, and share projects that matter.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/home" className="hover:underline">Home</Link></li>
            <li><Link to="/projects" className="hover:underline">Projects</Link></li>
            <li><Link to="/addproject" className="hover:underline">Start a Project</Link></li>
            <li><Link to="/profile" className="hover:underline">Your Profile</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
  <h4 className="text-lg font-semibold mb-3">
    Get in Touch With the Developer Team
  </h4>
  <div className="grid grid-cols-3 gap-4">
    {/* Developer 1 */}
    <a
      href="https://www.linkedin.com/in/ahmed-mohamed251201/"
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center text-center hover:opacity-90"
    >
      <img
        src={ahmed}
        alt="Dev 1"
        className="w-14 h-14 rounded-full object-cover border-2 border-white"
      />
      <span className="text-xs mt-1 text-white/80">Ahmed</span>
    </a>

    {/* Developer 2 */}
    <a
      href="https://www.linkedin.com/in/esraa-anwer-050712236/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center text-center hover:opacity-90"
    >
      <img
        src="/team/dev2.jpg"
        alt="Essra"
        className="w-14 h-14 rounded-full object-cover border-2 border-white"
      />
      <span className="text-xs mt-1 text-white/80">Essra</span>
    </a>

    {/* Developer 3 */}
    <a
      href="https://www.linkedin.com/in/fatma-mosaad-8b033323a/"
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center text-center hover:opacity-90"
    >
      <img
        src="/team/dev3.jpg"
        alt="Fatma"
        className="w-14 h-14 rounded-full object-cover border-2 border-white"
      />
      <span className="text-xs mt-1 text-white/80">Fatma</span>
    </a>
    {/* Developer 4 */}
      <a
      href="https://www.linkedin.com/in/hazem-helal-634034225/"
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center text-center hover:opacity-90"
    >
      <img
        src={hazem}
        alt="Dev 3"
        className="w-14 h-14 rounded-full object-cover border-2 border-white"
      />
      <span className="text-xs mt-1 text-white/80">Hazem</span>
    </a>
      {/* Developer 5 */}
      <a
      href="https://hossamkoky599.github.io/My-Portfolio/"
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center text-center hover:opacity-90"
    >
      <img
        src={hossam}
        alt="Dev 3"
        className="w-14 h-14 rounded-full object-cover border-2 border-white"
      />
      <span className="text-xs mt-1 text-white/80">Hossam</span>
    </a>
     {/* Developer 6 */}
      <a
      href="https://www.linkedin.com/in/mohamed-silaya1532/"
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center text-center hover:opacity-90"
    >
      <img
        src={mohamed}
        alt="Dev 3"
        className="w-14 h-14 rounded-full object-cover border-2 border-white"
      />
      <span className="text-xs mt-1 text-white/80">Mohamed</span>
    </a>
  </div>
</div>
      </div>

      <div className="border-t border-white/30 text-center text-sm py-4">
        © {new Date().getFullYear()} CrowdFund. All rights reserved.
      </div>
    </footer>

  )
}

export default Footer