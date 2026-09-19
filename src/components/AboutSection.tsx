import React, { useState } from 'react';
import { SmartechLogo } from './SmartechLogo';
import { 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2
} from 'lucide-react';
import { MotionReveal } from './MotionReveal';

import directorImg from '../assets/images/extracted_director.png';
import ceoImg from '../assets/images/extracted_ceo.png';
import techniciansImg from '../assets/images/extracted_technician.png';
import teamImg from '../assets/images/regenerated_image_1789752835475.png';

interface AboutSectionProps {
  onOpenQuoteModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenQuoteModal }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div id="about-smartech" className="py-12 lg:py-16 bg-[#FAF8F5] text-[#1C1917] selection:bg-[#E14D2A] selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-20">

        {/* 1. TOP SECTION: LOGO, ABOUT SMARTECH & COMBINED READ MORE NARRATIVE */}
        <MotionReveal>
          <div className="bg-white rounded-2xl border border-[#E8E5DF] p-6 sm:p-10 lg:p-12 shadow-sm">
            {/* Header with Title and Logo */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#E8E5DF]">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FFF7ED] text-[#E14D2A] border border-[#FED7AA] text-[11px] font-bold uppercase tracking-widest rounded-md">
                  Corporate Profile
                </div>
                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-[#1C1917] tracking-tight">
                  About Smartech
                </h1>
                <p className="font-heading text-lg sm:text-xl font-bold text-[#E14D2A]">
                  Powering Better Solutions. Building a Smarter Future.
                </p>
              </div>

              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E8E5DF] self-start md:self-auto shadow-2xs">
                <SmartechLogo size="lg" variant="horizontal" showSubtitle={true} />
              </div>
            </div>

            {/* Content Body with 5 to 6 Lines Visible + Read More */}
            <div className="pt-8 relative">
              {/* Always visible 5-6 lines introductory narrative */}
              <div className="space-y-4 text-base sm:text-lg text-[#57534E] leading-relaxed">
                <p>
                  <strong className="text-[#1C1917]">Smartech Electrical &amp; Networking Solution</strong> is a technology-driven electrical and energy solutions company dedicated to delivering reliable, efficient, and professionally executed solutions for residential, commercial, and industrial applications.
                </p>
                <p>
                  Founded with a vision to bring modern technology and dependable electrical solutions under one roof, Smartech provides integrated solutions across Solar Energy, Electrical Systems, CCTV &amp; Security, Networking, Smart Home Automation, and Electrical Earthing.
                  {!isExpanded && (
                    <span>
                      {' '}...{' '}
                      <button
                        onClick={() => setIsExpanded(true)}
                        className="inline-flex items-center gap-1 text-[#E14D2A] hover:text-[#C83B1B] font-bold underline underline-offset-4 cursor-pointer transition-colors"
                      >
                        Read More
                        <ChevronDown className="w-4 h-4 inline" />
                      </button>
                    </span>
                  )}
                </p>
              </div>

              {/* Collapsed subtle fade gradient when not expanded */}
              {!isExpanded && (
                <div className="mt-4 pt-2 flex items-center">
                  <button
                    onClick={() => setIsExpanded(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFF7ED] hover:bg-[#FFEDD5] text-[#E14D2A] border border-[#FED7AA] text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer shadow-xs"
                  >
                    <span>Read Full Company Profile</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Expanded Full Remaining Narrative */}
              {isExpanded && (
                <div className="mt-5 pt-6 border-t border-[#F0EDE8] space-y-8 animate-in fade-in slide-in-from-top-3 duration-300">
                  <div className="text-base sm:text-lg text-[#57534E] leading-relaxed">
                    <p>
                      We believe every project requires more than simply installing equipment. It requires proper planning, quality products, technical expertise, safe installation, and dependable support. Our approach is therefore focused on understanding each customer's requirements and developing practical solutions designed around their specific needs.
                    </p>
                  </div>

                  {/* Our Core Expertise */}
                  <div className="space-y-4 pt-2">
                    <h2 className="font-heading text-xl sm:text-2xl font-black text-[#1C1917] tracking-tight flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#E14D2A]"></span>
                      Our Core Expertise
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base text-[#57534E]">
                      <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E8E5DF]">
                        <h3 className="font-bold text-[#1C1917] mb-1">Solar Energy Solutions</h3>
                        <p>On-Grid, Hybrid and Off-Grid Solar Systems designed to improve energy efficiency and reduce dependence on conventional electricity.</p>
                      </div>
                      <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E8E5DF]">
                        <h3 className="font-bold text-[#1C1917] mb-1">Electrical Solutions</h3>
                        <p>Professional electrical installation, wiring, distribution, protection, maintenance, and related electrical services.</p>
                      </div>
                      <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E8E5DF]">
                        <h3 className="font-bold text-[#1C1917] mb-1">CCTV &amp; Security Solutions</h3>
                        <p>Modern surveillance and security systems designed to provide better visibility, monitoring, and protection for homes and businesses.</p>
                      </div>
                      <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E8E5DF]">
                        <h3 className="font-bold text-[#1C1917] mb-1">Networking Solutions</h3>
                        <p>Structured networking and connectivity solutions for reliable communication and data infrastructure.</p>
                      </div>
                      <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E8E5DF]">
                        <h3 className="font-bold text-[#1C1917] mb-1">Smart Home Automation</h3>
                        <p>Intelligent solutions that enhance convenience, security, energy management, and control.</p>
                      </div>
                      <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E8E5DF]">
                        <h3 className="font-bold text-[#1C1917] mb-1">Electrical Earthing Solutions</h3>
                        <p>Properly designed earthing solutions focused on electrical safety, equipment protection, and system reliability.</p>
                      </div>
                    </div>
                  </div>

                  {/* Our Approach */}
                  <div className="space-y-3 pt-2">
                    <h2 className="font-heading text-xl sm:text-2xl font-black text-[#1C1917] tracking-tight flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#E14D2A]"></span>
                      Our Approach
                    </h2>
                    <div className="space-y-3 text-base text-[#57534E] leading-relaxed bg-[#FAF8F5] p-5 sm:p-6 rounded-xl border border-[#E8E5DF]">
                      <p>
                        At Smartech, we combine technical understanding with practical field experience to deliver solutions that are safe, efficient, and suitable for real-world applications.
                      </p>
                      <p>
                        From initial consultation and system planning to installation, testing, commissioning, and technical support, we aim to maintain a professional approach throughout every project.
                      </p>
                    </div>
                  </div>

                  {/* Our Vision & Our Mission */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="bg-[#FAF8F5] p-5 sm:p-6 rounded-xl border border-[#E8E5DF] space-y-2">
                      <h2 className="font-heading text-xl font-black text-[#1C1917] tracking-tight flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#E14D2A]"></span>
                        Our Vision
                      </h2>
                      <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
                        To build Smartech into a trusted technology and engineering solutions company, recognized for quality, innovation, professional workmanship, and customer-focused service.
                      </p>
                    </div>

                    <div className="bg-[#FAF8F5] p-5 sm:p-6 rounded-xl border border-[#E8E5DF] space-y-2">
                      <h2 className="font-heading text-xl font-black text-[#1C1917] tracking-tight flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#E14D2A]"></span>
                        Our Mission
                      </h2>
                      <div className="text-sm sm:text-base text-[#57534E] leading-relaxed space-y-2">
                        <p>
                          Our mission is to provide dependable technology and electrical solutions that help our customers achieve greater efficiency, improved safety, better connectivity, and smarter energy management.
                        </p>
                        <p>
                          We continuously work toward adopting modern technologies, improving our technical capabilities, and developing long-term relationships with our customers and business partners.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Why Smartech? */}
                  <div className="space-y-4 pt-2 bg-[#FFF7ED]/50 p-6 rounded-xl border border-[#FED7AA]">
                    <h2 className="font-heading text-xl sm:text-2xl font-black text-[#1C1917] tracking-tight flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#E14D2A]"></span>
                      Why Smartech?
                    </h2>
                    <div className="text-sm sm:text-base font-bold text-[#E14D2A] tracking-wider uppercase">
                      Quality • Safety • Technical Expertise • Professional Installation • Customer Support
                    </div>
                    <p className="text-base text-[#57534E] leading-relaxed">
                      We don't just provide products or installation — we provide solutions designed around your requirements.
                    </p>
                    <div className="pt-2 border-t border-[#FED7AA]">
                      <div className="font-heading text-lg font-black text-[#1C1917]">
                        Smartech
                      </div>
                      <div className="text-sm font-bold text-[#E14D2A]">
                        Your Right Technology Partner.
                      </div>
                    </div>
                  </div>

                  {/* Read Less Button */}
                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={() => {
                        setIsExpanded(false);
                        const el = document.getElementById('about-smartech');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-[#1C1917] text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer border border-[#E8E5DF]"
                    >
                      <span>Show Less</span>
                      <ChevronUp className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </MotionReveal>

        {/* 2. HORIZONTAL 3 CATEGORIES: DIRECTOR, CEO, OUR TECHNICIANS */}
        <MotionReveal>
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#E14D2A] bg-[#FFF7ED] px-3.5 py-1 rounded-md border border-[#FED7AA]">
                Leadership &amp; Field Specialists
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-[#1C1917] tracking-tight">
                Key Leadership &amp; Engineering Operations
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              {/* CARD 1: CEO */}
              <div className="bg-white rounded-2xl border border-[#E8E5DF] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group">
                <div className="relative h-60 sm:h-64 w-full bg-[#FAF8F5] overflow-hidden flex items-center justify-center p-3 border-b border-[#F0ECE6]">
                  <img
                    src={ceoImg}
                    alt="Qasim Baig - Chief Executive Officer at Smartech"
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="inline-block px-3 py-1 bg-[#E14D2A] text-white text-[10px] font-extrabold uppercase tracking-widest rounded-md shadow-xs">
                      CEO
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-heading text-2xl font-black text-[#1C1917]">
                        CEO
                      </h3>
                      <div className="text-xs font-bold text-[#E14D2A] uppercase tracking-wider mt-0.5">
                        Chief Executive Officer (CEO) – Smartech
                      </div>
                    </div>

                    <p className="text-sm text-[#57534E] leading-relaxed text-justify">
                      Qasim Baig is the Chief Executive Officer of Smartech, with professional expertise in Electrical Engineering, Solar PV Systems, Embedded Systems, IoT, Communication Technologies, and Smart Energy Solutions.
                      He leads Smartech with a focus on developing and delivering innovative, reliable, and cost-effective technology and energy solutions. His technical experience includes Solar PV design and commissioning, electrical systems, industrial applications, IoT-based energy monitoring, PCB design, automation, and smart technology solutions.
                      With experience in executing 30+ residential and commercial Solar PV projects, including On-Grid, Off-Grid and Hybrid systems, he combines engineering expertise with project leadership to deliver practical and sustainable solutions.
                    </p>
                  </div>
                </div>
              </div>

              {/* CARD 2: DIRECTOR */}
              <div className="bg-white rounded-2xl border border-[#E8E5DF] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group">
                <div className="relative h-60 sm:h-64 w-full bg-[#FAF8F5] overflow-hidden flex items-center justify-center p-3 border-b border-[#F0ECE6]">
                  <img
                    src={directorImg}
                    alt="Sayyam Mughal - Director at Smartech"
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="inline-block px-3 py-1 bg-[#E14D2A] text-white text-[10px] font-extrabold uppercase tracking-widest rounded-md shadow-xs">
                      Director
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-heading text-2xl font-black text-[#1C1917]">
                        Director
                      </h3>
                      <div className="text-xs font-bold text-[#E14D2A] uppercase tracking-wider mt-0.5">
                        About Me
                      </div>
                    </div>

                    <p className="text-sm text-[#57534E] leading-relaxed text-justify">
                      Sayyam Mughal is the Director at Smartech, with a strong engineering background in Electrical Engineering, Embedded Systems, IoT, and Communication Technologies. He leads the development and execution of technology-driven solutions, combining technical expertise with strategic leadership, project management, and business-focused innovation. His experience spans IoT deployments, LoRaWAN, embedded systems, industrial automation, wireless communication, PCB development, smart monitoring, and renewable energy solutions. At Smartech, his vision is to deliver reliable, scalable, and innovative engineering solutions that create long-term value for clients and industries.
                    </p>
                  </div>
                </div>
              </div>

              {/* CARD 3: OUR TECHNICIANS */}
              <div className="bg-white rounded-2xl border border-[#E8E5DF] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group">
                <div className="relative h-60 sm:h-64 w-full bg-[#FAF8F5] overflow-hidden flex items-center justify-center p-3 border-b border-[#F0ECE6]">
                  <img
                    src={techniciansImg}
                    alt="Our Technicians - Smartech Field Operations"
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="inline-block px-3 py-1 bg-[#1C1917] text-white border border-stone-700 text-[10px] font-extrabold uppercase tracking-widest rounded-md shadow-xs">
                      Field Engineering
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-heading text-2xl font-black text-[#1C1917]">
                        Our Technicians
                      </h3>
                      <div className="text-xs font-bold text-[#57534E] uppercase tracking-wider mt-0.5">
                        Certified Field &amp; Site Installation Specialists
                      </div>
                    </div>

                    <p className="text-sm text-[#57534E] leading-relaxed text-justify">
                      Our certified on-ground technical team is trained in executing high-precision solar PV structure mounting, inverter DC/AC cable management, fiber optic fusion splicing, 4K AcuSense CCTV surveillance setups, 3-phase switchboard wiring, and chemical earthing boring. Adhering strictly to PEC, NEPRA, and IEEE safety protocols, our technicians ensure every site is commissioned with zero compromise on safety, neatness, and longevity.
                    </p>
                  </div>

                  <div className="pt-2 flex items-center gap-2 text-xs font-bold text-[#E14D2A]">
                    <CheckCircle2 className="w-4 h-4 text-[#E14D2A]" />
                    <span>PEC &amp; IEEE Safety Compliance Assured</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MotionReveal>

        {/* 3. BOTTOM SECTION: OUR TEAM */}
        <MotionReveal>
          <div className="max-w-sm sm:max-w-md mx-auto">
            <div className="bg-white rounded-3xl border border-[#E8E5DF] overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col group">
              {/* Clear Team Image */}
              <div className="relative w-full aspect-[9/16] bg-[#FAF8F5] overflow-hidden">
                <img
                  src={teamImg}
                  alt="Our Team - Smartech Electrical & Networking Solution"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Just 'Our Team' text below the image */}
              <div className="py-4 px-6 text-center bg-white border-t border-[#E8E5DF]">
                <h3 className="font-heading text-xl sm:text-2xl font-black text-[#1C1917] tracking-tight">
                  Our Team
                </h3>
              </div>
            </div>
          </div>
        </MotionReveal>

      </div>
    </div>
  );
};
