
import Layout from "@/components/layout/Layout";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { Users, Award, Globe, Sparkles } from "lucide-react";

const delegationMembers = [
  {
    name: "Aaditya Raj",
    department: "Computer Science (AI & ML)",
    filename: "aaditya raj_cse(aiml).jpg",
    role: "Delegate"
  },
  {
    name: "Adith D H",
    department: "Electronics and Communication Engineering",
    filename: "Adith D H (ECE A SEM 1).jpg",
    role: "Delegate"
  },
  {
    name: "Aditi Sanjay Revankar",
    department: "Computer Science - Data Science",
    filename: "AditiSanjayRevankar_5thSem_CS-DS.jpg",
    role: "Delegate"
  },
  {
    name: "Alankrita Singh",
    department: "Computer Science",
    filename: "Alankrita_Singh(CSE).jpg",
    role: "Delegate"
  },
  {
    name: "Arckit Arihant",
    department: "Computer Science (AI & ML)",
    filename: "Arckit Arihant_ CSE(AIML).jpg",
    role: "Delegate"
  },
  {
    name: "J V Benakasree",
    department: "Computer Science",
    filename: "J V Benakasree_CSE.jpg",
    role: "Delegate"
  },
  {
    name: "Karthik Prasad M",
    department: "Computer Science - Data Science",
    filename: "Karthik Prasad M_CS(DS).jpg",
    role: "Delegate"
  },
  {
    name: "Lavanya Rao",
    department: "Electronics and Communication Engineering",
    filename: "Lavanya Rao_EC.jpg",
    role: "Delegate"
  },
  {
    name: "Malla Varshini",
    department: "Computer Science - Data Science",
    filename: "Malla Varshini_CS-DS.jpg",
    role: "Delegate"
  },
  {
    name: "Manasi",
    department: "Data Science",
    filename: "Manasi(DS).jpg",
    role: "Delegate"
  },
  {
    name: "Nishita Bhat",
    department: "Computer Science – Cybersecurity",
    filename: "Nishita Bhat (CSE-CY) sem-1.jpg",
    role: "Delegate"
  },
  {
    name: "Samartha D N",
    department: "Computer Science – Cybersecurity",
    filename: "Samartha D N -- CSE-CY.jpg",
    role: "Delegate"
  },
  {
    name: "Sinchana Dv",
    department: "Electronics and Communication Engineering",
    filename: "Sinchana Dv ECE.jpg",
    role: "Delegate"
  },
  {
    name: "Surabhi Rao",
    department: "Electronics and Communication Engineering",
    filename: "Surabhi Rao_EC.jpg",
    role: "Delegate"
  },
  {
    name: "Varun A",
    department: "Electrical and Electronics Engineering",
    filename: "Varun A - eee.JPG",
    role: "Delegate"
  },
  {
    name: "Zeyan Shahid Khan",
    department: "Computer Science",
    filename: "Zeyan Shahid Khan (CSE).jpg",
    role: "Delegate"
  },
];

const coreTeam = [
  {
    name: "Nikhil Nayak",
    title: "President",
    image: "/MEMBERS/CC Members/Nikhil Nayak.JPG",
  },
  {
    name: "V Koushik",
    title: "Vice President",
    image: "/MEMBERS/CC Members/Koushik.jpg",
  },
  {
    name: "Harsh Ringsia",
    title: "Core Team Member",
    image: "/MEMBERS/CC Members/Harsh Ringsia.jpg",
  },
  {
    name: "Aditi Maktedar",
    title: "Core Team Member",
    image: "/MEMBERS/CC Members/Aditi Maktedar.jpg",
  },
  {
    name: "Vamshi Ganesh",
    title: "Core Team Member",
    image: "/MEMBERS/CC Members/Vamshi.jpg",
  },
  {
    name: "Tasmiya Afreen",
    title: "Core Team Member",
    image: "/MEMBERS/CC Members/Tasmiya.jpg",
  },
  {
    name: "Shivam Sharma",
    title: "Core Team Member",
    image: "/placeholder.svg",
  },
  {
    name: "Druthi TY",
    title: "Core Team Member",
    image: "/MEMBERS/CC Members/Druthi TY.jpg",
  },
  {
    name: "Vivek D Vagale",
    title: "Core Team Member",
    image: "/MEMBERS/CC Members/Vivek D Vagale.jpg",
  },
  {
    name: "Aditi Revankar",
    title: "Core Team Member",
    image: "/MEMBERS/CC Members/Aditi Revankar.jpg",
  },
  {
    name: "Anagha MR",
    title: "Core Team Member",
    image: "/MEMBERS/CC Members/Anagha MR.jpg",
  },
  {
    name: "Varshini",
    title: "Core Team Member",
    image: "/MEMBERS/CC Members/Varshini.jpg",
  },
  {
    name: "Nihal N",
    title: "Core Team Member",
    image: "/MEMBERS/CC Members/Nihal N(Aiml).jpg",
  },
  {
    name: "Yamini Mouli C",
    title: "Core Team Member",
    image: "/placeholder.svg",
  }
];

const Members = () => {
  return (
    <Layout>
      <div className="py-12 md:py-20 bg-background">
        {/* Enhanced Hero Section */}
        <section className="relative py-16 sm:py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10"></div>
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center space-y-6 sm:space-y-8 max-w-5xl mx-auto safe-area-inset-top">
              <div className="space-y-4 sm:space-y-6">
                <h1 className="font-inter text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight">
                  Our{" "}
                  <span className="text-gradient-lusion block sm:inline">
                    Members
                  </span>
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground font-inter leading-relaxed max-w-4xl mx-auto">
                  Meet the passionate individuals who drive excellence in diplomacy and shape the future of global leadership
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 mt-8 sm:mt-12">
                <div className="flex items-center space-x-2 sm:space-x-3 bg-primary/10 backdrop-blur-sm rounded-full px-4 sm:px-6 lg:px-8 py-3 sm:py-4 border border-primary/20 hover:bg-primary/20 transition-all duration-300">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-primary" />
                  <span className="text-primary font-inter font-semibold text-sm sm:text-base">180+ Active Members</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 bg-primary/10 backdrop-blur-sm rounded-full px-4 sm:px-6 lg:px-8 py-3 sm:py-4 border border-primary/20 hover:bg-primary/20 transition-all duration-300">
                  <Award className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-primary" />
                  <span className="text-primary font-inter font-semibold text-sm sm:text-base">14 Core Leaders</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 bg-primary/10 backdrop-blur-sm rounded-full px-4 sm:px-6 lg:px-8 py-3 sm:py-4 border border-primary/20 hover:bg-primary/20 transition-all duration-300">
                  <Globe className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-primary" />
                  <span className="text-primary font-inter font-semibold text-sm sm:text-base">Multiple Departments</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Committee */}
        <section className="py-16 sm:py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6 border border-primary/20">
                <Award className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <span className="text-primary font-inter font-semibold uppercase tracking-wide text-xs sm:text-sm">Leadership</span>
              </div>
              <h2 className="section-heading-lusion text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6">
                Core Committee
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground font-inter max-w-4xl mx-auto leading-relaxed">
                Dedicated leaders who guide our society with vision, passion, and commitment to excellence in diplomatic education
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {coreTeam.map((member, index) => (
                <div key={index} className="group relative">
                  <div className="card-lusion bg-card hover:border-primary/30 hover:shadow-[0_0_40px_hsl(var(--primary)_/_0.1)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
                    
                    <div className="aspect-[4/5] relative overflow-hidden rounded-t-2xl">
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                        <Badge className="bg-primary/90 text-primary-foreground font-semibold px-2 sm:px-3 py-1 shadow-lg text-xs sm:text-sm">
                          Core Team
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="p-4 sm:p-6 space-y-2">
                      <div className="space-y-1 sm:space-y-2">
                        <h3 className="font-inter text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {member.name}
                        </h3>
                        <p className="text-primary font-inter font-semibold text-xs sm:text-sm uppercase tracking-wider">
                          {member.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Delegation Team */}
        <section className="py-16 sm:py-20 lg:py-28 bg-primary/5 relative">
          <div className="absolute inset-0 opacity-40" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${encodeURIComponent(getComputedStyle(document.documentElement).getPropertyValue('--primary').replace(/\s/g, '').replace('hsl(', '').replace(')', '').split(' ').join(''))}' fill-opacity='0.03'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <div className="inline-flex items-center space-x-2 bg-accent/10 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6 border border-accent/20">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                <span className="text-accent font-inter font-semibold uppercase tracking-wide text-xs sm:text-sm">Our Community</span>
              </div>
              <h2 className="section-heading-lusion text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6">
                Delegation Team
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground font-inter max-w-4xl mx-auto leading-relaxed">
                Talented delegates from diverse academic backgrounds united by their passion for diplomacy and global affairs
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
              {delegationMembers.map((member, index) => (
                <HoverCard key={index}>
                  <HoverCardTrigger asChild>
                    <div className="group cursor-pointer touch-manipulation">
                      <div className="relative overflow-hidden rounded-xl bg-card shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-border/20 hover:border-primary/30">
                        <div className="aspect-square relative overflow-hidden">
                          <img
                            src={`/MEMBERS/delegation/${member.filename}`}
                            alt={member.name}
                            className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-110"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.src = '/mun-logo.jpg';
                            }}
                            style={{
                              backgroundColor: 'hsl(var(--muted))'
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <p className="font-inter font-semibold text-xs uppercase tracking-wide">
                              View Profile
                            </p>
                          </div>
                        </div>
                        <div className="p-2 sm:p-3">
                          <h3 className="font-inter font-semibold text-xs sm:text-sm text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2">
                            {member.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-72 sm:w-80 p-4 bg-card/95 backdrop-blur-sm border border-border/20 shadow-2xl">
                    <div className="flex space-x-3 sm:space-x-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden shadow-md flex-shrink-0">
                        <img
                          src={`/MEMBERS/delegation/${member.filename}`}
                          alt={member.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="flex-1 space-y-2 min-w-0">
                        <h4 className="font-inter font-bold text-base sm:text-lg text-foreground line-clamp-1">{member.name}</h4>
                        <p className="text-sm text-muted-foreground font-inter">{member.role}</p>
                        <div className="pt-2">
                          <Badge className="bg-primary/10 text-primary border-primary/20 text-xs font-medium">
                            {member.department}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ))}
            </div>
          </div>
        </section>

        {/* Join Us Section */}
        <section className="py-16 sm:py-20 lg:py-28 relative overflow-hidden safe-area-inset-bottom">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent"></div>
          <div className="absolute inset-0 bg-black/20"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
              <div className="space-y-4 sm:space-y-6">
                <h2 className="font-inter text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Ready to Join Our{" "}
                  <span className="block sm:inline text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text">
                    Diplomatic Family?
                  </span>
                </h2>
                <p className="text-lg sm:text-xl lg:text-2xl text-white/90 font-inter leading-relaxed max-w-4xl mx-auto">
                  Become part of a community that values excellence, fosters growth, and creates tomorrow's global leaders
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mt-8 sm:mt-12">
                <a
                  href="/contact"
                  className="btn-lusion bg-white text-primary hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] group w-full sm:w-auto"
                >
                  <span>Join Our Society</span>
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 ml-2 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="/events"
                  className="btn-lusion-outline border-white text-white hover:bg-white hover:text-primary w-full sm:w-auto group"
                >
                  <span>View Events</span>
                  <Globe className="h-4 w-4 sm:h-5 sm:w-5 ml-2 group-hover:rotate-12 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Members;
