
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-100 to-white">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Welcome to Edoc Hospital
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Providing world-class healthcare services with compassion and excellence. 
              Our team of dedicated specialists is committed to your well-being.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => navigate("/book-appointment")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg"
              >
                Book Appointment <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={() => navigate("/login")} 
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 text-lg"
              >
                Patient Login
              </Button>
            </div>
          </div>
        </div>
        <div className="hidden lg:block absolute right-0 top-0 h-full w-1/3 bg-contain bg-no-repeat bg-right" 
             /*style={{backgroundImage: "url('/placeholder.svg')"}}*/></div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Specialized Care",
              description: "Access to specialists across all major medical disciplines",
              icon: "🏥"
            },
            {
              title: "24/7 Emergency",
              description: "Round-the-clock emergency care for critical situations",
              icon: "🚑"
            },
            {
              title: "Online Consultations",
              description: "Convenient virtual appointments with our healthcare professionals",
              icon: "💻"
            }
          ].map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Patients Say</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "The care I received at Edoc Hospital was exceptional. The staff was attentive and the doctors were thorough.",
                name: "Sarah Johnson",
                role: "Patient"
              },
              {
                quote: "I'm grateful for the quick response during my emergency. The team at Edoc Hospital saved my life.",
                name: "Michael Chen",
                role: "Patient"
              },
              {
                quote: "The online consultation service was convenient and professional. Highly recommended!",
                name: "Emily Rodriguez",
                role: "Patient"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow">
                <p className="italic mb-4 text-gray-600">"{testimonial.quote}"</p>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to experience quality healthcare?</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Book your appointment today or contact us for more information about our services.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Button 
            onClick={() => navigate("/book-appointment")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg"
          >
            Book Appointment
          </Button>
          <Button 
            onClick={() => navigate("/contact")} 
            variant="outline" 
            className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 text-lg"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
