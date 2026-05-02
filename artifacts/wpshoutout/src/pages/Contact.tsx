import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Megaphone, Handshake, Newspaper, UserPlus } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(_values: z.infer<typeof formSchema>) {
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    form.reset();
  }

  const cards = [
    {
      icon: Megaphone,
      title: "Advertise",
      desc: "Advertise with WP Shoutout across its shows and reach out to WordPress fans worldwide.",
    },
    {
      icon: Handshake,
      title: "Collaborate",
      desc: "Want to collaborate for a business opportunity? We are all ears to hear it out from you.",
    },
    {
      icon: Newspaper,
      title: "PR",
      desc: "Reach the worldwide WordPress community for your PR efforts. Tell us about your product or service.",
    },
    {
      icon: UserPlus,
      title: "Join",
      desc: "WPShoutOut community is growing by the day. We would like to have you on-board and add value with your contributions.",
    },
  ];

  return (
    <div className="w-full pt-32 pb-24">
      <div className="container px-4 md:px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20 max-w-2xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-muted-foreground">
            Whether you want to sponsor a season, join the team, or just say hi.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {cards.map((card) => (
              <div
                key={card.title}
                className="bg-card p-6 rounded-2xl border border-border hover:border-primary/50 transition-colors"
              >
                <card.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-bold font-display mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card/50 p-8 md:p-10 rounded-3xl border border-border"
          >
            <h2 className="text-2xl font-display font-bold mb-6">Send a Message</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} className="bg-background border-border" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          {...field}
                          className="bg-background border-border"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="How can we help you?"
                          className="min-h-[140px] bg-background border-border resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" className="w-full rounded-full h-14 text-lg">
                  Send Message
                </Button>
              </form>
            </Form>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              This site is protected by reCAPTCHA and the Google{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                Terms of Service
              </a>{" "}
              apply.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
