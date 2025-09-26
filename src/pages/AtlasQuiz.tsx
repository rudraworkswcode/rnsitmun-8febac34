import {
  Calendar,
  MapPin,
  Users,
  Trophy,
  ArrowRight,
  Upload,
  QrCode,
  CheckCircle,
  Printer,
  ArrowLeft,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Registration form schema
const registrationSchema = z
  .object({
    participant1Name: z
      .string()
      .min(2, "Participant 1 name must be at least 2 characters"),
    participant1Contact: z
      .string()
      .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
    participant1Email: z
      .string()
      .email("Please enter a valid email address"),
    participant1USN: z.string().optional(),
    teamSize: z.enum(["1", "2"], { required_error: "Please select team size" }),
    participant2Name: z.string().optional(),
    participant2Contact: z.string().optional(),
    participant2Email: z.string().optional(),
    participant2USN: z.string().optional(),
    streamOfStudy: z.string().min(2, "Stream of study is required"),
    representsRNSIT: z.boolean(),
    institutionName: z.string().optional(),
    teamName: z.string().min(3, "Team name must be at least 3 characters"),
    agreedTerms: z
      .boolean()
      .refine((val) => val === true, "You must agree to terms and conditions"),
  })
  .superRefine((data, ctx) => {
    if (data.teamSize === "2") {
      if (!data.participant2Name || data.participant2Name.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Participant 2 name must be at least 2 characters",
          path: ["participant2Name"],
        });
      }

      if (!data.participant2Contact || !/^[6-9]\d{9}$/.test(data.participant2Contact)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter a valid 10-digit mobile number",
          path: ["participant2Contact"],
        });
      }

      if (!data.participant2Email || !/\S+@\S+\.\S+/.test(data.participant2Email)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter a valid email address",
          path: ["participant2Email"],
        });
      }
    }
  })
  .refine(
    (data) => {
      if (!data.representsRNSIT) {
        return data.institutionName && data.institutionName.length >= 2;
      }
      return true;
    },
    {
      message: "Institution name is required when not representing RNSIT",
      path: ["institutionName"],
    }
  )
  .refine(
    (data) => {
      if (data.representsRNSIT) {
        if (!data.participant1USN || data.participant1USN.length < 3) {
          return false;
        }
        const usn = data.participant1USN.toLowerCase();
        return usn.startsWith('1rx') || usn.startsWith('1rn');
      }
      return true;
    },
    {
      message: "USN must start with 1RX or 1RN",
      path: ["participant1USN"],
    }
  )
  .refine(
    (data) => {
      if (data.representsRNSIT && data.teamSize === "2") {
        if (!data.participant2USN || data.participant2USN.length < 3) {
          return false;
        }
        const usn = data.participant2USN.toLowerCase();
        return usn.startsWith('1rx') || usn.startsWith('1rn');
      }
      return true;
    },
    {
      message: "USN must start with 1RX or 1RN",
      path: ["participant2USN"],
    }
  );

// Payment form schema
const paymentSchema = z.object({
  emailId: z.string().email("Please enter a valid email address"),
  paymentScreenshot: z.any().optional(),
  transactionId: z.string().optional(),
}).refine(
  (data) => {
    return (data.paymentScreenshot && data.paymentScreenshot.length > 0) || 
           (data.transactionId && data.transactionId.length > 0);
  },
  {
    message: "Please provide either a payment screenshot or transaction ID",
    path: ["paymentScreenshot"],
  }
);

type RegistrationData = z.infer<typeof registrationSchema>;
type PaymentData = z.infer<typeof paymentSchema>;

type Step = "registration" | "payment" | "receipt";

interface ReceiptData {
  participant1Name: string;
  participant2Name?: string;
  emailId: string;
  teamName: string;
  receiptId: string;
  proofType: string;
}

const AtlasQuiz = () => {
  const [currentStep, setCurrentStep] = useState<Step>("registration");
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const registrationForm = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      participant1Name: "",
      participant1Contact: "",
      participant1Email: "",
      participant1USN: "",
      teamSize: "1",
      participant2Name: "",
      participant2Contact: "",
      participant2Email: "",
      participant2USN: "",
      streamOfStudy: "",
      representsRNSIT: false,
      institutionName: "",
      teamName: "",
      agreedTerms: false,
    },
  });

  const paymentForm = useForm<PaymentData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      emailId: registrationData?.participant1Email || "",
      transactionId: "",
    },
  });

  const teamSize = registrationForm.watch("teamSize");
  const representsRNSIT = registrationForm.watch("representsRNSIT");

  const onRegistrationSubmit = async (data: RegistrationData) => {
    setRegistrationData(data);
    paymentForm.setValue("emailId", data.participant1Email);
    setCurrentStep("payment");
  };

  const onPaymentSubmit = async (data: PaymentData) => {
    if (!registrationData) return;
    
    setIsSubmitting(true);

    try {
      let screenshotUrl = null;
      let proofType = "";

      // Handle screenshot upload if provided
      if (data.paymentScreenshot && data.paymentScreenshot.length > 0) {
        const file = data.paymentScreenshot[0];
        const fileName = `${Date.now()}_${file.name}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("atlas-quiz-screenshots")
          .upload(fileName, file);

        if (uploadError) {
          throw new Error("Failed to upload payment screenshot");
        }

        const { data: { publicUrl } } = supabase.storage
          .from("atlas-quiz-screenshots")
          .getPublicUrl(fileName);

        screenshotUrl = publicUrl;
        proofType = "Screenshot uploaded";
      }

      // Use transaction ID if screenshot not provided
      if (data.transactionId && data.transactionId.length > 0) {
        proofType = `Transaction ID: ${data.transactionId}`;
      }

      const { error: insertError } = await supabase
        .from("atlas_quiz_registrations")
        .insert({
          participant1_name: registrationData.participant1Name,
          participant1_contact: registrationData.participant1Contact,
          participant1_email: data.emailId,
          participant1_usn: registrationData.participant1USN || null,
          participant2_name: registrationData.participant2Name || null,
          participant2_contact: registrationData.participant2Contact || null,
          participant2_usn: registrationData.participant2USN || null,
          team_size: parseInt(registrationData.teamSize),
          stream: registrationData.streamOfStudy,
          represents_rnsit: registrationData.representsRNSIT,
          institution_name: registrationData.representsRNSIT ? "RNSIT" : registrationData.institutionName,
          team_name: registrationData.teamName,
          screenshot_url: screenshotUrl,
          transaction_id: data.transactionId || null,
        });

      if (insertError) {
        throw new Error("Failed to submit registration");
      }

      const receiptId = `ATLAS-${Date.now()}`;
      setReceiptData({
        participant1Name: registrationData.participant1Name,
        participant2Name: registrationData.participant2Name,
        emailId: data.emailId,
        teamName: registrationData.teamName,
        receiptId,
        proofType,
      });

      toast({
        title: "Registration Successful!",
        description: "Your Atlas Quiz registration has been submitted successfully.",
      });

      setCurrentStep("receipt");
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: "There was an error submitting your registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleBackToForm = () => {
    setCurrentStep("registration");
    setRegistrationData(null);
    setReceiptData(null);
    registrationForm.reset();
    paymentForm.reset();
  };

  const renderRegistrationForm = () => (
    <Card className="max-w-2xl mx-auto bg-black/90 border-primary/30 backdrop-blur-lg shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-white">Registration Form</CardTitle>
        <p className="text-white/70">Fill in your details to register for Atlas Quiz</p>
      </CardHeader>
      <CardContent className="p-6">
        <Form {...registrationForm}>
          <form onSubmit={registrationForm.handleSubmit(onRegistrationSubmit)} className="space-y-6">
            <FormField
              control={registrationForm.control}
              name="participant1Name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Participant 1 Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter participant 1 name"
                      className="bg-black/50 border-primary/30 text-white placeholder:text-white/50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registrationForm.control}
              name="participant1Contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Participant 1 Contact Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter 10-digit mobile number"
                      className="bg-black/50 border-primary/30 text-white placeholder:text-white/50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registrationForm.control}
              name="participant1Email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Participant 1 Email ID</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter email address"
                      className="bg-black/50 border-primary/30 text-white placeholder:text-white/50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registrationForm.control}
              name="teamSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Team Size</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-black/50 border-primary/30 text-white">
                        <SelectValue placeholder="Select team size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Team of 1</SelectItem>
                      <SelectItem value="2">Team of 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {teamSize === "2" && (
              <>
                <FormField
                  control={registrationForm.control}
                  name="participant2Name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Participant 2 Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter participant 2 name"
                          className="bg-black/50 border-primary/30 text-white placeholder:text-white/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registrationForm.control}
                  name="participant2Contact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Participant 2 Contact Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter 10-digit mobile number"
                          className="bg-black/50 border-primary/30 text-white placeholder:text-white/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registrationForm.control}
                  name="participant2Email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Participant 2 Email ID</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter participant 2 email address"
                          className="bg-black/50 border-primary/30 text-white placeholder:text-white/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <FormField
              control={registrationForm.control}
              name="streamOfStudy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Stream of Study</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Computer Science, Mechanical, etc."
                      className="bg-black/50 border-primary/30 text-white placeholder:text-white/50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registrationForm.control}
              name="representsRNSIT"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-4 space-y-0 rounded-xl border border-primary/30 p-4 bg-black/40 hover:border-primary/60 focus-within:ring-2 focus-within:ring-primary/50 transition-colors">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="w-6 h-6 rounded-md border-2 border-primary/50 bg-black/60 text-white data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 shadow-sm"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-white font-semibold">
                      Does the team represent RNSIT?
                    </FormLabel>
                    <p className="text-sm text-white/70">
                      Check this if you are currently a student at RNSIT
                    </p>
                  </div>
                </FormItem>
              )}
            />
            {representsRNSIT && (
              <>
                <FormField
                  control={registrationForm.control}
                  name="participant1USN"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Participant 1 USN</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter USN (e.g., 1RN20CS001)"
                          className="bg-black/50 border-primary/30 text-white placeholder:text-white/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {teamSize === "2" && (
                  <FormField
                    control={registrationForm.control}
                    name="participant2USN"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Participant 2 USN</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter USN (e.g., 1RN20CS002)"
                            className="bg-black/50 border-primary/30 text-white placeholder:text-white/50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </>
            )}
            {!representsRNSIT && (
              <FormField
                control={registrationForm.control}
                name="institutionName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Institution Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your institution name"
                        className="bg-black/50 border-primary/30 text-white placeholder:text-white/50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={registrationForm.control}
              name="teamName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Team Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a catchy team name"
                      className="bg-black/50 border-primary/30 text-white placeholder:text-white/50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registrationForm.control}
              name="agreedTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-4 space-y-0 rounded-xl border border-primary/40 p-4 bg-primary/10 hover:border-primary/60 focus-within:ring-2 focus-within:ring-primary/50 transition-colors">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="w-6 h-6 rounded-md border-2 border-primary/60 bg-black/60 text-white data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 shadow-sm"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-white font-semibold">
                      I agree to the terms and conditions *
                    </FormLabel>
                    <p className="text-sm text-white/70">
                      Required to proceed with registration
                    </p>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(26,47,251,0.4)]"
            >
              Go to Payment <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );

const renderPaymentForm = () => {
  // detect mobile once
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const handleUpiClick = () => {
    if (!isMobile) {
      alert("This payment option works only on mobile devices. Please scan the QR code instead.");
      return;
    }
    window.location.href =
      "upi://pay?pa=nikhilnayak2005-1@okicici&pn=Nikhil&am=60.00&cu=INR&tn=Atlas+Event+Registration";
  };

  const logos = [
    { src: "/gpay.png", alt: "Google Pay" },
    { src: "/phonepe.png", alt: "PhonePe" },
    { src: "/paytm.png", alt: "Paytm" },
    { src: "/bhim.png", alt: "BHIM" },
  ];

  return (
    <Card className="max-w-2xl mx-auto bg-black/90 border-primary/30 backdrop-blur-lg shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-white flex items-center justify-center gap-2">
          <QrCode className="w-6 h-6" />
          Go to Payment – Scan the QR below to pay ₹60
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* QR */}
          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-lg">
              <img
                src="/atlas-payment-qr.png"
                alt="Payment QR Code - ₹60"
                className="w-48 h-48 object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg";
                  e.currentTarget.alt =
                    "Payment QR Code (Please add atlas-payment-qr.png to public folder)";
                }}
              />
            </div>
          </div>

          {/* UPI Payment Link */}
          <div className="text-center space-y-4">
            <p className="text-white/70 text-sm">or</p>

            {/* Animated Logos */}
            <div className="flex justify-center gap-6 flex-wrap">
              {logos.map((logo, index) => (
                <motion.img
                  key={index}
                  src={logo.src}
                  alt={logo.alt}
                  className="w-12 h-12 md:w-16 md:h-16 object-contain rounded-full bg-white p-2"
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                  onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
                />
              ))}
            </div>

            <Button
              type="button"
              onClick={handleUpiClick}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]"
            >
              Pay ₹60 via UPI Apps
            </Button>
            <p className="text-xs text-white/50">
              Works only on mobile. Opens directly in GPay, PhonePe, Paytm, or BHIM
            </p>
          </div>

          {/* Payment Proof */}
          <p className="text-center text-white/70">
            Provide payment proof: Upload screenshot OR enter transaction ID
          </p>

          <Form {...paymentForm}>
            <form
              onSubmit={paymentForm.handleSubmit(onPaymentSubmit)}
              className="space-y-6"
            >
              <FormField
                control={paymentForm.control}
                name="emailId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email ID</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter email address"
                        className="bg-black/50 border-primary/30 text-white placeholder:text-white/50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="bg-black/30 border border-primary/20 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-4">
                  Payment Proof (Choose one option)
                </h3>
                <div className="space-y-4">
                  <FormField
                    control={paymentForm.control}
                    name="paymentScreenshot"
                    render={({ field: { onChange, value, ...field } }) => (
                      <FormItem>
                        <FormLabel className="text-white">
                          Option 1: Upload Payment Screenshot
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="file"
                              accept="image/*"
                              className="bg-black/50 border-primary/30 text-white file:bg-primary file:text-white file:border-0 file:rounded-md file:px-3 file:py-1"
                              onChange={(e) => onChange(e.target.files)}
                              {...field}
                            />
                            <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50 pointer-events-none" />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="text-center text-white/50">OR</div>

                  <FormField
                    control={paymentForm.control}
                    name="transactionId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">
                          Option 2: Enter Transaction ID
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter UPI/Payment Transaction ID"
                            className="bg-black/50 border-primary/30 text-white placeholder:text-white/50"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormMessage />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(26,47,251,0.4)]"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default AtlasQuiz;
