import React, { useState } from 'react';
import { ArrowRight, BookOpen, Mic, Users, CheckCircle2 } from 'lucide-react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    schoolName: '',
    email: '',
    role: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', schoolName: '', email: '', role: '' });
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-slate-50 py-20 lg:py-32 overflow-hidden relative">
        <div className="absolute inset-0 bg-brand-blue/5 skew-y-3 transform origin-bottom-right -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Empowering <span className="text-brand-blue">Every Child's</span> Potential in Africa
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed">
                NeuroSense Africa is a web platform supporting children with neurodevelopmental differences including Autism, ADHD, speech difficulties, and learning challenges. Designed specifically for African schools and caregivers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#early-access" 
                  className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-blue hover:bg-blue-800 transition-colors shadow-sm"
                >
                  Get Early Access
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                <a 
                  href="#/library" 
                  className="inline-flex justify-center items-center px-6 py-3 border border-slate-300 text-base font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 transition-colors shadow-sm"
                >
                  Explore Library
                </a>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-teal to-brand-blue rounded-2xl transform rotate-3 scale-105 opacity-20 blur-xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop" 
                alt="Children learning together" 
                className="relative rounded-2xl shadow-2xl object-cover h-[500px] w-full"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Who is this for */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Who is NeuroSense For?</h2>
            <p className="text-lg text-slate-600">
              Our platform is built to support the entire ecosystem around a child's development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center mb-6">
                <BookOpen className="h-6 w-6 text-brand-blue" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Schools & Teachers</h3>
              <p className="text-slate-600">
                Equip your educators with resources and tools to better understand and support students with neurodevelopmental differences in the classroom.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-brand-teal/10 rounded-xl flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-brand-teal" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Caregivers</h3>
              <p className="text-slate-600">
                Access a library of easy-to-understand, non-diagnostic information to help you support your child's unique learning journey at home.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-brand-green/10 rounded-xl flex items-center justify-center mb-6">
                <Mic className="h-6 w-6 text-brand-green" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Children</h3>
              <p className="text-slate-600">
                Engage with warm, encouraging interactive activities designed to build confidence, like our stammer-friendly speech practice module.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Early Access Form */}
      <section id="early-access" className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-brand-blue/20 blur-[100px]"></div>
          <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-brand-teal/20 blur-[100px]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Join NeuroSense Africa</h2>
              <p className="text-lg text-slate-300">
                Sign up for early access to our platform. We're currently onboarding schools and educators.
              </p>
            </div>

            {isSubmitted ? (
              <div className="bg-brand-green/20 border border-brand-green/50 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-brand-green" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                <p className="text-slate-300">
                  Your request for early access has been received. We'll be in touch soon with next steps.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 text-brand-teal hover:text-white transition-colors underline"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-transparent text-white placeholder-slate-400 transition-all"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-transparent text-white placeholder-slate-400 transition-all"
                      placeholder="jane@school.edu"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="schoolName" className="block text-sm font-medium text-slate-300 mb-2">School / Organization Name</label>
                    <input
                      type="text"
                      id="schoolName"
                      name="schoolName"
                      required
                      value={formData.schoolName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-transparent text-white placeholder-slate-400 transition-all"
                      placeholder="Lagos Primary School"
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-slate-300 mb-2">Your Role</label>
                    <select
                      id="role"
                      name="role"
                      required
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-transparent text-white placeholder-slate-400 transition-all appearance-none"
                    >
                      <option value="" disabled className="text-slate-900">Select your role</option>
                      <option value="teacher" className="text-slate-900">Teacher</option>
                      <option value="counselor" className="text-slate-900">School Counselor</option>
                      <option value="administrator" className="text-slate-900">Administrator</option>
                      <option value="caregiver" className="text-slate-900">Caregiver / Parent</option>
                      <option value="other" className="text-slate-900">Other</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-slate-900 bg-brand-teal hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-teal focus:ring-offset-slate-900 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      'Request Early Access'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
