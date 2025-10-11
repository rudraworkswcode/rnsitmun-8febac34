import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  BookOpen,
  Video,
  FileText,
  Download,
  ExternalLink,
  GraduationCap,
  Users,
  Globe,
  Lightbulb,
  Award,
  Library,
  Newspaper,
  Construction,
} from "lucide-react";

const Resources = () => {
  const [showConstructionDialog, setShowConstructionDialog] = useState(true);
  const resourceCategories = [
    {
      title: "Beginner's Guide",
      icon: GraduationCap,
      description: "Essential resources for first-time delegates",
      color: "from-blue-500 to-cyan-500",
      resources: [
        {
          name: "What is Model UN?",
          type: "Guide",
          description: "Introduction to MUN and how it works",
          icon: BookOpen,
          link: "/what-is-mun",
        },
        {
          name: "Delegate Preparation Checklist",
          type: "Download",
          description: "Complete checklist for conference preparation",
          icon: Download,
          link: "/templates/delegate-preparation-checklist.md",
        },
        {
          name: "Your First Conference",
          type: "Video",
          description: "Tips for preparing for your first MUN",
          icon: Video,
          link: "#",
        },
      ],
    },
    {
      title: "Research & Preparation",
      icon: Library,
      description: "Tools and guides for effective research",
      color: "from-purple-500 to-pink-500",
      resources: [
        {
          name: "Research Notes Template",
          type: "Download",
          description: "Comprehensive template for organizing research",
          icon: Download,
          link: "/templates/research-notes-template.md",
        },
        {
          name: "Position Paper Template",
          type: "Download",
          description: "Standard format for position papers",
          icon: Download,
          link: "/templates/position-paper-template.md",
        },
        {
          name: "Credible Sources List",
          type: "Resource",
          description: "Verified sources for MUN research",
          icon: ExternalLink,
          link: "#",
        },
      ],
    },
    {
      title: "Committee Resources",
      icon: Users,
      description: "Specific guides for different committees",
      color: "from-green-500 to-emerald-500",
      resources: [
        {
          name: "UNHRC Background Guide",
          type: "PDF",
          description: "UN Human Rights Council procedures",
          icon: FileText,
          link: "#",
        },
        {
          name: "UNSC Simulation Guide",
          type: "PDF",
          description: "Security Council specific guidelines",
          icon: FileText,
          link: "#",
        },
        {
          name: "Committee Comparison",
          type: "Guide",
          description: "Differences between various committees",
          icon: BookOpen,
          link: "#",
        },
      ],
    },
    {
      title: "Skills Development",
      icon: Award,
      description: "Improve your diplomacy and speaking skills",
      color: "from-orange-500 to-red-500",
      resources: [
        {
          name: "Public Speaking Tips",
          type: "Video",
          description: "Master the art of diplomatic speech",
          icon: Video,
          link: "#",
        },
        {
          name: "Negotiation Strategies",
          type: "Guide",
          description: "How to build consensus and alliances",
          icon: BookOpen,
          link: "#",
        },
        {
          name: "Resolution Writing Template",
          type: "Download",
          description: "Complete guide to drafting resolutions",
          icon: Download,
          link: "/templates/resolution-template.md",
        },
      ],
    },
  ];

  const externalResources = [
    {
      name: "UN Official Website",
      description: "Official United Nations resources and documents",
      url: "https://www.un.org",
      icon: Globe,
    },
    {
      name: "UN Digital Library",
      description: "Access to UN documents and publications",
      url: "https://digitallibrary.un.org",
      icon: Library,
    },
    {
      name: "Security Council Report",
      description: "Analysis of UN Security Council activities",
      url: "https://www.securitycouncilreport.org",
      icon: Newspaper,
    },
    {
      name: "Best Delegate",
      description: "MUN training and conference news",
      url: "https://bestdelegate.com",
      icon: Award,
    },
  ];

  const quickTips = [
    "Always research your country's foreign policy thoroughly",
    "Practice your speeches before the conference",
    "Arrive early to network with other delegates",
    "Take notes during committee sessions",
    "Don't be afraid to speak - everyone is learning",
    "Build alliances early in the conference",
    "Read the background guide multiple times",
    "Dress professionally - it boosts confidence",
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Guide":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "Video":
        return "bg-purple-500/10 text-purple-600 border-purple-500/20";
      case "PDF":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      case "Download":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "Resource":
        return "bg-orange-500/10 text-orange-600 border-orange-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

  return (
    <>
      {/* Under Construction Dialog */}
      <Dialog open={showConstructionDialog} onOpenChange={setShowConstructionDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center">
                <Construction className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
            <DialogTitle className="text-center text-2xl font-bold">
              Under Construction
            </DialogTitle>
            <DialogDescription className="text-center text-base space-y-4">
              <p className="mt-4">
                We're working hard to bring you comprehensive resources and training materials for your MUN journey.
              </p>
              <p>
                Check back soon for downloadable templates, guides, and educational content!
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button
              onClick={() => setShowConstructionDialog(false)}
              className="bg-primary hover:bg-primary/90"
            >
              Got it, thanks!
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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
            <div className="text-center space-y-6 sm:space-y-8 max-w-5xl mx-auto">
              <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4 border border-primary/20">
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <span className="text-primary font-inter font-semibold uppercase tracking-wide text-xs sm:text-sm">
                  Learning Hub
                </span>
              </div>

              <h1 className="font-inter text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight">
                Delegate{" "}
                <span className="text-gradient-lusion">Resources</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-inter max-w-3xl mx-auto leading-relaxed">
                Everything you need to excel at Model United Nations - from
                beginner guides to advanced strategies, all in one place.
              </p>
            </div>
          </div>
        </section>

        {/* Resource Categories */}
        <section className="py-16 sm:py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16 sm:space-y-20">
              {resourceCategories.map((category, categoryIndex) => {
                const IconComponent = category.icon;
                return (
                  <div key={categoryIndex} className="space-y-8">
                    {/* Category Header */}
                    <div className="flex items-center space-x-4">
                      <div
                        className={`flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${category.color} shadow-lg`}
                      >
                        <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <div>
                        <h2 className="font-inter text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                          {category.title}
                        </h2>
                        <p className="text-muted-foreground font-inter text-sm sm:text-base">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    {/* Resources Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.resources.map((resource, resourceIndex) => {
                        const ResourceIcon = resource.icon;
                        return (
                          <Card
                            key={resourceIndex}
                            className="group hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-2"
                          >
                            <CardContent className="p-6 space-y-4">
                              <div className="flex items-start justify-between">
                                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                  <ResourceIcon className="w-6 h-6 text-primary" />
                                </div>
                                <Badge
                                  className={`${getTypeColor(
                                    resource.type
                                  )} border`}
                                >
                                  {resource.type}
                                </Badge>
                              </div>

                              <div className="space-y-2">
                                <h3 className="font-inter text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                                  {resource.name}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {resource.description}
                                </p>
                              </div>

                              {resource.type === "Download" ? (
                                <Button
                                  variant="ghost"
                                  className="w-full group-hover:bg-primary group-hover:text-white transition-all"
                                  asChild
                                >
                                  <a
                                    href={resource.link}
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <span>Download Template</span>
                                    <Download className="w-4 h-4 ml-2" />
                                  </a>
                                </Button>
                              ) : (
                                <Button
                                  variant="ghost"
                                  className="w-full group-hover:bg-primary group-hover:text-white transition-all"
                                  onClick={() => {
                                    if (resource.link !== "#") {
                                      window.location.href = resource.link;
                                    }
                                  }}
                                >
                                  <span>Access Resource</span>
                                  <ExternalLink className="w-4 h-4 ml-2" />
                                </Button>
                              )}
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* External Resources */}
        <section className="py-16 sm:py-20 lg:py-28 bg-primary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="font-inter text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                External Resources
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Curated list of trusted external websites and databases for
                your research
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {externalResources.map((resource, index) => {
                const IconComponent = resource.icon;
                return (
                  <Card
                    key={index}
                    className="group hover:shadow-xl hover:border-primary/30 transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex-shrink-0">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <h3 className="font-inter text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                            {resource.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {resource.description}
                          </p>
                          <Button
                            variant="link"
                            className="p-0 h-auto text-primary"
                            asChild
                          >
                            <a
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center"
                            >
                              Visit Website
                              <ExternalLink className="w-3 h-3 ml-1" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Quick Tips */}
        <section className="py-16 sm:py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 mb-6">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h2 className="font-inter text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Quick Tips for Success
                </h2>
                <p className="text-lg text-muted-foreground">
                  Bite-sized advice from experienced delegates
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickTips.map((tip, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-sm text-foreground font-inter">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
    </>
  );
};

export default Resources;

