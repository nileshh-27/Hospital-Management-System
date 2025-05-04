
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Search, Check, X, Edit, UserPlus, UserX } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for doctors
  const doctors = [
    {
      id: "D12345",
      name: "Dr. Maria Rodriguez",
      speciality: "Cardiologist",
      email: "maria.rodriguez@example.com",
      status: "Active"
    },
    {
      id: "D23456",
      name: "Dr. John Smith",
      speciality: "Neurologist",
      email: "john.smith@example.com",
      status: "Active"
    },
    {
      id: "D34567",
      name: "Dr. Sarah Johnson",
      speciality: "Pediatrician",
      email: "sarah.johnson@example.com",
      status: "On Leave"
    }
  ];

  // Mock data for patients
  const patients = [
    {
      id: "P12345",
      name: "James Wilson",
      email: "james.wilson@example.com",
      lastVisit: "May 5, 2025",
      status: "Active"
    },
    {
      id: "P23456",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      lastVisit: "May 3, 2025",
      status: "Active"
    },
    {
      id: "P34567",
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      lastVisit: "April 28, 2025",
      status: "Inactive"
    }
  ];

  // Mock data for appointments
  const appointments = [
    {
      id: "A12345",
      patientName: "James Wilson",
      doctorName: "Dr. Maria Rodriguez",
      date: "May 10, 2025",
      time: "10:30 AM",
      status: "Scheduled"
    },
    {
      id: "A23456",
      patientName: "Emily Davis",
      doctorName: "Dr. John Smith",
      date: "May 10, 2025",
      time: "2:15 PM",
      status: "Confirmed"
    },
    {
      id: "A34567",
      patientName: "Robert Johnson",
      doctorName: "Dr. Sarah Johnson",
      date: "May 12, 2025",
      time: "9:00 AM",
      status: "Pending"
    }
  ];

  const updateDoctorStatus = (id: string, newStatus: string) => {
    toast({
      title: "Status Updated",
      description: `Doctor ${id} status changed to ${newStatus}.`,
    });
  };

  const updatePatientStatus = (id: string, newStatus: string) => {
    toast({
      title: "Status Updated",
      description: `Patient ${id} status changed to ${newStatus}.`,
    });
  };

  const updateAppointmentStatus = (id: string, newStatus: string) => {
    toast({
      title: "Status Updated",
      description: `Appointment ${id} status changed to ${newStatus}.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Administrator Dashboard</h1>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Doctors</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-blue-600">15</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-green-600">342</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Appointments Today</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-orange-600">28</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">New Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-purple-600">7</p>
          </CardContent>
        </Card>
      </div>

      {/* Management Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Hospital Management</CardTitle>
          <CardDescription>Manage doctors, patients, and appointments</CardDescription>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search by name, ID, or email..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="doctors" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="doctors">Doctors</TabsTrigger>
              <TabsTrigger value="patients">Patients</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
            </TabsList>
            
            <TabsContent value="doctors">
              <div className="flex justify-end mb-4">
                <Button onClick={() => navigate("/admin/add-doctor")}>
                  <UserPlus className="mr-2 h-4 w-4" /> Add Doctor
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="p-3 border-b">Doctor ID</th>
                      <th className="p-3 border-b">Name</th>
                      <th className="p-3 border-b">Speciality</th>
                      <th className="p-3 border-b">Email</th>
                      <th className="p-3 border-b">Status</th>
                      <th className="p-3 border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctors.filter(doctor => 
                      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      doctor.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      doctor.email.toLowerCase().includes(searchQuery.toLowerCase())
                    ).map((doctor) => (
                      <tr key={doctor.id} className="border-b">
                        <td className="p-3">{doctor.id}</td>
                        <td className="p-3">
                          <div className="flex items-center">
                            <Avatar className="w-8 h-8 mr-2">
                              <AvatarFallback>
                                {doctor.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            {doctor.name}
                          </div>
                        </td>
                        <td className="p-3">{doctor.speciality}</td>
                        <td className="p-3">{doctor.email}</td>
                        <td className="p-3">
                          <Badge className={doctor.status === "Active" ? "bg-green-500" : "bg-orange-500"}>
                            {doctor.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => navigate(`/admin/doctor/${doctor.id}`)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className={doctor.status === "Active" ? "text-red-500 border-red-500" : "text-green-500 border-green-500"} 
                              onClick={() => updateDoctorStatus(doctor.id, doctor.status === "Active" ? "On Leave" : "Active")}
                            >
                              {doctor.status === "Active" ? <UserX className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="patients">
              <div className="flex justify-end mb-4">
                <Button onClick={() => navigate("/admin/add-patient")}>
                  <UserPlus className="mr-2 h-4 w-4" /> Add Patient
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="p-3 border-b">Patient ID</th>
                      <th className="p-3 border-b">Name</th>
                      <th className="p-3 border-b">Email</th>
                      <th className="p-3 border-b">Last Visit</th>
                      <th className="p-3 border-b">Status</th>
                      <th className="p-3 border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.filter(patient => 
                      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      patient.email.toLowerCase().includes(searchQuery.toLowerCase())
                    ).map((patient) => (
                      <tr key={patient.id} className="border-b">
                        <td className="p-3">{patient.id}</td>
                        <td className="p-3">
                          <div className="flex items-center">
                            <Avatar className="w-8 h-8 mr-2">
                              <AvatarFallback>
                                {patient.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            {patient.name}
                          </div>
                        </td>
                        <td className="p-3">{patient.email}</td>
                        <td className="p-3">{patient.lastVisit}</td>
                        <td className="p-3">
                          <Badge className={patient.status === "Active" ? "bg-green-500" : "bg-gray-500"}>
                            {patient.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => navigate(`/admin/patient/${patient.id}`)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className={patient.status === "Active" ? "text-red-500 border-red-500" : "text-green-500 border-green-500"} 
                              onClick={() => updatePatientStatus(patient.id, patient.status === "Active" ? "Inactive" : "Active")}
                            >
                              {patient.status === "Active" ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="appointments">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="p-3 border-b">ID</th>
                      <th className="p-3 border-b">Patient</th>
                      <th className="p-3 border-b">Doctor</th>
                      <th className="p-3 border-b">Date & Time</th>
                      <th className="p-3 border-b">Status</th>
                      <th className="p-3 border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.filter(appointment => 
                      appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      appointment.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      appointment.id.toLowerCase().includes(searchQuery.toLowerCase())
                    ).map((appointment) => (
                      <tr key={appointment.id} className="border-b">
                        <td className="p-3">{appointment.id}</td>
                        <td className="p-3">{appointment.patientName}</td>
                        <td className="p-3">{appointment.doctorName}</td>
                        <td className="p-3">{appointment.date} at {appointment.time}</td>
                        <td className="p-3">
                          <Badge className={
                            appointment.status === "Confirmed" ? "bg-green-500" : 
                            appointment.status === "Pending" ? "bg-yellow-500" : 
                            "bg-blue-500"
                          }>
                            {appointment.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => navigate(`/admin/appointment/${appointment.id}`)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className={appointment.status === "Confirmed" ? "" : "text-green-500 border-green-500"}
                              onClick={() => updateAppointmentStatus(appointment.id, "Confirmed")}
                              disabled={appointment.status === "Confirmed"}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
