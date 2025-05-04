
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We'll respond shortly.",
      });
      
      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const locations = [
    {
      name: "Main Campus",
      address: "Babukhan Chambers, Road No. 10, Avenue 4, Banjara Hills, Hyderabad, Telangana 500034",
      phone: "040 6810 6589",
      email: "edocb@hosp.email.com",
      hours: "24/7 Emergency Services, Regular Hours: 8:00 AM - 8:00 PM, Inpatient/Outpatient"
    },
    {
      name: "Secondary Branch",
      address: "16-6-104 to 109, Old Kamal Theater Complex Chaderghat Road, Opp Niagara Hotel, Chaderghat, Hyderabad, Telangana 500024",
      phone: "040 6810 6589",
      email: "edocm@hosp.email.com",
      hours: "24/7 Emergency Services, Regular Hours: 8:00 AM - 8:00 PM"
    },
    {
      name: "Posh Branch",
      address: "Old Mumbai Hwy, near Cyberabad Police Commissionerate, Jayabheri Pine Valley, HITEC City, Hyderabad, Telangana 500032",
      phone: "040 6810 6589",
      email: "edoch@hosp.email.com",
      hours: "Monday - Friday: 8:30 AM - 5:30 PM, Saturday: 9:00 AM - 2:00 PM, Sunday7:00 AM - 10:00 PM"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
      
      {/* Contact Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="p-6 text-center flex flex-col items-center">
          <Phone className="h-12 w-12 text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Call Us</h2>
          <p className="text-gray-600 mb-4">Have a question? Call our 24/7 helpline.</p>
          <a href="tel:040 6810 6589" className="text-blue-600 font-medium hover:underline">
          040 6810 6589
          </a>
        </Card>
        
        <Card className="p-6 text-center flex flex-col items-center">
          <Mail className="h-12 w-12 text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Email Us</h2>
          <p className="text-gray-600 mb-4">Send us an email and we'll get back to you.</p>
          <a href="mailto:info@edochospital.com" className="text-blue-600 font-medium hover:underline">
            info@edochospital.com
          </a>
        </Card>
        
        <Card className="p-6 text-center flex flex-col items-center">
          <MapPin className="h-12 w-12 text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Visit Us</h2>
          <p className="text-gray-600 mb-4">Come see our state-of-the-art facilities.</p>
          <span className="text-blue-600 font-medium">Multiple Locations</span>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john.doe@example.com"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(123) 456-7890"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Appointment Inquiry"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Please provide details about your inquiry..."
                rows={6}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
        
        {/* Locations Information */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Our Locations</h2>
          <div className="space-y-8">
            {locations.map((location, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-semibold mb-3">{location.name}</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-blue-600 mr-3 mt-1 shrink-0" />
                    <span>{location.address}</span>
                  </div>
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-blue-600 mr-3 mt-1 shrink-0" />
                    <a href={`tel:${location.phone}`} className="hover:text-blue-600">
                      {location.phone}
                    </a>
                  </div>
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-blue-600 mr-3 mt-1 shrink-0" />
                    <a href={`mailto:${location.email}`} className="hover:text-blue-600">
                      {location.email}
                    </a>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-blue-600 mr-3 mt-1 shrink-0" />
                    <span>{location.hours}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="flex items-center">
                    Get Directions <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {/* Map - In a real project, you'd integrate Google Maps or another mapping service */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Find Us</h2>
        <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600">Map integration would be implemented here</p>
            <p className="text-sm text-gray-500 mt-2">Showing all EdocHospital locations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
