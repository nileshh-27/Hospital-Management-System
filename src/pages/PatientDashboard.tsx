
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Mock data for upcoming appointments
  const upcomingAppointments = [
    {
      id: 1,
      doctorName: "Dr. Sarah Johnson",
      speciality: "Cardiologist",
      date: "May 10, 2025",
      time: "10:30 AM",
      status: "Confirmed"
    },
    {
      id: 2,
      doctorName: "Dr. Michael Chen",
      speciality: "Neurologist",
      date: "May 15, 2025",
      time: "3:15 PM",
      status: "Pending"
    }
  ];

  // Mock data for past appointments
  const pastAppointments = [
    {
      id: 3,
      doctorName: "Dr. Emily Rodriguez",
      speciality: "Dermatologist",
      date: "April 28, 2025",
      time: "9:00 AM",
      status: "Completed"
    },
    {
      id: 4,
      doctorName: "Dr. James Wilson",
      speciality: "Orthopedist",
      date: "April 15, 2025",
      time: "11:45 AM",
      status: "Completed"
    }
  ];

  // Mock prescription data
  const prescriptions = [
    {
      id: 1,
      medication: "Amoxicillin",
      dosage: "500mg",
      frequency: "3 times daily",
      startDate: "April 28, 2025",
      endDate: "May 5, 2025",
      doctor: "Dr. Emily Rodriguez"
    },
    {
      id: 2,
      medication: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      startDate: "April 15, 2025",
      endDate: "Ongoing",
      doctor: "Dr. Sarah Johnson"
    }
  ];

  // Mock test results
  const testResults = [
    {
      id: 1,
      testName: "Complete Blood Count",
      date: "April 25, 2025",
      status: "Completed",
      resultSummary: "Normal"
    },
    {
      id: 2,
      testName: "Chest X-Ray",
      date: "April 20, 2025",
      status: "Completed",
      resultSummary: "Minor abnormalities detected"
    }
  ];

  const handleBookAppointment = () => {
    navigate("/book-appointment");
  };

  const handleCancelAppointment = (id: number) => {
    toast({
      title: "Appointment Cancelled",
      description: `Appointment #${id} has been cancelled.`,
    });
  };

  const handleViewAppointment = (id: number) => {
    navigate(`/appointment/${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Patient Dashboard</h1>

      {/* Patient Profile Summary */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 flex flex-wrap items-center gap-6">
        <Avatar className="w-20 h-20">
          <AvatarImage src="/placeholder.svg" alt="Patient" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-semibold">John Doe</h2>
          <p className="text-gray-600">john.doe@example.com</p>
          <p className="text-gray-600">Patient ID: P12345678</p>
        </div>
        <div className="ml-auto flex flex-wrap gap-3">
          <Button onClick={() => navigate("/edit-profile")}>Edit Profile</Button>
          <Button variant="outline" onClick={() => navigate("/medical-history")}>Medical History</Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Book Appointment</CardTitle>
            <CardDescription>Schedule a visit with our specialists</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
          <CardFooter>
            <Button onClick={handleBookAppointment} className="w-full">Book Now</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Request Prescription</CardTitle>
            <CardDescription>Request medication refills</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">Need to refill your medication? Request a prescription renewal from your doctor.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate("/request-prescription")} className="w-full">Request Refill</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Virtual Consultation</CardTitle>
            <CardDescription>Talk to a doctor online</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">Can't visit in person? Schedule a virtual consultation with our healthcare professionals.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate("/virtual-consultation")} className="w-full">Schedule</Button>
          </CardFooter>
        </Card>
      </div>

      {/* Appointments, Prescriptions, and Test Results */}
      <Tabs defaultValue="appointments" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="testResults">Test Results</TabsTrigger>
        </TabsList>
        
        <TabsContent value="appointments">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Upcoming Appointments</h3>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="border-b pb-4 last:border-0 flex flex-wrap items-center justify-between">
                  <div>
                    <p className="font-medium">{appointment.doctorName}</p>
                    <p className="text-sm text-gray-600">{appointment.speciality}</p>
                    <p className="text-sm text-gray-600">{appointment.date} at {appointment.time}</p>
                    <Badge className={
                      appointment.status === "Confirmed" ? "bg-green-500" : 
                      appointment.status === "Pending" ? "bg-yellow-500" : 
                      "bg-blue-500"
                    }>
                      {appointment.status}
                    </Badge>
                  </div>
                  <div className="flex gap-2 mt-2 sm:mt-0">
                    <Button variant="outline" size="sm" onClick={() => handleViewAppointment(appointment.id)}>View</Button>
                    <Button variant="destructive" size="sm" onClick={() => handleCancelAppointment(appointment.id)}>Cancel</Button>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-semibold mb-4 mt-8">Past Appointments</h3>
            <div className="space-y-4">
              {pastAppointments.map((appointment) => (
                <div key={appointment.id} className="border-b pb-4 last:border-0 flex flex-wrap items-center justify-between">
                  <div>
                    <p className="font-medium">{appointment.doctorName}</p>
                    <p className="text-sm text-gray-600">{appointment.speciality}</p>
                    <p className="text-sm text-gray-600">{appointment.date} at {appointment.time}</p>
                    <Badge variant="outline">{appointment.status}</Badge>
                  </div>
                  <div className="flex gap-2 mt-2 sm:mt-0">
                    <Button variant="outline" size="sm" onClick={() => handleViewAppointment(appointment.id)}>View</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="prescriptions">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Active Prescriptions</h3>
            <div className="space-y-4">
              {prescriptions.map((prescription) => (
                <div key={prescription.id} className="border-b pb-4 last:border-0">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{prescription.medication}</p>
                      <p className="text-sm text-gray-600">
                        {prescription.dosage} - {prescription.frequency}
                      </p>
                      <p className="text-sm text-gray-600">
                        {prescription.startDate} to {prescription.endDate}
                      </p>
                      <p className="text-sm text-gray-600">
                        Prescribed by: {prescription.doctor}
                      </p>
                    </div>
                    <div>
                      <Button variant="outline" size="sm" onClick={() => navigate(`/prescription/${prescription.id}`)}>
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="testResults">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Test Results</h3>
            <div className="space-y-4">
              {testResults.map((test) => (
                <div key={test.id} className="border-b pb-4 last:border-0">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{test.testName}</p>
                      <p className="text-sm text-gray-600">Date: {test.date}</p>
                      <p className="text-sm text-gray-600">Status: {test.status}</p>
                      <p className="text-sm text-gray-600">Result: {test.resultSummary}</p>
                    </div>
                    <div>
                      <Button variant="outline" size="sm" onClick={() => navigate(`/test-result/${test.id}`)}>
                        View Report
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientDashboard;
