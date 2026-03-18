import { ArrowLeft, PlayCircle, PauseCircle } from 'lucide-react';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const topicsData = {
  'autism': {
    title: 'Autism Spectrum Condition',
    description: 'Understanding Autism and how to support neurodivergent learners in the classroom and at home.',
    color: 'text-brand-blue',
    bgColor: 'bg-brand-blue/10',
    sections: [
      {
        title: 'What is Autism?',
        content: 'Autism is a lifelong developmental condition that affects how people communicate and interact with the world. It is a spectrum condition, meaning it affects people in different ways. Some autistic people may need little or no support in their everyday lives, while others may need help from a parent or carer every day.'
      },
      {
        title: 'Common Characteristics',
        content: 'Autistic children may experience differences in social communication, social interaction, and imagination. They might also have sensory sensitivities, meaning they can be over- or under-sensitive to sounds, touch, tastes, smells, light, or colors.'
      },
      {
        title: 'Supporting Autistic Children',
        content: 'Create a structured environment with clear routines. Use visual supports like timetables or pictures to help with communication. Be patient and give them time to process information. Most importantly, focus on their strengths and interests to build confidence.'
      }
    ]
  },
  'adhd': {
    title: 'ADHD (Attention Deficit Hyperactivity Disorder)',
    description: 'Strategies for supporting focus, energy regulation, and executive function.',
    color: 'text-brand-teal',
    bgColor: 'bg-brand-teal/10',
    sections: [
      {
        title: 'What is ADHD?',
        content: 'ADHD is a neurodevelopmental condition that affects a person\'s behavior. People with ADHD can seem restless, may have trouble concentrating, and may act on impulse. It is not a reflection of intelligence or capability.'
      },
      {
        title: 'Common Characteristics',
        content: 'Children with ADHD may have a short attention span, be easily distracted, make careless mistakes, appear forgetful, or lose things. They might also be unable to sit still, constantly fidget, or act without thinking.'
      },
      {
        title: 'Supporting Children with ADHD',
        content: 'Break tasks into smaller, manageable chunks. Provide clear, concise instructions. Allow for movement breaks during learning. Praise positive behavior and effort rather than just outcomes. Keep the environment organized to minimize distractions.'
      }
    ]
  },
  'speech-differences': {
    title: 'Speech Differences',
    description: 'Information on stammering, articulation, and language processing challenges.',
    color: 'text-brand-green',
    bgColor: 'bg-brand-green/10',
    sections: [
      {
        title: 'What are Speech Differences?',
        content: 'Speech differences refer to variations in how a child produces sounds, words, or sentences. This can include stammering (stuttering), articulation difficulties (trouble making certain sounds), or language processing delays.'
      },
      {
        title: 'Common Characteristics',
        content: 'A child might repeat sounds or words, prolong sounds, or have blocks where no sound comes out. They might substitute one sound for another or have difficulty finding the right words to express their thoughts.'
      },
      {
        title: 'Supporting Children with Speech Differences',
        content: 'Give the child plenty of time to finish what they are saying without interrupting or finishing their sentences. Maintain natural eye contact. Focus on what they are saying, not how they are saying it. Model slow, relaxed speech yourself.'
      }
    ]
  },
  'learning-difficulties': {
    title: 'Learning Difficulties',
    description: 'Guidance on dyslexia, dyscalculia, and other specific learning differences.',
    color: 'text-slate-700',
    bgColor: 'bg-slate-100',
    sections: [
      {
        title: 'What are Specific Learning Difficulties?',
        content: 'Specific Learning Difficulties (SpLDs) affect the way information is learned and processed. They are neurological, usually hereditary, and occur independently of intelligence. Common SpLDs include Dyslexia (reading/spelling) and Dyscalculia (math).'
      },
      {
        title: 'Common Characteristics',
        content: 'A child with dyslexia might struggle with reading fluency, spelling, or phonological awareness. A child with dyscalculia might have difficulty understanding number concepts, learning math facts, or performing calculations.'
      },
      {
        title: 'Supporting Children with Learning Difficulties',
        content: 'Use multi-sensory teaching methods (visual, auditory, kinesthetic). Provide extra time for reading and writing tasks. Use assistive technology like text-to-speech software. Focus on building self-esteem, as learning difficulties can be frustrating.'
      }
    ]
  }
};

export default function Topic() {
  const { topicId } = useParams<{topicId: string}>();
  const topic = topicId ? topicsData[topicId as keyof typeof topicsData] : null;
  const [isPlaying, setIsPlaying] = useState(false);

  if (!topic) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Topic not found</h2>
          <Link to="/library" className="text-brand-blue hover:underline">Return to Library</Link>
        </div>
      </div>
    );
  }

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    // In a real app, this would control an HTML5 audio element
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/library" className="inline-flex items-center text-slate-500 hover:text-brand-blue transition-colors font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Library
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className={`${topic.bgColor} p-8 md:p-12 border-b border-slate-100`}>
            <h1 className={`text-3xl md:text-4xl font-bold ${topic.color} mb-4`}>{topic.title}</h1>
            <p className="text-lg md:text-xl text-slate-700 max-w-2xl leading-relaxed">
              {topic.description}
            </p>
            
            <button 
              onClick={toggleAudio}
              className={`mt-8 inline-flex items-center px-6 py-3 rounded-full bg-white shadow-sm border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors font-medium`}
            >
              {isPlaying ? (
                <>
                  <PauseCircle className={`w-6 h-6 mr-2 ${topic.color}`} />
                  Pause Audio Guide
                </>
              ) : (
                <>
                  <PlayCircle className={`w-6 h-6 mr-2 ${topic.color}`} />
                  Listen to Audio Guide
                </>
              )}
            </button>
          </div>

          <div className="p-8 md:p-12 space-y-12">
            {topic.sections.map((section, index) => (
              <section key={index} className="prose prose-slate max-w-none">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">{section.title}</h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {section.content}
                </p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
