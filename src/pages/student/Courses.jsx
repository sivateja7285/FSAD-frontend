import { useState } from 'react';
import Layout from '../../components/Layout';
import CourseCard from '../../components/CourseCard';
import { useAppContext } from '../../context/AppContext';
import { checkTimeConflict } from '../../utils/checkTimeConflict';

const Courses = () => {
  const { courseList, registeredCourses, registerCourse, showToast } =
    useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDay, setFilterDay] = useState('All');

  // Filter courses
  const filteredCourses = courseList.filter((course) => {
    const matchesSearch =
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDay = filterDay === 'All' || course.day === filterDay;

    return matchesSearch && matchesDay;
  });

  const handleRegister = (course) => {
    // Check if already registered
    if (registeredCourses.some((c) => c.id === course.id)) {
      showToast('You are already registered for this course', 'error');
      return;
    }

    // Check for time conflicts
    const { hasConflict, conflictingCourse } = checkTimeConflict(
      registeredCourses,
      course
    );

    if (hasConflict) {
      showToast(
        `Time conflict with ${conflictingCourse.courseCode} on ${conflictingCourse.day}`,
        'error'
      );
      return;
    }

    // Register the course
    registerCourse(course);
  };

  // Check if course has conflict (for highlighting)
  const hasConflict = (course) => {
    if (registeredCourses.some((c) => c.id === course.id)) {
      return false; // Already registered
    }
    return checkTimeConflict(registeredCourses, course).hasConflict;
  };

  const days = ['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">
          Browse Courses
        </h1>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Search Courses
              </label>
              <input
                type="text"
                placeholder="Search by name, code, or instructor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Filter by Day
              </label>
              <select
                value={filterDay}
                onChange={(e) => setFilterDay(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const isRegistered = registeredCourses.some(
              (c) => c.id === course.id
            );
            const isConflict = hasConflict(course);

            return (
              <CourseCard
                key={course.id}
                course={course}
                isConflict={isConflict}
                actionButton={
                  !isRegistered && (
                    <button
                      onClick={() => handleRegister(course)}
                      disabled={isConflict}
                      className={`w-full py-2 rounded-lg font-semibold transition-colors ${
                        isConflict
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {isConflict ? 'Conflict' : 'Register'}
                    </button>
                  )
                }
              />
            );
          })}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">
              No courses found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Courses;
