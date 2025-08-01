import { adminGetLesson } from '@/app/data/admin/admin-get-lesson';
import LessonForm from './_component/LessonForm';

type Params = Promise<{
  courseId: string;
  chapterId: string;
  lessonId: string;
}>;

export default async function LessonIdPage({ params }: { params: Params }) {
  const { chapterId, courseId, lessonId } = await params;
  const data = await adminGetLesson(lessonId);

  return <LessonForm data={data} chapterId={chapterId} courseId={courseId} />;
}
