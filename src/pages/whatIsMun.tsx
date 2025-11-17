
import React from "react";
import Layout from "@/components/layout/Layout";
import { Globe, Users, Award, MessageCircle, TrendingUp, Heart } from "lucide-react";

const WhatIsMun = () => {
  const benefits = [
    {
      icon: MessageCircle,
      title: "Speak with Confidence",
      description: "Master the art of public speaking and articulate your thoughts with clarity and conviction in any setting."
    },
    {
      icon: Globe,
      title: "Think Globally",
      description: "Develop a comprehensive understanding of international relations, global politics, and cross-cultural diplomacy."
    },
    {
      icon: Users,
      title: "Collaborate Effectively",
      description: "Learn to negotiate, build consensus, and work with diverse teams to achieve common goals."
    },
    {
      icon: TrendingUp,
      title: "Stand Out Professionally",
      description: "Enhance your resume with invaluable leadership, communication, and analytical skills that employers value."
    },
    {
      icon: Heart,
      title: "Build Lasting Connections", 
      description: "Network with like-minded individuals from various backgrounds and create friendships that last a lifetime."
    },
    {
      icon: Award,
      title: "Achieve Excellence",
      description: "Develop critical thinking, research skills, and the confidence to tackle complex global challenges."
    }
  ];

  return (
    <Layout>
      <div className="py-12 md:py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-r from-mun-primary via-mun-secondary to-mun-tertiary overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h1 className="font-playfair text-4xl md:text-6xl font-bold text-white leading-tight">
                What is Model United Nations?
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-opensans leading-relaxed max-w-3xl mx-auto">
                Step into the shoes of world leaders and diplomats in this transformative simulation of global governance
              </p>
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mt-6">
                <Globe className="h-5 w-5 text-white" />
                <span className="text-white font-opensans font-medium">Empowering Tomorrow's Leaders</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              {/* Definition Card */}
              <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-16 border-l-4 border-mun-primary">
                <h2 className="font-playfair text-2xl md:text-3xl font-bold text-mun-dark mb-6">
                  The MUN Experience
                </h2>
                <p className="text-lg md:text-xl text-gray-700 font-opensans leading-relaxed">
                  Model United Nations (MUN) is an immersive educational simulation where students embody the roles of 
                  international delegates, representing different countries in various UN committees. Participants engage 
                  in substantive debates on pressing global issues, draft comprehensive resolutions, and master the 
                  sophisticated arts of diplomacy, negotiation, and international cooperation.
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="mb-16">
                <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center text-mun-dark mb-4">
                  Why Join Our MUN Society?
                </h2>
                <p className="text-lg text-gray-600 font-opensans text-center max-w-2xl mx-auto mb-12">
                  Discover the transformative benefits that await you in our vibrant MUN community
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {benefits.map((benefit, index) => (
                    <div 
                      key={index}
                      className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 hover:-translate-y-2 border-t-4 border-mun-primary"
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="p-3 bg-mun-primary/10 rounded-lg group-hover:bg-mun-primary/20 transition-colors">
                          <benefit.icon className="h-6 w-6 text-mun-primary" />
                        </div>
                        <h3 className="font-playfair text-xl font-bold text-mun-dark">
                          {benefit.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 font-opensans leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-mun-primary to-mun-secondary rounded-2xl p-8 md:p-12 text-center text-white shadow-2xl">
                <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
                  Ready to Shape the Future?
                </h2>
                <p className="text-xl font-opensans mb-8 max-w-2xl mx-auto leading-relaxed">
                  Whether you're a seasoned diplomat or taking your first steps into international relations, 
                  MUN offers an unparalleled opportunity to develop skills that will serve you throughout your career.
                </p>
                <p className="text-2xl font-playfair font-bold">
                  The journey begins right here at <span className="text-yellow-300">RNSIT</span>.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <a
                    href="/contact"
                    className="bg-white text-mun-primary font-opensans font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    Join Our Community
                  </a>
                  <a
                    href="/events"
                    className="border-2 border-white text-white font-opensans font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-mun-primary transition-all duration-300"
                  >
                    Explore Events
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default WhatIsMun;
