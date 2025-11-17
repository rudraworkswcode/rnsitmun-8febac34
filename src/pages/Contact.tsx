import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Mail, Phone, Send } from "lucide-react";

const Contact = () => {
  return (
    <Layout>
      <div className="py-12 md:py-20 bg-background">
        {/* Enhanced Hero Section */}
        <section className="relative py-16 sm:py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center space-y-6 sm:space-y-8 max-w-5xl mx-auto safe-area-inset-top">
              <h1 className="font-inter text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight">
                Contact{" "}
                <span className="text-gradient-lusion">Us</span>
              </h1>
              <p className="font-inter text-lg sm:text-xl text-center text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Get in touch with the RNSIT MUN Society
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mt-12 sm:mt-16">
                {/* Enhanced Contact Form */}
                <div className="card-lusion bg-card hover:border-primary/30">
                  <h2 className="font-inter text-xl sm:text-2xl font-bold mb-6 text-foreground">Send us a message</h2>
                  <form className="space-y-4 sm:space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
                        Your Name
                      </label>
                      <Input id="name" placeholder="Enter your name" className="w-full h-12" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                        Email Address
                      </label>
                      <Input id="email" type="email" placeholder="Enter your email" className="w-full h-12" />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground mb-2">
                        Subject
                      </label>
                      <Input id="subject" placeholder="Enter subject" className="w-full h-12" />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
                        Message
                      </label>
                      <Textarea id="message" placeholder="Enter your message" className="w-full min-h-[120px] resize-none" />
                    </div>
                    <Button type="submit" className="btn-lusion w-full group">
                      <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                      Send Message
                    </Button>
                  </form>
                </div>

                {/* Enhanced Contact Info */}
                <div className="space-y-6 sm:space-y-8">
                  <h2 className="font-inter text-xl sm:text-2xl font-bold text-foreground">Contact Information</h2>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4 p-4 rounded-xl bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors">
                      <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-foreground font-inter">Address</h3>
                        <p className="text-muted-foreground mt-1 leading-relaxed">
                          RNSIT Campus, Channasandra, <br />
                          Bengaluru, Karnataka
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 p-4 rounded-xl bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors">
                      <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-foreground font-inter">Email</h3>
                        <a href="mailto:mun@rnsit.ac.in" className="text-primary hover:text-primary/80 transition-colors mt-1 inline-block">
                          mun@rnsit.ac.in
                        </a>
                      </div>
                    </div>

                    {/* Enhanced Google Map */}
                    <div className="mt-6 w-full h-64 sm:h-80 rounded-xl overflow-hidden shadow-lg border border-border/20">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62233.40282680153!2d77.4636513!3d12.9093054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3fe7b07fa2cd%3A0xc870fbdf77bd5f83!2sRNS%20Institute%20Of%20Technology!5e0!3m2!1sen!2sin!4v1716038882322!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="RNSIT Location"
                        className="rounded-xl"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Contact;
