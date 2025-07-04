import Image from "next/image";
import { redirect } from "next/navigation";

import Agent from "@/components/Agent";
import { getRandomInterviewCover } from "@/lib/utils";

import {
  getFeedbackByInterviewId,
  getInterviewById,
  getReportById,
  getReportFeedbackByInterviewId,
} from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.action";
import DisplayTechIcons from "@/components/DisplayTechIcons";

const InterviewDetails = async ({ params }: RouteParams) => {
  const { id } = await params;

  const user = await getCurrentUser();

  // const interview = await getInterviewById(id);
  // if (!interview) redirect("/");

  const report = await getReportById(id);
  if (!report) redirect("/");

  // const feedback = await getFeedbackByInterviewId({
  //   interviewId: id,
  //   userId: user?.id!,
  // });

  const reportFeedback = await getReportFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });

  return (
    <>
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex flex-row gap-4 items-center max-sm:flex-col">
          <div className="flex flex-row gap-4 items-center">
            <Image
              src={getRandomInterviewCover()}
              alt="cover-image"
              width={40}
              height={40}
              className="rounded-full object-cover size-[40px]"
            />
            <h3 className="capitalize">{report.report_type}</h3>
          </div>

          {/* <DisplayTechIcons techStack={report.techstack} /> */}
        </div>

        <p className="bg-dark-200 px-4 py-2 rounded-lg h-fit">
          {report.report_purpose}
        </p>
      </div>

      <Agent
        userName={user?.name! || ''}
        profileImage={user?.profileURL}
        userId={user?.id}
        interviewId={id}
        report_purpose={report.report_purpose}
        report_type={report.report_type}
        timeframe={report.timeframe}
        type="interview"
        questions={report.questions}
        // feedbackId={feedback?.id}
        reportFeedbackId={reportFeedback?.id}
      />
    </>
  );
};

export default InterviewDetails;
