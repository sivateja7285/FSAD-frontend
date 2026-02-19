import Layout from '../../components/Layout';
import ScheduleGrid from '../../components/ScheduleGrid';
import { useAppContext } from '../../context/AppContext';

const Schedule = () => {
  const { registeredCourses, unregisterCourse } = useAppContext();

  // Calculate total credits
  const totalCredits = registeredCourses.reduce(
    (sum, course) => sum + course.credits,
    0
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-slate-800">My Schedule</h1>
          <div className="bg-blue-100 text-blue-800 px-6 py-3 rounded-lg font-semibold">
            Total Credits: {totalCredits}
          </div>
        </div>

        {registeredCourses.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">📅</div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              No Courses Yet
            </h2>
            <p className="text-slate-600 mb-6">
              You haven't registered for any courses yet.
            </p>
            <a
              href="/student/courses"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Browse Courses
            </a>
          </div>
        ) : (
          <>
            {/* Weekly Schedule Grid */}
            <div className="mb-8">
              <ScheduleGrid />
            </div>

            {/* Registered Courses List */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-4">
                Registered Courses
              </h2>
              <div className="space-y-3">
                {registeredCourses.map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-slate-800">
                          {course.courseCode}
                        </span>
                        <span className="text-slate-700">
                          {course.courseName}
                        </span>
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm font-semibold">
                          {course.credits} Credits
                        </span>
                      </div>
                      <div className="text-sm text-slate-600 mt-2">
                        <span className="font-medium">{course.day}</span> •{' '}
                        {course.startTime} - {course.endTime} •{' '}
                        {course.instructor}
                      </div>
                    </div>
                    <button
                      onClick={() => unregisterCourse(course.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    >
                      Drop
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Schedule;
