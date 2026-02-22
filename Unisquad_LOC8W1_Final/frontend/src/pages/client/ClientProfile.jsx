import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  Save,
  X,
  CheckCircle,
  Shield,
  CreditCard,
  Settings,
  LogOut,
  Camera,
  Building,
  Briefcase,
  Star,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button.jsx";
import Input from "../../components/ui/Input.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { getClientJobs } from "../../services/jobService.js";
import { updateClientProfile } from "../../services/authService.js";

function ClientProfile() {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Profile form state
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    company: user?.company || "",
    bio: user?.bio || ""
  });

  const inputClass = "w-full min-h-[48px] px-4 py-3 rounded-[10px] border-2 border-[#E5E7EB] focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100 outline-none text-base font-medium text-[#111827] bg-white transition-all";

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

  const completedJobs = jobs.filter(job => job.status === "completed").length;
  const totalJobs = jobs.length;
  const activeJobs = jobs.filter(job => job.status !== "completed").length;

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateClientProfile(formData);
      showToast("Profile updated successfully!", "success");
      setEditing(false);
    } catch (error) {
      showToast(error.message || "Failed to update profile", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
      company: user?.company || "",
      bio: user?.bio || ""
    });
    setEditing(false);
  };

  const handleLogout = () => {
    logout();
    showToast("Logged out successfully", "success");
  };

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold text-[#111827]">Profile</h1>
        <p className="text-sm text-[#6B7280] mt-1">Manage your account information and preferences</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Profile Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
            {/* Profile Header */}
            <div className="relative h-32 bg-gradient-to-r from-[#1E3A8A] to-blue-600">
              <div className="absolute -bottom-12 left-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center">
                    <User className="w-12 h-12 text-[#1E3A8A]" />
                  </div>
                  {editing && (
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#1E3A8A] rounded-full flex items-center justify-center text-white border-2 border-white">
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
              <div className="absolute top-4 right-4">
                {!editing ? (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setEditing(true)}
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleCancel}
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      loading={saving}
                      onClick={handleSave}
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Content */}
            <div className="px-6 pt-16 pb-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-[#111827]">{formData.name || "Client User"}</h2>
                <p className="text-sm text-[#6B7280]">{formData.company || "Individual Client"}</p>
              </div>

              {editing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      leftIcon={<User className="w-5 h-5" />}
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      leftIcon={<Mail className="w-5 h-5" />}
                    />
                    <Input
                      label="Phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      leftIcon={<Phone className="w-5 h-5" />}
                    />
                    <Input
                      label="Company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      leftIcon={<Building className="w-5 h-5" />}
                    />
                  </div>
                  <Input
                    label="Address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    leftIcon={<MapPin className="w-5 h-5" />}
                  />
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-[#374151] mb-1.5">
                      <Briefcase className="w-4 h-4 text-[#1E3A8A]" />
                      Bio
                    </label>
                    <textarea
                      className={`${inputClass} resize-none`}
                      rows={3}
                      placeholder="Tell us about yourself..."
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#6B7280]" />
                    <span className="text-sm font-medium text-[#374151]">{formData.email || "client@example.com"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#6B7280]" />
                    <span className="text-sm font-medium text-[#374151]">{formData.phone || "Not provided"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#6B7280]" />
                    <span className="text-sm font-medium text-[#374151]">{formData.address || "Not provided"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building className="w-5 h-5 text-[#6B7280]" />
                    <span className="text-sm font-medium text-[#374151]">{formData.company || "Individual Client"}</span>
                  </div>
                  {formData.bio && (
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-sm text-[#6B7280] leading-relaxed">{formData.bio}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-[#111827] mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#1E3A8A]" />
              Account Settings
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-[#6B7280]" />
                  <span className="text-sm font-medium text-[#374151]">Privacy & Security</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#6B7280]" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-[#6B7280]" />
                  <span className="text-sm font-medium text-[#374151]">Payment Methods</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#6B7280]" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#6B7280]" />
                  <span className="text-sm font-medium text-[#374151]">Booking Preferences</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#6B7280]" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats Card */}
          <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-[#111827] mb-4">Your Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#1E3A8A]" />
                  <span className="text-sm font-medium text-[#374151]">Total Jobs</span>
                </div>
                <span className="text-lg font-bold text-[#1E3A8A]">{totalJobs}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-[#374151]">Active Jobs</span>
                </div>
                <span className="text-lg font-bold text-green-600">{activeJobs}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-[#374151]">Completed</span>
                </div>
                <span className="text-lg font-bold text-blue-600">{completedJobs}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-[#111827] mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link to="/client/reviews" className="block">
                <Button variant="secondary" fullWidth className="justify-start">
                  <Star className="w-4 h-4" />
                  View Reviews
                </Button>
              </Link>
              <Link to="/client/history" className="block">
                <Button variant="secondary" fullWidth className="justify-start">
                  <Calendar className="w-4 h-4" />
                  Booking History
                </Button>
              </Link>
              <Button variant="danger" fullWidth onClick={handleLogout} className="justify-start">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>

          {/* Member Since */}
          <div className="bg-gradient-to-br from-[#1E3A8A] to-blue-600 rounded-[24px] p-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-6 h-6" />
              <h3 className="text-lg font-bold">Verified Member</h3>
            </div>
            <p className="text-sm opacity-90 mb-4">Your account is verified and in good standing</p>
            <div className="flex items-center gap-2 text-xs opacity-75">
              <Calendar className="w-3 h-3" />
              <span>Member since {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientProfile;
