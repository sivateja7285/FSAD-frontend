import Layout from '../../components/Layout';
import { useAppContext } from '../../context/AppContext';

const AdminDashboard = () => {
  const { courseList } = useAppContext();

  // Calculate statistics
  const totalCourses = courseList.length;
  const totalCredits = courseList.reduce(
    (sum, course) => sum + course.credits,
    0
  );

  // Course distribution by day
  const coursesByDay = courseList.reduce((acc, course) => {
    acc[course.day] = (acc[course.day] || 0) + 1;
    return acc;
  }, {});

  // Get unique instructors
  const uniqueInstructors = new Set(courseList.map((c) => c.instructor)).size;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">
          Admin Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Courses</p>
                <p className="text-3xl font-bold text-blue-600">
                  {totalCourses}
                </p>
              </div>
              <div className="text-4xl">📚</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Credits</p>
                <p className="text-3xl font-bold text-green-600">
                  {totalCredits}
                </p>
              </div>
              <div className="text-4xl">⭐</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Instructors</p>
                <p className="text-3xl font-bold text-purple-600">
                  {uniqueInstructors}
                </p>
              </div>
              <div className="text-4xl">👨‍🏫</div>
            </div>
          </div>
        </div>

        {/* Course Distribution by Day */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            Course Distribution by Day
          </h2>
          <div className="grid grid-cols-5 gap-4">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(
              (day) => (
                <div key={day} className="text-center">
                  <div className="text-sm font-semibold text-slate-700 mb-2">
                    {day}
                  </div>
                  <div className="bg-blue-100 text-blue-700 rounded-lg py-4 font-bold text-xl">
                    {coursesByDay[day] || 0}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">courses</div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Recent Courses */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            All Courses
          </h2>
          <div className="space-y-3">
            {courseList.slice(0, 5).map((course) => (
              <div
                key={course.id}
                className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50"
              >
                <div>
                  <div className="font-semibold text-slate-800">
                    {course.courseCode} - {course.courseName}
                  </div>
                  <div className="text-sm text-slate-600 mt-1">
                    {course.day} • {course.startTime} - {course.endTime} •{' '}
                    {course.credits} Credits
                  </div>
                </div>
                <div className="text-slate-600 text-sm">{course.instructor}</div>
              </div>
            ))}
          </div>
          {courseList.length > 5 && (
            <div className="mt-4 text-center">
              <a
                href="/admin/manage-courses"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                View All Courses →
              </a>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
