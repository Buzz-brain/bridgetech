import { GRADE_BOUNDARIES } from './constants';
import { format, parseISO, isValid } from 'date-fns';

// Calculate grade from score
export const calculateGrade = (score) => {
  const numericScore = parseFloat(score);
  if (isNaN(numericScore)) return { grade: 'N/A', remark: 'Invalid Score' };
  
  const gradeInfo = GRADE_BOUNDARIES.find(
    boundary => numericScore >= boundary.min && numericScore <= boundary.max
  );
  
  return gradeInfo || { grade: 'N/A', remark: 'Invalid Score' };
};

// Calculate average score
export const calculateAverage = (scores) => {
  if (!Array.isArray(scores) || scores.length === 0) return 0;
  
  const validScores = scores.filter(score => !isNaN(parseFloat(score)));
  if (validScores.length === 0) return 0;
  
  const sum = validScores.reduce((acc, score) => acc + parseFloat(score), 0);
  return (sum / validScores.length).toFixed(2);
};

// Format date
export const formatDate = (date, formatStr = 'MMM dd, yyyy') => {
  if (!date) return '';
  
  let dateObj;
  if (typeof date === 'string') {
    dateObj = parseISO(date);
  } else {
    dateObj = date;
  }
  
  if (!isValid(dateObj)) return '';
  
  return format(dateObj, formatStr);
};

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number
export const isValidPhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ''));
};

// Format phone number
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  
  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  // Add country code if not present
  if (!cleaned.startsWith('+')) {
    return `+234${cleaned}`;
  }
  
  return cleaned;
};

// Generate random password
export const generatePassword = (length = 8) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$!%*?&';
  let password = '';
  
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  
  return password;
};

// Capitalize first letter
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Convert to title case
export const toTitleCase = (str) => {
  if (!str) return '';
  return str.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

// Truncate text
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Check if file is valid
export const isValidFile = (file, allowedTypes, maxSize) => {
  if (!file) return false;
  
  // Check file type
  if (allowedTypes && !allowedTypes.includes(file.type)) {
    return false;
  }
  
  // Check file size
  if (maxSize && file.size > maxSize) {
    return false;
  }
  
  return true;
};

// Convert CSV to JSON
export const csvToJson = (csv) => {
  const lines = csv.split('\n');
  const headers = lines[0].split(',').map(header => header.trim());
  const result = [];
  
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '') continue;
    
    const values = lines[i].split(',').map(value => value.trim());
    const obj = {};
    
    headers.forEach((header, index) => {
      obj[header] = values[index] || '';
    });
    
    result.push(obj);
  }
  
  return result;
};

// Generate admission number
export const generateAdmissionNumber = (schoolCode, year, sequence) => {
  const yearSuffix = year.toString().slice(-2);
  const paddedSequence = sequence.toString().padStart(4, '0');
  return `${schoolCode}/${yearSuffix}/${paddedSequence}`;
};

// Calculate class position
export const calculateClassPosition = (students, currentStudentId) => {
  if (!Array.isArray(students) || students.length === 0) return 'N/A';
  
  // Sort students by average score in descending order
  const sortedStudents = students
    .filter(student => student.averageScore !== undefined)
    .sort((a, b) => parseFloat(b.averageScore) - parseFloat(a.averageScore));
  
  const position = sortedStudents.findIndex(student => student.id === currentStudentId) + 1;
  
  if (position === 0) return 'N/A';
  
  // Add ordinal suffix
  const ordinalSuffix = (num) => {
    const lastDigit = num % 10;
    const lastTwoDigits = num % 100;
    
    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
      return 'th';
    }
    
    switch (lastDigit) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };
  
  return `${position}${ordinalSuffix(position)}`;
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Deep clone object
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (typeof obj === 'object') {
    const clonedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
};

export default {
  calculateGrade,
  calculateAverage,
  formatDate,
  isValidEmail,
  isValidPhone,
  formatPhoneNumber,
  generatePassword,
  capitalize,
  toTitleCase,
  truncateText,
  formatFileSize,
  isValidFile,
  csvToJson,
  generateAdmissionNumber,
  calculateClassPosition,
  debounce,
  deepClone,
};