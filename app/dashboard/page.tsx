import EmptyState from '@/components/general/EmptyState';
import { getAllCourses } from '../data/course/get-all-courses';
import { getEnrolledCourses } from '../data/user/get-enrolled-courses';
import { PublicCourseCard } from '../(public)/_components/PublicCourseCard';
import { CourseProgressCard } from './_component/CourseProgressCard';

export default async function DashboardPage() {
  const [courses, enrolledCourses] = await Promise.all([
    getAllCourses(),
    getEnrolledCourses(),
  ]);
  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Enrolled Courses</h1>
        <p className="text-muted-foreground">
          Here you can see all the courses you have access to
        </p>
      </div>

      {enrolledCourses.length === 0 ? (
        <EmptyState
          title="No courses purchased"
          description="You have not purchase any course yet"
          buttonText="Browse Courses"
          href="/courses"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => (
            <CourseProgressCard key={course.Course.id} data={course} />
          ))}
        </div>
      )}

      <section className="mt-10">
        <div className="flex flex-col gap-2 mb-5">
          <h1 className="text-3xl font-bold">Available Courses</h1>
          <p className="text-muted-foreground">
            Here you can see all the courses you can purchase.
          </p>
        </div>

        {courses.filter(
          (course) =>
            !enrolledCourses.some(
              ({ Course: enrolled }) => enrolled.id === course.id
            )
        ).length === 0 ? (
          <EmptyState
            title="No course available"
            description="You have already purchase all the courses available"
            href="/courses"
            buttonText="Browse Courses"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses
              .filter(
                (course) =>
                  !enrolledCourses.some(
                    ({ Course: enrolled }) => enrolled.id === course.id
                  )
              )
              .map((course) => (
                <PublicCourseCard key={course.id} data={course} />
              ))}
          </div>
        )}
      </section>
    </>
  );
}
