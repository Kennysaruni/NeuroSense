import { Brain, Activity, MessageSquare, BookOpenCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
const topics = [
  {
    id: 'autism',
    title: 'Autism',
    description: 'Understanding Autism Spectrum Condition and how to support neurodivergent learners.',
    icon: Brain,
    color: 'bg-brand-blue',
    lightColor: 'bg-brand-blue/10',
    textColor: 'text-brand-blue',
    hoverBorder: 'hover:border-brand-blue/40'
  },
  {
    id: 'adhd',
    title: 'ADHD',
    description: 'Strategies for supporting focus, energy regulation, and executive function.',
    icon: Activity,
    color: 'bg-brand-teal',
    lightColor: 'bg-brand-teal/10',
    textColor: 'text-brand-teal',
    hoverBorder: 'hover:border-brand-teal/40'
  },
  {
    id: 'speech-differences',
    title: 'Speech Differences',
    description: 'Information on stammering, articulation, and language processing challenges.',
    icon: MessageSquare,
    color: 'bg-brand-green',
    lightColor: 'bg-brand-green/10',
    textColor: 'text-brand-green',
    hoverBorder: 'hover:border-brand-green/40'
  },
  {
    id: 'learning-difficulties',
    title: 'Learning Difficulties',
    description: 'Guidance on dyslexia, dyscalculia, and other specific learning differences.',
    icon: BookOpenCheck,
    color: 'bg-brand-yellow',
    lightColor: 'bg-brand-yellow/10',
    textColor: 'text-brand-yellow',
    hoverBorder: 'hover:border-brand-yellow/40'
  }
];

export default function Library() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-brand-yellow/30 animate-pulse z-0 hidden md:block"></div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-800 mb-6 drop-shadow-sm relative z-10">Understanding Your Child</h1>
          <p className="text-2xl text-slate-600 font-bold relative z-10">
            An educational resource library designed for African schools and caregivers!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {topics.map((topic) => (
            <Link
              key={topic.id}
              to={`/library/${topic.id}`}
              className={`group bg-white rounded-[2.5rem] p-10 border-[6px] border-slate-100/80 shadow-lg hover:shadow-2xl hover:-translate-y-3 ${topic.hoverBorder} transition-all duration-300 flex flex-col h-full active:translate-y-0`}
            >
              <div className="flex items-start gap-6 mb-8">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 ${topic.lightColor} group-hover:${topic.color} transition-colors duration-300 transform group-hover:rotate-6`}>
                  <topic.icon className={`h-10 w-10 ${topic.textColor} group-hover:text-white transition-colors duration-300`} />
                </div>
                <div>
                  <h2 className={`text-3xl font-black text-slate-800 mb-3 group-hover:${topic.textColor} transition-colors`}>{topic.title}</h2>
                  <p className="text-slate-600 font-semibold text-lg leading-relaxed">
                    {topic.description}
                  </p>
                </div>
              </div>
              <div className={`mt-auto pt-6 border-t-4 border-slate-50 flex items-center ${topic.textColor} font-black text-xl group-hover:underline`}>
                Let's Read!
                <svg className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
