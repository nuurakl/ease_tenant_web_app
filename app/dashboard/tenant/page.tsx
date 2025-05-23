"use client";

import type React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "@/components/custom/page-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Building,
  Calendar,
  CheckCircle2,
  CircleDollarSign,
  Clock,
  CreditCard,
  Edit,
  FileText,
  Home,
  KeyRound,
  Layers,
  Loader,
  Plus,
  PenToolIcon as Tool,
  Wrench,
  Search,
  AlertCircle,
} from "lucide-react";

import Stack from "@/components/custom/stack";
import { Group } from "@/components/custom/group";
import PageHeader from "@/components/custom/page-header";
import { UserDetail, useVerifyUserQuery } from "@/app/quries/useAuth";
import { PageLoader } from "@/components/custom/page-loader";
import { PageError } from "@/components/custom/page-error";
import Link from "next/link";


type PriorityLevel = "high" | "medium" | "low";
type PaymentStatus = "paid" | "pending" | "overdue";
type MaintenanceStatus = "in-progress" | "completed" | "pending";

type Payment = {
  id: string;
  description: string;
  date: string;
  amount: string;
  status: PaymentStatus;
};

type Announcement = {
  title: string;
  date: string;
  description: string;
  priority: PriorityLevel;
};

type MaintenanceRequest = {
  id: string;
  issue: string;
  location: string;
  date: string;
  status: MaintenanceStatus;
  priority: PriorityLevel;
};

// ===== MAIN PAGE COMPONENT =====
const Page = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const verifyUserQuery = useVerifyUserQuery();

  if (verifyUserQuery.isLoading) {
    return (
      <PageLoader variant="minimal" isLoading={true} loaderVariant={"dots"} />
    );
  }

  if (verifyUserQuery.isError) {
    return (
      <PageError
        variant="generic"
        message={verifyUserQuery.error.message}
        fullPage
        size="xl"
      />
    );
  }

  const userData = verifyUserQuery.data;

  // Check if user has a unit assigned
  const hasUnit = userData?.unit !== null;

  // Check if user has a pending application
  const hasPendingApplication = false;

  // Determine tenant status
  const tenantStatus = "inactive";

  return (
    <PageWrapper className="relative py-0">
      {/* Dashboard Header with Title and Actions */}
      {userData && (
        <PageHeader
          title="Tenant Dashboard"
          description="Manage your commercial space and services"
          rightSection={<TenantProfileSummary userData={userData} />}
        />
      )}

      {/* Show different content based on tenant status */}
      {!hasUnit && (
        <NoUnitAssigned
          tenantStatus={tenantStatus}
          userData={userData}
          hasPendingApplication={hasPendingApplication}
        />
      )}

      {hasUnit && (
        <>
          {/* Building overview and quick actions cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 grid gap-6 md:grid-cols-3"
          >
            {/* Tenant Overview Card */}
            <Card className="overflow-hidden rounded-md border border-neutral-200/50 bg-background/70 backdrop-blur-md transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Tenant Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {/* Lease Progress indicator */}
                  <div className="flex items-center justify-between text-sm">
                    <span>Lease Progress</span>
                    <span className="font-medium text-green-600">27%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "27%" }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full bg-green-500"
                    />
                  </div>

                  {/* Tenant statistics */}
                  <div className="mt-4 grid gap-4">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center gap-2"
                    >
                      <div className="rounded-full bg-primary/10 p-1.5">
                        <Home className="h-4 w-4 text-primary" />
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Active</span> Lease Status
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-center gap-2"
                    >
                      <div className="rounded-full bg-blue-500/10 p-1.5">
                        <Layers className="h-4 w-4 text-blue-500" />
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Suite 302</span> (1,200 sq
                        ft)
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="flex items-center gap-2"
                    >
                      <div className="rounded-full bg-green-500/10 p-1.5">
                        <CircleDollarSign className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">$0.00</span> Current
                        Balance
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                      className="flex items-center gap-2"
                    >
                      <div className="rounded-full bg-amber-500/10 p-1.5">
                        <Tool className="h-4 w-4 text-amber-500" />
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">1 Open</span> Maintenance
                        Request
                      </div>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions Card */}
            <Card className="overflow-hidden rounded-md border border-neutral-200/50 bg-background/70 backdrop-blur-md transition-all duration-300 hover:shadow-md md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                  <QuickActionButton
                    icon={<CreditCard className="h-5 w-5" />}
                    label="Pay Rent"
                    variant="default"
                    onClick={() => {}}
                    index={0}
                  />
                  <QuickActionButton
                    icon={<Wrench className="h-5 w-5" />}
                    label="Maintenance"
                    variant="outline"
                    onClick={() => setActiveTab("maintenance")}
                    index={1}
                  />
                  <QuickActionButton
                    icon={<Calendar className="h-5 w-5" />}
                    label="Book Room"
                    variant="outline"
                    onClick={() => {}}
                    index={2}
                  />
                  <QuickActionButton
                    icon={<Building className="h-5 w-5" />}
                    label="Amenities"
                    variant="outline"
                    onClick={() => {}}
                    index={3}
                  />
                  <QuickActionButton
                    icon={<KeyRound className="h-5 w-5" />}
                    label="Access"
                    variant="outline"
                    onClick={() => {}}
                    index={4}
                  />
                  <QuickActionButton
                    icon={<FileText className="h-5 w-5" />}
                    label="View Lease"
                    variant="outline"
                    onClick={() => {}}
                    index={5}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6"
          >
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="relative z-10"
            >
              <TabsList className="rounded-full bg-background/50 backdrop-blur-sm">
                <TabsTrigger
                  value="overview"
                  className="rounded-full px-5 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="payments"
                  className="rounded-full px-5 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                >
                  Payments
                </TabsTrigger>
                <TabsTrigger
                  value="maintenance"
                  className="rounded-full px-5 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                >
                  Maintenance
                </TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Overview Tab Content */}
                  <TabsContent value="overview" className="mt-4">
                    <LeaseInformation />
                    <div className="mt-6 grid gap-6 md:grid-cols-2">
                      <UpcomingPayments />
                      <RecentAnnouncements />
                    </div>
                  </TabsContent>

                  {/* Payments Tab Content */}
                  <TabsContent value="payments" className="mt-4">
                    <PaymentHistory />
                  </TabsContent>

                  {/* Maintenance Tab Content */}
                  <TabsContent value="maintenance" className="mt-4">
                    <MaintenanceRequests />
                  </TabsContent>
                </motion.div>
              </AnimatePresence>
            </Tabs>
          </motion.div>
        </>
      )}
    </PageWrapper>
  );
};

// Component for when no unit is assigned
const NoUnitAssigned = ({
  // tenantStatus,
  userData,
  hasPendingApplication,
}: {
  tenantStatus: string;
  userData: UserDetail;
  hasPendingApplication: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mt-6"
    >
      {hasPendingApplication ? (
        <PendingApplicationStatus userData={userData} />
      ) : (
        <NoApplicationStatus userData={userData} />
      )}
    </motion.div>
  );
};

// Component for pending application status
const PendingApplicationStatus = ({ userData }: { userData: UserDetail }) => {
  console.log({ userData });
  return (
    <Card className="overflow-hidden rounded-md border border-neutral-200/50 bg-background/70 backdrop-blur-md transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-amber-500" />
          Application Under Review
        </CardTitle>
        <CardDescription>
          Your application is currently being reviewed by our management team
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg bg-amber-50/50 p-4 dark:bg-amber-900/10">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-900/20">
              <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h4 className="font-medium text-amber-800 dark:text-amber-300">
                Application Status: Pending
              </h4>
              <p className="mt-1 text-sm text-amber-700 dark:text-amber-400">
                Thank you for your interest in our commercial space. Your
                application has been received and is currently under review. Our
                team will contact you within 2-3 business days regarding the
                next steps.
              </p>

              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Application submitted</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full border-2 border-amber-500 bg-amber-100"></div>
                  <span className="text-sm">
                    Application review (in progress)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full border-2 border-neutral-300 bg-neutral-100"></div>
                  <span className="text-sm text-muted-foreground">
                    Credit & background check
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full border-2 border-neutral-300 bg-neutral-100"></div>
                  <span className="text-sm text-muted-foreground">
                    Final approval
                  </span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="outline" size="sm" className="rounded-full">
                  <FileText className="mr-2 h-4 w-4" />
                  View Application
                </Button>
                <Button size="sm" className="rounded-full">
                  Contact Management
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Component for no application status
const NoApplicationStatus = ({ userData }: { userData: UserDetail }) => {
  console.log({ userData });
  return (
    <Card className="border-none shadow-none">
      <CardContent className="px-0">
        <div className="rounded-lg bg-primary/5 p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-primary/10 p-2">
              <Home className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-primary">
                No Units Currently Assigned
              </h4>
              <p className="mt-1 text-sm text-muted-foreground">
                {`You're`} registered as a tenant in our system, but you{" "}
                {`don't`} have any commercial spaces assigned yet. Browse our
                available units and submit an application to get started.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button className="rounded-full" asChild>
                  <Link href="/dashboard/buildings">
                    <Search className="mr-2 h-4 w-4" />
                    Browse Available Units
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="mb-3 font-medium">Complete Your Profile</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm">Basic Information</span>
              </div>
              <Badge
                variant="outline"
                className="bg-green-500/10 text-green-500"
              >
                Completed
              </Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm">Business Details</span>
              </div>
              <Badge
                variant="outline"
                className="bg-green-500/10 text-green-500"
              >
                Completed
              </Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <span className="text-sm">Financial Information</span>
              </div>
              <Badge
                variant="outline"
                className="bg-amber-500/10 text-amber-500"
              >
                Incomplete
              </Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <span className="text-sm">Required Documents</span>
              </div>
              <Badge
                variant="outline"
                className="bg-amber-500/10 text-amber-500"
              >
                Incomplete
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper component for Quick Action buttons
const QuickActionButton = ({
  icon,
  label,
  variant = "outline",
  onClick,
  index = 0,
}: {
  icon: React.ReactNode;
  label: string;
  variant?: "default" | "outline";
  onClick?: () => void;
  index?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
    >
      <Button
        variant={variant}
        className={`h-auto w-full flex-col items-center justify-center gap-2 rounded-md py-4 ${
          variant === "outline"
            ? "border-neutral-200/50 bg-background/60 backdrop-blur-sm hover:bg-primary/10"
            : "bg-primary hover:bg-primary/90"
        }`}
        onClick={onClick}
      >
        {icon}
        <span>{label}</span>
      </Button>
    </motion.div>
  );
};

// Tenant Profile Summary for the header
const TenantProfileSummary = ({ userData }: { userData: UserDetail }) => {
  if (!userData || !userData.user) {
    return <Loader className="h-5 w-5" />;
  }

  const { user, tenant } = userData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex items-center gap-3 rounded-full border border-neutral-200/30 bg-background/70 px-1.5 py-1.5 pr-3 backdrop-blur-lg"
    >
      <Avatar className="h-8 w-8 border border-primary/10">
        <AvatarImage src="/placeholder.svg?height=32&width=32" />
        <AvatarFallback className="uppercase">
          {user.firstName.at(0)}
          {user.lastName.at(0)}
        </AvatarFallback>
      </Avatar>
      <div className="hidden md:block">
        <p className="text-sm font-medium">
          {tenant?.businessName || `${user.firstName} ${user.lastName}`}
        </p>
        <p className="text-xs text-muted-foreground">
          {tenant?.businessType || "USER ROLE"}
        </p>
      </div>
      <Button
        size="icon"
        variant="ghost"
        className="ml-1 h-7 w-7 rounded-full md:ml-2"
      >
        <Edit className="h-3.5 w-3.5" />
      </Button>
    </motion.div>
  );
};

// ===== COMPONENT: Upcoming Payments =====
const UpcomingPayments = () => {
  // Sample upcoming payment data
  const payments: Payment[] = [
    {
      description: "Monthly Rent",
      amount: "$3,500.00",
      date: "May 1, 2025",
      id: "UP-001",
      status: "pending",
    },
    {
      description: "Utilities",
      amount: "$450.00",
      date: "May 5, 2025",
      id: "UP-002",
      status: "pending",
    },
    {
      description: "Maintenance Fee",
      amount: "$200.00",
      date: "May 10, 2025",
      id: "UP-003",
      status: "pending",
    },
  ];

  return (
    <Card className="overflow-hidden rounded-md border border-neutral-200/50 bg-background/70 backdrop-blur-md transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-3">
        <Group justify={"between"}>
          <Stack spacing={"xs"}>
            <CardTitle className="text-base">Upcoming Payments</CardTitle>
            <CardDescription>
              Your scheduled payments for this month
            </CardDescription>
          </Stack>

          <Button size="sm" variant="ghost" className="rounded-full">
            View All
          </Button>
        </Group>
      </CardHeader>
      <CardContent className="px-2">
        <ul className="space-y-2">
          {payments.map((payment, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex items-center justify-between rounded-lg px-3 py-2 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <CircleDollarSign className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{payment.description}</p>
                  <p className="text-xs text-muted-foreground">
                    Due: {payment.date}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">{payment.amount}</p>
                <Badge variant="outline" className="text-xs">
                  <Clock className="mr-1 h-3 w-3" /> Upcoming
                </Badge>
              </div>
            </motion.li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

// ===== COMPONENT: Recent Announcements =====
const RecentAnnouncements = () => {
  // Sample announcements data
  const announcements: Announcement[] = [
    {
      title: "Building Maintenance",
      date: "Apr 10, 2025",
      description: "Scheduled HVAC maintenance on April 15th from 9am-12pm",
      priority: "medium",
    },
    {
      title: "Parking Lot Closure",
      date: "Apr 8, 2025",
      description:
        "North parking lot will be closed for repainting on April 20th",
      priority: "high",
    },
    {
      title: "New Security Measures",
      date: "Apr 5, 2025",
      description: "Updated security protocols effective May 1st",
      priority: "low",
    },
  ];

  // Function to get priority badge styling
  const getPriorityBadge = (priority: PriorityLevel) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge variant="secondary">Medium</Badge>;
      default:
        return <Badge variant="outline">Low</Badge>;
    }
  };

  return (
    <Card className="overflow-hidden rounded-md border border-neutral-200/50 bg-background/70 backdrop-blur-md transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-3">
        <Group justify="between">
          <Stack spacing="xs">
            <CardTitle className="text-base">Recent Announcements</CardTitle>
            <CardDescription>Updates from building management</CardDescription>
          </Stack>
          <Button size="sm" variant="ghost" className="rounded-full">
            View All
          </Button>
        </Group>
      </CardHeader>
      <CardContent className="px-2">
        <ul className="space-y-2">
          {announcements.map((announcement, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="rounded-lg px-3 py-2 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium">{announcement.title}</p>
                {getPriorityBadge(announcement.priority)}
              </div>
              <p className="mt-1 text-sm">{announcement.description}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {announcement.date}
              </p>
            </motion.li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

// ===== COMPONENT: Lease Information =====
const LeaseInformation = () => {
  return (
    <Card className="overflow-hidden rounded-md border border-neutral-200/50 bg-background/70 backdrop-blur-md transition-all duration-300 hover:shadow-md">
      <CardHeader>
        <Group justify={"between"}>
          <Stack spacing={"xs"}>
            <CardTitle className="text-base">Lease Information</CardTitle>
            <CardDescription>
              Details about your current lease agreement
            </CardDescription>
          </Stack>

          <Button
            size="sm"
            variant="outline"
            className="rounded-full border-neutral-200/50 bg-background/60 backdrop-blur-sm hover:bg-background/80"
          >
            <FileText className="mr-2 h-4 w-4" />
            View Lease
          </Button>
        </Group>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="space-y-1"
          >
            <p className="text-sm font-medium text-muted-foreground">
              Lease Term
            </p>
            <p>Jan 1, 2025 - Dec 31, 2025</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="space-y-1"
          >
            <p className="text-sm font-medium text-muted-foreground">
              Monthly Rent
            </p>
            <p>$3,500.00</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="space-y-1"
          >
            <p className="text-sm font-medium text-muted-foreground">Space</p>
            <p>Suite 302 (1,200 sq ft)</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="space-y-1"
          >
            <p className="text-sm font-medium text-muted-foreground">
              Security Deposit
            </p>
            <p>$7,000.00</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="space-y-1"
          >
            <p className="text-sm font-medium text-muted-foreground">
              Payment Due
            </p>
            <p>1st of each month</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            className="space-y-1"
          >
            <p className="text-sm font-medium text-muted-foreground">
              Late Fee
            </p>
            <p>$150.00 after 5th day</p>
          </motion.div>
        </div>

        {/* Lease progress indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-6 space-y-2"
        >
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Lease Progress</span>
            <span className="font-medium">27% Complete</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: "27%" }}
              transition={{ duration: 1, delay: 1 }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            267 days remaining in current lease term
          </p>
        </motion.div>
      </CardContent>
    </Card>
  );
};

// ===== COMPONENT: Payment History =====
const PaymentHistory = () => {
  // Sample payment history data
  const payments: Payment[] = [
    {
      id: "INV-2025-004",
      description: "Monthly Rent",
      date: "Apr 1, 2025",
      amount: "$3,500.00",
      status: "paid",
    },
    {
      id: "INV-2025-003",
      description: "Utilities",
      date: "Apr 5, 2025",
      amount: "$425.75",
      status: "paid",
    },
    {
      id: "INV-2025-002",
      description: "Monthly Rent",
      date: "Mar 1, 2025",
      amount: "$3,500.00",
      status: "paid",
    },
    {
      id: "INV-2025-001",
      description: "Utilities",
      date: "Mar 5, 2025",
      amount: "$410.25",
      status: "paid",
    },
  ];

  return (
    <Card className="overflow-hidden rounded-md border border-neutral-200/50 bg-background/70 backdrop-blur-md transition-all duration-300 hover:shadow-md">
      <CardHeader>
        <Group justify="between">
          <div>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>
              View your recent payment transactions
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-neutral-200/50 bg-background/60 backdrop-blur-sm hover:bg-background/80"
          >
            Download
          </Button>
        </Group>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="grid grid-cols-5 border-b bg-muted/50 p-3 text-sm font-medium">
            <div>Invoice</div>
            <div>Description</div>
            <div>Date</div>
            <div className="text-right">Amount</div>
            <div className="text-right">Status</div>
          </div>
          {payments.map((payment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
              className="grid grid-cols-5 items-center p-3 text-sm transition-colors hover:bg-muted/30"
            >
              <div className="font-medium">{payment.id}</div>
              <div>{payment.description}</div>
              <div>{payment.date}</div>
              <div className="text-right">{payment.amount}</div>
              <div className="text-right">
                <Badge
                  variant="outline"
                  className="bg-green-500/10 text-green-500"
                >
                  <CheckCircle2 className="mr-1 h-3 w-3" /> Paid
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4">
        <Button
          variant="outline"
          className="rounded-full border-neutral-200/50 bg-background/60 backdrop-blur-sm hover:bg-background/80"
        >
          View All Transactions
        </Button>
        <Button className="rounded-full">Make a Payment</Button>
      </CardFooter>
    </Card>
  );
};

// ===== COMPONENT: Maintenance Requests =====
const MaintenanceRequests = () => {
  // Sample maintenance request data
  const requests: MaintenanceRequest[] = [
    {
      id: "REQ-2025-001",
      issue: "HVAC not cooling properly",
      location: "Main office area",
      date: "Apr 8, 2025",
      status: "in-progress",
      priority: "high",
    },
    {
      id: "REQ-2025-002",
      issue: "Bathroom sink leaking",
      location: "North restroom",
      date: "Mar 15, 2025",
      status: "completed",
      priority: "medium",
    },
    {
      id: "REQ-2025-003",
      issue: "Light fixture replacement",
      location: "Conference room",
      date: "Feb 22, 2025",
      status: "completed",
      priority: "low",
    },
  ];

  // Function to get status badge
  const getStatusBadge = (status: MaintenanceStatus) => {
    switch (status) {
      case "in-progress":
        return <Badge variant="secondary">In Progress</Badge>;
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500">
            Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">
            Pending
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className="overflow-hidden rounded-md border border-neutral-200/50 bg-background/70 backdrop-blur-md transition-all duration-300 hover:shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Maintenance Requests</CardTitle>
            <CardDescription>
              Track the status of your maintenance tickets
            </CardDescription>
          </div>
          <Button className="rounded-full">
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {requests.map((request, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              className="rounded-lg border p-4 transition-all duration-200 hover:border-primary/20 hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{request.id}</span>
                </div>
                {getStatusBadge(request.status)}
              </div>
              <h4 className="mt-2 text-base font-semibold">{request.issue}</h4>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Location</p>
                  <p>{request.location}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Submitted</p>
                  <p>{request.date}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-neutral-200/50 bg-background/60 backdrop-blur-sm hover:bg-background/80"
                >
                  View Details
                </Button>
                {request.status !== "completed" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full border-neutral-200/50 bg-background/60 backdrop-blur-sm hover:bg-background/80"
                  >
                    Update
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Page;
