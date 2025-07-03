export const branches = [
  {
    id: 1,
    name: "Main Hospital Branch",
    address: "123 Main Street, City Center",
    phone: "(+84) 123-456-789"
  },
  {
    id: 2,
    name: "North District Branch",
    address: "456 North Avenue, North District",
    phone: "(+84) 987-654-321"
  },
  {
    id: 3,
    name: "East Medical Center",
    address: "789 East Road, East District",
    phone: "(+84) 456-789-123"
  }
];

export const doctors = [
  {
    id: 1,
    name: "John Smith",
    specialization: "Cardiology",
    qualification: "MD, PhD in Cardiology",
    experience: 15,
    image: "/images/team-item.jpg",
    branchId: 1
  },
  {
    id: 2,
    name: "Sarah Johnson",
    specialization: "Pediatrics",
    qualification: "MD, Specialist in Pediatrics",
    experience: 10,
    image: "/images/team-item1.jpg",
    branchId: 1
  },
  {
    id: 3,
    name: "Michael Brown",
    specialization: "Neurology",
    qualification: "MD, Neurosurgery Specialist",
    experience: 12,
    image: "/images/team-item2.jpg",
    branchId: 2
  },
  {
    id: 4,
    name: "Emily Davis",
    specialization: "Dermatology",
    qualification: "MD, Dermatology Expert",
    experience: 8,
    image: "/images/team-item.jpg",
    branchId: 2
  },
  {
    id: 5,
    name: "Robert Wilson",
    specialization: "Orthopedics",
    qualification: "MD, Orthopedic Surgeon",
    experience: 20,
    image: "/images/team-item1.jpg",
    branchId: 3
  }
];

export const generateTimeSlots = (doctorId, selectedDate) => {
  const slots = [];
  const currentDate = new Date();
  const targetDate = new Date(selectedDate);

  // Return empty if selected date is in the past
  if (targetDate < new Date(currentDate.setHours(0,0,0,0))) {
    return slots;
  }

  // Generate slots between 9 AM and 5 PM
  const startHour = 9;
  const endHour = 17;
  const slotDuration = 30; // 30 minutes per slot

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += slotDuration) {
      // Randomly skip some slots to simulate unavailable times
      if (Math.random() > 0.3) {
        const startTime = new Date(selectedDate);
        startTime.setHours(hour, minute, 0);
        
        const endTime = new Date(startTime);
        endTime.setMinutes(endTime.getMinutes() + slotDuration);

        slots.push({
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          available: true
        });
      }
    }
  }

  return slots;
}; 