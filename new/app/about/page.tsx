export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-gray-200 pt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-slate-900 text-center mb-8">About Habitad</h1>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Our Mission</h2>
            <p className="text-slate-700 text-lg leading-relaxed mb-6">
              Habitad was built on a simple belief: productivity shouldn’t just be tracked — it should be made effortless.
              We use AI to break down your biggest goals into clear, actionable steps, so progress feels natural instead of overwhelming.
              Grounded in behavioral psychology and wrapped in a clean, intuitive design, Habitad doesn’t just keep you organized — it keeps you moving forward with confidence.
            </p>
            
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">What Makes Us Different</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-slate-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Beautiful by Design</h3>
                <p className="text-slate-700">
                  Every element is crafted with care. We believe that beautiful tools inspire beautiful outcomes.
                </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Science-Backed</h3>
                <p className="text-slate-700">
                  Our features are built on proven research in habit formation, goal setting, and mindfulness.
                </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Holistic Approach</h3>
                <p className="text-slate-700">
                  We address productivity from all angles: planning, habits, mindfulness, and reflection. We believe that
                  growth, if branched out in all areas of life is the best type of growth there is.
                </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-slate-800 mb-3">User-Centric</h3>
                <p className="text-slate-700">
                  Every feature is designed with real user needs and feedback at the center of development.
                  Our personality test ensures that this productivity tool is catered to your personality 
                  type deriving better outcomes.
                </p>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">The Habitad Philosophy</h2>
            <p className="text-slate-700 text-lg leading-relaxed mb-6">
              We believe that productivity isn't about doing more—it's about doing what matters most with 
              intention and joy. Our tools are designed to help you create sustainable systems that support 
              your well-being while achieving your goals.
            </p>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200/50">
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Join Our Community</h3>
              <p className="text-slate-700 mb-4">
                Habitad is more than a tool—it's a community of individuals committed to growth, 
                mindfulness, and intentional living. Together, we're redefining what it means to be productive 
                in the modern world.
              </p>
              <p className="text-slate-600 italic">
                "The best way to get started is to quit talking and begin doing." - Walt Disney
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Ready to Transform Your Productivity?</h2>
            <p className="text-slate-600 text-lg mb-6">
              Start your journey today and discover what intentional productivity can do for your life.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}