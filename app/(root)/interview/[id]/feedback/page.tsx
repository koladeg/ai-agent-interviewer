import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import {
  getFeedbackByInterviewId,
  getInterviewById,
  getReportById,
  getReportFeedbackByInterviewId,
} from "@/lib/actions/general.action";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Feedback = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();

  // const interview = await getInterviewById(id);
  // if (!interview) redirect("/");

  const report = await getReportById(id);
    if (!report) redirect("/");

  const reportFeedback = await getReportFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });

  console.log("reportFeedback", reportFeedback);

  const handleApprove = async () => {
    // if (!report) return;
    // setSubmitting(true);
    // await finalizeReport(report.id);
    // router.push(`/report/${report.id}/completed`);
  };
  const handleEdit = () => {
    // router.push(`/report/${report.id}/edit`);
  };

  // if (loading || !report) {
  //   return <p className=“p-8 text-center”>Loading report preview…</p>;
  // }

  return (
    <section className="section-feedback">
      <h1 className="text-4xl font-semibold">
        Preview Your {reportFeedback.title} Report
      </h1>
      <div className="flex items-center gap-4 text-gray-600 mb-4">
        <p>
          Generated on:{" "}
          <time dateTime={reportFeedback.createdAt}>
            {dayjs(reportFeedback.createdAt).format("MMM D, YYYY h:mm A")}
          </time>
        </p>
        <p >| Purpose: {reportFeedback.report_purpose}</p>
        <p>| Period: {reportFeedback.timeframe}</p>
      </div>
      <hr className="mb-6" />
      {/* Render the full reportFeedback body */}
      {/* <article
        className="prose prose-lg mb-8"
        dangerouslySetInnerHTML={{ __html: reportFeedback.generatedText }}
      /> */}

      <article className="prose">
        {reportFeedback.sections.map((sec, i) => (
            <section className="max-w-3xl mx-auto py-8 px-4"  key={i}>
              <div className="flex flex-col gap-4">
                <h2>{sec.heading}</h2>
                <p className="text-sm font-semibold text-primary-200 text-center">{sec.content}</p>
              </div>
            </section>
          ))}
      </article>
      {/* Buttons */}
    </section>
  );
};

export default Feedback;
