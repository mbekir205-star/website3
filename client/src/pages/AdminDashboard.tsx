import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LogOut, Plus, Loader2, AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react';
import { trpc } from '@/lib/trpc';

interface AdminSession {
  email: string;
  timestamp: number;
  authenticated: boolean;
}

interface ConsultationBooking {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  serviceType: string;
  budget: string | null;
  message: string | null;
  preferredDate: string | null;
  preferredTime: string | null;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [session, setSession] = useState<AdminSession | null>(null);
  const [bookings, setBookings] = useState<ConsultationBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<ConsultationBooking | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Check admin session
  useEffect(() => {
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      setLocation('/admin/login');
      return;
    }

    try {
      const parsed = JSON.parse(adminSession) as AdminSession;
      if (!parsed.authenticated) {
        setLocation('/admin/login');
        return;
      }
      setSession(parsed);
    } catch {
      setLocation('/admin/login');
    }
  }, [setLocation]);

  // Fetch bookings
  const { data: bookingsData, isLoading: bookingsLoading } = trpc.consultations.list.useQuery(
    { limit: 100, offset: 0 },
    { enabled: !!session }
  );

  useEffect(() => {
    if (bookingsData) {
      setBookings(bookingsData as ConsultationBooking[]);
      setLoading(false);
    }
  }, [bookingsData]);

  const updateStatusMutation = trpc.consultations.updateStatus.useMutation({
    onSuccess: () => {
      // Refetch bookings
      if (bookingsData) {
        setBookings(bookingsData as ConsultationBooking[]);
      }
    },
  });

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    setLocation('/');
  };

  const handleStatusChange = (bookingId: number, newStatus: string) => {
    updateStatusMutation.mutate({
      id: bookingId,
      status: newStatus as 'pending' | 'confirmed' | 'completed' | 'cancelled',
    });
  };

  const filteredBookings = filterStatus === 'all'
    ? bookings
    : bookings.filter(b => b.status === filterStatus);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-900/20 text-yellow-300 border-yellow-700/50';
      case 'confirmed':
        return 'bg-blue-900/20 text-blue-300 border-blue-700/50';
      case 'completed':
        return 'bg-green-900/20 text-green-300 border-green-700/50';
      case 'cancelled':
        return 'bg-red-900/20 text-red-300 border-red-700/50';
      default:
        return 'bg-slate-900/20 text-slate-300 border-slate-700/50';
    }
  };

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-slate-400 text-sm">Manage consultation bookings</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <p className="text-slate-400 text-sm mb-2">Total Bookings</p>
            <p className="text-3xl font-bold text-white">{bookings.length}</p>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <p className="text-slate-400 text-sm mb-2">Pending</p>
            <p className="text-3xl font-bold text-yellow-400">{bookings.filter(b => b.status === 'pending').length}</p>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <p className="text-slate-400 text-sm mb-2">Confirmed</p>
            <p className="text-3xl font-bold text-blue-400">{bookings.filter(b => b.status === 'confirmed').length}</p>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <p className="text-slate-400 text-sm mb-2">Completed</p>
            <p className="text-3xl font-bold text-green-400">{bookings.filter(b => b.status === 'completed').length}</p>
          </Card>
        </div>

        {/* Filter */}
        <div className="mb-6 flex gap-4">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48 bg-slate-800/50 border-slate-700 text-white">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all">All Bookings</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bookings Table */}
        <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
          {loading || bookingsLoading ? (
            <div className="p-12 flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="p-12 text-center">
              <AlertCircle className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">No bookings found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/50 border-b border-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Service</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-slate-700/20 transition">
                      <td className="px-6 py-4 text-sm text-white">{booking.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-300">{booking.email}</td>
                      <td className="px-6 py-4 text-sm text-slate-300">{booking.serviceType}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(booking.status)}
                          <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedBooking(booking)}
                            className="text-xs"
                          >
                            View
                          </Button>
                          <Select
                            value={booking.status}
                            onValueChange={(value) => handleStatusChange(booking.id, value)}
                          >
                            <SelectTrigger className="w-32 h-8 text-xs bg-slate-700/50 border-slate-600">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700">
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="confirmed">Confirmed</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* Booking Details Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <Card className="bg-slate-800 border-slate-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Booking Details</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedBooking(null)}
                    className="text-slate-400"
                  >
                    ✕
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-slate-400 text-sm">Name</p>
                      <p className="text-white font-medium">{selectedBooking.name}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Email</p>
                      <p className="text-white font-medium">{selectedBooking.email}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Phone</p>
                      <p className="text-white font-medium">{selectedBooking.phone}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Company</p>
                      <p className="text-white font-medium">{selectedBooking.company || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Service Type</p>
                      <p className="text-white font-medium">{selectedBooking.serviceType}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Budget</p>
                      <p className="text-white font-medium">{selectedBooking.budget || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Preferred Date</p>
                      <p className="text-white font-medium">{selectedBooking.preferredDate || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Preferred Time</p>
                      <p className="text-white font-medium">{selectedBooking.preferredTime || 'N/A'}</p>
                    </div>
                  </div>

                  {selectedBooking.message && (
                    <div>
                      <p className="text-slate-400 text-sm mb-2">Message</p>
                      <p className="text-white bg-slate-700/50 p-3 rounded">{selectedBooking.message}</p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-700">
                    <p className="text-slate-400 text-sm mb-2">Status</p>
                    <Select
                      value={selectedBooking.status}
                      onValueChange={(value) => {
                        handleStatusChange(selectedBooking.id, value);
                        setSelectedBooking(null);
                      }}
                    >
                      <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={() => setSelectedBooking(null)}
                  className="w-full mt-6 bg-slate-700 hover:bg-slate-600"
                >
                  Close
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
