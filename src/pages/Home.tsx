import React, { useState } from 'react';
import { ArrowRight, BookOpen, Mic, Users, CheckCircle2, User, Mail, Building2, Briefcase } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom'

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    schoolName: '',
    email: '',
    role: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Send data to Supabase
    const { error } = await supabase
      .from('users table')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          schoolName: formData.schoolName,
          role: formData.role
        }
      ]);
    setIsSubmitting(false);
    if (error) {
      console.error('Error inserting data:', error);
      alert('Something went wrong. Please try again.');
    } else {
      setIsSubmitted(true);
      setFormData({ name: '', schoolName: '', email: '', role: '' });
    }
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
                Empowering <span className="text-brand-blue">Every</span> <span className="text-emerald-500">Child's</span> Potential in Africa
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed">
                NeuroSense Africa is a web platform supporting children with neurodevelopmental differences including Autism, ADHD, speech difficulties, and learning challenges. Designed specifically for African schools and caregivers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#early-access"
                  className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-500 hover:bg-blue-800 transition-colors shadow-sm"
                >
                  Get Early Access
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                <Link to="/library"
                  className="inline-flex justify-center items-center px-6 py-3 border border-slate-300 text-base font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 transition-colors shadow-sm"
                >
                  Explore Library
                </Link>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-teal to-brand-blue rounded-2xl transform rotate-3 scale-105 opacity-20 blur-xl"></div>
              <img
                src="https://images.unsplash.com/flagged/photo-1551887373-6edba6dacbb1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hpbGRyZW4lMjBsZWFybmluZ3xlbnwwfHwwfHx8MA%3D%3D"
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
              <div className="bg-white rounded-2xl p-10 text-center shadow-2xl max-w-lg mx-auto border border-slate-100">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-emerald-200">
                  <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                </div>
                <h3 className="text-3xl font-extrabold text-slate-900 mb-3">Thank You!</h3>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Your request for early access has been received. We'll be in touch soon with next steps.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 hover:text-slate-900 transition-colors border border-slate-200 shadow-sm"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2 group-focus-within:text-brand-teal transition-colors">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-slate-400 group-focus-within:text-brand-teal transition-colors" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-transparent focus:border-brand-teal text-white placeholder-slate-400/60 transition-all shadow-sm outline-none hover:bg-white/10 hover:border-white/20 focus:bg-white/10"
                        placeholder="Jane Doe"
                      />
                    </div>
                  </div>
                  <div className="group">
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2 group-focus-within:text-brand-teal transition-colors">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-brand-teal transition-colors" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-transparent focus:border-brand-teal text-white placeholder-slate-400/60 transition-all shadow-sm outline-none hover:bg-white/10 hover:border-white/20 focus:bg-white/10"
                        placeholder="jane@school.edu"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label htmlFor="schoolName" className="block text-sm font-medium text-slate-300 mb-2 group-focus-within:text-brand-teal transition-colors">School / Organization Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Building2 className="h-5 w-5 text-slate-400 group-focus-within:text-brand-teal transition-colors" />
                      </div>
                      <input
                        type="text"
                        id="schoolName"
                        name="schoolName"
                        required
                        value={formData.schoolName}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-transparent focus:border-brand-teal text-white placeholder-slate-400/60 transition-all shadow-sm outline-none hover:bg-white/10 hover:border-white/20 focus:bg-white/10"
                        placeholder="Lagos Primary School"
                      />
                    </div>
                  </div>
                  <div className="group">
                    <label htmlFor="role" className="block text-sm font-medium text-slate-300 mb-2 group-focus-within:text-brand-teal transition-colors">Your Role</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Briefcase className="h-5 w-5 text-slate-400 group-focus-within:text-brand-teal transition-colors" />
                      </div>
                      <select
                        id="role"
                        name="role"
                        required
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-transparent focus:border-brand-teal text-white placeholder-slate-400/60 transition-all appearance-none shadow-sm outline-none hover:bg-white/10 hover:border-white/20 focus:bg-white/10"
                      >
                        <option value="" disabled className="text-slate-900">Select your role</option>
                        <option value="teacher" className="text-slate-900">Teacher</option>
                        <option value="counselor" className="text-slate-900">School Counselor</option>
                        <option value="administrator" className="text-slate-900">Administrator</option>
                        <option value="caregiver" className="text-slate-900">Caregiver / Parent</option>
                        <option value="other" className="text-slate-900">Other</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-slate-400 group-focus-within:text-brand-teal transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center items-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-brand-blue hover:bg-brand-green transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg group"
                  >
                    <span className="relative flex items-center">
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          Request Early Access
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
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
