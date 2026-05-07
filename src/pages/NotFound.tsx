import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft, Mountain } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-himalaya-black text-white flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sunrise-gold/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-2xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-24 h-24 bg-sunrise-gold/10 text-sunrise-gold rounded-3xl flex items-center justify-center mx-auto mb-8 relative">
            <Compass className="w-12 h-12 animate-[spin_10s_linear_infinite]" />
            <div className="absolute -top-2 -right-2 bg-red-500 w-6 h-6 rounded-full border-4 border-himalaya-black flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">!</span>
            </div>
          </div>

          <h1 className="text-8xl md:text-9xl font-display font-bold tracking-tighter mb-4 text-white/20">
            404
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Looks like you're <span className="text-sunrise-gold">Lost in the Clouds</span>
          </h2>
          
          <p className="text-white/60 text-lg mb-12 max-w-md mx-auto">
            The path you're looking for has been covered by snow or doesn't exist on our trail map yet.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 bg-sunrise-gold text-black px-8 py-4 rounded-2xl font-bold hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] transition-all group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Base Camp
            </Link>
            
            <Link 
              to="/book" 
              className="flex items-center gap-2 glass px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all"
            >
              <Mountain className="w-5 h-5" />
              Start a New Journey
            </Link>
          </div>
        </motion.div>

        {/* Footer info for 404 */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-24 pt-8 border-t border-white/5"
        >
          <p className="text-white/30 text-sm italic">
            "Not all those who wander are lost, but this page definitely is."
          </p>
        </motion.div>
      </div>
    </div>
  );
};
