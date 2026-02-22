import React, { useEffect, useState } from "react";
import {
  Star,
  Calendar,
  MessageSquare,
  User,
  Filter,
  Search,
  ChevronRight,
  Clock
} from "lucide-react";
import Button from "../../components/ui/Button.jsx";
import { getClientJobs } from "../../services/jobService.js";
import { useToast } from "../../context/ToastContext.jsx";

function ClientReviews() {
  const { showToast } = useToast();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRating, setFilterRating] = useState("all");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getClientJobs();
        setJobs(data);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Mock reviews data - in real app, this would come from backend
  const mockReviews = [
    {
      id: "r1",
      jobId: "job1",
      jobTitle: "Electrician Needed",
      workerName: "Ramesh Patil",
      workerSkill: "Electrician",
      rating: 5,
      comment: "Excellent work! Very professional and completed the job on time. Would definitely hire again.",
      date: "2024-01-15",
      helpful: 12
    },
    {
      id: "r2",
      jobId: "job2", 
      jobTitle: "Plumbing Repair",
      workerName: "Sohail Khan",
      workerSkill: "Plumber",
      rating: 4,
      comment: "Good service, fixed the leak quickly. Price was reasonable.",
      date: "2024-01-10",
      helpful: 8
    },
    {
      id: "r3",
      jobId: "job3",
      jobTitle: "Carpentry Work",
      workerName: "Ajay Sutar", 
      workerSkill: "Carpenter",
      rating: 5,
      comment: "Amazing craftsmanship! Very detail-oriented and cleaned up after the job.",
      date: "2024-01-05",
      helpful: 15
    }
  ];

  const filteredReviews = mockReviews.filter(review => {
    const matchesSearch = review.workerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRating = filterRating === "all" || 
                         (filterRating === "5" && review.rating === 5) ||
                         (filterRating === "4" && review.rating === 4) ||
                         (filterRating === "3" && review.rating === 3) ||
                         (filterRating === "2" && review.rating === 2) ||
                         (filterRating === "1" && review.rating === 1);
    
    return matchesSearch && matchesRating;
  });

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  const averageRating = mockReviews.length > 0 
    ? (mockReviews.reduce((sum, review) => sum + review.rating, 0) / mockReviews.length).toFixed(1)
    : "0.0";

  if (loading) {
    return (
      <div className="space-y-6 animate-in">
        <header>
          <h1 className="text-2xl font-bold text-[#111827]">My Reviews</h1>
          <p className="text-sm text-[#6B7280] mt-1">Reviews you've given to workers</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6 animate-pulse">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-100"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-100 rounded-full w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-100 rounded-full w-1/2"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-3 bg-gray-100 rounded-full w-full"></div>
                <div className="h-3 bg-gray-100 rounded-full w-4/5"></div>
                <div className="h-3 bg-gray-100 rounded-full w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold text-[#111827]">My Reviews</h1>
        <p className="text-sm text-[#6B7280] mt-1">Reviews you've given to workers</p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare className="w-6 h-6 text-[#1E3A8A]" />
            <h3 className="text-lg font-bold text-[#111827]">Total Reviews</h3>
          </div>
          <p className="text-3xl font-bold text-[#1E3A8A]">{mockReviews.length}</p>
        </div>
        
        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Star className="w-6 h-6 text-yellow-400" />
            <h3 className="text-lg font-bold text-[#111827]">Average Rating</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-yellow-400">{averageRating}</span>
            <div className="flex">
              {renderStars(Math.round(parseFloat(averageRating)))}
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <User className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-bold text-[#111827]">Workers Reviewed</h3>
          </div>
          <p className="text-3xl font-bold text-green-600">{new Set(mockReviews.map(r => r.workerName)).size}</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search reviews by worker name, job title, or comment..."
              className="w-full h-12 pl-12 pr-4 bg-gray-50 border-2 border-transparent rounded-xl text-sm font-medium text-[#111827] outline-none focus:border-[#1E3A8A] focus:bg-white transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              className="h-12 px-4 bg-gray-50 border-2 border-transparent rounded-xl text-sm font-medium text-[#111827] outline-none focus:border-[#1E3A8A] focus:bg-white transition-all"
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="2">2+ Stars</option>
              <option value="1">1+ Stars</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      {filteredReviews.length === 0 ? (
        <div className="bg-white rounded-[24px] p-20 text-center border-2 border-dashed border-gray-100">
          <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-[#111827]">No reviews found</h3>
          <p className="text-sm text-[#6B7280] mt-1">
            {searchQuery || filterRating !== "all" 
              ? "Try adjusting your search or filter criteria"
              : "You haven't given any reviews yet"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#111827]">{review.workerName}</h4>
                    <p className="text-sm text-[#6B7280]">{review.workerSkill} • {review.jobTitle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-1">
                    {renderStars(review.rating)}
                    <span className="text-sm font-medium text-[#111827] ml-1">{review.rating}.0</span>
                  </div>
                  <p className="text-xs text-[#6B7280] flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Review Comment */}
              <div className="mb-4">
                <p className="text-sm text-[#374151] leading-relaxed">{review.comment}</p>
              </div>

              {/* Review Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-4 text-xs text-[#6B7280]">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    {review.helpful} helpful
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {review.date}
                  </span>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => showToast("View job details coming soon!", "info")}
                >
                  View Job
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ClientReviews;
