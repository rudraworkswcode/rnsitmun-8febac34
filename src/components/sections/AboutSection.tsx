import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Award, Target, Globe, Users, Calendar, Trophy, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('about-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const values = [
    {
      title: "Beginner-Friendly Approach",
      description: "We welcome students from all backgrounds, providing comprehensive training and support for first-time delegates",
      icon: Heart,
      gradient: "from-primary/20 to-primary/10"
    },
    {
      title: "Excellence in Diplomacy",
      description: "Fostering the art of negotiation, public speaking, and international relations through immersive experiences",
      icon: Award,
      gradient: "from-accent/20 to-accent/10"
    },
    {
      title: "Leadership Development",
      description: "Building tomorrow's leaders through hands-on diplomatic training and real-world problem-solving",
      icon: Target,
      gradient: "from-primary/20 to-primary/10"
    },
    {
      title: "Global Perspective",
      description: "Encouraging understanding of international affairs and cross-cultural communication skills",
      icon: Globe,
      gradient: "from-primary/20 to-accent/10"
    }
  ];

  const stats = [
    { icon: Calendar, label: "Founded", value: "2023" },
    { icon: Users, label: "Members", value: "180+" },
    { icon: Trophy, label: "Events", value: "5+" },
    { icon: Globe, label: "Committees", value: "12+" }
  ];

  return (
    <section id="about-section" className="py-12 md:py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-lusion-float" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-12 ${isVisible ? 'lusion-fade-in' : 'opacity-0'}`}>
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            About RNSIT MUN
          </Badge>
          <h2 className="section-heading-lusion">
            Empowering the Next Generation of{" "}
            <span className="text-gradient-lusion">Global Leaders</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-inter leading-relaxed font-medium">
            The RNSIT Model United Nations Society, established in 2023, serves as RNSIT's premier platform dedicated to promoting critical thinking, public speaking, and intellectual engagement.
          </p>
        </div>

        {/* Stats Section */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-5 mb-12 ${isVisible ? 'lusion-fade-in' : 'opacity-0'}`}>
          {stats.map((stat, index) => (
            <Card key={index} className="card-lusion">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground font-inter">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-inter">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Story */}
          <div className={`space-y-6 ${isVisible ? 'lusion-fade-in' : 'opacity-0'}`}>
            <h3 className="font-inter text-3xl font-bold text-foreground">
              Our Story
            </h3>
            <div className="space-y-4 text-muted-foreground font-inter leading-relaxed">
              <p>
                In a short span of time, the Society has emerged as the fastest-growing student organization within RNSIT, gaining recognition for its vibrant community and impactful initiatives.
              </p>
              <p>
                Comprising a dedicated core committee of 15 members and a thriving community of 180 enthusiasts, the Society is committed to cultivating confidence, enhancing public speaking abilities, and developing global awareness.
              </p>
              <p>
                From hosting MUNs to organizing quizzes and building an enthusiastic community, we continue to expand our horizons, striving to create an environment where every member can grow, learn, and contribute meaningfully.
              </p>
            </div>
            <Button asChild className="btn-lusion">
              <Link to="/about" className="inline-flex items-center">
                Learn More About Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Mission Card */}
          <Card className="card-lusion bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-inter text-2xl font-bold text-foreground">Our Mission</h3>
                <p className="text-muted-foreground font-inter leading-relaxed">
                  To create an inclusive platform where students can develop critical thinking, public speaking, and negotiation skills while gaining deep insights into global affairs and international relations.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm text-muted-foreground font-inter">Comprehensive diplomatic training</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm text-muted-foreground font-inter">Building confidence in public speaking</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm text-muted-foreground font-inter">Developing global awareness</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Values Grid */}
        <div className={`${isVisible ? 'lusion-fade-in' : 'opacity-0'}`}>
          <div className="text-center mb-12">
            <h3 className="font-inter text-3xl font-bold text-foreground mb-4">
              Our Core Values
            </h3>
            <p className="text-muted-foreground font-inter max-w-2xl mx-auto">
              The principles that guide our mission and shape our community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={index} className={`card-lusion bg-gradient-to-br ${value.gradient} border-border/50`}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 flex-shrink-0">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-inter text-lg font-semibold text-foreground">{value.title}</h4>
                      <p className="text-sm text-muted-foreground font-inter leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;