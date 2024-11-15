import { useEffect } from 'react';
import aiImage from "../assets/ai.jpg";
import anime from "../assets/back2.gif";
import Nav from './nav';

const features = [
  {
    title: "AI-Powered Career Assistant",
    description: "Our AI-driven Career Assistant offers personalized guidance, from tailored interview preparation tips to career advice, helping you navigate your path with confidence.",
    image: aiImage,
  },
  {
    title: "Job Search Support",
    description: "Easily search for job opportunities based on your location and role preferences. Our platform curates job listings and provides direct application links, streamlining the job search process.",
    image: aiImage,
  },
  {
    title: "Previous Exam Papers and Notes",
    description: "Access an organized repository of past exam papers and lecture notes shared by senior students. This feature provides you with the resources you need to prepare effectively.",
    image: aiImage,
  },
  {
    title: "1:1 Mentorship",
    description: "Connect with experienced senior students and alumni through our mentorship feature. Easily book 1:1 sessions to receive valuable insights, career advice, and guidance.",
    image: aiImage,
  }
];

function Home() {
  useEffect(() => {
    document.body.style.backgroundColor = 'black';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-black">
    
      <Nav />
      {/* Hero Section */}
      <div className="relative h-[80vh] overflow-hidden">
        {/* Background GIF Layer */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img 
            src={anime}
            alt="Background Animation"
            className="w-full h-full object-cover scale-105"
          />
        </div>

        {/* Content Layer */}
        <div className='relative z-20 flex flex-col items-center justify-center h-[70vh]'>
          <div className='text-[100px] font-bold text-white mb-1 overflow-hidden'>
            {'CampusConnect'.split('').map((char, index) => (
              <span 
                key={index}
                className="inline-block animate-slide-in opacity-0"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                {char}
              </span>
            ))}
          </div>
          <p className='overflow-hidden'>
            {'Your Network for Academic and Career Growth'.split('').map((char, index) => (
              <span
                key={index}
                className='inline-block text-gray-200 text-[24px] font-bold animate-slide-in opacity-0'
                style={{ animationDelay: `${(index * 50) + 1200}ms`, animationFillMode: 'forwards' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-5 px-4">
        <div className="max-w-3xl mx-auto space-y-5">
          {/* Section Title */}
          <div className="text-center mb-6">
            <h2 className="text-5xl font-bold relative inline-block">
              <span 
                className="text-purple-900 tracking-wide"
                style={{
                  textShadow: `
                    -2px -2px 0 #fff,  
                    2px -2px 0 #fff,
                    -2px 2px 0 #fff,
                    2px 2px 0 #fff,
                    0 0 10px rgba(88, 28, 135, 0.3)
                  `
                }}
              >
                Why Us?
              </span>
            </h2>
          </div>

          {/* Feature Cards */}
          <div className="space-y-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col items-center gap-10 p-8 rounded-2xl bg-purple-900 border-2 border-white 
                shadow-[0_4px_6px_rgba(255,255,255,0.3)] hover:shadow-[0_6px_8px_rgba(255,255,255,0.4)]
                transform transition-all duration-300 ease-in-out hover:scale-[1.02]`}
              >
                <div className="flex-shrink-0">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-[150px] h-[150px] object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1 max-w-2xl text-center md:text-left">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-gray-200 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;