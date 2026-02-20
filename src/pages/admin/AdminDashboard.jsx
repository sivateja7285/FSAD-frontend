import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { useAppContext } from '../../context/AppContext';

const AdminDashboard = () => {
  const { courseList, enrollments = [] } = useAppContext();
  const navigate = useNavigate();
  const [filterDay, setFilterDay] = useState('All');

  // Calculate statistics
  const stats = useMemo(() => {
    const totalCourses = courseList.length;
    const totalCredits = courseList.reduce((sum, course) => sum + course.credits, 0);
    const avgCredits = totalCourses > 0 ? (totalCredits / totalCourses).toFixed(1) : 0;
    const uniqueInstructors = new Set(courseList.map((c) => c.instructor)).size;
    
    // Course distribution by day
    const coursesByDay = courseList.reduce((acc, course) => {
      acc[course.day] = (acc[course.day] || 0) + 1;
      return acc;
    }, {});

    // Find busiest day
    const busiestDay = Object.entries(coursesByDay).reduce(
      (max, [day, count]) => (count > max.count ? { day, count } : max),
      { day: 'N/A', count: 0 }
    );

    // Credit distribution
    const creditDistribution = courseList.reduce((acc, course) => {
      acc[course.credits] = (acc[course.credits] || 0) + 1;
      return acc;
    }, {});

    return {
      totalCourses,
      totalCredits,
      avgCredits,
      uniqueInstructors,
      coursesByDay,
      busiestDay,
      creditDistribution
    };
  }, [courseList, enrollments]);

  // Filter courses by day
  const filteredCourses = useMemo(() => {
    if (filterDay === 'All') return courseList;
    return courseList.filter(course => course.day === filterDay);
  }, [courseList, filterDay]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Admin Dashboard
          </h1>
          <button
            onClick={() => navigate('/admin/manage-courses')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            <span className="text-xl">⚙️</span>
            Manage Courses
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-100 mb-1">Total Courses</p>
                <p className="text-3xl font-bold">
                  {stats.totalCourses}
                </p>
              </div>
              <div className="text-4xl opacity-80">📚</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-100 mb-1">Total Credits</p>
                <p className="text-3xl font-bold">
                  {stats.totalCredits}
                </p>
              </div>
              <div className="text-4xl opacity-80">⭐</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-100 mb-1">Instructors</p>
                <p className="text-3xl font-bold">
                  {stats.uniqueInstructors}
                </p>
              </div>
              <div className="text-4xl opacity-80">👨‍🏫</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-100 mb-1">Avg Credits</p>
                <p className="text-3xl font-bold">
                  {stats.avgCredits}
                </p>
              </div>
              <div className="text-4xl opacity-80">📊</div>
            </div>
          </div>
        </div>

        {/* Course Distribution by Day */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">
              Course Distribution by Day
            </h2>
            <div className="space-y-3">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(
                (day) => {
                  const count = stats.coursesByDay[day] || 0;
                  const maxCount = Math.max(...Object.values(stats.coursesByDay), 1);
                  const percentage = (count / maxCount) * 100;
                  
                  return (
                    <div key={day}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-semibold text-slate-700">
                          {day}
                        </span>
                        <span className="text-sm font-bold text-blue-600">
                          {count} {count === 1 ? 'course' : 'courses'}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-slate-700">
                <span className="font-semibold">Busiest Day:</span>{' '}
                <span className="text-blue-700 font-bold">
                  {stats.busiestDay.day} ({stats.busiestDay.count} courses)
                </span>
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">
              Credit Distribution
            </h2>
            <div className="space-y-4">
              {Object.entries(stats.creditDistribution)
                .sort(([a], [b]) => Number(a) - Number(b))
                .map(([credits, count]) => {
                  const maxCount = Math.max(...Object.values(stats.creditDistribution), 1);
                  const percentage = (count / maxCount) * 100;
                  
                  return (
                    <div key={credits}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-semibold text-slate-700">
                          {credits} {Number(credits) === 1 ? 'Credit' : 'Credits'}
                        </span>
                        <span className="text-sm font-bold text-green-600">
                          {count} {count === 1 ? 'course' : 'courses'}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-green-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Recent Courses */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-800">
              All Courses
            </h2>
            <div className="flex items-center gap-3">
              <label className="text-sm font-semibold text-slate-700">
                Filter by Day:
              </label>
              <select
                value={filterDay}
                onChange={(e) => setFilterDay(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="All">All Days</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
              </select>
            </div>
          </div>

          {filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-slate-500 text-lg">
                No courses found for {filterDay === 'All' ? 'any day' : filterDay}
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-blue-300 transition-all"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md font-mono font-bold text-sm">
                          {course.courseCode}
                        </span>
                        <div className="font-semibold text-slate-800 text-lg">
                          {course.courseName}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                        <span className="flex items-center gap-1">
                          <span className="font-semibold">📅</span> {course.day}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="font-semibold">🕐</span> {course.startTime} - {course.endTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="font-semibold">⭐</span> {course.credits} Credits
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="font-semibold">👨‍🏫</span> {course.instructor}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 text-center">
                <p className="text-sm text-slate-600">
                  Showing <span className="font-bold text-blue-600">{filteredCourses.length}</span> of{' '}
                  <span className="font-bold text-blue-600">{courseList.length}</span> total courses
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
