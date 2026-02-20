import { createContext, useContext, useState, useEffect } from 'react';
import { mockCourses } from '../data/mockCourses';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // User state
  const [userRole, setUserRole] = useState(null); // 'student' or 'admin'
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Course state
  const [courseList, setCourseList] = useState([]);
  const [registeredCourses, setRegisteredCourses] = useState([]);

  // Drop requests: { id, course, studentName, requestedAt, status: 'pending'|'approved'|'rejected' }
  const [dropRequests, setDropRequests] = useState(() => {
    const saved = localStorage.getItem('dropRequests');
    return saved ? JSON.parse(saved) : [];
  });

  // Toast notification state
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  // Initialize courses from mock data
  useEffect(() => {
    setCourseList(mockCourses);
  }, []);

  // Auth actions
  const login = (role) => {
    setUserRole(role);
    setIsAuthenticated(true);
    // Load registered courses from localStorage for students
    if (role === 'student') {
      const saved = localStorage.getItem('registeredCourses');
      if (saved) {
        setRegisteredCourses(JSON.parse(saved));
      }
    }
  };

  const logout = () => {
    setUserRole(null);
    setIsAuthenticated(false);
    setRegisteredCourses([]);
  };

  // Course management actions (Admin)
  const addCourse = (course) => {
    const newCourse = {
      ...course,
      id: Date.now() // Simple ID generation
    };
    setCourseList([...courseList, newCourse]);
    showToast('Course added successfully', 'success');
  };

  const updateCourse = (updatedCourse) => {
    setCourseList(
      courseList.map((course) =>
        course.id === updatedCourse.id ? updatedCourse : course
      )
    );
    showToast('Course updated successfully', 'success');
  };

  const deleteCourse = (courseId) => {
    setCourseList(courseList.filter((course) => course.id !== courseId));
    // Also remove from registered courses if student has it
    setRegisteredCourses(
      registeredCourses.filter((course) => course.id !== courseId)
    );
    showToast('Course deleted successfully', 'success');
  };

  // Student course registration actions
  const registerCourse = (course) => {
    const newRegisteredCourses = [...registeredCourses, course];
    setRegisteredCourses(newRegisteredCourses);
    // Persist to localStorage
    localStorage.setItem(
      'registeredCourses',
      JSON.stringify(newRegisteredCourses)
    );
    showToast('Course registered successfully', 'success');
  };

  const unregisterCourse = (courseId) => {
    const newRegisteredCourses = registeredCourses.filter(
      (course) => course.id !== courseId
    );
    setRegisteredCourses(newRegisteredCourses);
    // Persist to localStorage
    localStorage.setItem(
      'registeredCourses',
      JSON.stringify(newRegisteredCourses)
    );
    showToast('Course unregistered successfully', 'success');
  };

  // ── Drop Request actions ──────────────────────────────────────
  const requestDrop = (course) => {
    // Prevent duplicate pending requests
    const alreadyPending = dropRequests.some(
      (r) => r.course.id === course.id && r.status === 'pending'
    );
    if (alreadyPending) {
      showToast('Drop request already submitted for this course', 'info');
      return;
    }
    const newRequest = {
      id: Date.now(),
      course,
      studentName: 'Student',
      requestedAt: new Date().toISOString(),
      status: 'pending',
    };
    const updated = [...dropRequests, newRequest];
    setDropRequests(updated);
    localStorage.setItem('dropRequests', JSON.stringify(updated));
    showToast('Drop request submitted. Awaiting admin approval.', 'info');
  };

  const approveDrop = (requestId) => {
    const request = dropRequests.find((r) => r.id === requestId);
    if (!request) return;

    // Read directly from localStorage so it works regardless of who is logged in (admin has empty registeredCourses state)
    const saved = localStorage.getItem('registeredCourses');
    const currentRegistered = saved ? JSON.parse(saved) : [];
    const newRegisteredCourses = currentRegistered.filter(
      (c) => c.id !== request.course.id
    );
    // Update localStorage so student sees the change on next login / reload
    localStorage.setItem('registeredCourses', JSON.stringify(newRegisteredCourses));
    // If a student is currently viewing (same session), update state too
    setRegisteredCourses(newRegisteredCourses);

    // Mark request as approved
    const updated = dropRequests.map((r) =>
      r.id === requestId ? { ...r, status: 'approved', resolvedAt: new Date().toISOString() } : r
    );
    setDropRequests(updated);
    localStorage.setItem('dropRequests', JSON.stringify(updated));
    showToast('Drop request approved. Course removed from student schedule.', 'success');
  };

  const rejectDrop = (requestId) => {
    const updated = dropRequests.map((r) =>
      r.id === requestId ? { ...r, status: 'rejected', resolvedAt: new Date().toISOString() } : r
    );
    setDropRequests(updated);
    localStorage.setItem('dropRequests', JSON.stringify(updated));
    showToast('Drop request rejected.', 'error');
  };

  // Toast notification
  const showToast = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000);
  };

  const value = {
    // State
    userRole,
    isAuthenticated,
    courseList,
    registeredCourses,
    dropRequests,
    toast,
    // Actions
    login,
    logout,
    addCourse,
    updateCourse,
    deleteCourse,
    registerCourse,
    unregisterCourse,
    requestDrop,
    approveDrop,
    rejectDrop,
    showToast
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
