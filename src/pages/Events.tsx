import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  Users,
  Award,
  Globe,
  Sparkles,
  Trophy,
} from "lucide-react";

const Events = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Nexus 3.0",
      subtitle: "Building on Success",
      date: "November 21-22, 2025",
      location: "ECE Block, Hitech Lab",
      description:
        "The Third edition of our intra-college MUN, continuing the tradition of diplomatic engagement and excellence.",
      status: "upcoming",
      participants: "60+ Delegates",
      committees: ["IntraMUN"],
      image: "/mun-logo.jpg",
      highlight: true,
      icon: Trophy,
    },
      id: 2,
      title: "RNSMUN 2025",
      subtitle: "The Annual Flagship MUN Conference",
      date: "December 2025",
      location: "RNSIT Campus",
      description:
        "RNSMUN 2025 will bring together delegates from across the nation for an immersive diplomatic experience featuring engaging committees, thought-provoking agendas, and a platform to showcase leadership.",
      status: "upcoming",
      participants: "-",
      committees: ["-"],
      image: "/mun-logo.jpg",
      highlight: true,
      icon: Globe,
    }
  ];

  const pastEvents = [
    {
      id: 3,
      title: "Inauguration Ceremony",
      subtitle: "The Beginning of Excellence",
      date: "May 17, 2024",
      location: "MBA Block, 3rd Floor Seminar Hall",
      description:
        "The grand inauguration ceremony marking the official launch of RNSIT MUN Society with distinguished guests and founding members.",
      status: "completed",
      participants: "100+ Attendees",
      committees: ["Inaugural Event"],
      image: "/mun-logo.jpg",
      icon: Sparkles,
    },
    {
      id: 4,
      title: "Nexus 1.0 - Intra MUN",
      subtitle: "Our First Conference",
      date: "May 17-18, 2024",
      location: "MBA Block, 3rd Floor Seminar Hall",
      description:
        "Our inaugural intra-college Model United Nations conference, setting the foundation for diplomatic excellence at RNSIT.",
      status: "completed",
      participants: "80+ Delegates",
      committees: ["IntraMUN"],
      image: "/mun-logo.jpg",
      icon: Trophy,
    },
    {
      id: 5,
      title: "Atlas Quiz Championship",
      subtitle: "Test Your Global Knowledge",
      date: "October 23, 2024",
      location: "RNSIT Campus",
      description:
        "An engaging quiz competition testing participants' knowledge of global affairs, geography, and international relations.",
      status: "completed",
      participants: "180+ Participants",
      committees: ["Quiz Competition"],
      image: "/mun-logo.jpg",
      icon: Award,
    },
    {
      id: 6,
      title: "Nexus 2.0",
      subtitle: "Building on Success",
      date: "May 30-31, 2025",
      location: "ECE Block, Hitech Lab",
      description:
        "The second edition of our intra-college MUN, continuing the tradition of diplomatic engagement and excellence.",
      status: "completed",
      participants: "60+ Delegates",
      committees: ["IntraMUN"],
      image: "/mun-logo.jpg",
      icon: Trophy,
    },
    {
      id: 6,
      title: "ATLAS Quiz 2.0",
      subtitle: "The Intercollege Quiz",
      date: "9 October 2025",
      location: "RNSIT Campus",
      description:
        "ATLAS Quiz is RNSIT's flagship intercollegiate quiz competition, bringing together some of the sharpest minds to compete across diverse topics including current affairs, history, science, and culture.",
      status: "Completed",
      participants: "100+ Teams",
      prizePool: "₹6000",
      image: "/atlas-quiz-banner.jpg",
      highlight: false,
      icon: Trophy,
    }   
  ];

  const EventCard = ({
    event,
    featured = false,
  }: {
    event: any;
    featured?: boolean;
  }) => {
    const IconComponent = event.icon;

    return (
      <Card
        className={`group relative overflow-hidden transition-all duration-700 hover:shadow-2xl hover:-translate-y-3 border border-border/20 bg-card/90 backdrop-blur-xl hover:border-primary/30 ${
          featured ? "lg:col-span-2 shadow-xl" : "shadow-lg"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

        <CardContent className="p-0 relative">
          <div className="relative overflow-hidden">
            <div
              className={`absolute inset-0 bg-gradient-to-r from-primary to-accent ${
                featured ? "h-48" : "h-40"
              }`}
            >
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <IconComponent className="h-16 w-16 text-white/80" />
              </div>
            </div>

            <div
              className={`relative ${featured ? "h-48" : "h-40"} flex items-end p-6`}
            >
              <div className="absolute top-4 right-4">
                <Badge
                  className={`${
                    event.status === "upcoming"
                      ? "bg-emerald-500 hover:bg-emerald-600"
                      : event.status === "planning"
                      ? "bg-blue-500 hover:bg-blue-600"
                      : event.status === "closed"
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-slate-500 hover:bg-slate-600"
                  } text-white font-semibold px-4 py-2 shadow-lg transition-colors`}
                >
                  {event.status === "upcoming"
                    ? "Upcoming"
                    : event.status === "planning"
                    ? "In Planning"
                    : event.status === "closed"
                    ? "Closed"
                    : "Completed"}
                </Badge>
              </div>

              {event.highlight && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold px-4 py-2 shadow-lg animate-pulse">
                    ✨ Featured
                  </Badge>
                </div>
              )}
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-4 sm:space-y-6">
            <div className="space-y-2 sm:space-y-3">
              <h3
                className={`font-inter font-bold text-foreground group-hover:text-primary transition-colors ${
                  featured ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
                }`}
              >
                {event.title}
              </h3>
              <p className="text-primary font-inter font-semibold text-xs sm:text-sm uppercase tracking-wider">
                {event.subtitle}
              </p>
            </div>

            <p className="text-muted-foreground font-inter leading-relaxed text-sm sm:text-base">
              {event.description}
            </p>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {/* Date */}
              <div className="flex items-center space-x-2 sm:space-x-3 text-foreground bg-primary/5 rounded-lg p-3 transition-colors group-hover:bg-primary/10">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <span className="font-inter font-medium text-sm sm:text-base">
                  {event.date}
                </span>
              </div>

              {/* Venue */}
              <div className="flex items-center space-x-2 sm:space-x-3 text-foreground bg-primary/5 rounded-lg p-3 transition-colors group-hover:bg-primary/10">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <span className="font-inter font-medium text-sm sm:text-base">
                  {event.location}
                </span>
              </div>

              {/* Participants */}
              <div className="flex items-center space-x-2 sm:space-x-3 text-foreground bg-primary/5 rounded-lg p-3 transition-colors group-hover:bg-primary/10">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <span className="font-inter font-medium text-sm sm:text-base">
                  {event.participants}
                </span>
              </div>

              {/* Committees */}
              {event.committees && (
                <div className="flex items-center space-x-2 sm:space-x-3 text-foreground bg-primary/5 rounded-lg p-3 transition-colors group-hover:bg-primary/10">
                  <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                  <span className="font-inter font-medium text-sm sm:text-base">
                    {event.committees.join(", ")}
                  </span>
                </div>
              )}

              {/* Prize Pool - shown last */}
              {event.prizePool && (
                <div className="flex items-center space-x-2 sm:space-x-3 text-foreground bg-primary/5 rounded-lg p-3 transition-colors group-hover:bg-primary/10 md:col-span-2">
                  <Award className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                  <span className="font-inter font-medium text-sm sm:text-base">
                    Prize Pool: {event.prizePool}
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Layout>
      <div className="py-12 md:py-20 bg-background">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10"></div>
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center space-y-6 sm:space-y-8 max-w-5xl mx-auto safe-area-inset-top">
              <div className="space-y-4 sm:space-y-6">
                <h1 className="font-inter text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight">
                  Events &{" "}
                  <span className="text-gradient-lusion block sm:inline">
                    Conferences
                  </span>
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground font-inter leading-relaxed max-w-4xl mx-auto">
                  Experience transformative diplomatic gatherings that shape the
                  next generation of global leaders and change-makers
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-16 sm:py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6 border border-primary/20">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <span className="text-primary font-inter font-semibold uppercase tracking-wide text-xs sm:text-sm">
                  What's Next
                </span>
              </div>
              <h2 className="section-heading-lusion text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6">
                Upcoming Events
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground font-inter max-w-4xl mx-auto leading-relaxed">
                Join us for transformative experiences that will enhance your
                diplomatic skills, expand your global understanding, and connect
                you with like-minded leaders
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {upcomingEvents.map((event, index) => (
                <EventCard
                  key={event.id}
                  event={event}
                  featured={index === 0}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Past Events */}
        <section className="py-16 sm:py-20 lg:py-28 bg-primary/5 relative">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.03'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <div className="inline-flex items-center space-x-2 bg-accent/10 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6 border border-accent/20">
                <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                <span className="text-accent font-inter font-semibold uppercase tracking-wide text-xs sm:text-sm">
                  Our Journey
                </span>
              </div>
              <h2 className="section-heading-lusion text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6">
                Past Achievements
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground font-inter max-w-4xl mx-auto leading-relaxed">
                Celebrating our successful events that have shaped diplomatic
                excellence and fostered the growth of future global leaders
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Events;
