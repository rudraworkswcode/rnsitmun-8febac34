import { MapPin, Users, Calendar, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const LocalSEOSection = () => {
  return (
    <section className="py-16 bg-background/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* India-focused heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            RNSIT <span className="text-gradient-lusion">MUN Society</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Model United Nations society in Karnataka, serving students across Bangalore and South India with diplomatic training and international relations education.
          </p>
        </div>

        {/* Location-specific cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="card-lusion">
            <CardContent className="p-6 text-center">
              <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Located in Bangalore</h3>
              <p className="text-sm text-muted-foreground">
                RNS Institute of Technology, Channasandra, Bangalore - 560098, Karnataka, India
              </p>
            </CardContent>
          </Card>

          <Card className="card-lusion">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Growing Community</h3>
              <p className="text-sm text-muted-foreground">
                Active MUN society with dedicated students from RNSIT and nearby colleges
              </p>
            </CardContent>
          </Card>

          <Card className="card-lusion">
            <CardContent className="p-6 text-center">
              <Calendar className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Regular Activities</h3>
              <p className="text-sm text-muted-foreground">
                MUN conferences and diplomatic training sessions in Bangalore
              </p>
            </CardContent>
          </Card>

          <Card className="card-lusion">
            <CardContent className="p-6 text-center">
              <Award className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Learning Focused</h3>
              <p className="text-sm text-muted-foreground">
                Committed to developing diplomatic skills and global awareness
              </p>
            </CardContent>
          </Card>
        </div>

        {/* India-specific content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">
              About RNSIT MUN in Bangalore
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Educational Focus:</strong> Dedicated to providing quality MUN training and diplomatic education
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Student Development:</strong> Helping students build confidence, public speaking, and critical thinking skills
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Community Building:</strong> Creating connections with MUN societies and students across Karnataka
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Global Awareness:</strong> Fostering understanding of international relations and global issues
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Join Our MUN Community
            </h3>
            <p className="text-muted-foreground mb-4">
              Located in Bangalore's educational hub, RNSIT MUN provides opportunities for students interested in international relations, diplomacy, and global affairs.
            </p>
            <p className="text-muted-foreground mb-4">
              Our society organizes MUN conferences and training sessions, bringing together students from across Karnataka to discuss pressing global issues and develop diplomatic skills.
            </p>
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <p className="text-sm text-primary font-medium">
                📚 Focus: Building diplomatic skills and global awareness through MUN training
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalSEOSection;