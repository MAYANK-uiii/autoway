export type Platform = "instagram" | "whatsapp" | "email"

export interface MetricPoint {
  value: number
}

export interface Metric {
  key: string
  label: string
  value: string
  delta: string
  deltaPositive: boolean
  sub: string
  data: number[]
  kind: "line" | "bar"
}

export const metrics: Metric[] = [
  {
    key: "posts",
    label: "Posts Published",
    value: "128",
    delta: "+18.4%",
    deltaPositive: true,
    sub: "this month",
    data: [12, 18, 14, 22, 19, 26, 24, 31, 28, 35, 32, 40],
    kind: "line",
  },
  {
    key: "scheduled",
    label: "Scheduled Posts",
    value: "24",
    delta: "8 today",
    deltaPositive: true,
    sub: "publishing today",
    data: [4, 6, 5, 8, 7, 9, 6, 8, 10, 7, 9, 8],
    kind: "bar",
  },
  {
    key: "automations",
    label: "Automations Active",
    value: "12",
    delta: "+3",
    deltaPositive: true,
    sub: "this week",
    data: [6, 6, 7, 7, 8, 9, 9, 10, 10, 11, 11, 12],
    kind: "line",
  },
  {
    key: "engagement",
    label: "Engagement",
    value: "24.8K",
    delta: "+12.6%",
    deltaPositive: true,
    sub: "this month",
    data: [10, 14, 12, 18, 16, 22, 20, 26, 23, 28, 30, 34],
    kind: "line",
  },
]

export interface AccountItem {
  platform: Platform
  name: string
  handle: string
  connected: boolean
  lastActivity: string
  accent: string
}

export const accounts: AccountItem[] = [
  {
    platform: "instagram",
    name: "Instagram",
    handle: "@autoway.official",
    connected: true,
    lastActivity: "2 min ago",
    accent: "#E1306C",
  },
  {
    platform: "whatsapp",
    name: "WhatsApp",
    handle: "AUTOWAY Business",
    connected: true,
    lastActivity: "12 min ago",
    accent: "#25D366",
  },
  {
    platform: "email",
    name: "Email",
    handle: "hello@autoway.io",
    connected: true,
    lastActivity: "1 hr ago",
    accent: "#40E0D0",
  },
]

export interface ScheduleItem {
  id: string
  time: string
  platform: Platform
  title: string
  type: string
  status: "scheduled" | "publishing" | "draft"
}

export const scheduleToday: ScheduleItem[] = [
  {
    id: "s1",
    time: "10:00 AM",
    platform: "instagram",
    title: "Product launch teaser",
    type: "Instagram Post",
    status: "scheduled",
  },
  {
    id: "s2",
    time: "1:30 PM",
    platform: "whatsapp",
    title: "Flash sale broadcast",
    type: "WhatsApp Campaign",
    status: "publishing",
  },
  {
    id: "s3",
    time: "6:00 PM",
    platform: "instagram",
    title: "Behind the scenes reel",
    type: "Instagram Reel",
    status: "scheduled",
  },
]

export interface AutomationItem {
  id: string
  title: string
  platform: Platform
  stat: string
  active: boolean
}

export const automationItems: AutomationItem[] = [
  {
    id: "a1",
    title: "Instagram DM Auto Reply",
    platform: "instagram",
    stat: "1,284 messages handled",
    active: true,
  },
  {
    id: "a2",
    title: "Post Publishing",
    platform: "instagram",
    stat: "32 posts scheduled",
    active: true,
  },
  {
    id: "a3",
    title: "Email Campaign",
    platform: "email",
    stat: "2,481 recipients",
    active: true,
  },
]

export interface ActivityItem {
  id: string
  text: string
  platform: Platform
  time: string
}

export const activityFeed: ActivityItem[] = [
  { id: "ac1", text: "Instagram post published", platform: "instagram", time: "2 min ago" },
  { id: "ac2", text: "DM automation replied to 24 messages", platform: "instagram", time: "18 min ago" },
  { id: "ac3", text: "Email campaign completed", platform: "email", time: "1 hr ago" },
  { id: "ac4", text: "New WhatsApp broadcast sent", platform: "whatsapp", time: "3 hrs ago" },
  { id: "ac5", text: "New Instagram account connected", platform: "instagram", time: "Yesterday" },
]

// Performance series keyed by range, each metric a smooth-ish series.
export type RangeKey = "7d" | "30d" | "90d"

export interface PerformanceSeries {
  reach: number[]
  engagement: number[]
  followers: number[]
  posts: number[]
  labels: string[]
}

export const performanceData: Record<RangeKey, PerformanceSeries> = {
  "7d": {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    reach: [4200, 5100, 4800, 6300, 5900, 7200, 8100],
    engagement: [820, 960, 910, 1180, 1090, 1360, 1520],
    followers: [120, 90, 140, 210, 180, 260, 320],
    posts: [2, 3, 2, 4, 3, 5, 4],
  },
  "30d": {
    labels: ["W1", "W2", "W3", "W4"],
    reach: [24000, 31000, 28500, 39000],
    engagement: [5200, 6800, 6100, 8400],
    followers: [640, 720, 810, 960],
    posts: [12, 16, 14, 20],
  },
  "90d": {
    labels: ["Month 1", "Month 2", "Month 3"],
    reach: [92000, 118000, 146000],
    engagement: [19800, 24200, 31600],
    followers: [2100, 2680, 3320],
    posts: [48, 56, 64],
  },
}
