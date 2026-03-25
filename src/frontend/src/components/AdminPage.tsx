import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Loader2,
  LogIn,
  Trash2,
  Users,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { InquiryStatus } from "../backend";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useDeleteInquiry,
  useGetAllInquiries,
  useIsAdmin,
  useUpdateInquiryStatus,
} from "../hooks/useQueries";

const STATUS_LABELS: Record<InquiryStatus, string> = {
  [InquiryStatus.pending]: "Pending",
  [InquiryStatus.inProgress]: "In Progress",
  [InquiryStatus.completed]: "Completed",
  [InquiryStatus.cancelled]: "Cancelled",
};

const STATUS_COLORS: Record<InquiryStatus, string> = {
  [InquiryStatus.pending]: "bg-yellow-100 text-yellow-800 border-yellow-200",
  [InquiryStatus.inProgress]: "bg-blue-100 text-blue-800 border-blue-200",
  [InquiryStatus.completed]: "bg-green-100 text-green-800 border-green-200",
  [InquiryStatus.cancelled]: "bg-red-100 text-red-800 border-red-200",
};

const SERVICE_LABELS: Record<string, string> = {
  aadharCardNew: "New Aadhar Card",
  aadharCardUpdate: "Aadhar Update",
  aadharCardDownload: "Aadhar Download",
  panCardNew: "New PAN Card",
  panCardUpdate: "PAN Update",
  voterIdNew: "New Voter ID",
  voterIdUpdate: "Voter ID Update",
  rationCardNew: "New Ration Card",
  rationCardUpdate: "Ration Card Update",
  bankAccountOpening: "Bank Account",
  pmgScheme: "PMG Scheme",
  otherGovernmentSchemes: "Other Gov Schemes",
  identityCardApplication: "Identity Card",
  identityCardUpdate: "Identity Card Update",
};

interface AdminPageProps {
  onBack: () => void;
}

export default function AdminPage({ onBack }: AdminPageProps) {
  const { identity, login, isLoggingIn, clear } = useInternetIdentity();
  const { data: isAdmin, isLoading: isAdminLoading } = useIsAdmin();
  const { data: inquiries, isLoading } = useGetAllInquiries();
  const { mutateAsync: updateStatus } = useUpdateInquiryStatus();
  const { mutateAsync: deleteInquiry } = useDeleteInquiry();
  const [deletingId, setDeletingId] = useState<bigint | null>(null);

  const isLoggedIn = !!identity;

  const handleStatusChange = async (id: bigint, status: string) => {
    try {
      await updateStatus({ id, status: status as InquiryStatus });
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: bigint) => {
    setDeletingId(id);
    try {
      await deleteInquiry(id);
      toast.success("Inquiry deleted");
    } catch {
      toast.error("Failed to delete inquiry");
    } finally {
      setDeletingId(null);
    }
  };

  const stats = inquiries
    ? {
        total: inquiries.length,
        pending: inquiries.filter((i) => i.status === InquiryStatus.pending)
          .length,
        inProgress: inquiries.filter(
          (i) => i.status === InquiryStatus.inProgress,
        ).length,
        completed: inquiries.filter((i) => i.status === InquiryStatus.completed)
          .length,
      }
    : null;

  return (
    <main className="flex-1 bg-secondary min-h-screen">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={onBack}
              data-ocid="admin.back.button"
              className="text-white hover:bg-white/10 gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Site
            </Button>
            <div>
              <h1 className="font-bold text-xl uppercase tracking-wide">
                Admin Dashboard
              </h1>
              <p className="text-primary-foreground/70 text-sm">
                Manage all service inquiries
              </p>
            </div>
          </div>
          {isLoggedIn && (
            <Button
              variant="outline"
              onClick={clear}
              data-ocid="admin.logout.button"
              className="border-white/30 text-white hover:bg-white/10 bg-transparent text-sm"
            >
              Log Out
            </Button>
          )}
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {!isLoggedIn ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto bg-white rounded-2xl shadow-card p-10 flex flex-col items-center gap-6 mt-16"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <LogIn className="w-8 h-8 text-primary" />
            </div>
            <div className="text-center">
              <h2 className="font-bold text-xl text-foreground mb-2">
                Admin Login Required
              </h2>
              <p className="text-muted-foreground text-sm">
                Please log in with your admin credentials to access the
                dashboard.
              </p>
            </div>
            <Button
              onClick={login}
              disabled={isLoggingIn}
              data-ocid="admin.login.button"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold gap-2"
            >
              {isLoggingIn ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <LogIn className="w-4 h-4" />
              )}
              {isLoggingIn ? "Logging in..." : "Login with Identity"}
            </Button>
          </motion.div>
        ) : isAdminLoading ? (
          <div
            data-ocid="admin.loading_state"
            className="flex justify-center mt-16"
          >
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : !isAdmin ? (
          <div
            data-ocid="admin.error_state"
            className="max-w-md mx-auto bg-white rounded-2xl shadow-card p-10 flex flex-col items-center gap-4 mt-16"
          >
            <XCircle className="w-12 h-12 text-destructive" />
            <h2 className="font-bold text-xl text-foreground">Access Denied</h2>
            <p className="text-muted-foreground text-sm text-center">
              Your account does not have admin privileges.
            </p>
          </div>
        ) : (
          <>
            {/* Stats */}
            {stats && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  {
                    label: "Total Inquiries",
                    value: stats.total,
                    icon: Users,
                    color: "text-primary",
                  },
                  {
                    label: "Pending",
                    value: stats.pending,
                    icon: Clock,
                    color: "text-yellow-600",
                  },
                  {
                    label: "In Progress",
                    value: stats.inProgress,
                    icon: Loader2,
                    color: "text-blue-600",
                  },
                  {
                    label: "Completed",
                    value: stats.completed,
                    icon: CheckCircle,
                    color: "text-green-600",
                  },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="bg-white rounded-xl shadow-card p-5 flex items-center gap-4"
                    >
                      <div className={`${stat.color} opacity-80`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-foreground">
                          {stat.value}
                        </div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              <div className="px-6 py-4 border-b border-border">
                <h2 className="font-bold uppercase tracking-wide text-foreground">
                  All Inquiries
                </h2>
              </div>

              {isLoading ? (
                <div
                  data-ocid="admin.table.loading_state"
                  className="p-6 space-y-3"
                >
                  {[1, 2, 3].map((n) => (
                    <Skeleton key={n} className="h-12 w-full" />
                  ))}
                </div>
              ) : !inquiries || inquiries.length === 0 ? (
                <div
                  data-ocid="admin.table.empty_state"
                  className="p-12 text-center text-muted-foreground"
                >
                  No inquiries found yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table data-ocid="admin.inquiries.table">
                    <TableHeader>
                      <TableRow className="bg-secondary/50">
                        <TableHead className="font-bold text-xs uppercase tracking-wide">
                          #
                        </TableHead>
                        <TableHead className="font-bold text-xs uppercase tracking-wide">
                          Name
                        </TableHead>
                        <TableHead className="font-bold text-xs uppercase tracking-wide">
                          Phone
                        </TableHead>
                        <TableHead className="font-bold text-xs uppercase tracking-wide">
                          Service
                        </TableHead>
                        <TableHead className="font-bold text-xs uppercase tracking-wide">
                          Date
                        </TableHead>
                        <TableHead className="font-bold text-xs uppercase tracking-wide">
                          Status
                        </TableHead>
                        <TableHead className="font-bold text-xs uppercase tracking-wide">
                          Action
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inquiries.map((inquiry, idx) => (
                        <TableRow
                          key={String(inquiry.id)}
                          data-ocid={`admin.inquiry.row.${idx + 1}`}
                          className="hover:bg-secondary/30"
                        >
                          <TableCell className="text-muted-foreground text-sm">
                            {idx + 1}
                          </TableCell>
                          <TableCell className="font-medium text-foreground">
                            {inquiry.name}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {inquiry.phone}
                          </TableCell>
                          <TableCell>
                            <span className="text-xs font-medium text-foreground">
                              {SERVICE_LABELS[inquiry.service] ??
                                inquiry.service}
                            </span>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {new Date(
                              Number(inquiry.timestamp / 1_000_000n),
                            ).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </TableCell>
                          <TableCell>
                            <Select
                              value={inquiry.status}
                              onValueChange={(val) =>
                                handleStatusChange(inquiry.id, val)
                              }
                            >
                              <SelectTrigger
                                data-ocid={`admin.status.select.${idx + 1}`}
                                className={`h-7 text-xs border rounded-full px-3 w-36 ${STATUS_COLORS[inquiry.status]}`}
                              >
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.values(InquiryStatus).map((s) => (
                                  <SelectItem key={s} value={s}>
                                    {STATUS_LABELS[s]}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDelete(inquiry.id)}
                              disabled={deletingId === inquiry.id}
                              data-ocid={`admin.inquiry.delete_button.${idx + 1}`}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10 h-7 w-7 p-0"
                            >
                              {deletingId === inquiry.id ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <Trash2 className="w-3.5 h-3.5" />
                              )}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
