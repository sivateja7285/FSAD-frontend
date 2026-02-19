import Layout from '../../components/Layout';
import { useAppContext } from '../../context/AppContext';

const StudentDashboard = () => {
  const { registeredCourses, courseList } = useAppContext();

  // Calculate total credits
  const totalCredits = registeredCourses.reduce(
    (sum, course) => sum + course.credits,
    0
  );

  // Get course distribution by day
  const coursesByDay = registeredCourses.reduce((acc, course) => {
    acc[course.day] = (acc[course.day] || 0) + 1;
    return acc;
  }, {});

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
            Student Dashboard
          </h1>
          <p className="text-slate-600">Welcome back! Here's your academic overview</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 mb-1 font-medium">Total Courses</p>
                <p className="text-4xl font-bold">
                  {registeredCourses.length}
                </p>
              </div>
              <div className="text-5xl opacity-80">📚</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl p-6 text-white card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 mb-1 font-medium">Total Credits</p>
                <p className="text-4xl font-bold">
                  {totalCredits}
                </p>
              </div>
              <div className="text-5xl opacity-80">⭐</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-xl p-6 text-white card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 mb-1 font-medium">Available Courses</p>
                <p className="text-4xl font-bold">
                  {courseList.length}
                </p>
              </div>
              <div className="text-5xl opacity-80">🎓</div>
            </div>
          </div>
        </div>

        {/* Registered Courses Overview */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-sm">📋</span>
            Registered Courses
          </h2>
          {registeredCourses.length === 0 ? (
            <p className="text-slate-600">
              You haven't registered for any courses yet. Visit the Browse
              Courses page to get started.
            </p>
          ) : (
            <div className="space-y-3">
              {registeredCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 hover:border-blue-300 hover:shadow-md"
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
                  <div className="text-slate-600">{course.instructor}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Weekly Distribution */}
        {registeredCourses.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center text-white text-sm">📊</span>
              Weekly Distribution
            </h2>
            <div className="grid grid-cols-5 gap-4">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(
                (day) => (
                  <div key={day} className="text-center">
                    <div className="text-sm font-semibold text-slate-700 mb-3">
                      {day.slice(0, 3)}
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl py-4 font-bold text-2xl shadow-lg hover:scale-110 transition-transform duration-300">
                      {coursesByDay[day] || 0}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default StudentDashboard;
