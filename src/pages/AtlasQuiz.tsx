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
  ChevronDown,
  ChevronUp,
  FileText,
  Globe,
  GraduationCap,
  Target,
  Award,
  Coffee,
  Phone,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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
  const topRef = useRef<HTMLDivElement | null>(null);
  const paymentTopRef = useRef<HTMLDivElement | null>(null);
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false);
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

  // Ensure the view scrolls to the top of the Atlas section whenever step changes
  useEffect(() => {
    const scrollTarget = currentStep === "payment" && paymentTopRef.current
      ? paymentTopRef.current
      : topRef.current;
    if (scrollTarget) {
      setTimeout(() => {
        scrollTarget.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep]);

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

const renderPaymentForm = () => (
  <Card ref={paymentTopRef} className="max-w-2xl mx-auto bg-black/90 border-primary/30 backdrop-blur-lg shadow-2xl">
    <CardHeader className="text-center">
      <CardTitle className="text-xl sm:text-2xl font-bold text-white flex items-center justify-center gap-2 leading-snug">
        <QrCode className="w-6 h-6" />
        Go to Payment – Scan the QR below to pay ₹60
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6">
      <div className="space-y-6">
        {/* QR Code Fallback */}
        <div className="flex justify-center">
          <div className="bg-white p-3 sm:p-4 rounded-lg">
            <img
              src="/atlas-payment-qr.png"
              alt="Payment QR Code - ₹60"
              className="w-full max-w-[220px] sm:max-w-[240px] md:max-w-[256px] aspect-square object-contain"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg";
                e.currentTarget.alt =
                  "Payment QR Code (Please add atlas-payment-qr.png to public folder)";
              }}
            />
          </div>
        </div>

        {/* Copy UPI ID Button */}
        <div className="text-center space-y-3">
          <p className="text-white/70 text-xs sm:text-sm">or</p>
          <Button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText("nikhilnayak2005-1@okicici");
            }}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] whitespace-normal sm:whitespace-nowrap break-words text-center px-3 leading-snug h-auto min-h-12 max-[360px]:text-sm"
          >
            Copy UPI ID & Pay via GPay / PhonePe / Paytm
          </Button>
          <p className="text-[11px] sm:text-xs text-white/50">
            Paste the UPI ID in your preferred app and complete the ₹60 payment
          </p>
        </div>

        {/* Payment Proof Section */}
        <p className="text-center text-white/70 text-sm sm:text-base">
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

            <div className="bg-black/30 border border-primary/20 rounded-lg p-3 sm:p-4">
              <h3 className="text-white font-semibold mb-3 sm:mb-4 text-base sm:text-lg">
                Payment Proof (Choose one option)
              </h3>
              <div className="space-y-4">
                <FormField
                  control={paymentForm.control}
                  name="paymentScreenshot"
                  render={({ field: { onChange, value, ...field } }) => (
                    <FormItem>
                      <FormLabel className="text-white text-sm sm:text-base">
                        Option 1: Upload Payment Screenshot
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="file"
                            accept="image/*"
                            className="bg-black/50 border-primary/30 text-white file:bg-primary file:text-white file:border-0 file:rounded-md file:px-3 file:py-1 text-sm"
                            onChange={(e) => onChange(e.target.files)}
                            {...field}
                          />
                          <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50 pointer-events-none" />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="text-center text-white/50 text-xs sm:text-sm">OR</div>

                <FormField
                  control={paymentForm.control}
                  name="transactionId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-sm sm:text-base">
                        Option 2: Enter Transaction ID
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter UPI/Payment Transaction ID"
                          className="bg-black/50 border-primary/30 text-white placeholder:text-white/50 text-sm sm:text-base"
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
              className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(26,47,251,0.4)]"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </CardContent>
  </Card>
);

  const renderReceipt = () => (
    <div className="max-w-2xl mx-auto print-receipt print:fixed print:inset-0 print:flex print:items-start print:justify-center print:bg-white print:z-[1000]">
      <Card className="bg-white text-black print-receipt-card print:shadow-none print:border print:border-gray-200 print:w-full print:max-w-none">
        <CardHeader className="text-center print:pb-4">
          <div className="flex justify-center items-center gap-3 mb-2 print:mb-1">
            <img src="/mun-logo.jpg" alt="RNSIT MUNSoc" className="w-10 h-10 rounded-full print:w-8 print:h-8" />
            <span className="text-lg font-semibold hidden print:inline">RNSIT MUNSoc</span>
          </div>
          <div className="flex justify-center mb-4 print:mb-2">
            <CheckCircle className="w-16 h-16 text-green-500 print:w-8 print:h-8" />
          </div>
          {/* Print-only brand title and tagline */}
          <div className="hidden print:block text-center mb-2">
            <div className="text-xl font-extrabold">RNSIT MUNSoc</div>
            <div className="text-sm text-gray-600">Model United Nations</div>
          </div>
          <CardTitle className="text-2xl font-bold print:text-xl print:mb-4">
            Atlas Quiz 2025 - Payment Receipt
          </CardTitle>
          <p className="text-sm text-gray-600 print:text-xs">
            RNS Institute of Technology - MUN Society
          </p>
        </CardHeader>
        <CardContent className="p-6 print:p-4">
          <div className="space-y-4 print:space-y-2">
            <div className="border-b border-gray-300 pb-4 print:pb-2">
              <h3 className="text-lg font-semibold mb-2 print:text-base print:mb-1">Event Details</h3>
              <div className="grid grid-cols-2 gap-2 text-sm print:text-xs">
                <span className="font-medium">Event Name:</span>
                <span>Atlas Quiz Competition</span>
                <span className="font-medium">Date:</span>
                <span>9th October, 2025</span>
                <span className="font-medium">Venue:</span>
                <span>RNSIT Campus</span>
              </div>
            </div>
            
            <div className="border-b border-gray-300 pb-4 print:pb-2">
              <h3 className="text-lg font-semibold mb-2 print:text-base print:mb-1">Participant Details</h3>
              <div className="space-y-1 text-sm print:text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-medium">Participant 1:</span>
                  <span>{receiptData?.participant1Name}</span>
                </div>
                {receiptData?.participant2Name && (
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-medium">Participant 2:</span>
                    <span>{receiptData?.participant2Name}</span>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-medium">Team Name:</span>
                  <span>{receiptData?.teamName}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-medium">Email ID:</span>
                  <span>{receiptData?.emailId}</span>
                </div>
              </div>
            </div>
            
            <div className="border-b border-gray-300 pb-4 print:pb-2">
              <h3 className="text-lg font-semibold mb-2 print:text-base print:mb-1">Payment Information</h3>
              <div className="space-y-1 text-sm print:text-xs">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-500 print:w-4 print:h-4" />
                  <span className="text-green-600 font-semibold">Payment Successful</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-medium">Amount Paid:</span>
                  <span>₹60</span>
                  <span className="font-medium">Payment Proof:</span>
                  <span>{receiptData?.proofType}</span>
                  <span className="font-medium">Receipt ID:</span>
                  <span>{receiptData?.receiptId}</span>
                  <span className="font-medium">Date & Time:</span>
                  <span>{new Date().toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <div className="text-center text-sm print:text-xs text-gray-600 pt-4 print:pt-2">
              <p className="mb-1">Thank you for registering for Atlas Quiz 2025!</p>
              <p>For queries, contact: Aditi Maktedar (9108080956) | V Koushik (9353195315)</p>
              <p className="mt-2">Follow us: @rnsit.mun</p>
            </div>
          </div>
          
          <div className="flex gap-4 mt-6 print:hidden">
            <Button
              onClick={handlePrintReceipt}
              className="flex-1 bg-primary hover:bg-primary/90 text-white"
            >
              <Printer className="mr-2 w-4 h-4" />
              Print / Download Receipt
            </Button>
            <Button
              onClick={handleBackToForm}
              variant="outline"
              className="flex-1 border-primary/30 bg-white text-black hover:bg-primary/10"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-background to-black/80 py-16 sm:py-24">
      <div ref={topRef} />
      <div className="absolute inset-0 bg-[url('/atlas-bg.jpg')] bg-cover bg-center opacity-10" />
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-inter text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
            Atlas Quiz 2025
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto font-medium">
            Gear up for the biggest intercollegiate quiz at{" "}
            <strong>RNSIT</strong> – test your knowledge, compete with
            the brightest, and win exciting rewards!
          </p>
        </div>
        <Layout>
          <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                  <Trophy className="w-5 h-5 text-primary" />
                  <span className="text-primary font-medium">Atlas Intercollege Quiz</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 font-inter tracking-tight">
                  Register for <span className="text-gradient-lusion">Atlas Quiz</span>
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
                  Join us for an exciting intercollege quiz competition. Test your knowledge, compete with brilliant minds, and win amazing prizes!
                </p>
              </div>

              {currentStep === "registration" && (
                <>
                  {/* Event Details */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
                    <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                      <CardContent className="p-6 text-center">
                        <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
                        <h3 className="font-semibold text-white mb-2">Date</h3>
                        <p className="text-white/70">9 October 2025</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                      <CardContent className="p-6 text-center">
                        <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
                        <h3 className="font-semibold text-white mb-2">Venue</h3>
                        <p className="text-white/70">RNSIT Campus</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                      <CardContent className="p-6 text-center">
                        <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                        <h3 className="font-semibold text-white mb-2">Entry Fee</h3>
                        <p className="text-white/70">₹60 per team</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                      <CardContent className="p-6 text-center">
                        <Trophy className="w-8 h-8 text-primary mx-auto mb-3" />
                        <h3 className="font-semibold text-white mb-2">Prize Pool</h3>
                        <p className="text-white/70">₹6,000</p>
                      </CardContent>
                    </Card>
                   </div>

                   {/* Expandable Event Details Section */}
                   <div className="max-w-5xl mx-auto mb-12">
                     <Collapsible open={isEventDetailsOpen} onOpenChange={setIsEventDetailsOpen}>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="default"
                          className="w-full group rounded-xl bg-primary/20 text-white border border-primary/50 shadow-sm hover:bg-primary/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 transition-all duration-300 relative overflow-hidden pl-5 sm:pl-6"
                        >
                          <span aria-hidden className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary to-accent opacity-80" />
                          <div className="flex items-center justify-center gap-2 w-full">
                            <FileText className="w-5 h-5 text-white" />
                            <span className="font-semibold text-base sm:text-lg">Event Details</span>
                            {isEventDetailsOpen ? (
                              <ChevronUp className="w-5 h-5 ml-auto text-white" />
                            ) : (
                              <ChevronDown className="w-5 h-5 ml-auto text-white" />
                            )}
                          </div>
                        </Button>
                      </CollapsibleTrigger>
                       <CollapsibleContent className="animate-accordion-down">
                         <Card className="mt-4 bg-black/40 border-primary/20 backdrop-blur-sm">
                           <CardContent className="p-8">
                             <div className="text-center mb-8">
                               <p className="text-white/90 text-lg leading-relaxed">
                                 The RNSIT Model United Nations Society invites you to the second edition of our Intercollegiate Quiz Competition, 'Atlas'. 
                                 The quiz will test the participants on their knowledge pertaining to current affairs, history, the United Nations, 
                                 national and international politics, etc.
                               </p>
                             </div>
                             
                             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                               {/* Left Column - Icons and Categories */}
                               <div className="space-y-6">
                                 <div className="flex items-start gap-4">
                                   <Calendar className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                                   <div>
                                     <h4 className="text-white font-semibold mb-2">Date & Time</h4>
                                     <p className="text-white/80">9th October, 2025 (Thursday)</p>
                                     <p className="text-white/80">Qualifying Round starts at 1:30 PM sharp</p>
                                     <p className="text-white/70 text-sm">(Arrive at least 30 minutes early for registration and briefing)</p>
                                   </div>
                                 </div>
                                 
                                 <div className="flex items-start gap-4">
                                   <Globe className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                                   <div>
                                     <h4 className="text-white font-semibold mb-2">Topics Covered</h4>
                                     <p className="text-white/80">Global Policies, Indian Politics, World History, Current Affairs, MUN Rules of Procedure (RoPs)</p>
                                   </div>
                                 </div>

                                 {/* Eligibility moved below Topics Covered */}
                                 <div className="flex items-start gap-4">
                                   <GraduationCap className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                                   <div>
                                     <h4 className="text-white font-semibold mb-2">Eligibility</h4>
                                     <p className="text-white/80">Open ONLY for undergraduate students from any college, any stream</p>
                                     <p className="text-white/70 text-sm">Prior registration on website by paying ₹60 is mandatory</p>
                                   </div>
                                 </div>
                                {/* Event Poster placed here */}
                                <div className="mt-2">
                                  <h4 className="text-white font-semibold mb-3">Event Poster</h4>
                                  <div className="relative rounded-2xl overflow-hidden border border-primary/20 bg-black/60 shadow-2xl p-2">
                                    <img
                                      src="/atlas-poster.jpg"
                                      alt="Atlas Quiz Poster"
                                      className="block w-full h-auto object-contain max-h-[700px]"
                                      onError={(e) => { e.currentTarget.src = "/slideshow/atlas_24.JPG"; }}
                                    />
                                  </div>
                                  <p className="text-white/60 text-xs mt-2">Scan the QR on the poster to register or use the forms below.</p>
                                </div>
                               </div>
                               
                               {/* Right Column - Detailed Information */}
                               <div className="space-y-6">
                                 <div className="flex items-start gap-4">
                                   <Target className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                                   <div>
                                     <h4 className="text-white font-semibold mb-2">Competition Rounds</h4>
                                     <p className="text-white/80 mb-2"><strong>Qualifier Round:</strong> Conducted on a 'pen-and-paper' format at the venue, starting at 1:30 PM</p>
                                     <p className="text-white/80"><strong>Final Round:</strong> The top 6 teams from the qualifier round will advance to the finals, which will take place on the same day at the same venue</p>
                                   </div>
                                 </div>
                                 
                                 <div className="flex items-start gap-4">
                                   <Award className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                                   <div>
                                     <h4 className="text-white font-semibold mb-2">Prizes</h4>
                                     <div className="space-y-1 text-white/80">
                                       <p>🥇 First Place: ₹3,000</p>
                                       <p>🥈 Second Place: ₹2,000</p>
                                       <p>🥉 Third Place: ₹1,000</p>
                                       <p>🏅 Other Finalists receive Certificates</p>
                                     </div>
                                   </div>
                                 </div>

                                 {/* Certification */}
                                 <div className="flex items-start gap-4">
                                   <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                                   <div>
                                     <h4 className="text-white font-semibold mb-2">Certification</h4>
                                     <p className="text-white/80">E-certificates will be issued to all participants of the preliminary round.</p>
                                   </div>
                                 </div>
                                 
                                 <div className="flex items-start gap-4">
                                   <Coffee className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                                   <div>
                                     <h4 className="text-white font-semibold mb-2">Facilities</h4>
                                     <div className="space-y-1 text-white/80 text-sm">
                                       <p>• Parking available for 2-wheelers and 4-wheelers</p>
                                       <p>• Restrooms and water stations near the venue</p>
                                       <p>• Food Court open 12:30 PM - 4:45 PM</p>
                                     </div>
                                   </div>
                                 </div>
                                 
                                 <div className="flex items-start gap-4">
                                   <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                                   <div>
                                     <h4 className="text-white font-semibold mb-2">Participant Checklist</h4>
                                     <div className="space-y-1 text-white/80 text-sm">
                                       <p>• Carry your college ID card as proof of eligibility</p>
                                       <p>• Be aware of traffic and road conditions in the city</p>
                                       <p>• Check registered email for updates and instructions</p>
                                     </div>
                                   </div>
                                 </div>
                                
                                {/* Order: Team Size, then Location, then Contact */}
                                <div className="flex items-start gap-4">
                                  <Users className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                                  <div>
                                    <h4 className="text-white font-semibold mb-2">Team Size</h4>
                                    <p className="text-white/80">1 or 2 members per team</p>
                                  </div>
                                </div>

                                <div className="flex items-start gap-4">
                                  <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                                  <div>
                                    <h4 className="text-white font-semibold mb-2">Location</h4>
                                    <p className="text-white/80">RNS Institute of Technology</p>
                                    <a 
                                      href="https://maps.app.goo.gl/gHUuxjH5g3XdaeEy9?g_st=ac" 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-primary hover:text-primary/80 text-sm underline"
                                    >
                                      View on Google Maps
                                    </a>
                                  </div>
                                </div>

                                <div className="flex items-start gap-4">
                                  <Phone className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                                  <div>
                                    <h4 className="text-white font-semibold mb-2">Contact</h4>
                                    <div className="space-y-1 text-white/80 text-sm">
                                      <p>Aditi Maktedar: 9108080956</p>
                                      <p>V Koushik: 9353195315</p>
                                      <p>Follow us: @rnsit.mun 📲</p>
                                    </div>
                                  </div>
                                </div>

                                
                               </div>
                             </div>
                           </CardContent>
                         </Card>
                       </CollapsibleContent>
                     </Collapsible>
                   </div>

                   {renderRegistrationForm()}
                 </>
               )}

              {currentStep === "payment" && renderPaymentForm()}
              {currentStep === "receipt" && renderReceipt()}
            </div>
          </div>
        </Layout>
      </div>
    </section>
  );
};

export default AtlasQuiz;
