export const mockWorkerStats = [
  { title: "Total Jobs", value: 42, icon: "Briefcase", color: "text-blue-600", bgColor: "bg-blue-100" },
  { title: "Completed", value: 38, icon: "CheckCircle", color: "text-green-600", bgColor: "bg-green-100" },
  { title: "Pending", value: 4, icon: "Clock", color: "text-yellow-600", bgColor: "bg-yellow-100" },
  { title: "Earnings", value: "₹24,500", icon: "IndianRupee", color: "text-purple-600", bgColor: "bg-purple-100" },
];

export const mockRecentJobs = [
  { id: 1, customer: "Rahul Sharma", service: "Plumbing", date: "2024-03-20", status: "Completed", amount: "₹800" },
  { id: 2, customer: "Priya Singh", service: "Electrical", date: "2024-03-19", status: "Completed", amount: "₹1,200" },
  { id: 3, customer: "Amit Patel", service: "Cleaning", date: "2024-03-18", status: "Pending", amount: "₹1,500" },
  { id: 4, customer: "Sanjay Gupta", service: "AC Repair", date: "2024-03-17", status: "Completed", amount: "₹1,200" },
];

export const mockIncomingJobs = [
  {
    id: 101,
    customer: "Sanjay Gupta",
    service: "AC Repair",
    location: "Sector 62, Noida",
    distance: "2.5 km",
    time: "ASAP",
    estimatedPay: "₹1,200",
    description: "AC not cooling properly. Probably needs gas refill."
  },
  {
    id: 102,
    customer: "Megha Verma",
    service: "Home Cleaning",
    location: "Indirapuram, Ghaziabad",
    distance: "5.1 km",
    time: "Today, 4:00 PM",
    estimatedPay: "₹2,000",
    description: "Full deep cleaning of 2BHK apartment."
  },
  {
    id: 103,
    customer: "Vikram Malhotra",
    service: "Electrical",
    location: "Sector 18, Noida",
    distance: "1.2 km",
    time: "Tomorrow, 10:00 AM",
    estimatedPay: "₹500",
    description: "Switchboard repair and one light fixture replacement."
  }
];

export const mockEarningsData = [
  { month: "Jan", amount: 18000 },
  { month: "Feb", amount: 22000 },
  { month: "Mar", amount: 24500 },
];

export const mockReviews = [
  { id: 1, author: "Rahul Sharma", rating: 5, comment: "Excellent work, very professional! Highly recommended.", date: "2024-03-20" },
  { id: 2, author: "Priya Singh", rating: 4, comment: "Good service, arrived on time and fixed the issue quickly.", date: "2024-03-15" },
  { id: 3, author: "Amit Patel", rating: 5, comment: "Very polite and knew exactly what was wrong. Five stars!", date: "2024-03-10" },
];

export const mockWorkerProfile = {
  name: "Rajesh Kumar",
  role: "Multi-service Expert",
  rating: 4.8,
  totalReviews: 32,
  skills: ["Plumbing", "Electrical", "AC Repair", "Cleaning"],
  joinedDate: "Jan 2024",
  status: "Online",
  email: "rajesh.kumar@example.com",
  phone: "+91 98765 43210",
  address: "Sector 45, Noida, Uttar Pradesh"
};
