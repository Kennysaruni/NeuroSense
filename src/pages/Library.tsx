import { Brain, Activity, MessageSquare, BookOpenCheck } from 'lucide-react';

const topics = [
  {
    id: 'autism',
    title: 'Autism',
    description: 'Understanding Autism Spectrum Condition and how to support neurodivergent learners.',
    icon: Brain,
    color: 'bg-brand-blue',
    lightColor: 'bg-brand-blue/10',
    textColor: 'text-brand-blue'
  },
  {
    id: 'adhd',
    title: 'ADHD',
    description: 'Strategies for supporting focus, energy regulation, and executive function.',
    icon: Activity,
    color: 'bg-brand-teal',
    lightColor: 'bg-brand-teal/10',
    textColor: 'text-brand-teal'
  },
  {
    id: 'speech-differences',
    title: 'Speech Differences',
    description: 'Information on stammering, articulation, and language processing challenges.',
    icon: MessageSquare,
    color: 'bg-brand-green',
    lightColor: 'bg-brand-green/10',
    textColor: 'text-brand-green'
  },
  {
    id: 'learning-difficulties',
    title: 'Learning Difficulties',
    description: 'Guidance on dyslexia, dyscalculia, and other specific learning differences.',
    icon: BookOpenCheck,
    color: 'bg-slate-700',
    lightColor: 'bg-slate-100',
    textColor: 'text-slate-700'
  }
];

export default function Library() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">Understanding Your Child</h1>
          <p className="text-xl text-slate-600">
            An educational resource library designed for African schools and caregivers. 
            Select a topic below to learn more about supporting neurodevelopmental differences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {topics.map((topic) => (
            <a 
              key={topic.id} 
              href={`#/library/${topic.id}`}
              className="group bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
            >
              <div className="flex items-start gap-6 mb-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${topic.lightColor} group-hover:${topic.color} transition-colors duration-300`}>
                  <topic.icon className={`h-8 w-8 ${topic.textColor} group-hover:text-white transition-colors duration-300`} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-brand-blue transition-colors">{topic.title}</h2>
                  <p className="text-slate-600 leading-relaxed">
                    {topic.description}
                  </p>
                </div>
              </div>
              <div className="mt-auto pt-6 border-t border-slate-100 flex items-center text-brand-blue font-medium group-hover:underline">
                Read more
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
