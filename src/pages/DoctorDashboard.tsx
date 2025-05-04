
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Mock data for today's appointments
  const todayAppointments = [
    {
      id: 1,
      patientName: "John Doe",
      patientId: "P12345678",
      time: "10:30 AM",
      type: "Check-up",
      status: "Checked In"
    },
    {
      id: 2,
      patientName: "Jane Smith",
      patientId: "P87654321",
      time: "11:15 AM",
      type: "Follow-up",
      status: "Waiting"
    },
    {
      id: 3,
      patientName: "Robert Johnson",
      patientId: "P23456789",
      time: "2:00 PM",
      type: "Consultation",
      status: "Scheduled"
    }
  ];

  // Mock data for upcoming appointments
  const upcomingAppointments = [
    {
      id: 4,
      patientName: "Emily Wilson",
      patientId: "P34567890",
      date: "May 10, 2025",
      time: "9:30 AM",
      type: "Check-up",
      status: "Scheduled"
    },
    {
      id: 5,
      patientName: "Michael Brown",
      patientId: "P45678901",
      date: "May 10, 2025",
      time: "11:00 AM",
      type: "Follow-up",
      status: "Scheduled"
    },
    {
      id: 6,
      patientName: "Sarah Davis",
      patientId: "P56789012",
      date: "May 12, 2025",
      time: "3:15 PM",
      type: "Consultation",
      status: "Scheduled"
    }
  ];

  // Mock data for recent patients
  const recentPatients = [
    {
      id: "P12345678",
      name: "John Doe",
      lastVisit: "May 5, 2025",
      condition: "Hypertension",
      status: "Stable"
    },
    {
      id: "P87654321",
      name: "Jane Smith",
      lastVisit: "May 3, 2025",
      condition: "Diabetes Type 2",
      status: "Improving"
    },
    {
      id: "P34567890",
      name: "Emily Wilson",
      lastVisit: "April 28, 2025",
      condition: "Asthma",
      status: "Stable"
    }
  ];

  const handleStartAppointment = (id: number) => {
    navigate(`/appointment/${id}/start`);
  };

  const handleViewPatient = (patientId: string) => {
    navigate(`/patient/${patientId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Doctor Dashboard</h1>

      {/* Doctor Profile Summary */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 flex flex-wrap items-center gap-6">
        <Avatar className="w-20 h-20">
          <AvatarImage src="/placeholder.svg" alt="Doctor" />
          <AvatarFallback>DR</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-semibold">Dr. Maria Rodriguez</h2>
          <p className="text-gray-600">Cardiologist</p>
          <p className="text-gray-600">Medical License: ML1234567</p>
        </div>
        <div className="ml-auto flex flex-wrap gap-3">
          <Button onClick={() => navigate("/doctor/schedule")}>Manage Schedule</Button>
          
        </div>
      </div>

      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Appointments Today</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-blue-600">{todayAppointments.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Patients Seen Today</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-green-600">1</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Pending Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-orange-600">3</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-purple-600">5</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar & Schedule */}
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>May 2025</CardDescription>
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
              <Button variant="outline" className="w-full" onClick={() => navigate("/doctor/schedule")}>
                View Full Schedule
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Patients</CardTitle>
              <CardDescription>Patients you recently treated</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPatients.map((patient) => (
                  <div key={patient.id} className="border-b pb-4 last:border-0">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-gray-600">ID: {patient.id}</p>
                        <p className="text-sm text-gray-600">Last Visit: {patient.lastVisit}</p>
                        <div className="flex items-center mt-1">
                          <span className="text-sm text-gray-600 mr-2">Condition:</span>
                          <Badge variant="outline">{patient.condition}</Badge>
                          <Badge className="ml-2 bg-green-500">{patient.status}</Badge>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleViewPatient(patient.id)}
                        className="h-8"
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => navigate("/doctor/patients")}>
                View All Patients
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Appointments Tabs */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="today" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="today">Today</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                </TabsList>
                
                <TabsContent value="today">
                  <div className="space-y-4">
                    {todayAppointments.map((appointment) => (
                      <div key={appointment.id} className="border-b pb-4 last:border-0">
                        <div className="flex flex-wrap justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{appointment.patientName}</p>
                              <Badge className={
                                appointment.status === "Checked In" ? "bg-green-500" : 
                                appointment.status === "Waiting" ? "bg-yellow-500" : 
                                "bg-blue-500"
                              }>
                                {appointment.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">ID: {appointment.patientId}</p>
                            <p className="text-sm text-gray-600">{appointment.time} - {appointment.type}</p>
                          </div>
                          <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                            <Button 
                              onClick={() => handleViewPatient(appointment.patientId)} 
                              variant="outline" 
                              size="sm"
                            >
                              View Records
                            </Button>
                            <Button 
                              onClick={() => handleStartAppointment(appointment.id)} 
                              size="sm"
                              className={appointment.status === "Scheduled" ? "bg-gray-400" : "bg-blue-600"}
                              disabled={appointment.status === "Scheduled"}
                            >
                              Start Session
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="upcoming">
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="border-b pb-4 last:border-0">
                        <div className="flex flex-wrap justify-between">
                          <div>
                            <p className="font-medium">{appointment.patientName}</p>
                            <p className="text-sm text-gray-600">ID: {appointment.patientId}</p>
                            <p className="text-sm text-gray-600">
                              {appointment.date} at {appointment.time}
                            </p>
                            <p className="text-sm text-gray-600">{appointment.type}</p>
                          </div>
                          <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                            <Button 
                              onClick={() => handleViewPatient(appointment.patientId)} 
                              variant="outline" 
                              size="sm"
                            >
                              View Records
                            </Button>
                            <Button
                              variant="outline" 
                              size="sm" 
                              onClick={() => {
                                toast({
                                  title: "Appointment Rescheduled",
                                  description: "The appointment has been rescheduled.",
                                });
                              }}
                            >
                              Reschedule
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => navigate("/doctor/appointments")}>
                Manage All Appointments
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
