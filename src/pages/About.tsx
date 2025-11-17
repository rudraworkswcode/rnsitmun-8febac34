
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Award, Globe, Sparkles, Trophy, BookOpen, Target, Heart, Star } from "lucide-react";

const About = () => {
  const milestones = [
    {
      year: "2023",
      event: "Foundation",
      description: "RNSIT MUN Society was officially established, marking the beginning of diplomatic excellence at RNSIT",
      icon: Sparkles
    },
    {
      year: "May 2024",
      event: "Inauguration",
      description: "Grand inauguration ceremony with distinguished guests and founding members",
      icon: Trophy
    },
    {
      year: "May 2024",
      event: "Nexus 1.0",
      description: "Our first intra-college MUN conference, setting the foundation for future events",
      icon: Globe
    },
    {
      year: "Oct 2024",
      event: "Atlas Quiz",
      description: "Successfully organized quiz championship with 180+ participants",
      icon: Award
    },
    {
      year: "May 2025",
      event: "Nexus 2.0",
      description: "Second edition of our flagship intra-college MUN conference",
      icon: Star
    },
    {
      year: "October 2025",
      event: "Atlas Quiz 2.0",
      description: "Successfully organized quiz championship with 180+ participants",
      icon: Award
    }
  ];

  const values = [
    {
      title: "Beginner-Friendly Approach",
      description: "We welcome students from all backgrounds, providing comprehensive training and support for first-time delegates",
      icon: Heart,
      color: "from-primary/20 to-primary/10"
    },
    {
      title: "Excellence in Diplomacy",
      description: "Fostering the art of negotiation, public speaking, and international relations through immersive experiences",
      icon: Award,
      color: "from-accent/20 to-accent/10"
    },
    {
      title: "Leadership Development",
      description: "Building tomorrow's leaders through hands-on diplomatic training and real-world problem-solving",
      icon: Target,
      color: "from-secondary/20 to-secondary/10"
    },
    {
      title: "Global Perspective",
      description: "Encouraging understanding of international affairs and cross-cultural communication skills",
      icon: Globe,
      color: "from-primary/20 to-accent/10"
    }
  ];

  return (
    <Layout>
      <div className="py-12 md:py-20 bg-background">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent"></div>
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center space-y-8 max-w-5xl mx-auto">
              <div className="space-y-6">
                <h1 className="section-heading-lusion">
                  About{" "}
                  <span className="text-gradient-lusion">
                    RNSIT MUN
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-inter leading-relaxed max-w-3xl mx-auto">
                  Empowering the next generation of diplomats, leaders, and global citizens through excellence in Model United Nations
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6 mt-12">
                <div className="flex items-center space-x-3 bg-card/50 backdrop-blur-sm rounded-full px-8 py-4 border border-border/50">
                  <Calendar className="h-6 w-6 text-primary" />
                  <span className="text-foreground font-inter font-semibold">Founded 2023</span>
                </div>
                <div className="flex items-center space-x-3 bg-card/50 backdrop-blur-sm rounded-full px-8 py-4 border border-border/50">
                  <Users className="h-6 w-6 text-primary" />
                  <span className="text-foreground font-inter font-semibold">180+ Members</span>
                </div>
                <div className="flex items-center space-x-3 bg-card/50 backdrop-blur-sm rounded-full px-8 py-4 border border-border/50">
                  <Trophy className="h-6 w-6 text-primary" />
                  <span className="text-foreground font-inter font-semibold">Multiple Events</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Us Story */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-background via-primary/5 to-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
                Our Story
              </Badge>
              <h2 className="font-inter text-4xl md:text-5xl font-bold text-foreground mb-6">
                The RNSIT MUN Journey
              </h2>
            </div>
            
            <div className="max-w-5xl mx-auto space-y-8">
              <Card className="card-lusion bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-8 md:p-12">
                  <div className="prose prose-lg max-w-none text-muted-foreground font-inter leading-relaxed space-y-6">
                    <p>
                      The RNSIT Model United Nations Society, established in 2023, serves as RNSIT's premier platform dedicated to promoting critical thinking, public speaking, and intellectual engagement. In a short span of time, the Society has emerged as the fastest-growing student organization within RNSIT, gaining recognition for its vibrant community and impactful initiatives.
                    </p>
                    
                    <p>
                      Moreover, the Society has also formed collaborations with esteemed organizations such as KLE Law College MUNSoc, while societies like PES Electronic City MUNSoc and Dayananda Sagar University MUNSoc have acknowledged our growing presence in the MUN circuit.
                    </p>
                    
                    <p>
                      Comprising a dedicated core committee of 15 members and a thriving community of 180 enthusiasts, the Society is committed to its mission of cultivating confidence, enhancing public speaking abilities, developing global awareness, negotiation skills, eloquence and poise.
                    </p>
                    
                    <p>
                      In October 2024, we hosted Atlas 2024—an inter-college Geopolitical Quiz Competition that attracted 170 participants from over 10 colleges. From hosting MUNs to organizing quizzes and building an enthusiastic community, we continue to expand our horizons, striving to create an environment where every member can grow, learn, and contribute meaningfully.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 md:py-28 bg-gradient-to-r from-background via-accent/5 to-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-6 py-3 mb-6">
                <Award className="h-5 w-5 text-primary" />
                <span className="text-primary font-inter font-semibold uppercase tracking-wide text-sm">Testimonials</span>
              </div>
              <h2 className="font-inter text-4xl md:text-5xl font-bold text-foreground mb-6">
                What Leaders Say About Us
              </h2>
            </div>
            
            <div className="space-y-8">
              {/* Principal's Testimonial */}
              <Card className="card-lusion bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-8 md:p-12">
                  <div className="text-center space-y-6">
                    <div className="w-1 h-20 bg-gradient-to-b from-primary to-accent mx-auto rounded-full"></div>
                    <blockquote className="text-xl md:text-2xl text-foreground font-inter leading-relaxed italic">
                      "RNSIT MUN Club is doing very well and purely driven by self motivated bunch of students, and there are over 180 members in the club. This is an initiative to nurture leadership and communication skills among students."
                    </blockquote>
                    <div className="space-y-2">
                      <p className="font-inter text-lg font-bold text-foreground">Dr. Ramesh Babu H S</p>
                      <p className="text-primary font-inter font-semibold">Principal, RNSIT</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Faculty Coordinator's Testimonial */}
              <Card className="card-lusion bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-8 md:p-12">
                  <div className="text-center space-y-6">
                    <div className="w-1 h-20 bg-gradient-to-b from-accent to-primary mx-auto rounded-full"></div>
                    <blockquote className="text-xl md:text-2xl text-foreground font-inter leading-relaxed italic">
                      "RNSIT MUN Club is a new initiative taken by students and doing well by conducting intra and inter-collegiate events. Best wishes to all."
                    </blockquote>
                    <div className="space-y-2">
                      <p className="font-inter text-lg font-bold text-foreground">Prof. T S Bhagavath Singh</p>
                      <p className="text-primary font-inter font-semibold">Faculty Coordinator, RNSIT MUNSoc</p>
                      <p className="text-muted-foreground font-inter text-sm">Associate Professor, Dept. of ISE</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* External Recognition */}
              <Card className="card-lusion bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-8 md:p-12">
                  <div className="text-center space-y-6">
                    <div className="w-1 h-20 bg-gradient-to-b from-primary to-secondary mx-auto rounded-full"></div>
                    <blockquote className="text-xl md:text-2xl text-foreground font-inter leading-relaxed italic">
                      "Well-planned and a well-managed event. Overall a very bright and intelligent team of individuals. Always a pleasure to attend events by the RNSIT MUNSoc."
                    </blockquote>
                    <div className="space-y-2">
                      <p className="font-inter text-lg font-bold text-foreground">T S Charan Kharthik</p>
                      <p className="text-primary font-inter font-semibold">President, DSI MUNSoc</p>
                      <p className="text-muted-foreground font-inter text-sm">Finalist in Atlas 2024</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-6 py-3">
                    <Target className="h-5 w-5 text-primary" />
                    <span className="text-primary font-inter font-semibold uppercase tracking-wide text-sm">Our Mission</span>
                  </div>
                  <h2 className="font-inter text-3xl md:text-4xl font-bold text-foreground">
                    Fostering Diplomatic Excellence
                  </h2>
                  <p className="text-lg text-muted-foreground font-inter leading-relaxed">
                    To create an inclusive platform where students can develop critical thinking, public speaking, and negotiation skills while gaining deep insights into global affairs and international relations. We strive to build confident leaders who can address complex world challenges with empathy and expertise.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-inter text-xl font-bold text-foreground">Our Core Focus Areas:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-muted-foreground font-inter">Comprehensive diplomatic training and mentorship</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-muted-foreground font-inter">Building confidence in public speaking and debate</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-muted-foreground font-inter">Developing global awareness and cultural sensitivity</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-muted-foreground font-inter">Creating networking opportunities and lasting friendships</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="inline-flex items-center space-x-2 bg-accent/10 rounded-full px-6 py-3">
                    <Globe className="h-5 w-5 text-accent" />
                    <span className="text-accent font-inter font-semibold uppercase tracking-wide text-sm">Our Vision</span>
                  </div>
                  <h2 className="font-inter text-3xl md:text-4xl font-bold text-foreground">
                    Shaping Global Leaders
                  </h2>
                  <p className="text-lg text-muted-foreground font-inter leading-relaxed">
                    To establish RNSIT MUN Society as a premier platform for diplomatic education in South India, recognized for producing thoughtful leaders who contribute meaningfully to society. We envision a community where every member grows into a confident global citizen capable of driving positive change.
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border border-primary/10">
                  <div className="space-y-4">
                    <h3 className="font-inter text-xl font-bold text-foreground">What Makes Us Unique:</h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <BookOpen className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-inter font-semibold text-foreground">Beginner-Friendly Environment</p>
                          <p className="text-sm text-muted-foreground">No prior MUN experience required - we train from basics</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Heart className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-inter font-semibold text-foreground">Inclusive Community</p>
                          <p className="text-sm text-muted-foreground">Welcoming students from all departments and backgrounds</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Award className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-inter font-semibold text-foreground">Excellence-Driven</p>
                          <p className="text-sm text-muted-foreground">Focus on quality events and meaningful learning experiences</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 md:py-28 bg-gradient-to-r from-background via-accent/5 to-background relative">
          <div className="absolute inset-0 opacity-40"></div>
          
          <div className="container mx-auto px-4 md:px-6 relative">
            <div className="text-center mb-20">
              <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-6 py-3 mb-6">
                <Star className="h-5 w-5 text-primary" />
                <span className="text-primary font-inter font-semibold uppercase tracking-wide text-sm">Our Values</span>
              </div>
              <h2 className="font-inter text-4xl md:text-5xl font-bold text-foreground mb-6">
                What Drives Us
              </h2>
              <p className="text-xl text-muted-foreground font-inter max-w-3xl mx-auto leading-relaxed">
                Our core values shape every aspect of our society and guide us in creating meaningful diplomatic experiences
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <Card key={index} className="card-lusion bg-card/50 backdrop-blur-sm border-border/50">
                    <CardContent className="p-8 relative">
                      <div className="space-y-6">
                        <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${value.color} shadow-lg`}>
                          <IconComponent className="h-8 w-8 text-primary" />
                        </div>
                        
                        <div className="space-y-3">
                          <h3 className="font-inter text-xl font-bold text-foreground">
                            {value.title}
                          </h3>
                          <p className="text-muted-foreground font-inter leading-relaxed">
                            {value.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-20">
              <div className="inline-flex items-center space-x-2 bg-accent/10 rounded-full px-6 py-3 mb-6">
                <Calendar className="h-5 w-5 text-accent" />
                <span className="text-accent font-inter font-semibold uppercase tracking-wide text-sm">Our Journey</span>
              </div>
              <h2 className="font-inter text-4xl md:text-5xl font-bold text-foreground mb-6">
                Milestones & Achievements
              </h2>
              <p className="text-xl text-muted-foreground font-inter max-w-3xl mx-auto leading-relaxed">
                From our founding to major events, here's how we've grown and evolved as a society
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-secondary"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => {
                  const IconComponent = milestone.icon;
                  const isEven = index % 2 === 0;
                  
                  return (
                    <div key={index} className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      <div className={`flex-1 ${isEven ? 'md:pr-8' : 'md:pl-8'}`}>
                        <Card className="card-lusion bg-card/50 backdrop-blur-sm border-border/50">
                          <CardContent className="p-6">
                            <div className="space-y-4">
                              <div className="flex items-center space-x-3">
                                <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold px-4 py-2">
                                  {milestone.year}
                                </Badge>
                                <IconComponent className="h-5 w-5 text-primary" />
                              </div>
                              <h3 className="font-inter text-xl font-bold text-foreground">
                                {milestone.event}
                              </h3>
                              <p className="text-muted-foreground font-inter leading-relaxed">
                                {milestone.description}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-8 h-8 bg-card border-4 border-primary rounded-full flex items-center justify-center shadow-lg">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                      </div>
                      
                      <div className="flex-1 hidden md:block"></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-primary/20 to-accent/20"></div>
          <div className="absolute inset-0 bg-background/80"></div>
          
          <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="space-y-6">
                <h2 className="font-inter text-4xl md:text-5xl font-bold text-foreground leading-tight">
                  Be Part of Our 
                  <span className="block text-gradient-lusion">
                    Diplomatic Legacy
                  </span>
                </h2>
                <p className="text-xl md:text-2xl text-muted-foreground font-inter leading-relaxed">
                  Join a community that values growth, excellence, and the power of diplomatic dialogue to change the world
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
                <a
                  href="/contact"
                  className="btn-lusion inline-flex items-center justify-center space-x-3"
                >
                  <span>Join Our Society</span>
                  <Users className="h-5 w-5" />
                </a>
                <a
                  href="/events"
                  className="btn-lusion-outline inline-flex items-center justify-center space-x-3"
                >
                  <span>View Our Events</span>
                  <Globe className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
