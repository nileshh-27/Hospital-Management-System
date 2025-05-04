
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

const BookAppointment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [appointmentType, setAppointmentType] = useState("in-person");
  const [department, setDepartment] = useState("");
  const [doctor, setDoctor] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [reason, setReason] = useState("");
  const [step, setStep] = useState(1);

  // Mock data for departments
  const departments = [
    { id: "cardiology", name: "Cardiology" },
    { id: "neurology", name: "Neurology" },
    { id: "pediatrics", name: "Pediatrics" },
    { id: "orthopedics", name: "Orthopedics" },
    { id: "dermatology", name: "Dermatology" }
  ];

  // Mock data for doctors
  const doctors = {
    cardiology: [
      { id: "dr1", name: "Dr. Maria Rodriguez", availability: ["9:00 AM", "10:00 AM", "2:00 PM"] },
      { id: "dr2", name: "Dr. James Wilson", availability: ["11:00 AM", "3:00 PM", "4:00 PM"] }
    ],
    neurology: [
      { id: "dr3", name: "Dr. John Smith", availability: ["9:30 AM", "1:30 PM", "3:30 PM"] },
      { id: "dr4", name: "Dr. Emily Davis", availability: ["10:30 AM", "1:00 PM", "4:30 PM"] }
    ],
    pediatrics: [
      { id: "dr5", name: "Dr. Sarah Johnson", availability: ["8:00 AM", "11:30 AM", "2:30 PM"] },
      { id: "dr6", name: "Dr. Michael Brown", availability: ["9:00 AM", "12:00 PM", "3:00 PM"] }
    ],
    orthopedics: [
      { id: "dr7", name: "Dr. Robert Lee", availability: ["10:00 AM", "1:00 PM", "4:00 PM"] },
      { id: "dr8", name: "Dr. Jennifer Taylor", availability: ["8:30 AM", "11:00 AM", "2:00 PM"] }
    ],
    dermatology: [
      { id: "dr9", name: "Dr. Daniel Martinez", availability: ["9:00 AM", "11:30 AM", "3:30 PM"] },
      { id: "dr10", name: "Dr. Lisa Anderson", availability: ["10:30 AM", "1:30 PM", "4:00 PM"] }
    ]
  };

  const handleSubmit = () => {
    toast({
      title: "Appointment Booked",
      description: "Your appointment has been scheduled successfully.",
    });
    navigate("/patient-dashboard");
  };

  const handleNext = () => {
    if (step === 1 && !department) {
      toast({
        title: "Department Required",
        description: "Please select a department before proceeding.",
        variant: "destructive",
      });
      return;
    }
    
    if (step === 2 && !doctor) {
      toast({
        title: "Doctor Required",
        description: "Please select a doctor before proceeding.",
        variant: "destructive",
      });
      return;
    }
    
    if (step === 3 && !date) {
      toast({
        title: "Date Required",
        description: "Please select an appointment date before proceeding.",
        variant: "destructive",
      });
      return;
    }
    
    if (step === 3 && !selectedTime) {
      toast({
        title: "Time Required",
        description: "Please select an appointment time before proceeding.",
        variant: "destructive",
      });
      return;
    }
    
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const getSelectedDoctorDetails = () => {
    if (!department || !doctor) return null;
    
    const doctorsList = doctors[department as keyof typeof doctors] || [];
    return doctorsList.find(d => d.id === doctor) || null;
  };

  const selectedDoctorDetails = getSelectedDoctorDetails();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Book an Appointment</h1>

      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                    step >= item ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-400 border-gray-300'
                  } mb-2`}
                >
                  {item}
                </div>
                <div className="text-sm text-gray-600">
                  {item === 1 && "Department"}
                  {item === 2 && "Doctor"}
                  {item === 3 && "Date & Time"}
                  {item === 4 && "Confirmation"}
                </div>
              </div>
            ))}
          </div>
          <div className="relative mt-2">
            <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full"></div>
            <div 
              className="absolute top-0 left-0 h-1 bg-blue-600 transition-all"
              style={{ width: `${(step - 1) * 100 / 3}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Select Department */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Select Department</CardTitle>
              <CardDescription>Choose the medical department you need to visit</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {departments.map((dept) => (
                  <div
                    key={dept.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      department === dept.id 
                        ? 'border-blue-600 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                    }`}
                    onClick={() => setDepartment(dept.id)}
                  >
                    <h3 className="font-medium">{dept.name}</h3>
                    <p className="text-sm text-gray-500">
                      Specialized care for {dept.name.toLowerCase()} related conditions
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleNext}>Next</Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 2: Select Doctor */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Select Doctor</CardTitle>
              <CardDescription>Choose a specialist from our medical team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {department && doctors[department as keyof typeof doctors]?.map((doc) => (
                  <div
                    key={doc.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      doctor === doc.id 
                        ? 'border-blue-600 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                    }`}
                    onClick={() => setDoctor(doc.id)}
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-14 w-14">
                        <AvatarFallback>
                          {doc.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{doc.name}</h3>
                        <p className="text-sm text-gray-500">
                          {departments.find(d => d.id === department)?.name}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Available Times: {doc.availability.join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>Back</Button>
              <Button onClick={handleNext}>Next</Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 3: Select Date and Time */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Select Date and Time</CardTitle>
              <CardDescription>Choose when you'd like to schedule your appointment</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="in-person" className="mb-6">
                <TabsList>
                  <TabsTrigger value="in-person" onClick={() => setAppointmentType("in-person")}>In-Person Visit</TabsTrigger>
                  <TabsTrigger value="virtual" onClick={() => setAppointmentType("virtual")}>Virtual Consultation</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Select Date</h3>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => {
                      // Disable dates in the past and Sundays
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return date < today || date.getDay() === 0;
                    }}
                    className="rounded-md border"
                  />
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Select Time</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedDoctorDetails?.availability.map((time) => (
                      <div
                        key={time}
                        className={`border rounded-md p-2 text-center cursor-pointer ${
                          selectedTime === time 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'hover:border-blue-300'
                        }`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-medium mb-3">Reason for Visit</h3>
                    <Textarea
                      placeholder="Please briefly describe the reason for your appointment..."
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>Back</Button>
              <Button onClick={handleNext}>Next</Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Confirm Your Appointment</CardTitle>
              <CardDescription>Please review your appointment details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium text-gray-700 mb-2">Doctor Information</h3>
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar>
                        <AvatarFallback>
                          {selectedDoctorDetails?.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{selectedDoctorDetails?.name}</p>
                        <p className="text-sm text-gray-500">
                          {departments.find(d => d.id === department)?.name}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium text-gray-700 mb-2">Appointment Details</h3>
                    <p><span className="font-medium">Date:</span> {date?.toLocaleDateString()}</p>
                    <p><span className="font-medium">Time:</span> {selectedTime}</p>
                    <p><span className="font-medium">Type:</span> {appointmentType === "in-person" ? "In-Person Visit" : "Virtual Consultation"}</p>
                  </div>
                </div>
                
                {reason && (
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium text-gray-700 mb-2">Reason for Visit</h3>
                    <p className="text-gray-600">{reason}</p>
                  </div>
                )}
                
                {appointmentType === "in-person" && (
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium text-gray-700 mb-2">Hospital Location</h3>
                    <p className="text-gray-600">EdocHospital - Main Campus</p>
                    <p className="text-gray-600">123 Medical Drive, Healthcare City, HC 12345</p>
                    <p className="text-gray-600">Building B, Floor 3</p>
                  </div>
                )}
                
                {/* Patient information - would be pulled from user profile in a real app */}
                <div className="border rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-2">Patient Information</h3>
                  <p><span className="font-medium">Name:</span> John Doe</p>
                  <p><span className="font-medium">Email:</span> john.doe@example.com</p>
                  <p><span className="font-medium">Phone:</span> (123) 456-7890</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>Back</Button>
              <Button onClick={handleSubmit}>Confirm Appointment</Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;
