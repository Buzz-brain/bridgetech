// User roles
export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  SCHOOL_ADMIN: 'school_admin',
  TEACHER: 'teacher',
  STUDENT: 'student',
  PARENT: 'parent',
};

// User role labels
export const ROLE_LABELS = {
  [USER_ROLES.SUPER_ADMIN]: 'Super Admin',
  [USER_ROLES.SCHOOL_ADMIN]: 'School Admin',
  [USER_ROLES.TEACHER]: 'Teacher',
  [USER_ROLES.STUDENT]: 'Student',
  [USER_ROLES.PARENT]: 'Parent',
};

// Academic terms
export const ACADEMIC_TERMS = {
  FIRST: 'first',
  SECOND: 'second',
  THIRD: 'third',
};

// Academic classes
export const ACADEMIC_CLASSES = [
  'JSS 1', 'JSS 2', 'JSS 3',
  'SS 1', 'SS 2', 'SS 3',
];

// Subjects
export const SUBJECTS = [
  'Mathematics',
  'English Language',
  'Physics',
  'Chemistry',
  'Biology',
  'Further Mathematics',
  'Geography',
  'Economics',
  'Government',
  'Literature',
  'History',
  'Christian Religious Studies',
  'Islamic Religious Studies',
  'French',
  'Computer Science',
  'Technical Drawing',
  'Fine Arts',
  'Music',
  'Physical Education',
  'Home Economics',
  'Agricultural Science',
];

// Grade boundaries
export const GRADE_BOUNDARIES = [
  { min: 70, max: 100, grade: 'A1', remark: 'Excellent' },
  { min: 60, max: 69, grade: 'B2', remark: 'Very Good' },
  { min: 50, max: 59, grade: 'B3', remark: 'Good' },
  { min: 45, max: 49, grade: 'C4', remark: 'Credit' },
  { min: 40, max: 44, grade: 'C5', remark: 'Credit' },
  { min: 35, max: 39, grade: 'C6', remark: 'Credit' },
  { min: 30, max: 34, grade: 'D7', remark: 'Pass' },
  { min: 25, max: 29, grade: 'E8', remark: 'Pass' },
  { min: 0, max: 24, grade: 'F9', remark: 'Fail' },
];

// Status options
export const STATUS_OPTIONS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  GRADUATED: 'graduated',
};

// Status labels
export const STATUS_LABELS = {
  [STATUS_OPTIONS.ACTIVE]: 'Active',
  [STATUS_OPTIONS.INACTIVE]: 'Inactive',
  [STATUS_OPTIONS.SUSPENDED]: 'Suspended',
  [STATUS_OPTIONS.GRADUATED]: 'Graduated',
};

// Gender options
export const GENDER_OPTIONS = {
  MALE: 'male',
  FEMALE: 'female',
};

// Notification types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// File upload limits
export const FILE_LIMITS = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: {
    IMAGE: ['image/jpeg', 'image/png', 'image/gif'],
    DOCUMENT: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    CSV: ['text/csv', 'application/vnd.ms-excel'],
  },
};

// API endpoints
export const API_ENDPOINTS = {
  AUTH: '/auth',
  SCHOOLS: '/schools',
  USERS: '/users',
  STUDENTS: '/students',
  RESULTS: '/results',
  ADMISSIONS: '/admissions',
  SMS: '/sms',
  ANALYTICS: '/analytics',
};

// Local storage keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  SIDEBAR_STATE: 'sidebarState',
};

// Validation patterns
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\+]?[1-9][\d]{0,15}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
};

// Date formats
export const DATE_FORMATS = {
  SHORT: 'MMM dd, yyyy',
  LONG: 'MMMM dd, yyyy',
  FULL: 'EEEE, MMMM dd, yyyy',
  TIME: 'HH:mm',
  DATE_TIME: 'MMM dd, yyyy HH:mm',
};

export default {
  USER_ROLES,
  ROLE_LABELS,
  ACADEMIC_TERMS,
  ACADEMIC_CLASSES,
  SUBJECTS,
  GRADE_BOUNDARIES,
  STATUS_OPTIONS,
  STATUS_LABELS,
  GENDER_OPTIONS,
  NOTIFICATION_TYPES,
  FILE_LIMITS,
  API_ENDPOINTS,
  STORAGE_KEYS,
  VALIDATION_PATTERNS,
  DATE_FORMATS,
};