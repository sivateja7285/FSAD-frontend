import { useAppContext } from '../context/AppContext';

const ScheduleGrid = () => {
  const { registeredCourses } = useAppContext();

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00'
  ];

  // Helper function to check if a course fits in a time slot
  const getCourseForSlot = (day, time) => {
    return registeredCourses.find((course) => {
      if (course.day !== day) return false;
      const courseStartMinutes = timeToMinutes(course.startTime);
      const slotMinutes = timeToMinutes(time);
      const courseEndMinutes = timeToMinutes(course.endTime);
      return slotMinutes >= courseStartMinutes && slotMinutes < courseEndMinutes;
    });
  };

  const timeToMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-800 text-white">
              <th className="p-3 text-left font-semibold border border-slate-700">
                Time
              </th>
              {days.map((day) => (
                <th
                  key={day}
                  className="p-3 text-center font-semibold border border-slate-700"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((time) => (
              <tr key={time} className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-700 border border-slate-200 bg-slate-50">
                  {time}
                </td>
                {days.map((day) => {
                  const course = getCourseForSlot(day, time);
                  return (
                    <td
                      key={`${day}-${time}`}
                      className={`p-3 border border-slate-200 ${
                        course ? 'bg-blue-50' : ''
                      }`}
                    >
                      {course && (
                        <div className="text-sm">
                          <div className="font-bold text-blue-900">
                            {course.courseCode}
                          </div>
                          <div className="text-xs text-slate-600 mt-1">
                            {course.courseName}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            {course.startTime} - {course.endTime}
                          </div>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleGrid;
